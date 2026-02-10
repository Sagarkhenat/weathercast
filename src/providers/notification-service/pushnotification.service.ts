import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { CommonService} from '../providers';

import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private commonService: CommonService) { }

  async registerForPushNotification() {


    try {

      // Check if we are NOT on the web
      if (Capacitor.getPlatform() !== 'web') {

        let permStatus = await PushNotifications.checkPermissions();

        console.log('Permission status OP for notification is ::::', permStatus);

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }else{

        }

        if (permStatus.receive !== 'granted') {
          console.log('User has denied permission for sending push notification');
          return;
        }else{

        }

        // Only if granted, proceed to register hardware
        await PushNotifications.register();
        this.addNotificationListeners();

      }else{
        console.log('Push notification feature not yet added on web code.');
      }



    }catch(error: any){
      // Triggers the 'Error State' logic by setting errorStatus to true
      // message: User-friendly alert
      // technicalDetails: The error for debugging
      // persistent: true (Locks the UI in Error State until 'Retry' is clicked)
      this.commonService.handleError('Push Notification Setup Failed', error.message || error, true );
    }

    }

    private addNotificationListeners() {

      // Get the FCM token to send to your backend
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success for weather cast, token value is: ' + token.value);
      });

      // Handle incoming notifications while app is open
      PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push received show to the user :: ', notification, notification.title);

        // Optional: Trigger your existing Error State logic or a Toast
        // to show a weather alert even if the OS doesn't show a banner
        this.commonService.handleError(`Alert: ${notification.title}`, notification.body,false);

      });
    }
}
