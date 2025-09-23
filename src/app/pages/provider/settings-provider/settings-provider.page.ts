import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-settings-provider',
  templateUrl: './settings-provider.page.html',
  styleUrls: ['./settings-provider.page.scss'],
})
export class SettingsProviderPage implements OnInit {
  userDetail: any;
  openalert = false;
  deleteAccountpopup = false;
  langSelected: any;

  alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => { this.openalert = false }

    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => { this.SignOut() }
    },
  ];

  alertButtonss = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => { this.openalert = false }
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => { this.SignOut() }
    },
  ];

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(userDetail)
  }

  handleChange(lang: any) {
    this.langSelected = lang
    // this.translate.use(lang);
    console.log(lang)
    localStorage.setItem('transLang', lang);
  }

  profilePage() {
    this.navCtrl.navigateForward(['/tabs/profile-provider'])
  }

  myServicePage() {
    this.navCtrl.navigateForward(['/tabs/my-service-provider'])
  }

  termsAndConditionsPage() {
    this.navCtrl.navigateForward(['/terms-and-conditions'])
  }

  privacyPolicyPage() {
    this.navCtrl.navigateForward(['/privacy-policy'])
  }

  logOut() {
    this.openalert = true;
  }

  deleteAccount() {
    this.deleteAccountpopup = true;
  }

  SignOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetail')
    this.navCtrl.navigateRoot(['/sign-in']);
  }
}
