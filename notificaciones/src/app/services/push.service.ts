import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  lista:any = [];

  constructor(private oneSignal: OneSignal, private storage: Storage) { 
    storage.get('lista').then((val)=>{
      if(val != null){
        this.lista = JSON.parse(val);
      }
    });
  }

  configuracionInicial() {
    this.oneSignal.startInit('50f5684e-41ff-4dd5-8565-a79893ee8e60', '375917331287');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      console.log(data);
      
      this.lista.push(data.payload.title);
      this.storage.set("lista", JSON.stringify(this.lista));
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
    });

    this.oneSignal.endInit();
  }
}
