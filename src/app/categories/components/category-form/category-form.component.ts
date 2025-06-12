import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
    standalone:true,
  imports: [IonicModule, CommonModule,ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  @Input() category?: Category;
  @Output() save = new EventEmitter<Category>();

  form!: FormGroup;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(
        this.category?.name || '',
        Validators.required
      ),
      color: new FormControl(
        this.category?.color || '#3880ff',
        Validators.required
      )
    });
  }
  onSave() {
    if (!this.form.valid) {
      console.log("hpña")
      return;

    }
    const cat: Category = {
      id: this.category?.id || Date.now().toString(),
      ...this.form.value
    };
    this.save.emit(cat);

    this.modalCtrl.dismiss(cat);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
