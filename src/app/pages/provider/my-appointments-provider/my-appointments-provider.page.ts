import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-my-appointments-provider',
  templateUrl: './my-appointments-provider.page.html',
  styleUrls: ['./my-appointments-provider.page.scss'],
})
export class MyAppointmentsProviderPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  appointmentsDetails() {
    this.navCtrl.navigateForward(['/tabs/my-appointments-details-provider'])
  }
}
