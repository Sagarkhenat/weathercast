import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonService,PushNotificationService } from 'src/providers/providers';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ErrorStateComponent {
  // Injecting the service to react to global error states
  public commonService = inject(CommonService);
  private pushService = inject(PushNotificationService);

  constructor() {}

  /**
   * Clears the error UI and re-triggers the registration flow
   *
   */
  async retry() {
    this.commonService.clearError(); // Sets errorStatus to false
    // Re-attempt the push registration that previously failed
    await this.pushService.registerForPushNotification();
  }
}
