import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'Firebase';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class UtilsService {
  public user: any;

  constructor(public storage: Storage) {
    this.storage.get('user').then((user: any) => {
      this.user = user;
    });
  }

  public login(user: any) {
    this.user = user;
    this.storage.set('user', user);
  }

  public logout() {
    this.storage.remove('user');
  }

  public load(): Observable<any> {
    return Rx.Observable.fromEvent(firebase.database().ref('calendar'), 'value').pipe(
      map((data: any) =>  data.val() && data.val().data || [])
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
