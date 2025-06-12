import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories$ = new BehaviorSubject<Category[]>([]);
  private readonly KEY = 'categories';

  constructor(private storage: StorageService) {
    this.storage.init().then(() => this.loadCategories());
  }

  private async loadCategories() {
    let data = await this.storage.get<Category[]>(this.KEY) || [];

    if (data.length === 0) {
      const defaultCategories: Category[] = [
        {
          id: 'todas',
          name: 'Todas',
          color: '#94a3b8'
        },
        {
          id: 'general',
          name: 'General',
          color: '#3880ff'
        },
        {
          id: 'trabajo',
          name: 'Trabajo',
          color: '#ffca28'
        },
        {
          id: 'personal',
          name: 'Personal',
          color: '#e91e63'
        },
        {
          id: 'hogar',
          name: 'Hogar',
          color: '#4caf50'
        },
        {
          id: 'salud',
          name: 'Salud',
          color: '#ff5252'
        },
        {
          id: 'finanzas',
          name: 'Finanzas',
          color: '#03a9f4'
        },
        {
          id: 'estudio',
          name: 'Estudio',
          color: '#8e24aa'
        },
      ];
      data = defaultCategories;
      await this.storage.set(this.KEY, data);
    }

    this.categories$.next(data);
  }

  getAll(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  async add(category: Category) {
    const updated = [category, ...this.categories$.value];
    await this.storage.set(this.KEY, updated);
    this.categories$.next(updated);
  }

  async update(updatedCat: Category) {
    const updated = this.categories$.value.map(c => c.id === updatedCat.id ? updatedCat : c);
    await this.storage.set(this.KEY, updated);
    this.categories$.next(updated);
  }

  async delete(id: string) {
    const updated = this.categories$.value.filter(c => c.id !== id);
    await this.storage.set(this.KEY, updated);
    this.categories$.next(updated);
  }
}

