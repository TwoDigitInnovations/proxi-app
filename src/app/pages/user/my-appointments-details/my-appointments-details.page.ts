import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-my-appointments-details',
  templateUrl: './my-appointments-details.page.html',
  styleUrls: ['./my-appointments-details.page.scss'],
})
export class MyAppointmentsDetailsPage implements OnInit {
  appointmentId: any;
  appointmentIdData: any = {};
  userDetail: any;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params)
      this.appointmentId = params.appointment_id;
      if (this.appointmentId) {
        this.getRequestAppointmentById()
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(this.userDetail)
  }

  goBack() {
    this.navCtrl.back();
  }

  purposeOfVisit() {
    // this.navCtrl.navigateForward(['/tabs/purpose-of-visit'])
    this.navCtrl.navigateForward(['/tabs/purpose-of-visit'], {
      queryParams: { appointment_id: this.appointmentId },
    })
  }

  getRequestAppointmentById() {
    this.common.showLoading();
    this.service.getRequestAppointmentById(this.appointmentId).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.appointmentIdData = res.data;
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }
}
