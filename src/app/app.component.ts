import { Storage } from '@ionic/storage';
import { ListPage } from './../pages/list/list';
import { DataProvider } from './../providers/data/data';
import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListModel } from '../models/list.model';

import { HomePage } from '../pages/home/home';


import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild("content") navCtrl: NavController;
  rootPage: any;
  lists: ListModel[] = [];
  //initApp;
  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    public menuCtrl: MenuController,
    public events: Events, public storage: Storage
  ) {
      this.storage.get('isLocked').then((val) => {
        if(val) {
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = HomePage;
        }
        this.initializeApp();     
      });

      //MyApp.prototype.initApp = this.initializeApp.bind(this);
      events.subscribe('list:deleted', () => {
        //MyApp.prototype.initApp();
        this.initializeApp();
      });
  }

  
  initializeApp() {
    this.lists = [];
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.dataProvider.getData().then((lists) => {
        let savedLists: any = false;
        if(typeof(lists) != "undefined"){
          savedLists = JSON.parse(lists);
        } 

        if(savedLists){
          savedLists.forEach((savedList) => {
            let loadList = new ListModel(savedList.name, savedList.items);
            this.lists.push(loadList);
            loadList.list.subscribe(update => {
              this.dataProvider.save(this.lists);
            });
          });
        }
        console.log(this.lists);
        this.navCtrl.setRoot(ListPage, {
          list: this.lists[0]
        });
      });
    });
  }

  openPage(list) {
    this.navCtrl.setRoot(ListPage, {
      list: list
    });
  }

  addList() {
    let prompt = this.alertCtrl.create({
      title: '创建新列表',
      message: '输入列表名称:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
        text: '取消'
      },
      {
        text: '保存',
        handler: data => {
          let newList = new ListModel(data.name, []);
          this.lists.push(newList);
          newList.list.subscribe(update => {
            this.dataProvider.save(this.lists);
          });
          this.dataProvider.save(this.lists);
        }
      }]
    });
    prompt.present();
  }

  goAll() {
    this.menuCtrl.close();
    this.navCtrl.push('AllPage',{
      lists: this.lists
    });
  }
  goSetting() {
    this.menuCtrl.close();
    this.navCtrl.push('SettingPage');
  }

}
