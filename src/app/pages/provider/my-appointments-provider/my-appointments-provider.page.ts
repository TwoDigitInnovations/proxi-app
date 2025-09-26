import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-my-appointments-provider',
  templateUrl: './my-appointments-provider.page.html',
  styleUrls: ['./my-appointments-provider.page.scss'],
})
export class MyAppointmentsProviderPage implements OnInit {
  appointmentByProviderData: any = [];
  userDetail: any;

  currentdata: any = [];
  limit: any = 10;
  page: any = 1;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(this.userDetail)

    this.getAppointmentByProvider();
  }

  myAppointmentsDetailsProvider(id: any) {
    this.navCtrl.navigateForward(['/tabs/my-appointments-details-provider'], {
      queryParams: { appointment_id: id },
    })
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.currentdata.length === this.limit) {
      this.page = this.page + 1;
      this.getAppointmentByProvider(event)
    } else {
      event.target.complete();
    }
  }

  getAppointmentByProvider(event?: any) {
    if (!event) {
      this.common.showLoading();
    }

    const data = {
      userID: this.userDetail?._id,
      limit: this.limit,
      page: this.page,
    }

    this.service.getAppointmentByProvider(data).subscribe(
      (res: any) => {
        if (event) {
          event.target.complete();
        } else {
          this.common.hideLoading();
        }
        if (res.status) {
          // console.log(res?.data[0]._id);
          this.currentdata = res.data;
          this.appointmentByProviderData = this.appointmentByProviderData.concat(this.currentdata);
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
