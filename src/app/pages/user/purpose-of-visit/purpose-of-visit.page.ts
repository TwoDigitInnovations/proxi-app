import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-purpose-of-visit',
  templateUrl: './purpose-of-visit.page.html',
  styleUrls: ['./purpose-of-visit.page.scss'],
})
export class PurposeOfVisitPage implements OnInit {
  purposeOfVisitModel: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    purposeOfVisitDescript: '',
  }
  submitted: any = false;
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
  }

  goBack() {
    this.navCtrl.back();
  }

  submit(purposeOfVisitForm: any) {
    if (purposeOfVisitForm.form.invalid) {
      this.submitted = true;
      return
    }
    return
    console.log(this.purposeOfVisitModel)
    const data = {
      username: this.purposeOfVisitModel.email,
      password: this.purposeOfVisitModel.password,
    }
    this.common.showLoading();
    this.service.login(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        if (res?.status) {
          this.submitted = false
          this.common.presentToaster('You are successfully logged in')
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userDetail', JSON.stringify(res.data))
          this.navCtrl.navigateRoot(['/tabs/home'])
          this.purposeOfVisitModel = {
            fullName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            purposeOfVisitDescript: '',
          }
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
