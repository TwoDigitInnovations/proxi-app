import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  appointmentId: any;
  appointmentIdData: any = {};

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

  goToHome() {
    this.navCtrl.navigateForward(['/tabs/home'])
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
