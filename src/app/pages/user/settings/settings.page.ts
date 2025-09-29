import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(userDetail);

    const lng = localStorage.getItem('language');
    this.langSelected = lng || 'fr'
  }

  handleChange(lang: any) {
    console.log(lang)
    this.langSelected = lang
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  profilePage() {
    this.navCtrl.navigateForward(['/tabs/profile'])
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
