import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import * as moment from 'moment';
// import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  standalone: false,
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.page.html',
  styleUrls: ['./my-appointments.page.scss'],
})
export class MyAppointmentsPage implements OnInit {
  appointmentByUserData: any = [];
  moment: any = moment;
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

    this.getAppointmentByUser();
    // this.statusBar();
  }

  // async statusBar() {
  //   await StatusBar.setStyle({ style: Style.Dark });
  // }


  myAppointmentsDetails(id: any) {
    this.navCtrl.navigateForward(['/tabs/my-appointments-details'], {
      queryParams: { appointment_id: id },
    })
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.currentdata.length === this.limit) {
      this.page = this.page + 1;
      this.getAppointmentByUser(event)
    } else {
      event.target.complete();
    }
  }

  getAppointmentByUser(event?: any) {
    if (!event) {
      this.common.showLoading();
    }

    const data = {
      userID: this.userDetail?._id,
      limit: this.limit,
      page: this.page,
    }

    this.service.getAppointmentByUser(data).subscribe(
      (res: any) => {
        if (event) {
          event.target.complete();
        } else {
          this.common.hideLoading();
        }
        if (res.status) {
          this.currentdata = res.data;
          this.appointmentByUserData = this.appointmentByUserData.concat(this.currentdata);
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
