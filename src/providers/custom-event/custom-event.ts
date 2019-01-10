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
  public selected: any;

  constructor(public api: ApiProvider, public storage: Storage) {}

  public loadEvents() {
    this.api.get('calendar.json').subscribe(resp => resp && resp.data && this.currentEvents.next(resp.data));
  }
  
  public findEvent($event: any, events: any) {
    this.selected = $event;
    events = events || this.calendar.events;
    return events.filter(e => e.year == $event.year && e.month == $event.month && e.date == $event.date);
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

  public onEventChange(data) {
    if (data.length > 0) {
      const mark = this.selected || {
        year: this.calendar.currentYear,
        month: this.calendar.currentMonth,
        date: this.calendar.currentDate
      };
      return this.findEvent(mark, data);
    }
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

    this.storage.get('user').then((user: any) => {
      if (to) {
        const difference = Math.round((to.getTime() - from.getTime()) / this.day);
        for (let i = 0; i <= difference; i++) {
          i > 0 && from.setDate(from.getDate() + 1);
          this.pushEvent(events, data, from, user);
        }
      } else {
        this.pushEvent(events, data, from, user);
      }
      this.saveAndUpdate(events)
    });
  }

  private saveAndUpdate(events: any) {
    this.api.patch('calendar.json', JSON.stringify({ "data": events })).subscribe(() => {
      this.currentEvents.next(Object.assign([], events));
    })
  }

  private pushEvent(events: any, data: any, from: any, user: any): void {
    const event = new EventModel(data, from, user);
    events.push(event);
  }

  private removeById(id: number) {
    return this.calendar.events.filter(e => e.data.id != id);
  }
}
