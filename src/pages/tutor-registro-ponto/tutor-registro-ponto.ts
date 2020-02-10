import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { UtilsProvider } from '../../providers/utils/utils';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-tutor-registro-ponto',
  templateUrl: 'tutor-registro-ponto.html',
})
export class TutorRegistroPontoPage {

  //Variável para verificar se é entrada(true) ou saída(false) no registro do ponto
  //tipoRegistro: string;

  constructor(private conexaoApi: ConexaoApiProvider, private navCtrl: NavController,
    private navParams: NavParams, private utilsPr: UtilsProvider, private statusBar: StatusBar) {

  }

  ionViewWillEnter() {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');
  }

  registrar(tipoRegistro: string) {
    if (tipoRegistro == 'entrada') {
      this.conexaoApi.arrival(this.navParams.get('access_token'))
        .then((registro: any) => {
          this.utilsPr.alertInformation(registro.message);
          this.navCtrl.pop()
        })
        .catch((error) => {
          if (error.status == 401) {
            this.utilsPr.alertError(error.json().message);
          }
          else {
            this.utilsPr.alertError("Não foi possível registrar a entrada do ponto. Tente novamente!");
          }

        });
    }
    else {
      this.conexaoApi.departure(this.navParams.get('access_token'))
        .then((registro: any) => {
          this.utilsPr.alertInformation(registro.message);
          this.navCtrl.pop();
        })
        .catch((error) => {
          if (error.status == 401) {
            this.utilsPr.alertError(error.json().message);
          }
          else {
            this.utilsPr.alertError("Não foi possível registrar a saída do ponto. Tente novamente!");
          }
        });
    }
  }

}
