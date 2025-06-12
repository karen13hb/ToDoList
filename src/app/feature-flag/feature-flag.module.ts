import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureFlagRoutingModule } from './feature-flag-routing.module';
import { FeatureToggleComponent } from './components/feature-toggle/feature-toggle.component';
import { FlagsComponent } from './pages/flags/flags.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FeatureToggleComponent,FlagsComponent],
  imports: [
    CommonModule,
    FeatureFlagRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class FeatureFlagModule { }
