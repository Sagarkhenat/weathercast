
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http'
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { MyApp } from './app/app.component';
import {routes} from './app/app-routing.module';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

// Firebase Imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from './environments/environment';

// Call the loader before bootstrapping
defineCustomElements(window);

bootstrapApplication(MyApp, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(), // This is the modern way
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
    }),

    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideMessaging(() => getMessaging()),
  ],
});
