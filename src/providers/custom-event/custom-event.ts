import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventModel } from '../../app/models/EventModel';
import { ApiProvider } from '../api/api';
import { merge, combineLatest } from 'rxjs/operators';

@Injectable()
export class CustomEventProvider {

  public calendar: any;
  public day = 1000 * 60 * 60 * 24;
  public currentEvents = new BehaviorSubject([]);

  constructor(public api: ApiProvider) { }

  public addEvent(data: any): void {
    const events = this.calendar.events;
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

    this.api.patch('calendar.json', JSON.stringify({ "data": events })).subscribe(() => {
      this.currentEvents.next(Object.assign([], events));
    })
  }

  private pushEvent(events: any, data: any, from: any): void {
    const event = new EventModel(data.title, data.message, from);
    events.push(event);
  }

  public findEvent($event: any) {
    return this.calendar.events.filter(e => e.year == $event.year && e.month == $event.month && e.date == $event.date)[0];
  }

  public loadEvents() {
    this.api.get('calendar.json').subscribe(resp => resp && resp.data && this.currentEvents.next(resp.data));
  }
}
