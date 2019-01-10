import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { EventModel } from '../../app/models/EventModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEventPage } from './add-event';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'add-event.html',
})
export class EditEventPage extends AddEventPage implements OnInit {
  eventForm: FormGroup;
  id: number;

  ngOnInit() {
    const event = this.navParams.get('ev');
    this.id = event.data.id;
    this.eventForm = this.formBuilder.group({
      title: event.data.title,
      message: [event.data.message, Validators.required],
      from: [event.data.from, Validators.required],
      to: event.data.to
    });
  }

  save() {
    const data = this.eventForm.getRawValue();
    this.customEventProvider.editEvent(this.id, data);
    this.navCtrl.pop();
  }
}
