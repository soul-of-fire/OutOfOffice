import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { LoginPage } from '../login/login';
import { map, tap } from 'rxjs/operators';
import { EventService } from '../../providers/event-service';
import { UtilsService } from '../../providers/utils-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit, OnDestroy {

  @ViewChild('calendar') calendar;
  day: any;
  selected: any;
  currentEvents: any;
  
  constructor(public navCtrl: NavController,
    public eventService: EventService,
    public utilsService: UtilsService) {
  }

  ngAfterViewInit(): void {
    this.eventService.calendar = this.calendar;
    this.currentEvents = this.utilsService.load().pipe(
      tap(() => {
        !this.selected && this.onDaySelect({
          year: this.calendar.currentYear,
          month: this.calendar.currentMonth,
          date: this.calendar.currentDate
        });
      })
    );
  }

  ngOnDestroy() {
    this.currentEvents.unsubscribe();
    this.selected.unsubscribe();
    this.utilsService.isOnline.unsubscribe();
  }
  
  onDaySelect($event) {
    this.day = $event;
    this.selected = this.currentEvents.pipe(
      map((res: any) => res.filter((e: any) => e.year == $event.year && e.month == $event.month && e.date == $event.date))
    );
  }

  onAddEvent() {
    this.navCtrl.push(AddEventPage, {selected: this.day});
  }

  onLogOut() {
    this.utilsService.logout();
    this.navCtrl.push(LoginPage);
  }

  swipe(event) {
    event.direction === 2 && this.calendar.forward();
    event.direction === 4 && this.calendar.back();
  }
}
