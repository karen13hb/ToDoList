import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);
  private readonly KEY = 'tasks';

  constructor(private storage: StorageService) {
    this.storage.init().then(() => this.loadTasks());
  }

  private async loadTasks() {
    const data = await this.storage.get<Task[]>(this.KEY) || [];
    this.tasks$.next(data);
  }

  getAll(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  async add(task: Task) {
    const current = this.tasks$.value;
    const updated = [task, ...current];
    await this.storage.set(this.KEY, updated);
    this.tasks$.next(updated);
  }

  async update(updatedTask: Task) {
    const updated = this.tasks$.value.map(t => t.id === updatedTask.id ? updatedTask : t);
    await this.storage.set(this.KEY, updated);
    this.tasks$.next(updated);
  }

  async delete(id: string) {
    const updated = this.tasks$.value.filter(t => t.id !== id);
    await this.storage.set(this.KEY, updated);
    this.tasks$.next(updated);
  }
}
