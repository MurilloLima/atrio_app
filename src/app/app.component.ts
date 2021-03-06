import { Component } from '@angular/core';
import { LoginPage } from './../pages/login/login';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { timer } from 'rxjs/observable/timer';
//import {timer} from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  //rootPage: any = ChartsPage;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      timer(1000).subscribe(() => splashScreen.hide());
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }
}

