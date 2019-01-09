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

  ngOnInit() {
    const event = this.navParams.get('ev');
    console.log(event);
    this.eventForm = this.formBuilder.group({
      title: event.data.title,
      message: [event.data.message, Validators.required],
      from: ['', Validators.required],
      to: ''
    });
  }

  save() {
    const data = this.eventForm.getRawValue();
    console.log(data);
    // this.customEventProvider.addEvent(data);
    // this.navCtrl.pop();
  }
}
