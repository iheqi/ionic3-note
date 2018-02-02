import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {
    console.log('Hello DataProvider Provider');
  }
  getData(): Promise<any>{
    return this.storage.get('lists');
  } 

  save(data) {
    let saveData = [];

    data.forEach((list) => {
      saveData.push({
        name: list.name,
        items: list.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('lists', newData);
  }

}
