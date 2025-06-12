import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../core/models/task';
import { ActionSheetController } from '@ionic/angular';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { TaskWithCat } from 'src/app/core/models/TaskWithCat';
import { IonCard, IonCardContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-item',
  standalone:true,
  imports: [IonicModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: TaskWithCat;
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  constructor(private actionSheetCtrl: ActionSheetController) {}

    onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

 get timeAgo(): string {
  return formatDistanceToNow(new Date(this.task.createdAt), {
    addSuffix: true,
    locale: es
  });
}

  async openActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => this.onEdit()
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.onDelete()
        },
        { text: 'Cancelar', icon: 'close-outline', role: 'cancel' }
      ]
    });
    await sheet.present();
  }
}
