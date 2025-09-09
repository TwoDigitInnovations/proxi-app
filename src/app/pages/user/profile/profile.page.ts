import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileModel: any = {
    name: "",
    email: "",
    phoneNumber: "",
  }
  submitted: any = false;
  isEdit: any = false;
  imagesSource: any;
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
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    // console.log(image);
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    // console.log(blob);
    const name = `${new Date().getTime()}.png`;
    const data = new FormData();
    data.append('file', blob, name);
    // this.common.showLoading();
    this.service.fileupload(data).subscribe(
      (res: any) => {
        // this.common.hideLoading();
        console.log(res);
        if (res.status) {
          this.imagesSource = res.data.file;
          this.common.presentToaster(res?.data?.message);
        }
      },
      (err) => {
        // this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
    const reader: any = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
    };
    reader.readAsDataURL(blob);
  };

  getProfile() {
    this.common.showLoading();
    this.service.getProfile().subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          console.log(res);
          this.profileData = res.data
          this.profileModel = {
            name: res.data.name,
            email: res.data.email,
            phoneNumber: res.data.phone,
          }
          this.imagesSource = res.data?.profile;
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
    console.log(this.profileModel)
    const data = {
      name: this.profileModel.name,
      email: this.profileModel.email,
      phone: this.profileModel.phoneNumber,
      // profile: this.imagesSource,
    }
    console.log(data)
    this.common.showLoading();
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
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
}
