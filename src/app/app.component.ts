import { Storage } from '@ionic/storage';
import { ListPage } from './../pages/list/list';
import { DataProvider } from './../providers/data/data';
import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListModel } from '../models/list.model';

// import { HomePage } from '../pages/home/home';


import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild("content") navCtrl: NavController;
  rootPage: any;
  lists: ListModel[] = [];
  j: string;
  //initApp;
  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    public menuCtrl: MenuController,
    public events: Events, public storage: Storage
  ) {
      this.statusBar.backgroundColorByName("darkGray");
      this.storage.get('isLocked').then((val) => {
        if(val) {
          this.rootPage = 'LoginPage';
          this.initializeApp(false);
          
        } else {
          this.initializeApp(true);
        }
      });

      //MyApp.prototype.initApp = this.initializeApp.bind(this);
      events.subscribe('list:deleted', () => {
        //MyApp.prototype.initApp();
        this.initializeApp(true);
        
      });
  }

  
  initializeApp(ifTap: boolean) {
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
        if(ifTap) {
          this.navCtrl.setRoot(ListPage, {
            list: this.lists[0]
          });
        }
      });
    });
  }

  openPage(list,i) {
    // 避免与list的id重复
    let id = "id" + i.toString();

    if (typeof(this.j) != "undefined") {
      let ele = document.getElementById(this.j);
      if(ele !== null) {
  		  ele.style.cssText = "color: aliceblue";
      }
    }
    let ele = document.getElementById(id);
    ele.style.cssText = "color: rgb(245, 141, 56)";
    this.navCtrl.setRoot(ListPage, {
      list: list
    });

    this.j = id;
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
        handler: (data) => {
          if(data.name.trim() == "") {
            let prompt = this.alertCtrl.create({
              title: '列表名不能为空哦',
              buttons: [{
                text: "好的",
                handler: () => {
                  this.addList();
                }
              }]
            });
            prompt.present();
            
          } else {
            
            let newList = new ListModel(data.name, []);
            this.lists.push(newList);
            newList.list.subscribe(update => {
              this.dataProvider.save(this.lists);
            });
            this.dataProvider.save(this.lists);
          }
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
