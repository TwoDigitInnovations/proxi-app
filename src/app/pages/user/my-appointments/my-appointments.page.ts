import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  getAppointmentByUser() {
    this.common.showLoading();
    this.service.getAppointmentByUser().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res?.data[0]._id);
          this.appointmentByUserData = res.data;
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
