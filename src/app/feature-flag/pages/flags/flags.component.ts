import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-flags',
  standalone: false,
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {

  enabled = false;

  constructor(private rc: RemoteConfigService) { }

  ngOnInit() {
    this.rc.isFeatureEnabled().subscribe(e => this.enabled = e);
  }

  onToggle(enabled: boolean) {
    // Aquí podrías llamar a un método para actualizar Remote Config
    console.log('Toggle feature to', enabled);
  }

}
