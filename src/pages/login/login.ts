import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EventService } from '../../providers/event-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username: string = 'Malin';
  public password: string = 'aha';

  constructor(public navCtrl: NavController, 
    public eventService: EventService) {
  }

  login() {
    this.eventService.login({name: this.username});
    this.navCtrl.push(HomePage);
  }
}
