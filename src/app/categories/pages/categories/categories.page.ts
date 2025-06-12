import { Component, OnInit,ChangeDetectionStrategy  } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
@Component({
  selector: 'app-categories',
  standalone:true,
  imports: [IonicModule, CommonModule,CategoryCardComponent],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {

  categories$!: Observable<Category[]>;


  constructor(private catSvc: CategoryService, private modalCtrl: ModalController) { }
  ngOnInit() {
    this.categories$ = this.catSvc.getAll();
  }

  async onEdit(cat: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
      componentProps: { category: cat },
      // breakpoints:    [0, 0.25, 0.5, 0.75],
      // initialBreakpoint: 0.25,
      // handle:         true,           
      // handleBehavior: 'cycle',        
    });

    await modal.present();

    const { data } = await modal.onWillDismiss<Category>();
    if (data) {
      this.catSvc.update(data);
    }
  }


  onDelete(id: string) {
    this.catSvc.delete(id);
  }



}
