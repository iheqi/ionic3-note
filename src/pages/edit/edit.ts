import { ListModel } from './../../models/list.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  list: any;
  item: any;

  title;
  msg;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
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
  }
  save() {
    if(typeof(this.item) != 'undefined' || this.item != null) {
      this.list.setItem(this.item,this.title,this.msg);
    } else {
      this.list.addItem(this.title,this.msg);
    }
  }
}
