import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'Firebase';
import { EventModel } from '../app/models/EventModel';

@Injectable()
export class EventService {

  public calendar: any;
  public day = 1000 * 60 * 60 * 24;
  public selected: any;
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

  public addEvent(data: any): void {
    const events = this.calendar.events;
    this.modify(data, events);
  }

  public editEvent(id: number, data: any) {
    const array = this.removeById(id);
    this.modify(data, array);
  }

  public deleteEvent(id: number) {
    const events = this.removeById(id);
    this.saveAndUpdate(events)
  }

  public objectToDate() {
    if(!this.selected) {
      return '';
    }
    let month = this.selected.month + 1;
    month = month < 10 ? '0' + month : month;
    let day = this.selected.date;
    day = day < 10 ? '0' + day : day;
    return `${this.selected.year}-${month}-${day}`
  }

  private modify(data: any, events: any) {
    const from = new Date(data.from);
    const to = data.to && new Date(data.to);

    if (to) {
      const difference = Math.round((to.getTime() - from.getTime()) / this.day);
      for (let i = 0; i <= difference; i++) {
        i > 0 && from.setDate(from.getDate() + 1);
        this.pushEvent(events, data, from);
      }
    } else {
      this.pushEvent(events, data, from);
    }
    this.saveAndUpdate(events)
  }

  private saveAndUpdate(events: any) {
    firebase.database().ref('calendar').set(Object.assign([], {data: events}));
  }

  private pushEvent(events: any, data: any, from: any): void {
    const event = new EventModel(data, from, this.user);
    events.push(event);
  }

  private removeById(id: number) {
    return this.calendar.events.filter(e => e.data.id != id);
  }
}
