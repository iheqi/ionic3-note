import { DataProvider } from './../../providers/data/data';
import { ListModel } from './../../models/list.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-all',
  templateUrl: 'all.html',
})
export class AllPage {
  lists: ListModel[] = [];
  @ViewChild(ItemSliding) sliding: ItemSliding;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataProvider: DataProvider, 
    public alertCtrl: AlertController,
    public events: Events
  ) {
      this.lists = navParams.get('lists');
  }
  removeList(list) {
    let index = this.lists.indexOf(list);
    if(index > -1){
      let prompt = this.alertCtrl.create({
        title: '确定要删除列表？',
        message: '将删除其包括的所有项',
        buttons: [{
            text: '取消'
          },
          {
            text: '确定',
            handler: data => {
              this.lists.splice(index, 1);
              this.dataProvider.save(this.lists);
              this.publishEvents() 
            }
          }]
        });
        prompt.present();
    }
  } 

  renameList(list) {
    let prompt = this.alertCtrl.create({
      title: '列表重命名',
      message: '输入新名称:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            let index = this.lists.indexOf(list);  // 找到该列表项
            if(index > -1){
              this.lists[index].setName(data.name);
              this.dataProvider.save(this.lists);
            }

            this.sliding.close();
          }
        }]
      });
      prompt.present();
  } 

  publishEvents() {
    this.events.publish('list:deleted');
  }

}
