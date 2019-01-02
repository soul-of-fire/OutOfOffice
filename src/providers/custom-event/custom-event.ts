import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventModel } from '../../app/models/EventModel';

@Injectable()
export class CustomEventProvider {

  public calendar: any;
  public day = 1000 * 60 * 60 * 24;
  public currentEvents = new BehaviorSubject([{
    year: 2018,
    month: 11,
    date: 25,
    data: {
      title: "Title",
      message: "Aha"
    }
  }]);

  constructor() { }

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

    this.currentEvents.next(Object.assign([], events));
  }

  private pushEvent(events: any, data: any, from: any): void {
    const event = new EventModel(data.title, data.message, from);
    events.push(event);
  }

  public findEvent($event: any) {
    return this.calendar.events.filter(e => e.year == $event.year && e.month == $event.month && e.date == $event.date)[0];
  }
}
