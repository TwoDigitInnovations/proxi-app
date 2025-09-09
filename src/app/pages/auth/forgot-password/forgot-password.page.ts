import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordModel: any = {
    email: '',
  };
  submitted: any = false;
  step: any = 1;
  otp: any;
  token: any;
  password: any;
  confirmPassword: any;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  loginData(forgotPasswordForm: any) {
    if (forgotPasswordForm?.form?.invalid) {
      this.submitted = true;
      return;
    }
    // if (this.forgotPasswordModel?.phone.toString().length !== 10) {
    //   console.log('invaild');
    //   this.common.presentToaster('Invalid your phone number');
    //   return;
    // }
    if (this.step === 1) {
      this.sendOTP()
    } if (this.step === 2) {
      this.verifyOTP()
    } if (this.step === 3) {
      this.changePassword()
    }
  }

  sendOTP() {
    console.log(this.forgotPasswordModel)
    const data = {
      email: this.forgotPasswordModel.email,
    }
    this.common.showLoading();
    this.service.sendOTP(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        this.submitted = false
        this.common.presentToaster(res?.data?.message)
        this.step = 2;
        this.token = res?.data?.token
        this.forgotPasswordModel = {
          email: '',
        }
        this.submitted = false;
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  verifyOTP() {
    const data = {
      otp: this.otp,
      token: this.token
    }
    this.common.showLoading();
    this.service.verifyOTP(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        this.submitted = false
        this.common.presentToaster(res?.data?.message)
        this.otp = '';
        this.step = 3;
        this.token = res?.data?.token
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  changePassword() {
    if (this.password !== this.confirmPassword) {
      console.log('invaild');
      this.common.presentToaster("Comfirm password don't match with password");
      return;
    }

    const data = {
      password: this.password,
      token: this.token
    }
    this.common.showLoading();
    this.service.changePassword(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        this.submitted = false
        this.common.presentToaster(res?.data?.message);
        this.password = '';
        this.confirmPassword = '';
        this.step = 1
        this.navCtrl.navigateForward(['/sign-in']);
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

}
