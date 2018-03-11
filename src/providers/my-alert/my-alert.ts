import { ListModel } from './../../models/list.model';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class MyAlertProvider {

  constructor(public alertCtrl: AlertController) {
    console.log('Hello MyAlertProvider Provider');
  }
  createAlert(title, message, inputs: Array<string>, buttons: Array<string>, handler) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [{
        name: inputs[0]
      }],
      buttons: [{
        text: buttons[0]
      },
      {
        text: buttons[1],
        handler: handler
      }]
    });
    prompt.present();
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
