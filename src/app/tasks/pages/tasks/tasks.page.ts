import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Task } from '../../../core/models/task';
import { Category } from '../../../core/models/category';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { ModalController } from '@ionic/angular';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskWithCat } from 'src/app/core/models/TaskWithCat';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from 'src/app/shared/components/task-item/task-item.component';
import { CategorySelectorComponent } from 'src/app/shared/components/category-selector/category-selector.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  standalone:true,
  imports: [IonicModule, CommonModule,TaskItemComponent, CategorySelectorComponent],
  styleUrls: ['./tasks.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(50, [
              animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class TasksPage implements OnInit {

  tasks$: Observable<TaskWithCat[]>;
  categories$: Observable<Category[]>;
  filterId$ = new BehaviorSubject<string>('');
  filteredTasks$: Observable<TaskWithCat[]>;
  showExperimental = false;

  constructor(
    private taskSvc: TaskService,
    private catSvc: CategoryService,
    private modalCtrl: ModalController,
    private rc: RemoteConfigService,
  ) {

    this.categories$ = this.catSvc.getAll();


    this.tasks$ = combineLatest([
      this.taskSvc.getAll(),
      this.categories$
    ]).pipe(
      map(([tasks, categories]) =>
        tasks.map(t => ({
          ...t,
          categoryName:
            categories.find(c => c.id === t.categoryId)?.name ?? 'General',
          categoryColor:
            categories.find(c => c.id === t.categoryId)?.color ??
            '#3880ff'
        }))
      )
    );

    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filterId$
    ]).pipe(
      map(([tasks, filterId]) =>
        !filterId || filterId === 'todas'
          ? tasks
          : tasks.filter(t => t.categoryId === filterId)
      )
    );
  }

  ngOnInit() {

    this.rc.isFeatureEnabled().subscribe(enabled => {
      console.log('feature_flag:', enabled);
      this.showExperimental = enabled;
    });
  }

  onToggle(id: string) {
    const sub = this.taskSvc.getAll().subscribe(tasks => {
      const t = tasks.find(x => x.id === id);
      if (t) this.taskSvc.update({ ...t, completed: !t.completed });
    });
    sub.unsubscribe();
  }

  onDelete(id: string) {
    this.taskSvc.delete(id);
  }

  onFilterChange(catId: string) {
    this.filterId$.next(catId);
  }

  async onEdit(task: TaskWithCat) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss<Task>();
    if (data) {
      this.taskSvc.update(data);
    }
  }

  doExperimental() {
    console.log('Has pulsado la función experimental 😉');

  }


}
