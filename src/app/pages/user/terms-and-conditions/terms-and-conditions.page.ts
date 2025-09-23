import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {
  termsAndConditionsData: any;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getContent();
  }

  goBack() {
    this.navCtrl.back();
  }

  getContent() {
    this.common.showLoading();
    this.service.getContent().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res);
          this.termsAndConditionsData = res.data.termsAndConditions;
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
