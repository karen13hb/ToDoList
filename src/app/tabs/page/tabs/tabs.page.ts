import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/services/category.service';
import { TaskService } from 'src/app/core/services/task.service';
import { ModalController } from '@ionic/angular';
import { Task } from '../../../core/models/task';
import { TaskFormComponent } from 'src/app/tasks/components/task-form/task-form.component';
import { FabMenuComponent } from '../../components/fab-menu/fab-menu.component';
import { CategoryFormComponent } from 'src/app/categories/components/category-form/category-form.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule,RouterModule  ],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage implements OnInit {

  constructor(private taskSvc: TaskService,
    private catSvc: CategoryService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,) { }

  ngOnInit() {
  }

  async onAdd() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss<Task>();
    if (data) this.taskSvc.add(data);
  }

  async openFabMenu(ev: Event) {
    const pop = await this.popoverCtrl.create({
      component: FabMenuComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await pop.present();

    const { data } = await pop.onWillDismiss<'task' | 'category'>();
    if (data === 'task') {
      const m = await this.modalCtrl.create({ component: TaskFormComponent });
      await m.present();
      const { data: t } = await m.onWillDismiss();
      if (t) this.taskSvc.add(t);
    }
    if (data === 'category') {
      const m = await this.modalCtrl.create({ component: CategoryFormComponent });
      await m.present();
      const { data: c } = await m.onWillDismiss();
      if (c) this.catSvc.add(c);
    }
  }
}
