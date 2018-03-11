// 这个page没用上
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nothing = false;
  constructor(public navCtrl: NavController,private storage: Storage) {

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
