import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EditEventPage } from '../add-event/edit-event';
import { EventService } from '../../providers/event-service';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @Input() selected: any;
  isOnLine: boolean = navigator.onLine;

  constructor(public navCtrl: NavController,
    public eventService: EventService,
    private alertCtrl: AlertController) {}

  isMyMessage(user: string) {
    return this.isOnLine && this.eventService.user && user == this.eventService.user.name;
  }

  onEdit(ev: any) {
    this.navCtrl.push(EditEventPage, { ev: ev });
  }

  onDelete(ev: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      }, {
        text: 'Delete',
        handler: () => {
          this.eventService.deleteEvent(ev.data.id);
        }
      }]
    });
    alert.present();
  }
}
