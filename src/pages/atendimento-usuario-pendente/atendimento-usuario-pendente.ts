import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-atendimento-usuario-pendente',
  templateUrl: 'atendimento-usuario-pendente.html',
})
export class AtendimentoUsuarioPendentePage {

  chamadosPendentes: Array<any> = [];

  constructor(private conexaoApi: ConexaoApiProvider, private navCtrl: NavController,
    private navParams: NavParams, private utilsPr: UtilsProvider, private statusBar: StatusBar) {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');
  }

  ionViewWillEnter() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    this.chamadosPendentes = this.navParams.get('callsPending');
  }

  cancelarChamado(materia) {

    this.conexaoApi.requisitionCancel(this.navParams.get('access_token'), materia.idCall)
      .then((data: any) => {
        this.utilsPr.alertInformation(data.message);
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
      });
  }

}
