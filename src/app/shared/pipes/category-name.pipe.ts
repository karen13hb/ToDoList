import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../core/models/category';

@Pipe({
    name: 'categoryName',
    pure: true,
    standalone: true
  })

export class CategoryNamePipe implements PipeTransform {

  transform(categories: Category[] = [], id?: string): string {
    
    return categories.find(c => c.id === id)?.name || '—';
  }
}
