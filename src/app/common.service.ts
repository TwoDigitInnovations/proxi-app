import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, ToastController, } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  statusbarHeight: any = 0;
  Base_url = environment.url;
  token: any = '';
  duration: any = {
    distance: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  currency: any = "XOF";
  //  £
  constructor(
    public http: HttpClient,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private spinner: NgxSpinnerService,
    private routr: Router,
    private navCtrl: NavController,
    // private translate: TranslateService
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    console.log(error.status)
    if (error.status === 401) {
      console.log(error.status)
      this.presentToaster('Login required')
      this.logout()
      console.error('An error occurred:', error.error);
      console.log(error)
      // error.error.message = 'Login required'
    }
    if (error.status === 409) {

    }

    return throwError(() => error);
  }

  logout() {
    localStorage.removeItem('userDetail')
    localStorage.removeItem('userDetails')
    localStorage.removeItem('token')
    this.navCtrl.navigateRoot(['/sign-in'])
  }

  httpHeaders() {
    const token = localStorage.getItem('token');
    this.token = token ? token : '';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  post(u: any, data: any) {
    const url = this.Base_url + u;
    return this.http.post(url, data, { headers: this.httpHeaders() }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  put(u: any, data: any) {
    const url = this.Base_url + u;
    return this.http.put(url, data, { headers: this.httpHeaders() }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  delete(u: any, data?: any) {
    const url = this.Base_url + u;
    return this.http.delete(url, { headers: this.httpHeaders(), body: data }).pipe(tap((res: any) => {
    }), catchError(this.handleError.bind(this)));
  }

  get(u: any, data?: any) {
    const url = this.Base_url + u;
    return this.http.get(url, { headers: this.httpHeaders(), params: data, }).pipe(catchError(this.handleError));
  }

  getwithblob(u: any, data?: any) {
    const url = this.Base_url + u;
    return this.http.get(url, { headers: this.httpHeaders(), params: data, responseType: 'blob', observe: 'response', }).pipe(catchError(this.handleError));
  }

  async presentToaster(message: any, position?: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
    });

    await toast.present();
  }

  async showLoading(msg: string = 'Please wait...') {
    this.spinner.show();
  }

  async hideLoading() {
    this.spinner.hide();
  }

  // async returnTranslate(type: any) {
  //   console.log(type)
  //   const lng = localStorage.getItem('transLang')
  //   this.translate.use(lng || 'fr');
  //   const d = await this.translate.get(type).toPromise()
  //   console.log(d)
  //   return d
  // }

  timeSince(date: Date) {
    const diff = new Date().valueOf() - date.valueOf();
    const seconds: any = Math.floor(diff / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' Years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Months' : ' Month') +
        ' ago'
      );
    }
    interval = seconds / 604800;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Weeks' : ' Week') +
        ' ago'
      );
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Days' : ' Day') +
        ' ago'
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Hours' : ' Hour') +
        ' ago'
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) > 1 ? ' Min' : ' min') +
        ' ago'
      );
    }
    return 'Just now';
  }

  countDown(date: any) {
    this.duration = {
      distance: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    var countDownDate = new Date(date).getTime();
    var now = new Date().getTime();
    this.duration.distance = countDownDate - now;
    this.duration.days = Math.floor(
      this.duration.distance / (1000 * 60 * 60 * 24)
    );
    this.duration.hours = Math.floor(
      (this.duration.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.duration.minutes = Math.floor(
      (this.duration.distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.duration.seconds = Math.floor(
      (this.duration.distance % (1000 * 60)) / 1000
    );
    if (this.duration.distance < 0) {
      // clearInterval(x);
      return;
    }
    if (this.duration.days > 0) {
      return `${this.duration.days} day(s) left`;
    }
    if (this.duration.hours > 0) {
      return `${this.duration.hours} hour(s) left`;
    }
    if (this.duration.minutes > 0) {
      return `${this.duration.minutes} minute(s) left`;
    }
    if (this.duration.seconds > 0) {
      return `${this.duration.seconds} second(s) left`;
    } else {
      return;
    }
  }
}
