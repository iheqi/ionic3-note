import { Observable } from 'rxjs/Observable';

export class ListModel {
    list: any;
    listObserver: any;
    constructor(public name: string, public items: any[]){
        this.items = items;
        // 在数据模型中创建我们自己的Observable，这样当检查列表发生改变时
        //（因为我们在发生改变的时候会发出一些数据） 我们可以在应用的其他部分可以监听到。
        this.list = Observable.create(observer => {
            this.listObserver = observer;
        });
    } 
    addItem(title,msg) {
        this.items.push({
            title: title,
            checked: false,
            date: new Date(),
            msg: msg
        });
        this.listObserver.next(true);
    } 
    removeItem(item) {
        let index = this.items.indexOf(item);
        if(index > -1){
            this.items.splice(index, 1);
        }
        this.listObserver.next(true);
    } 
/*     renameItem(item, title) {
        let index = this.items.indexOf(item);
        if(index > -1){
            this.items[index].title = title;
        }
        this.listObserver.next(true);
        
    }  */
    setName(name) {
        this.name = name;
        this.listObserver.next(true);
    } 

    setItem(item, title, msg) {
        let index = this.items.indexOf(item);
        if(index > -1){
            this.items[index].title = title;
            this.items[index].msg = msg;
        }
        this.listObserver.next(true);
    }
/*     toggleItem(item) {
        item.checked = !item.checked;
        this.listObserver.next(true);
    } */
}