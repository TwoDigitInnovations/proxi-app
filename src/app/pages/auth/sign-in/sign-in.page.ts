import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signinModel: any = {
    email: '',
    password: '',
  }
  submitted: any = false;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  login(signinForm: any) {
    // this.navCtrl.navigateForward(['/tabs/home'])
    // return
    if (signinForm.form.invalid) {
      this.submitted = true
      return
    }
    console.log(this.signinModel)
    const data = {
      email: this.signinModel.email,
      password: this.signinModel.password,
    }
    this.common.showLoading();
    this.service.login(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        // if (res?.status) {
        this.submitted = false
        this.common.presentToaster('You are successfully logged in')
        localStorage.setItem('token', res.token)
        localStorage.setItem('userDetail', JSON.stringify(res.user))
        if (res.user.role === 'user') {
          this.navCtrl.navigateRoot(['/tabs/home'])
        }
        if (res.user.role === 'provider') {
          this.navCtrl.navigateRoot(['/tabs/home-provider'])
        }

        this.signinModel = {
          email: '',
          password: '',
        }
      },
      // },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  termsAndConditionsPage() {
    this.navCtrl.navigateForward(['/tabs/terms-and-conditions'])
  }

  privacyPolicyPage() {
    this.navCtrl.navigateForward(['/tabs/privacy-policy'])
  }

  signUpPage() {
    this.navCtrl.navigateForward(['/sign-up'])
  }

  forgetPasswordPage() {
    this.navCtrl.navigateForward(['/forgot-password'])
  }
}
