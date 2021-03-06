import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(ItemSliding) sliding: ItemSliding;
  list;
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

  removeItem(item,i) {
    let prompt = this.alertCtrl.create({
      title: '确定删除这一项？',
      message: '这将无法找回',
      buttons: [{
        text: '取消'
      },
      {
        text: '确定',
        handler: () => {
          let itemEle = document.getElementById(i.toString());
          itemEle.className = 'myHide';
          setTimeout(() => {
            this.list.removeItem(item)
          },400)
        }
      }]
    });
    prompt.present();
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

  goEditPage() {
    this.navCtrl.push('EditPage',{
      list: this.list
    });
  }
}
