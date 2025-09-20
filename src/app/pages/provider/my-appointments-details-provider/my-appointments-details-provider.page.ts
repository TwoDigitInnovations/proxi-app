import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-my-appointments-details-provider',
  templateUrl: './my-appointments-details-provider.page.html',
  styleUrls: ['./my-appointments-details-provider.page.scss'],
})
export class MyAppointmentsDetailsProviderPage implements OnInit {
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
        this.getRequestAppointmentByProviderId()
      }
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  getRequestAppointmentByProviderId() {
    this.common.showLoading();
    this.service.getRequestAppointmentByProviderId(this.appointmentId).subscribe(
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

  updateAppointmentStatusByProvider() {
    const data = {
      status: 'Completed',
      id: this.appointmentIdData?._id
    }
    console.log(data)
    // return
    this.common.showLoading();
    this.service.updateAppointmentStatusByProvider(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        if (res?.status) {
          this.common.presentToaster('Status updated successfully')
          this.appointmentIdData.status = 'Completed'
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }
}
