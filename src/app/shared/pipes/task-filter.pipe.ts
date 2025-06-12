
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../core/models/task';

@Pipe({
  name: 'taskFilter',
  pure: true,
  standalone:true,
})
export class TaskFilterPipe implements PipeTransform {
  transform<T extends Task>(tasks: T[] | null | undefined, filterId?: string): T[] {
    if (!tasks) return [];
    if (!filterId) return tasks;
    return tasks.filter(t => t.categoryId === filterId) as T[];
  }
}
