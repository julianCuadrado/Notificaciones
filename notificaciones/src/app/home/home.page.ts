import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notificaciones:any = [];

  constructor(private storage: Storage) { 
    this.storage.get('lista').then((val)=>{
      console.log(val);
        this.notificaciones = JSON.parse(val);
    });
  }  

  doRefresh(event) {
    this.storage.get('lista').then((val)=>{
      console.log(val);
        this.notificaciones = JSON.parse(val);
    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
