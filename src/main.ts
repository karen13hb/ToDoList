// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireRemoteConfigModule,
  DEFAULTS,
  SETTINGS,
} from '@angular/fire/compat/remote-config';

import { AppComponent } from './app/app.component';
import { AppRouting } from './app/app-routing.module';
import { StorageModule } from './app/core/storage.module';
import { CoreModule } from './app/core/core.module';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    // -----------------------------
    // Módulos que antes iban en imports[]
    // -----------------------------
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      IonicModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireRemoteConfigModule,
      StorageModule,
      CoreModule
    ),
    // -----------------------------
    // Proveedores globales que antes iban en providers[]
    // -----------------------------
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: DEFAULTS, useValue: { feature_flag: false } },
    { provide: SETTINGS, useValue: { minimumFetchIntervalMillis: 0 } },

    // -----------------------------
    // Nuestro enrutador standalone
    // -----------------------------
    AppRouting
  ]
});
