import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Category } from  '../../../core/models/category';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selector',
  standalone:true,
  imports: [IonicModule, CommonModule],
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategoryId?: string;
  @Output() selectionChange = new EventEmitter<string>();

  onSelect(id: string) {
    this.selectionChange.emit(id);
  }
}
