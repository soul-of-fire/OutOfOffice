import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AddEventPage } from './add-event';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'add-event.html',
})
export class EditEventPage extends AddEventPage implements OnInit {
  eventForm: FormGroup;
  event: any;

  ngOnInit() {
    this.event = this.navParams.get('ev');
    this.eventForm = this.formBuilder.group({
      title: this.event.data.title,
      message: [this.event.data.message, Validators.required],
      from: [this.event.data.from, Validators.required],
      to: this.event.data.to
    });
  }

  save() {
    this.eventService.editEvent(this.event.data.id, this.eventForm.getRawValue());
    this.navCtrl.pop();
  }
}
