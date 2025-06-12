import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fab-menu',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss']
})
export class FabMenuComponent {

  constructor(private popoverCtrl: PopoverController) { }

  select(choice: 'task' | 'category') {
    this.popoverCtrl.dismiss(choice);
  }
}
