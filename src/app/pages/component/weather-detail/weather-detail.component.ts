import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]

})
export class WeatherDetailComponent  implements OnInit {

  // @Input allows us to pass data INTO this component
  @Input() data: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("Modal received data:", this.data);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
