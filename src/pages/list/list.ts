import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(ItemSliding) sliding: ItemSliding;
  list: any;
  isEmpty: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) { 
      this.list = this.navParams.get('list');

      if(typeof(this.list) != "undefined") {
        this.isEmpty = false;
      }
    }

  itemTapped(item) {
    this.navCtrl.push('EditPage', {
      list: this.list,
      item: item
    });
    this.sliding.close();
  }

/*   addItem() {
    let prompt = this.alertCtrl.create({
      title: '增加item',
      message: '输入任务:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
        text: '取消'
      },
      {
        text: '保存',
        handler: data => {
          this.checklist.addItem(data.name);
        }
      }]
    });
    prompt.present();
  }  */
/*   toggleItem(item) {
    this.list.toggleItem(item);
  }  */
  removeItem(item) {
    this.list.removeItem(item);
  } 
  renameItem(item) {
    let prompt = this.alertCtrl.create({
      title: '重命名 Item',
      message: '输入:',
      inputs: [{
        name: 'name'
      }],
      buttons: [{
        text: '取消'
      },
      {
        text: '保存',
        handler: data => {
          this.list.renameItem(item, data.name);
        }
      }]
    });
    prompt.present();
  } 
/*   unItems() {
    this.list.items.forEach((item) => {
      if(item.checked){     // 将已经勾选的取消勾选
        this.list.toggleItem(item);
      }
    });
  } */

  goEditPage() {
    this.navCtrl.push('EditPage',{
      list: this.list
    });
  }
}
