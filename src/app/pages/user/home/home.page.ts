import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
declare var google: any;

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map', { static: false }) mapRef: ElementRef | any;
  map: GoogleMap | any;

  address: any = '';
  autocompleteItems: any;
  GoogleAutocomplete: any;
  GoogleGeocoder: any;
  showLocation: any = false;
  location: any = {};
  rating: any = 4;
  isAlertOpen: any = false;
  timeSlotOpen: any = false;
  payAmountOpen: any = true;

  payAmountModel: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    purposeOfVisitDescript: '',
  }
  submitted: any = false;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.GoogleGeocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.loandMap();
  }

  async loandMap() {
    console.log('AAA', this.mapRef?.nativeElement)
    if (this.mapRef?.nativeElement) {
      const apiKey: any = 'AIzaSyAobHm_nObzJpa_5fBCPhQ9036XI-87g5w';
      this.map = await GoogleMap.create({
        id: 'my-map', // Unique identifier
        element: this.mapRef.nativeElement,
        apiKey: apiKey,
        config: {
          center: {
            lat: 37.7749, // San Francisco
            lng: -122.4194,
            // lat: this.location.lat,
            // lng: this.location.lng,
          },
          zoom: 12,
        },
      });
    }
  }

  UpdateSearchResults(e: any) {
    console.log(e)
    if (this.address == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: e },
      (predictions: any, status: any) => {
        console.log(predictions)
        console.log(status)
        this.showLocation = true
        this.autocompleteItems = predictions;
        console.log("location========", this.autocompleteItems)
      });
  }

  async SelectSearchResult(e: any) {
    console.log(e)
    this.address = e.description
    this.showLocation = false
    this.GoogleGeocoder.geocode({ 'address': e.description }, (res: any) => {
      console.log(res)
      console.log(res[0].geometry.location.lat())
      this.location = {
        lat: res[0].geometry.location.lat(),
        lng: res[0].geometry.location.lng()
      };
      console.log(this.location)
    })
  }

  payAmount(payAmountForm: any) {
    this.payAmountOpen = false;
    setTimeout(() => {
      this.navCtrl.navigateForward(['/payment-success'])
    }, 1000);
    return
    if (payAmountForm.form.invalid) {
      this.submitted = true;
      return
    }
    return
    console.log(this.payAmountModel)
    const data = {
      username: this.payAmountModel.email,
      password: this.payAmountModel.password,
    }
    this.common.showLoading();
    this.service.login(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
        if (res?.status) {
          this.submitted = false
          this.common.presentToaster('You are successfully logged in')
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userDetail', JSON.stringify(res.data))
          this.navCtrl.navigateRoot(['/tabs/home'])
          this.payAmountModel = {
            fullName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            purposeOfVisitDescript: '',
          }
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
