import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import * as moment from 'moment';

@Component({
  standalone: false,
  selector: 'app-history-provider',
  templateUrl: './history-provider.page.html',
  styleUrls: ['./history-provider.page.scss'],
})
export class HistoryProviderPage implements OnInit {
  userDetail: any;
  historyData: any = [];
  moment: any = moment;

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
    console.log(this.userDetail);

    if (this.userDetail?._id) {
      this.getHistoryByProviderId();
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.currentdata.length === this.limit) {
      this.page = this.page + 1;
      this.getHistoryByProviderId(event)
    } else {
      event.target.complete();
    }
  }

  getHistoryByProviderId(event?: any) {
    if (!event) {
      this.common.showLoading();
    }

    const data = {
      userID: this.userDetail?._id,
      limit: this.limit,
      page: this.page,
    }

    this.service.getHistoryByProviderId(this.userDetail?._id, data).subscribe(
      (res: any) => {
        if (event) {
          event.target.complete();
        } else {
          this.common.hideLoading();
        }
        console.log(res);
        this.currentdata = res.data;
        this.historyData = this.historyData.concat(this.currentdata);
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
