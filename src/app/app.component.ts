import { Component, CUSTOM_ELEMENTS_SCHEMA , inject } from '@angular/core';
import { MainPage } from '../app/pages/pages';
import { IonApp, IonRouterOutlet,Platform } from '@ionic/angular/standalone';
import { OfflineService } from 'src/providers/providers';
import { Geolocation } from '@capacitor/geolocation';

import { PushNotificationService } from 'src/providers/providers';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class MyApp {

  protected rootPage: any;
  private cancelBtnText: string = "";
  private okBtnText: string = "";
  private PLEASE_WAIT_TEXT: string = "";

  public offlineService = inject(OfflineService);

  constructor(private platform: Platform,private pushService: PushNotificationService) {}

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    // Wait for the native platform to be ready before calling native plugins
    await this.platform.ready();

    // STEP 1: Request Geolocation (High Priority)
    try {
      const geoStatus = await Geolocation.requestPermissions();
      console.log('Geolocation status:', geoStatus.location);
    } catch (e) {
      console.warn('Geolocation permission denied or skipped');
    }


    // Trigger the push notification registration flow
    // This will wait until the Geolocation dialog is closed
    this.pushService.registerForPushNotification();
  }


}
