import { HomePage } from './../home/home';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-tutor-chamado-pendente',
  templateUrl: 'tutor-chamado-pendente.html',
})
export class TutorChamadoPendentePage {

  chamadosPendente: Array<any> = [];
  private img_materia_64: any = "data:image/png+xml;base64,";
  type: boolean;
  phoneNumber:number;


  constructor(private conexaoApi: ConexaoApiProvider, private domSanitizer: DomSanitizer,
    private statusBar: StatusBar, private utilsPr: UtilsProvider, private navParams: NavParams,private navCtrl: NavController ) {

    this.type = true;
    this.phoneNumber=553491228279;
  }

  ionViewWillEnter() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');
    //this.type = this.navParams.get('type');
    //Se página está voltando do POP após tutor abrir chamado para aluno
    //Se não, recebe da página home os chamados. Type==1 veio do home

    if (this.type) {
      this.chamadosPendente = this.navParams.get('chamado');

      for (let i = 0; i < this.chamadosPendente.length; i++) {

        this.img_materia_64 += this.chamadosPendente[i].image;
        //this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

        this.chamadosPendente[i].image == null || this.chamadosPendente[i].image == "" ? this.chamadosPendente[i].image = "assets/imgs/no-photo.jpg"
          : this.chamadosPendente[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

        //Reseta variável para não acrescentar string erroneamente
        this.img_materia_64 = "data:image/png+xml;base64,";
      }
      this.type = !this.type;
    }
    else {
      this.conexaoApi.requisitionPending(this.navParams.get('access_token'))
        .then((request: any) => {
          if (request.requests.length > 0) {
            this.chamadosPendente = request.requests;
            for (let i = 0; i < this.chamadosPendente.length; i++) {

              this.img_materia_64 += this.chamadosPendente[i].image;
              //this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

              this.chamadosPendente[i].image == null || this.chamadosPendente[i].image == "" ? this.chamadosPendente[i].image = "assets/imgs/no-photo.jpg"
                : this.chamadosPendente[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

              //Reseta variável para não acrescentar string erroneamente
              this.img_materia_64 = "data:image/png+xml;base64,";
            }
          }
          else {
            this.navCtrl.setRoot(HomePage);
          }
        });
    }

  }


  //1º PASSO (SELEÇÃO DO CONTEÚDO DO CHAMADO) // Deve ser repetido até API retornar status 201
  //Envia o 1 status, que é somente o chamado.id para trazer os itens
  requisitionSetTheme(chamado) {
    this.conexaoApi.requisitionSetTheme(chamado.id_call, 1)
      .then((requisition: any) => {
        this.navCtrl.push('TutorChamadoPendenteSelecaoConteudoPage', { requisition: requisition, chamado: chamado })
      })
      .catch((error) => this.utilsPr.alertError("Não foi possível fazer essa operação. Tente novamente!"));
  }

  cancelarChamado(chamado) {
    this.conexaoApi.requisitionCancel(this.navParams.get('access_token'), chamado.id_call)
      .then((data: any) => {
        this.utilsPr.alertInformation(data.message);
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
      });
  }


}
