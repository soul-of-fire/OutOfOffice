import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import firebase from 'Firebase';
import Rx from 'rxjs/Rx';
import { map, tap } from 'rxjs/operators';
import { EventService } from '../../providers/event-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('calendar') calendar;
  selected: any;
  currentEvents: any;
  
  constructor(public navCtrl: NavController,
    public eventService: EventService,
    public storage: Storage) {
  }

  ngAfterViewInit(): void {
    this.eventService.calendar = this.calendar;
    this.currentEvents = Rx.Observable.fromEvent(firebase.database().ref('calendar'), 'value').pipe(
      map((data: any) =>  data.val() && data.val().data || []),
      tap(() => {
        !this.selected && this.onDaySelect({
          year: this.calendar.currentYear,
          month: this.calendar.currentMonth,
          date: this.calendar.currentDate
        });
      })
    );
  }
  
  onDaySelect($event) {
    this.eventService.selected = $event;
    this.selected = this.currentEvents.pipe(
      map((res: any) => 
        res.filter((e: any) => e.year == $event.year && e.month == $event.month && e.date == $event.date)
      )
    );
  }

  onAddEvent() {
    this.navCtrl.push(AddEventPage);
  }

  onLogOut() {
    this.storage.remove('user');
    this.navCtrl.push(LoginPage);
  }

  swipe(event) {
    event.direction === 2 && this.calendar.forward();
    event.direction === 4 && this.calendar.back();
  }
}
