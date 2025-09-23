import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-purpose-of-visit',
  templateUrl: './purpose-of-visit.page.html',
  styleUrls: ['./purpose-of-visit.page.scss'],
})
export class PurposeOfVisitPage implements OnInit {
  userDetail: any;
  appointmentIdData: any = {};
  appointmentId: any;

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
