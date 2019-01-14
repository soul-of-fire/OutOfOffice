import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UtilsService } from '../../providers/utils-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username: string = 'Malin';
  public password: string = 'aha';

  constructor(public navCtrl: NavController, 
    public utilsService: UtilsService) {
  }

  login() {
    this.utilsService.login({name: this.username});
    this.navCtrl.push(HomePage);
  }
}
