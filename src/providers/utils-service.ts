import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'Firebase';
import Rx, { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map, tap, merge } from 'rxjs/operators';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class UtilsService {
  public user: any;
  public isOnline = new BehaviorSubject(navigator.onLine);

  constructor(public storage: Storage, 
    public loadingCtrl: LoadingController, 
    private network: Network) {
    this.storage.get('user').then((user: any) => {
      this.user = user;
    });
    this.config();
  }

  public config() {
    this.isOnline.pipe(
      merge(this.network.onConnect(), this.network.onDisconnect()),
      map(e => e.type == 'online')
    );
  }

  public login(user: any) {
    this.user = user;
    this.storage.set('user', user);
  }

  public logout() {
    this.storage.remove('user');
  }

  public load(): Observable<any> {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let cancel = true;
    loading.present();
    return Rx.Observable.fromEvent(firebase.database().ref('calendar'), 'value').pipe(
      map((data: any) =>  data.val() && data.val().data || []),
      tap(() => { cancel && loading.dismiss(); cancel = false; })
    );
  }

  public persist(events: any) {
    firebase.database().ref('calendar').set({data: events});
  }

  public objectToDate(selected: any) {
    let month = selected.month + 1;
    month = month < 10 ? '0' + month : month;
    let day = selected.date;
    day = day < 10 ? '0' + day : day;
    return `${selected.year}-${month}-${day}`
  }
}
