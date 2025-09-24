import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
declare var google: any;

@Component({
  standalone: false,
  selector: 'app-my-service-provider',
  templateUrl: './my-service-provider.page.html',
  styleUrls: ['./my-service-provider.page.scss'],
})
export class MyServiceProviderPage implements OnInit {
  serviceModel: any = {
    service_name: "",
    address: "",
    service_slot: [],
    category: "",
    service_description: "",
    service_photo: [],
  }
  submitted: any = false;
  isEdit: any = false;
  profileData: any = {};

  showLocation: any = false;
  GoogleGeocoder: any;
  location: any = {};
  autocompleteItems: any;
  GoogleAutocomplete: any;
  categoryData: any = [];
  serviceSlotData: any = [];

  serviceId: any = "";

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
    this.getService();
    this.getCategory();
  }

  goBack() {
    this.navCtrl.back();
  }

  getService() {
    this.common.showLoading();
    this.service.getService().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.serviceId = res.data._id;
          this.profileData = res.data
          this.serviceModel = {
            service_name: res.data.service_name,
            address: res.data.address,
            category: res.data.category,
            service_description: res.data.service_description,
            service_photo: res.data.service_photo.map((f: any) => ({
              base64Data: f
            }))
          }
          if (res.data.service_location) {
            this.location = {
              lat: res.data.service_location.coordinates[1],
              lng: res.data.service_location.coordinates[0],
            };
          }
          if (res.data.service_slot.length > 0) {
            this.serviceSlotData = res.data.service_slot
          }
          // localStorage.setItem('userDetail', JSON.stringify(res?.data))
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  createService(serviceForm: any) {
    if (serviceForm.form.invalid) {
      this.submitted = true
      return
    }
    const data = new FormData();
    data.append('service_name', this.serviceModel.service_name);
    data.append('service_location', JSON.stringify(this.location));
    data.append('service_description', this.serviceModel.service_description);
    data.append('service_slot', JSON.stringify(this.serviceSlotData));
    data.append('category', this.serviceModel.category);
    data.append('address', this.serviceModel.address);

    let oldImages: any = []
    if (this.serviceModel.service_photo && this.serviceModel.service_photo.length > 0) {
      this.serviceModel.service_photo.forEach((amenity: any, index: any) => {
        if (amenity.blob) {
          data.append(`service_photo`, amenity.blob, amenity.name);
        } else {
          oldImages.push(amenity.base64Data)
        }
      });
    }
    data.append('oldImages', JSON.stringify(oldImages));

    this.common.showLoading();
    this.service.createService(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.getService()
          this.submitted = false
          this.isEdit = false;
          this.serviceId = "";
        }
        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  updateService(serviceForm: any) {
    if (serviceForm.form.invalid) {
      this.submitted = true
      return
    }
    const data = new FormData();
    data.append('service_name', this.serviceModel.service_name);
    data.append('service_location', JSON.stringify(this.location));
    data.append('service_description', this.serviceModel.service_description);
    data.append('service_slot', JSON.stringify(this.serviceSlotData));
    data.append('category', this.serviceModel.category);
    data.append('address', this.serviceModel.address);
    data.append('id', this.serviceId);

    let oldImages: any = []
    if (this.serviceModel.service_photo && this.serviceModel.service_photo.length > 0) {
      this.serviceModel.service_photo.forEach((amenity: any, index: any) => {
        if (amenity.blob) {
          data.append(`service_photo`, amenity.blob, amenity.name);
        } else {
          oldImages.push(amenity.base64Data)
        }
      });
    }
    data.append('oldImages', JSON.stringify(oldImages));

    this.common.showLoading();
    this.service.updateService(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.getService()
          this.submitted = false
          this.isEdit = false;
          this.serviceId = "";
        }
        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  takeMultiPicture = async () => {
    const image: any = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,

    });
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    const imageUrl = image.webPath;
    const fileType = blob?.type.split('/')[1];

    if (!['jpeg', 'png', 'jpg'].includes(fileType)) {
      this.common.presentToaster('Invalid file type. Only JPG, JPEG, and PNG are allowed.')
      return;
    }

    const fileSizeKB = blob.size / 1024;
    const fileSizeMB = fileSizeKB / 1024;

    if (fileSizeMB > 2) {
      this.common.presentToaster('The image size exceeds the 2 MB limit. Please select a smaller image.')
      return;
    }
    const name = `${new Date().getTime()}.${fileType}`;

    const reader: any = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      if (this.serviceModel.service_photo?.length > 0) {
        this.serviceModel.service_photo.push({
          blob,
          imageUrl,
          name,
          base64Data: `data:${blob?.type};base64,${base64Data}`
        });
      } else {
        this.serviceModel.service_photo = [{
          blob,
          imageUrl,
          name,
          base64Data: `data:${blob?.type};base64,${base64Data}`
        }];
      }
    };
    reader.readAsDataURL(blob);
  };

  removeImage(item: any) {
    this.serviceModel.service_photo = this.serviceModel.service_photo.filter((f: any) => f !== item)
  }

  UpdateSearchResults(e: any) {
    // console.log(e)
    if (this.serviceModel.address == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: e },
      (predictions: any, status: any) => {
        // console.log(predictions)
        // console.log(status)
        this.showLocation = true
        this.autocompleteItems = predictions;
        // console.log("location========", this.autocompleteItems)
      });
  }

  async SelectSearchResult(e: any) {
    // console.log(e)
    this.serviceModel.address = e.description
    this.showLocation = false
    this.GoogleGeocoder.geocode({ 'address': e.description }, (res: any) => {
      // console.log(res)
      // console.log(res[0].geometry.location.lat())
      this.location = {
        lat: res[0].geometry.location.lat(),
        lng: res[0].geometry.location.lng()
      };
    })
  }

  getCategory() {
    this.common.showLoading();
    this.service.getCategory().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.categoryData = res.data;
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  selectedameneties(e: any) {
    // this.ameneties = this.selectameneties.filter((f: any) => e.includes(f.name))
  }

  selectedServiceSlot(e: any) {
    // this.utilitiess = this.selectutilities.filter((f: any) => e.includes(f.name));
  }

  addServiceSlot() {
    this.serviceSlotData.push(this.serviceModel.service_slot);
    this.serviceModel.service_slot = '';
  }

  removeServiceSlotImage(item: any) {
    this.serviceSlotData = this.serviceSlotData.filter((f: any) => f !== item)
  }
}
