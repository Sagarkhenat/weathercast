import { Component, CUSTOM_ELEMENTS_SCHEMA , inject, Renderer2 } from '@angular/core';
import { OfflineService } from 'src/providers/providers';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { IonApp, IonRouterOutlet,Platform , MenuController, NavController, AlertController,
        IonMenu,IonHeader,IonToolbar,IonTitle,
        IonMenuToggle,IonContent,IonItem,IonIcon,
        IonLabel,IonToggle,IonListHeader,} from '@ionic/angular/standalone';

import { Browser } from '@capacitor/browser'; // For Privacy Policy
import { PushNotificationService, UnitStateService, WeatherService } from 'src/providers/providers';

import { addIcons } from 'ionicons';
import {moon, sunnyOutline,notificationsOutline,
        mapOutline,globeOutline,shieldCheckmarkOutline,
        chatbubbleOutline, starOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp,IonRouterOutlet,CommonModule,AsyncPipe,
          IonMenu,IonHeader,IonToolbar,IonTitle,
        IonContent,IonItem,IonIcon,IonLabel,IonToggle,
        IonMenuToggle,IonListHeader,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class MyApp {

  // Add this line here
  selectedLanguage: string = 'en';

  notificationsEnabled: boolean = false;

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
    private alertCtrl: AlertController,
    public weatherService: WeatherService,
  private router: Router) {

      // Register the icons so <ion-icon> can use them
      addIcons({ moon, sunnyOutline,
        notificationsOutline, mapOutline,
        globeOutline,shieldCheckmarkOutline,
        chatbubbleOutline, starOutline,homeOutline });
  }

  async ngOnInit() {
    this.initializeApp();

    // Load the saved preference on startup
    this.notificationsEnabled = await this.pushService.getNotificationState()

    // If it was previously enabled, re-run registration to ensure listeners are active
    if (this.notificationsEnabled) {
      await this.pushService.registerForPushNotification();
    }else{

    }

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
    // Previously app was asking for notification permission at startup
    //this.pushService.registerForPushNotification();
  }


  async changeLanguage() {
    const alert = await this.alertCtrl.create({
      header: 'Select Language',
      cssClass: 'weather-custom-alert', // This is our custom hook
      inputs: [
        { type: 'radio', label: 'English', value: 'en', checked: this.selectedLanguage === 'en' },
        { type: 'radio', label: 'Deutsch', value: 'de', checked: this.selectedLanguage === 'de' },
        { type: 'radio', label: 'Français', value: 'fr', checked: this.selectedLanguage === 'fr' },
        { type: 'radio', label: 'Italiano', value: 'it', checked: this.selectedLanguage === 'it' }
      ],
      buttons: [
        { text: 'CANCEL', role: 'cancel', cssClass: 'alert-button-cancel' },
        {
          text: 'DONE',
          handler: (data) => {

            console.log('Selected language output :::', data);
            this.selectedLanguage = data;

          }
        }
      ]
    });
    await alert.present();
  }

  openPrivacy = async() => {
    this.router.navigate(['/privacy-policy']);
  }

  openWeatherRadar = async() => {
    this.router.navigate(['/weather-radar']);
  }

  reportProblem = () => {
    const email = 'support@weathercast.com';
    const subject = 'WeatherCast App Issue';
    // Opens the native mail client
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  rateApp = () => {
    window.open('market://details?id=com.weathercast.app', '_system');
  }

  requestNotifications = () => {

  }

  async toggleNotifications(event: any) {
    const isChecked = event.detail.checked;

    // Save the new state to storage
    await this.pushService.setNotificationState(isChecked);

    if (isChecked) {
      // Use your existing service to handle permissions and registration
      await this.pushService.registerForPushNotification();

    }else{

      // The user wants to toggle off
      await this.pushService.unregisterFromPushNotification();
      console.log('PushNotifications disabled by user');
    }
  }


  async showPermissionDeniedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Permission Required',
      message: 'To receive weather updates, please enable notifications in your device settings.',
      buttons: ['OK']
    });
    await alert.present();
  }



}
