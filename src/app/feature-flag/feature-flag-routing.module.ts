import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagsComponent } from './pages/flags/flags.component';

const routes: Routes = [
  { path: '', component: FlagsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureFlagRoutingModule { }
