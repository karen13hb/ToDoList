import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

@Injectable({ providedIn: 'root' })

export class RemoteConfigService {

  constructor(private afRemoteConfig: AngularFireRemoteConfig) {
    
    this.afRemoteConfig.fetchAndActivate();
  }


  isFeatureEnabled(): Observable<boolean> {
    return this.afRemoteConfig.booleans.pipe(

      map(flags => !!flags['feature_flag'])
    );
  }
}