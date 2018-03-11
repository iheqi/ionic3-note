import { ListModel } from './../../models/list.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  @ViewChild('input') input;
  list: any;
  item: any;

  title;
  msg;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
    ) {
      this.list = navParams.get('list');
      this.item = navParams.get('item');
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
    
    if(typeof(this.item) != 'undefined' || this.item != null) {
      this.title = this.item.title;
      this.msg = this.item.msg;
    }
    //const input = document.getElementById('title');
    this.input.setFocus();
  }
  save() {
    if(typeof(this.title) != "undefined") {
      
      if(this.title.trim() != "") {
        if(typeof(this.item) != 'undefined' && this.item != null) {
          this.list.setItem(this.item,this.title,this.msg);
        } else {
          this.list.addItem(this.title,this.msg);
        }
      } else {
        let prompt = this.alertCtrl.create({
          title: '标题不可以为空哦!',
          buttons: [{
            text: '确定'
          }]
        });
        prompt.present();
      }
    } 
  }
}
