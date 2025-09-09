import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpModel: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    // otp: '',
  }
  submitted: any = false;
  otpShow: any = false;
  token: any;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  termsAndConditionsPage() {
    this.navCtrl.navigateForward(['/tabs/terms-and-conditions'])
  }

  privacyPolicyPage() {
    this.navCtrl.navigateForward(['/tabs/privacy-policy'])
  }

  signInPage() {
    this.navCtrl.navigateForward(['/sign-in'])
  }

  validationForm(signUpForm: any) {
    if (signUpForm.form.invalid) {
      this.submitted = true
      return
    }
    this.signUp();
    // if (this.otpShow) {
    //   this.signUp();
    // } else {
    //   this.sendOTPForSignUp();
    // }
  }

  signUp() {
    console.log(this.signUpModel)
    const data = {
      name: this.signUpModel.fullName,
      email: this.signUpModel.email,
      phone: this.signUpModel.phoneNumber,
      password: this.signUpModel.password,
      role: 'user',
      // role: 'admin',
    }
    console.log(data)
    this.common.showLoading();
    this.service.register(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        // if (res.success) {
        this.submitted = false
        this.common.presentToaster('Congratulations! Your sign-up process was successful.')
        this.navCtrl.navigateRoot(['/sign-in'])
        this.signUpModel = {
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
        }
      },
      // },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.statusText);
      }
    );
  }

  sendOTPForSignUp() {
    console.log(this.signUpModel)
    const data = {
      phone: this.signUpModel.phoneNumber,
      email: this.signUpModel.email,
      type: 'signup',
    }
    this.common.showLoading();
    this.service.sendOTPForSignUp(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        if (res.success) {
          this.otpShow = true
          this.submitted = false
          this.common.presentToaster(res?.message)
          this.token = res.data.token
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
