import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-history-provider',
  templateUrl: './history-provider.page.html',
  styleUrls: ['./history-provider.page.scss'],
})
export class HistoryProviderPage implements OnInit {
  userDetail: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    console.log(this.userDetail)
  }
}
