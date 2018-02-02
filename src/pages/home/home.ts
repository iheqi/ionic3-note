import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{title: string, date: string}>;
  nothing = false;
  constructor(public navCtrl: NavController,private storage: Storage) {
    this.items = [
      { title: "今晚吃鸡", date: '18/27/21:48' },
      { title: "明天下雨", date: '18/28/21:48' },
    ];
  }

  goEdit() {
    this.navCtrl.push('EditPage');
  }

  itemTapped(item) {
    this.navCtrl.push('EditPage', {
      item: item,
    })
  }
}
