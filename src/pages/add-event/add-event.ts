import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { EventModel } from '../../app/models/EventModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  eventForm: FormGroup;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public customEventProvider: CustomEventProvider,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: '',
      message: ['', Validators.required],
      from: [this.customEventProvider.objectToDate(), Validators.required],
      to: ''
    });
  }

  save() {
    const data = this.eventForm.getRawValue();
    this.customEventProvider.addEvent(data);
    this.navCtrl.pop();
  }

  
}
