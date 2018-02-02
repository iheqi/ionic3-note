import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  backgroundImage = 'assets/imgs/background-5.jpg';
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.storage.get('password').then((val) => {
      console.log(val)
      if(val == null) {
        if(this.password == '123456') {
          this.navCtrl.setRoot(ListPage);
        } else {
          let toast = this.toastCtrl.create({
            message: '您尚未设置密码，默认密码为123456',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      } else {
        if(this.password == val.name) {
          this.navCtrl.setRoot(ListPage);
        } else {
          let toast = this.toastCtrl.create({
            message: '密码输入错误，请重新输入',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }
    });

    
  }

}
