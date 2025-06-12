import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IonItem, IonToggle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-feature-toggle',
  standalone:false,
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureToggleComponent {
  @Input() enabled = false;
  @Output() toggle = new EventEmitter<boolean>();

  onToggle(event: CustomEvent) {
    this.toggle.emit(event.detail.checked);
  }

}
