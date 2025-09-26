import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private common: CommonService,
    private http: HttpClient,
  ) { }

  login(data: any) {
    const url = `${environment.url}auth/login`;
    return this.http.post(url, data);
  }

  register(data: any) {
    const url = `${environment.url}auth/register`;
    return this.http.post(url, data);
  }

  sendOTPForSignUp(data: any) {
    const url = `${environment.url}sendOTPForSignUp`;
    return this.http.post(url, data);
  }

  sendOTP(data: any) {
    const url = `${environment.url}auth/sendOTP`;
    return this.http.post(url, data);
  }


  // sentOtp(data: any) {
  //   const url = `${environment.url}sentOtp`;
  //   return this.http.post(url, data);
  // }

  verifyOTP(data: any) {
    const url = `${environment.url}auth/verifyOTP`;
    return this.http.post(url, data);
  }

  changePassword(data: any) {
    const url = `${environment.url}auth/changePassword`;
    return this.http.post(url, data);
  }

  fileupload(data: any) {
    const url = `auth/user/fileupload`;
    return this.common.post(url, data);
  }

  getProfile() {
    const url = `auth/getProfile`;
    return this.common.get(url,);
  }

  updateProfile(data: any) {
    const url = `auth/updateProfile`;
    return this.common.post(url, data);
  }

  getCategory() {
    const url = `category/getCategory`;
    return this.common.get(url,);
  }

  nearMeServicebyCategory(data: any) {
    const url = `service/nearMeServicebyCategory`;
    return this.common.post(url, data);
  }

  createAppointment(data: any) {
    const url = `appointment/createAppointment`;
    return this.common.post(url, data);
  }

  getRequestAppointmentById(id: any) {
    const url = `appointment/getRequestAppointmentById/${id}`;
    return this.common.get(url);
  }

  // getAppointmentByUser() {
  //   const url = `appointment/getAppointmentByUser`;
  //   return this.common.get(url,);
  // }

  getAppointmentByUser(data?: any) {
    let d = new HttpParams();
    if (data) {
      d = d.append('limit', data?.limit);
      d = d.append('page', data?.page);
    }

    const url = `appointment/getAppointmentByUser`;
    return this.common.get(url, d);
  }

  // getAppointmentByProvider() {
  //   const url = `appointment/getAppointmentByProvider`;
  //   return this.common.get(url,);
  // }

  getAppointmentByProvider(data?: any) {
    let d = new HttpParams();
    if (data) {
      d = d.append('limit', data?.limit);
      d = d.append('page', data?.page);
    }

    const url = `appointment/getAppointmentByProvider`;
    return this.common.get(url, d);
  }

  getRequestAppointmentByProviderId(id: any) {
    const url = `appointment/getRequestAppointmentByProviderId/${id}`;
    return this.common.get(url);
  }

  updateAppointmentStatusByProvider(data: any) {
    const url = `appointment/updateAppointmentStatusByProvider`;
    return this.common.post(url, data);
  }

  getContent() {
    const url = `content/getContent`;
    return this.common.get(url,);
  }

  // getHistoryByUserId(id: any) {
  //   const url = `appointment/getHistoryByUserId/${id}`;
  //   return this.common.get(url);
  // }

  getHistoryByUserId(id: any, data?: any) {
    let d = new HttpParams();
    if (data) {
      d = d.append('limit', data?.limit);
      d = d.append('page', data?.page);
    }

    const url = `appointment/getHistoryByUserId/${id}`;
    return this.common.get(url, d);
  }

  // getHistoryByProviderId(id: any) {
  //   const url = `appointment/getHistoryByProviderId/${id}`;
  //   return this.common.get(url);
  // }

  getHistoryByProviderId(id: any, data?: any) {
    let d = new HttpParams();
    if (data) {
      d = d.append('limit', data?.limit);
      d = d.append('page', data?.page);
    }

    const url = `appointment/getHistoryByProviderId/${id}`;
    return this.common.get(url, d);
  }

  createService(data: any) {
    const url = `service/createService`;
    return this.common.post(url, data);
  }

  getService() {
    const url = `service/getService`;
    return this.common.get(url,);
  }

  updateService(data: any) {
    const url = `service/updateService`;
    return this.common.post(url, data);
  }

  getVisitorsStatus() {
    const url = `appointment/getVisitorsStatus`;
    return this.common.get(url,);
  }
}
