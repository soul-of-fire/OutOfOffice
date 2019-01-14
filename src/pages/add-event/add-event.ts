import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../providers/event-service';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  eventForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventService: EventService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: '',
      message: ['', Validators.required],
      from: [this.eventService.objectToDate(), Validators.required],
      to: ''
    });
  }

  save() {
    const data = this.eventForm.getRawValue();
    this.eventService.addEvent(data);
    this.navCtrl.pop();
  }

  
}
