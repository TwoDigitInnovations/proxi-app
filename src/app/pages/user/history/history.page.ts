import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import * as moment from 'moment';

@Component({
  standalone: false,
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userDetail: any;
  historyData: any = [];
  moment: any = moment;

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

    if (this.userDetail?.id) {
      this.getHistoryByUserId()
    }
  }

  getHistoryByUserId() {
    this.common.showLoading();
    this.service.getHistoryByUserId(this.userDetail?.id).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        this.historyData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }
}
