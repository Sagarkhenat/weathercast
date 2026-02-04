/*--------------------Ionic components---------------*/
import { Injectable, Injector } from '@angular/core';
import { AlertController,ToastController,LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  //Used to store loader
  public loader: any;
  //To check android platform
  public isAndroid: boolean = false;
  //Used to check confirmation popup is open or not
  public isOpen : boolean = false;
  //Check wheather loader is present or not
  public isLoading : boolean = false;

  //Used to store popup title, buttons text, messages translated string
  private cancelBtnText: string = "";
  private okBtnText: string = "";

  constructor(  private toastCtrl: ToastController,private alertCtrl: AlertController, private loadingCtrl: LoadingController){

  }

  /**
   * Function to show confirm pop up
   * @param: title
   * @param: error message
  */

  /**
   * Function to check if loader undefined or not
   */
  isLoaderUndefined(): boolean {
      return ( this.loader == null || this.loader == undefined );
  }

  /**
   * Function to show loader
   * @param: message
  */

  public showLoading = (message?:any) => {
    if ( this.isLoaderUndefined() ) {
      this.loader = this.loadingCtrl.create({
                message: 'Loading data',
                duration: 10000,
                spinner:"dots"
      }).then((loadingElement) => {
            this.loader = loadingElement;
            this.isLoading = true;
            this.loader.present();
      });
    }else{
      this.isLoading = false;
      this.loader = undefined;
    }
  }

  /**
  * Function to hide loader
  */
  public hideLoading = () => {
      let myThis = this;
      try {
          console.log('Inside hide loading function for this.loader value::', this.loader);
          if ( !this.isLoaderUndefined() ) {
              myThis.loader.dismiss().catch(() => console.log( 'ERROR CATCH: LoadingController dismiss' ) );
          }
          this.isLoading = false;
          this.loader = undefined;
      } catch ( e ) {
          console.log('Inside catch block for hide loading function :::', this.loader);
          this.isLoading = false;
          this.loader = undefined;
      }
  }

  /**
     * Function to check is loader on or not
  */
  public isLoadingOn = () =>{
      return this.isLoading;
  }

}
