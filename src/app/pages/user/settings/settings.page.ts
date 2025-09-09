import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';

@Component({
  standalone: false,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
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
    this.navCtrl.navigateForward(['/tabs/profile'])
  }

  termsAndConditionsPage() {
    this.navCtrl.navigateForward(['/tabs/terms-and-conditions'])
  }

  privacyPolicyPage() {
    this.navCtrl.navigateForward(['/tabs/privacy-policy'])
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
