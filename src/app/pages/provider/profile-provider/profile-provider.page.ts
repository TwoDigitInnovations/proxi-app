import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
declare var google: any;

@Component({
  standalone: false,
  selector: 'app-profile-provider',
  templateUrl: './profile-provider.page.html',
  styleUrls: ['./profile-provider.page.scss'],
})
export class ProfileProviderPage implements OnInit {
  profileModel: any = {
    name: "",
    email: "",
    phoneNumber: "",
    document: [],
    service_name: "",
    address: "",
    service_slot: [],
    category: "",
    service_description: "",
  }
  submitted: any = false;
  isEdit: any = false;
  imagesSource: any = {};
  profileData: any = {};

  showLocation: any = false;
  GoogleGeocoder: any;
  location: any = {};
  autocompleteItems: any;
  GoogleAutocomplete: any;
  categoryData: any = [];
  serviceSlotData: any = [];

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
    this.getProfile();
    this.getCategory();
  }

  goBack() {
    this.navCtrl.back();
  }

  takePicture = async () => {
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
      this.imagesSource = {
        blob,
        imageUrl,
        name,
        base64Data: `data:${blob?.type};base64,${base64Data}`
      };
      console.log(this.imagesSource)
    };
    reader.readAsDataURL(blob);
  };

  getProfile() {
    this.common.showLoading();
    this.service.getProfile().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.profileData = res.data
          this.profileModel = {
            name: res.data.name,
            email: res.data.email,
            phoneNumber: res.data.phone,
            service_name: res.data.service_name,
            address: res.data.address,
            category: res.data.category,
            service_description: res.data.service_description,
            document: res.data.document.map((f: any) => ({
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
          console.log(res.data?.profile)
          this.imagesSource = { base64Data: res.data?.profile };
          localStorage.setItem('userDetail', JSON.stringify(res?.data))
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  updateProfile(profileForm: any) {
    if (profileForm.form.invalid) {
      this.submitted = true
      return
    }
    const data = new FormData();
    data.append('name', this.profileModel.name);
    data.append('email', this.profileModel.email);
    data.append('phone', this.profileModel.phoneNumber);
    data.append('service_name', this.profileModel.service_name);
    data.append('service_location', JSON.stringify(this.location));
    data.append('service_description', this.profileModel.service_description);
    data.append('service_slot', JSON.stringify(this.serviceSlotData));
    data.append('category', this.profileModel.category);
    data.append('address', this.profileModel.address);

    let oldImages: any = []
    if (this.imagesSource.blob) {
      data.append('profile', this.imagesSource.blob, this.imagesSource.name);
    }
    if (this.profileModel.document && this.profileModel.document.length > 0) {
      this.profileModel.document.forEach((amenity: any, index: any) => {
        if (amenity.blob) {
          data.append(`document`, amenity.blob, amenity.name);
        } else {
          oldImages.push(amenity.base64Data)
        }
      });
    }
    data.append('oldImages', JSON.stringify(oldImages))

    this.common.showLoading();
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.getProfile()
          this.submitted = false
          this.isEdit = false
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
      if (this.profileModel.document?.length > 0) {
        this.profileModel.document.push({
          blob,
          imageUrl,
          name,
          base64Data: `data:${blob?.type};base64,${base64Data}`
        });
      } else {
        this.profileModel.document = [{
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
    this.profileModel.document = this.profileModel.document.filter((f: any) => f !== item)
  }

  UpdateSearchResults(e: any) {
    console.log(e)
    if (this.profileModel.address == '') {
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
    this.profileModel.address = e.description
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
          console.log(res);
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
    console.log(e)
    // this.utilitiess = this.selectutilities.filter((f: any) => e.includes(f.name));
    // console.log(this.utilitiess);
  }

  addServiceSlot() {
    this.serviceSlotData.push(this.profileModel.service_slot);
    console.log(this.serviceSlotData)
    this.profileModel.service_slot = ''
  }

  removeServiceSlotImage(item: any) {
    this.serviceSlotData = this.serviceSlotData.filter((f: any) => f !== item)
  }
}
