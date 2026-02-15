import { Injectable, signal, OnDestroy } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class OfflineService implements OnDestroy {
  //Defining a Signal for reactive state (easier than BehaviorSubject)

  public isOnline = signal<boolean>(true);
  private listenerHandle: any;

  constructor(private platform: Platform) {
    this.initNetworkListener();
  }

  async initNetworkListener() {

    // Get initial status on startup
    const status = await Network.getStatus();
    this.updateStatus(status);

    //Listen for changes
    this.listenerHandle = await Network.addListener('networkStatusChange', (status) => {
      this.updateStatus(status);
    });
  }

  private updateStatus = (status: ConnectionStatus) => {
    // Update the signal value
    this.isOnline.set(status.connected);
    console.log('Network status:', status.connected ? 'Online' : 'Offline');
  }

  // Cleanup listener when service is destroyed (rare for singletons, but good practice)
  ngOnDestroy = () =>{
    if (this.listenerHandle) {
      this.listenerHandle.remove();
    }else{

    }
  }
}
