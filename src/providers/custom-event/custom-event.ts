import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventModel } from '../../app/models/EventModel';

@Injectable()
export class CustomEventProvider {

  public currentEvents = new BehaviorSubject([{
    year: 2018,
    month: 11,
    date: 25,
    data: {
      title: "Title",
      message: "Aha"
    }
  }]);
  public calendar: any;
  
  constructor() {}

  addEvent(event: EventModel) {
    const events = this.calendar.events;
    events.push(event);
    this.currentEvents.next(Object.assign([], events));
  }

  findEvent($event: any) {
    return this.calendar.events.filter(e => e.year == $event.year && e.month == $event.month && e.date == $event.date)[0];
  }
}
