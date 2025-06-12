
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Task } from '../../../core/models/task';
import { Category } from 'src/app/core/models/category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone:true,
  imports: [IonicModule, CommonModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit{
  @Input() task?: Task;
  form!: FormGroup;
  categories: Category[] = [];
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private catSvc: CategoryService
  ) {
   
  }

    ngOnInit() {

    this.form = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
      categoryId: [this.task?.categoryId || '', Validators.required]
    });


    this.sub = this.catSvc.getAll().subscribe(cats => this.categories = cats);
  }
    ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  save() {
    if (!this.form.valid) return;
    const data: Task = {
      id: this.task?.id || new Date().getTime().toString(),
      completed: this.task?.completed || false,
      createdAt: this.task?.createdAt || Date.now(),
      ...this.form.value
    };
    this.modalCtrl.dismiss(data);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
