import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-home-provider',
  templateUrl: './home-provider.page.html',
  styleUrls: ['./home-provider.page.scss'],
})
export class HomeProviderPage implements OnInit {
  userDetail: any;
  appointmentByProviderData: any = [];
  changeStatusOpen: any = false;
  isAvailable: any = 'true';

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(this.userDetail)

    this.getAppointmentByProvider();
    this.getProfile();
  }

  getAppointmentByProvider() {
    this.common.showLoading();
    this.service.getAppointmentByProvider().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res?.data[0]._id);
          this.appointmentByProviderData = res.data;
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  myAppointmentsDetailsProvider(id: any) {
    this.navCtrl.navigateForward(['/tabs/my-appointments-details-provider'], {
      queryParams: { appointment_id: id },
    })
  }

  myAppointmentsProvider() {
    this.navCtrl.navigateForward(['/tabs/my-appointments-provider'])
  }

  updateProfile() {
    const data = new FormData();
    data.append('isAvailable', this.isAvailable);
    console.log(data)
    this.common.showLoading();
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.changeStatusOpen = false;
        }
        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  getProfile() {
    this.common.showLoading();
    this.service.getProfile().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res.data.isAvailable === true)
          if (res.data.isAvailable === true) {
            this.isAvailable = 'true';
          }
          if (res.data.isAvailable === false) {
            this.isAvailable = 'false';
          }
          localStorage.setItem('userDetail', JSON.stringify(res?.data))
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
