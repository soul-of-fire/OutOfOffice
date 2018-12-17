import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { EventModel } from '../../app/models/EventModel';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  event = { title: "", message: "", startDate: "", endDate: "" };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public customEventProvider: CustomEventProvider) {
  }

  save() {
    const event = new EventModel(this.event.title, this.event.message, new Date(this.event.startDate));
    this.customEventProvider.addEvent(event);
    this.navCtrl.pop();
  }
}
