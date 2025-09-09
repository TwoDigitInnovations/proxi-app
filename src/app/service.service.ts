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

  // getProperty(data?: any) {
  //   let d = new HttpParams();
  //   if (data) {
  //     // d = d.append('limit', data?.limit);
  //     d = d.append('page', data?.page);
  //   }

  //   const url = `getProperty`;
  //   return this.common.get(url, d);
  // }

  // getPropertyById(id: any) {
  //   const url = `getPropertyById/${id}`;
  //   return this.common.get(url);
  // }

  // getProfile() {
  //   const url = `getProfile`;
  //   return this.common.get(url);
  // }

  // getreviewbyid(id: any) {
  //   const url = `getreviewbyid/${id}`;
  //   return this.common.get(url);
  // }

  // getPropertyBysearchQuery(query: any) {
  //   const url = `getPropertyBysearchQuery?${query}`;
  //   return this.common.get(url);
  // }

  // createReview(data: any) {
  //   const url = `createReview`;
  //   return this.common.post(url, data);
  // }

  // upcommingBooking(id: any) {
  //   const url = `upcommingBooking/${id}`;
  //   return this.common.get(url);
  // }

  // updateBookingById(data: any, id: any) {
  //   const url = `updateBookingById/${id}`;
  //   return this.common.post(url, data);
  // }

  // thread() {
  //   const url = `thread`;
  //   return this.common.get(url);
  // }

  // threadsIdMessages(id: any) {
  //   const url = `threads/${id}/messages`;
  //   return this.common.get(url);
  // }

  // bookingIdThread(data: any, id: any) {
  //   const url = `booking/${id}/thread`;
  //   return this.common.post(url, data);
  // }

  // createPropertyBooking(data: any) {
  //   const url = `createPropertyBooking`;
  //   return this.common.post(url, data);
  // }

  // getNotifications(id: any) {
  //   const url = `detail/${id}`;
  //   return this.common.get(url);
  // }

  // clearAllNotifications(data: any) {
  //   const url = `clear-all-notifications`;
  //   return this.common.post(url, data);
  // }

  // deleteNotification(data: any) {
  //   const url = `delete-notification`;
  //   return this.common.post(url, data);
  // }

  // updateProfile(data: any) {
  //   const url = `updateProfile`;
  //   return this.common.post(url, data);
  // }

  // fileupload(data: any) {
  //   const url = `user/fileupload`;
  //   return this.common.post(url, data);
  // }

  // createReport(data: any) {
  //   const url = `createReport`;
  //   return this.common.post(url, data);
  // }

  // getBookingByUserId(id: any) {
  //   const url = `getBookingByUserId/${id}`;
  //   return this.common.get(url);
  // }

  // createGetIntouch(data: any) {
  //   const url = `createGetIntouch`;
  //   return this.common.post(url, data);
  // }

  // getNegotiateByUserIdTanant(id: any) {
  //   const url = `getNegotiateByUserIdTanant/${id}`;
  //   return this.common.get(url);
  // }

  // createNegotiate(data: any) {
  //   const url = `createNegotiate`;
  //   return this.common.post(url, data);
  // }

  // respondNegotiate(data: any) {
  //   const url = `respondNegotiate`;
  //   return this.common.post(url, data);
  // }

  // getPropertyByUserId(id: any, data?: any) {
  //   let d = new HttpParams();
  //   if (data) {
  //     // d = d.append('limit', data?.limit);
  //     d = d.append('page', data?.page);
  //   }
  //   const url = `getPropertyByUserId/${id}`;
  //   return this.common.get(url, d);
  // }

  // getBySlugAndDelete(id: any) {
  //   const url = `getBySlugAndDelete/${id}`;
  //   return this.common.delete(url);
  // }

  // getBySlugAndUpdate(id: any) {
  //   const url = `getBySlugAndUpdate/${id}`;
  //   return this.common.get(url);
  // }

  // createProperty(data: any) {
  //   const url = `createProperty`;
  //   return this.common.post(url, data);
  // }

  // updateProperty(data: any, id: any) {
  //   const url = `updateProperty/${id}`;
  //   return this.common.put(url, data);
  // }

  // getNegotiateByProprtyId(id: any) {
  //   const url = `getNegotiateByProprtyId/${id}`;
  //   return this.common.get(url);
  // }

  // getBookingProperty(id: any) {
  //   const url = `getBookingProperty/${id}`;
  //   return this.common.get(url);
  // }

  // getHistory(id: any) {
  //   const url = `getHistory/${id}`;
  //   return this.common.get(url);
  // }

  // getAllReport() {
  //   const url = `getAllReport`;
  //   return this.common.get(url);
  // }

  // resolveReportId(data: any, id: any) {
  //   const url = `resolveReportId/${id}`;
  //   return this.common.post(url, data);
  // }

  // getReportById(id: any) {
  //   const url = `getReportById/${id}`;
  //   return this.common.get(url);
  // }

  // getDocument(id: any) {
  //   const url = `getAgreementDocument/${id}`;
  //   return this.common.get(url);
  // }

  // getReportByBookId(id: any) {
  //   const url = `getReportByBookId/${id}`;
  //   return this.common.get(url);
  // }

  // getNegotiateByUpdateStatusTanant(id: any) {
  //   const url = `getNegotiateByUpdateStatusTanant/${id}`;
  //   return this.common.get(url);
  // }

  // getNegotiateById(id: any) {
  //   const url = `getNegotiateById/${id}`;
  //   return this.common.get(url);
  // }

  // getPropertyRequest(id: any) {
  //   const url = `getPropertyRequest/${id}`;
  //   return this.common.get(url);
  // }

  // getPaymentByBookingId(id: any) {
  //   const url = `getPaymentByBookingId/${id}`;
  //   return this.common.get(url);
  // }

  // updateStatusByPayment(data: any, id: any) {
  //   const url = `updateStatusByPayment/${id}`;
  //   return this.common.post(url, data);
  // }

  // downloadPdfEnglish(id: any) {
  //   const url = `downloadBillPdf/${id}`;
  //   return this.common.getwithblob(url);
  // }

  // downloadPdfFrench(id: any) {
  //   const url = `downloadBillPdfFrench/${id}`;
  //   return this.common.getwithblob(url);
  // }

  // createWalletRequest(data: any) {
  //   const url = `createWalletRequest`;
  //   return this.common.post(url, data);
  // }

  // getWalletRequest() {
  //   const url = `getWalletRequest`;
  //   return this.common.get(url);
  // }

  // getTransaction(data?: any) {
  //   let d = new HttpParams();
  //   if (data) {
  //     d = d.append('page', data?.page);
  //     d = d.append('limit', data?.limit);
  //   }

  //   const url = `getTransaction`;
  //   return this.common.get(url, d);
  // }
}
