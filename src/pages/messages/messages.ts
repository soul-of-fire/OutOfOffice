import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EditEventPage } from '../add-event/edit-event';
import { EventService } from '../../providers/event-service';
import { UtilsService } from '../../providers/utils-service';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @Input() selected: any;

  constructor(public navCtrl: NavController,
    public eventService: EventService,
    public utilsService: UtilsService,
    private alertCtrl: AlertController) {}

  isMyMessage(user: string) {
    return this.utilsService.user && user == this.utilsService.user.name;
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
