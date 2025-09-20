import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAppointmentByProvider();
  }

  myAppointmentsDetailsProvider(id: any) {
    this.navCtrl.navigateForward(['/tabs/my-appointments-details-provider'], {
      queryParams: { appointment_id: id },
    })
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
}
