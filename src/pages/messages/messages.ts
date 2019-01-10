import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditEventPage } from '../add-event/edit-event';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage implements OnInit, OnDestroy {
  @Input() selected: any;
  user: any;
  subscription: any;
  
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public customEventProvider: CustomEventProvider) {}
    
  ngOnInit() {
    this.storage.get('user').then((user: any) => {
      this.user = user.name;
    });
    this.subscription = this.customEventProvider.currentEvents.subscribe(data => {
      this.selected = this.selected && this.customEventProvider.findEvent(this.selected[0], data);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit(ev: any) {
    let paramObj = { ev: ev };
    this.navCtrl.push(EditEventPage, paramObj);
  }

  onDelete(ev: any) {
    this.customEventProvider.deleteEvent(ev.data.id);
  }
}
