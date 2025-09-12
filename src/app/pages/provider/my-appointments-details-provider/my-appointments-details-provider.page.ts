import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-my-appointments-details-provider',
  templateUrl: './my-appointments-details-provider.page.html',
  styleUrls: ['./my-appointments-details-provider.page.scss'],
})
export class MyAppointmentsDetailsProviderPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
}
