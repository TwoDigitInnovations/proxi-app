import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-my-appointments-details',
  templateUrl: './my-appointments-details.page.html',
  styleUrls: ['./my-appointments-details.page.scss'],
})
export class MyAppointmentsDetailsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  purposeOfVisit() {
    this.navCtrl.navigateForward(['/tabs/purpose-of-visit'])
  }
}
