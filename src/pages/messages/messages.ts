import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditEventPage } from '../add-event/edit-event';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @Input() selected: any;
  user: any;
  
  constructor(public navCtrl: NavController, 
    public storage: Storage) {
    this.storage.get('user').then((user: any) => {
      this.user = user.name;
    });
  }

  onEdit(ev: any) {
    let paramObj = { ev: ev };
    this.navCtrl.push(EditEventPage, paramObj);
  }
}
