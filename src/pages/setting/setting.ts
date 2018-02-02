import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle, AlertController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  @ViewChild(Toggle) toggle: Toggle;
  toggleItem;
  isLocked;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.storage.get('isLocked').then((val) => {
      if(typeof(val) == 'undefined') {
        this.toggle.checked = false;
        SettingPage.prototype.isLocked = false;
      } else {
        SettingPage.prototype.isLocked = val;
        this.toggle.checked = val;
      }
      //let toggleItem = document.getElementById('toggle');
      //toggleItem.checked = 
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  toggleSet() {
    this.storage.set('isLocked',this.isLocked);
  }

  setPassword() {
    this.storage.get('password').then((val) => {
      if(val == null) {
        let prompt = this.alertCtrl.create({
          title: '输入新密码：',
          inputs: [{
            name: 'name',
            type: 'password'
          }],
          buttons: [{
            text: '取消'
          },
          {
            text: '确定',
            handler: data => {
              this.storage.set('password',data);
            }
          }]
        });

        prompt.present();
        
      } else {
        let prompt = this.alertCtrl.create({
          title: '输入旧密码：',
          inputs: [{
            name: 'name',
            type: 'password'
          }],
          buttons: [{
            text: '取消'
          },
          {
            text: '确定',
            handler: data => {
              this.storage.get('password').then((val) => {
                
                if(val.name == data.name) {
                  let prompt = this.alertCtrl.create({
                    title: '输入新密码：',
                    inputs: [{
                      name: 'name',
                      type: 'password'
                    }],
                    buttons: [{
                      text: '取消'
                    },
                    {
                      text: '确定',
                      handler: data => {
                        this.storage.set('password',data);
                      }
                    }]
                  });
          
                  prompt.present();
                } else {
                  let toast = this.toastCtrl.create({
                    message: '密码输入错误，请重新输入',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                }
              });
            }
          }]
        });

        prompt.present();
      }
    });
  }

}
