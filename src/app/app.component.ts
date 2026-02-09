import { Component, CUSTOM_ELEMENTS_SCHEMA , inject } from '@angular/core';
import { MainPage } from '../app/pages/pages';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { OfflineService } from 'src/providers/providers';

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

  constructor() {

    //this.rootPage = MainPage;
    //console.log('this.rootPage value is :::', this.rootPage);
  }
}
