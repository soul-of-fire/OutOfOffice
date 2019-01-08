import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventModel } from '../../app/models/EventModel';
import { ApiProvider } from '../api/api';
import { merge, combineLatest } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class CustomEventProvider {

  public calendar: any;
  public day = 1000 * 60 * 60 * 24;
  public currentEvents = new BehaviorSubject([]);
  public user: any;

  constructor(public api: ApiProvider, public storage: Storage) {
    this.storage.get('user').then((user: any) => {
      this.user = user;
    });
   }

  public addEvent(data: any): void {
    const events = this.calendar.events;
    const from = new Date(data.from);
    const to = data.to && new Date(data.to);
    const id = new Date().getTime();

    if (to) {
      const difference = Math.round((to.getTime() - from.getTime()) / this.day);
      for (let i = 0; i <= difference; i++) {
        i > 0 && from.setDate(from.getDate() + 1);
        this.pushEvent(events, data, from, id, this.user);
      }
    } else {
      this.pushEvent(events, data, from, id, this.user);
    }

    this.api.patch('calendar.json', JSON.stringify({ "data": events })).subscribe(() => {
      this.currentEvents.next(Object.assign([], events));
    })
  }

  private pushEvent(events: any, data: any, from: any, id: number, user: any): void {
    const event = new EventModel(data.title, data.message, from, id, user);
    events.push(event);
  }

  public findEvent($event: any) {
    return this.calendar.events.filter ? 
      this.calendar.events.filter(e => e.year == $event.year && e.month == $event.month && e.date == $event.date)[0] : 
      this.calendar.events;
  }

  public loadEvents() {
    this.api.get('calendar.json').subscribe(resp => resp && resp.data && this.currentEvents.next(resp.data));
  }
}
