import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username: string = 'Malin';
  public password: string = 'aha';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage) {
  }

  login() {
    this.storage.set('user', {name: this.username});
    this.navCtrl.push(HomePage);
  }
}
