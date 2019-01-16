import { Injectable } from '@angular/core';
import { EventModel } from '../app/models/EventModel';
import { UtilsService } from './utils-service';

@Injectable()
export class EventService {
  public calendar: any;
  public day = 1000 * 60 * 60 * 24;

  constructor(public utilService: UtilsService) {}
  
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
    this.utilService.persist(events)
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
    this.utilService.persist(events)
  }

  private pushEvent(events: any, data: any, from: any): void {
    events.push(new EventModel(data, from, this.utilService.user));
  }

  private removeById(id: number) {
    return this.calendar.events.filter(e => e.data.id != id);
  }
}
