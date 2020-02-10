import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {

  viewConteudo: boolean;
  viewCurso: boolean;
  viewEspaco: boolean;
  viewMetodologia: boolean;
  viewContato: boolean;

  vid = "https://www.youtube.com/embed/r5YBlFpJAsE";

  constructor(private dom: DomSanitizer, private navCtrl: NavController, private statusBar: StatusBar) {
   
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    this.viewConteudo = true;
    this.viewCurso = false;
    this.viewEspaco = false;
    this.viewMetodologia = false;
    this.viewContato = false;
  }

  ionViewDidLoad() {

  }

  backPage() {
    if(this.viewConteudo){
      this.navCtrl.setRoot(LoginPage);
    }
    else{
      this.viewConteudo = true;
      this.viewCurso = false;
      this.viewEspaco = false;
      this.viewMetodologia = false;
      this.viewContato = false;
    }
  }

  exibir(view) {
    if (view == 1) {
      this.viewConteudo = false;
      this.viewCurso = true;
      this.viewEspaco = false;
      this.viewMetodologia = false;
      this.viewContato = false;
    }
    else if (view == 2) {
      this.viewConteudo = false;
      this.viewCurso = false;
      this.viewEspaco = true;
      this.viewMetodologia = false;
      this.viewContato = false;
    }
    else if (view == 3) {
      this.viewConteudo = false;
      this.viewCurso = false;
      this.viewEspaco = false;
      this.viewMetodologia = true;
      this.viewContato = false;
    }
    else if (view == 4) {
      this.viewConteudo = false;
      this.viewCurso = false;
      this.viewEspaco = false;
      this.viewMetodologia = false;
      this.viewContato = true;
    }
    else {

    }
  }

  openEspaco() {
    this.navCtrl.push('EspacoPage');
  }

  sanitize(vid) {
    return this.dom.bypassSecurityTrustResourceUrl(vid);
  }
}
