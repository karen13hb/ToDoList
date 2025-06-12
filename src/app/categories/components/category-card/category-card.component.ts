import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { ActionSheetController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone:true,
  imports: [IonicModule, CommonModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() data!: Category;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

   constructor(private actionSheetCtrl: ActionSheetController) {}


  async openActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: this.data.name,
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => this.edit.emit(this.data.id)
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.delete.emit(this.data.id)
        },
        { text: 'Cancelar', icon: 'close-outline', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

}
