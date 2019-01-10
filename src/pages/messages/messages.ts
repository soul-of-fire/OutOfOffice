import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  isOnLine: boolean = navigator.onLine;

  constructor(public navCtrl: NavController,
    public storage: Storage,
    public customEventProvider: CustomEventProvider,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.storage.get('user').then((user: any) => {
      this.user = user.name;
    });
    this.subscription = this.customEventProvider.currentEvents.subscribe(data => {
      // console.log(this.customEventProvider.calendar);
      this.selected = this.customEventProvider.onEventChange(data);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isMyMessage(user: string) {
    return this.isOnLine && this.user == user;
  }

  onEdit(ev: any) {
    let paramObj = { ev: ev };
    this.navCtrl.push(EditEventPage, paramObj);
  }

  onDelete(ev: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.customEventProvider.deleteEvent(ev.data.id);
          }
        }
      ]
    });
    alert.present();
  }
}
