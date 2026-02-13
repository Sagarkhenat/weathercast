import { Component, CUSTOM_ELEMENTS_SCHEMA , inject, Renderer2 } from '@angular/core';
import { IonApp, IonRouterOutlet,Platform , MenuController, NavController, AlertController} from '@ionic/angular/standalone';
import { OfflineService } from 'src/providers/providers';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule, AsyncPipe } from '@angular/common';

import { Browser } from '@capacitor/browser'; // For Privacy Policy
import { PushNotificationService, UnitStateService } from 'src/providers/providers';

import { addIcons } from 'ionicons';
import {moon, sunnyOutline,
        notificationsOutline, mapOutline,
        globeOutline,shieldCheckmarkOutline,
        chatbubbleOutline, starOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp,
          IonRouterOutlet,
          CommonModule,
          AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class MyApp {

  isDarkMode: boolean = false;

  protected rootPage: any;
  private cancelBtnText: string = "";
  private okBtnText: string = "";
  private PLEASE_WAIT_TEXT: string = "";

  public offlineService = inject(OfflineService);
  menuType: string = 'overlay';

  // Inject the service and make it PUBLIC so the HTML can see it
  public unitService = inject(UnitStateService);

  constructor(private platform: Platform,
    private pushService: PushNotificationService,
    private menu: MenuController,
    private navCtrl: NavController,
    private renderer: Renderer2,
    private alertCtrl: AlertController) {


      // Register the icons so <ion-icon> can use them
      addIcons({ moon, sunnyOutline,
        notificationsOutline, mapOutline,
        globeOutline,shieldCheckmarkOutline,
        chatbubbleOutline, starOutline,homeOutline });
    }

  ngOnInit() {
    this.initializeApp();

    // Ensure the menu is enabled and active
    this.menu.enable(true, 'main-menu');
  }

  navigateHome() {
    this.navCtrl.navigateRoot('/home');
    this.menu.close();
  }

  async initializeApp() {
    // Wait for the native platform to be ready before calling native plugins
    await this.platform.ready();

    // PERMISSION 1: Request Geolocation (High Priority)
    try {
      const geoStatus = await Geolocation.requestPermissions();
      console.log('Geolocation status:', geoStatus.location);
    } catch (e) {
      console.warn('Geolocation permission denied or skipped');
    }

    // Small delay to ensure the first native dialog is completely gone
    await new Promise(resolve => setTimeout(resolve, 900));

    // PERMISSION 2: Trigger the push notification registration flow
    // This will wait until the Geolocation dialog is closed
    this.pushService.registerForPushNotification();
  }


  async changeLanguage() {
    const alert = await this.alertCtrl.create({
      header: 'Select Language',
      inputs: [
        { name: 'lang', type: 'radio', label: 'English', value: 'en', checked: true },
        { name: 'lang', type: 'radio', label: 'Deutsch', value: 'de' },
        // Add more as per your screenshots
      ],
      buttons: ['Cancel', 'Done']
    });
    await alert.present();
  }

  openPrivacy = async() => {
    await Browser.open({ url: 'https://your-weather-app.com/privacy' });
  }

  reportProblem = () => {
    const email = 'support@weathercast.com';
    const subject = 'WeatherCast App Issue';
    // Opens the native mail client
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  rateApp = () => {
    if (this.platform.is('ios')) {
      window.open('itms-apps://itunes.apple.com/app/your-app-id', '_system');
    } else {
      window.open('market://details?id=your.package.id', '_system');
    }
  }

  requestNotifications = () => {

  }


}
