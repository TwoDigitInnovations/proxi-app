import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
  }
  submitted: any = false;
  isEdit: any = false;
  imagesSource: any = {};
  profileData: any = {};

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProfile()
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

    // const image: any = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Prompt,
    // });

    // const response = await fetch(image.webPath);
    // const blob = await response.blob();
    // const name = `${new Date().getTime()}.png`;
    // const data = new FormData();
    // data.append('file', blob, name);
    // // this.common.showLoading();
    // this.service.fileupload(data).subscribe(
    //   (res: any) => {
    //     // this.common.hideLoading();
    //     if (res.status) {
    //       this.imagesSource = res.data.file;
    //       this.common.presentToaster(res?.data?.message);
    //     }
    //   },
    //   (err) => {
    //     // this.common.hideLoading();
    //     console.log(err);
    //     this.common.presentToaster(err?.error?.message);
    //   }
    // );
    // const reader: any = new FileReader();
    // reader.onloadend = () => {
    //   const base64Data = reader.result.split(',')[1];
    // };
    // reader.readAsDataURL(blob);
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
            document: res.data.document.map((f: any) => ({
              base64Data: f
            }))
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
    this.profileModel.multiImage = this.profileModel.multiImage.filter((f: any) => f !== item)
  }
}
