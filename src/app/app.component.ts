import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'Firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

const config = {
  apiKey: "AIzaSyA8KgBLcopXU-9ujcsTq-AZ2XsJs_HLoQA",
  authDomain: "calendar-18888.firebaseapp.com",
  databaseURL: "https://calendar-18888.firebaseio.com/",
  storageBucket: "calendar-18888.appspot.com"
};