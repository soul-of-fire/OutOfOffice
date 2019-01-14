import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../providers/event-service';
import { UtilsService } from '../../providers/utils-service';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  eventForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventService: EventService,
    public utilsService: UtilsService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    let selected = this.navParams.get('selected');
    selected = selected && this.utilsService.objectToDate(selected) || '';
    this.eventForm = this.formBuilder.group({
      title: '',
      message: ['', Validators.required],
      from: [selected, Validators.required],
      to: ''
    });
  }

  save() {
    this.eventService.addEvent(this.eventForm.getRawValue());
    this.navCtrl.pop();
  }
}
