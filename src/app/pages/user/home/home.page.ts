import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { environment } from 'src/environments/environment.prod';
declare var google: any;
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import * as moment from 'moment';

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
  payAmountOpen: any = false;

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

  categoryData: any = [];

  dateList = [
    moment(new Date()).format('DD/MM/YYYY'),
    moment(new Date(new Date().setDate(new Date().getDate() + 1))).format('DD/MM/YYYY'),
    moment(new Date(new Date().setDate(new Date().getDate() + 2))).format('DD/MM/YYYY'),
    moment(new Date(new Date().setDate(new Date().getDate() + 3))).format('DD/MM/YYYY'),
  ]
  moment: any = moment;
  selectedDate: any = moment(new Date()).format('DD/MM/YYYY');
  nearMeServicebyCategoryData: any = [];
  selectedService: any = {}
  selectedTime: any;

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

  ionViewWillEnter() {

    // this.requestAndGet();
    const d = this.getLocation().then((res) => {
      console.log(res)
      this.location = res;
      console.log(this.location);
      if (this.location) {
        setTimeout(async () => {
          await this.loandMap(this.location);
        }, 1000);
      }
    });
    console.log(d)

    // setTimeout(async () => {
    //   await this.loandMap();
    // }, 1000);
  }

  // async ngAfterViewInit() {
  //   setTimeout(async () => {
  //     await this.loandMap();
  //   }, 1000);
  // }

  async requestAndGet() {
    try {
      await Geolocation.requestPermissions(); // prompts the user on device

      const position = await Geolocation.getCurrentPosition();
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      return position;
    } catch (err) {
      console.error('Geolocation error:', err);
      throw err;
    }
  }

  async getLocation() {

    console.log(Capacitor.getPlatform())
    console.log(Geolocation)
    try {
      if (Capacitor.getPlatform() === 'web') {
        console.log(Capacitor.getPlatform())
        // fallback to browser geolocation
        return new Promise<GeolocationPosition>((resolve, reject) => {
          if (!('geolocation' in navigator)) {
            reject(new Error('Geolocation not supported in this browser'));
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });
      } else {
        // iOS / Android (Capacitor)
        await Geolocation.requestPermissions();
        return Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      }
    } catch (err) {
      console.error('Location error:', err);
      throw err;
    }
  }

  async loandMap(locationLatAndLng: any) {
    console.log(locationLatAndLng)
    console.log('AAA', this.mapRef?.nativeElement)
    if (this.mapRef?.nativeElement) {
      this.map = await GoogleMap.create({
        id: 'my-map', // Unique identifier
        element: this.mapRef.nativeElement,
        apiKey: environment.mapkey,
        config: {
          center: {
            lat: locationLatAndLng.coords.latitude, // San Francisco
            lng: locationLatAndLng.coords.longitude,
            // lat: this.location.lat,
            // lng: this.location.lng,
          },
          zoom: 12,
        },
      });

      await this.map.addMarker({
        coordinate: {
          lat: locationLatAndLng.coords.latitude, // San Francisco
          lng: locationLatAndLng.coords.longitude,
        }
      });

      await this.map.setOnMarkerClickListener((event: any) => {
        console.log(event);
        this.isAlertOpen = true;
        this.selectedService = this.nearMeServicebyCategoryData[Number(event.markerId) - 1]
        console.log(this.selectedService)
        this.selectedTime = this.selectedService?.service_slot[0];
      });
    }

    this.getCategory();
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

  getCategory() {
    this.common.showLoading();
    this.service.getCategory().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res?.data[0]._id);
          this.categoryData = res.data;
          this.nearMeServicebyCategory(res?.data[0]._id);
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  nearMeServicebyCategory(categoryId: any) {
    const data = {
      category: categoryId,
      location: [
        this.location.coords.longitude,
        this.location.coords.latitude
      ],
    }
    this.common.showLoading();
    this.service.nearMeServicebyCategory(data).subscribe(
      async (res: any) => {
        this.common.hideLoading();
        console.log(res);
        if (res?.status) {
          // this.submitted = false;
          this.nearMeServicebyCategoryData = res.data;
          console.log(this.nearMeServicebyCategoryData);
          res.data.forEach(async (element: any) => {
            await this.map.addMarker({
              coordinate: {
                lat: element.service_location.coordinates[1],
                lng: element.service_location.coordinates[0]
              },
            });
          });

          // await this.mapRef.enableClustering();

        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  bookAppointment() {
    this.isAlertOpen = false;
    this.timeSlotOpen = true;
  }

  selectedData(type: any) {
    console.log(type)
    this.selectedDate = type;
  }

  selectedTimeData(type: any) {
    console.log(type)
    this.selectedTime = type;
  }

  confirmAppointment() {
    this.timeSlotOpen = false;
    this.payAmountOpen = true;
  }

  payAmount(payAmountForm: any) {
    // this.payAmountOpen = false;
    // setTimeout(() => {
    //   this.navCtrl.navigateForward(['/payment-success'])
    // }, 1000);
    // return
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
