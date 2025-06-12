import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { TaskService } from './services/task.service';
import { CategoryService } from './services/category.service';

import { RemoteConfigService } from './services/remote-config.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
   providers: [
    StorageService,
    TaskService,
    CategoryService,
    RemoteConfigService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) throw new Error('CoreModule already loaded.');
  }
 }
