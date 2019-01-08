import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @Input() selected: any;
  user: any;
  
  constructor(public storage: Storage) {
    this.storage.get('user').then((user: any) => {
      this.user = user.name;
    });
  }

  onEdit(id: number) {
    console.log(id);
  }
}
