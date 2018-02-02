import { ListModel } from './../../models/list.model';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyAlertProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    console.log('Hello MyAlertProvider Provider');
  }

  /* addList() {
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
  } */

}
