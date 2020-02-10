import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { Usuario } from '../../model/usuario';
import { StorageProvider } from '../../providers/storage/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-atendimento-usuario-materia',
  templateUrl: 'atendimento-usuario-materia.html',
})
export class AtendimentoUsuarioMateriaPage {

  //Exibição de áreas - 1º passo
  requisition: any;
  areas: Array<any> = [];
  usuario: Usuario;
  viewArea: boolean;

  //Exibição de matérias - 2º passo
  materias: any;
  private img_materia_64: any = "data:image/png+xml;base64,";
  viewMateria: boolean;

  //Exibição chamado concluído - 3º passo
  materia: any = {};
  viewConcluir: boolean;
  requisitionConcluir: any = {};

  constructor(private conexaoApi: ConexaoApiProvider, private domSanitizer: DomSanitizer,
    private navCtrl: NavController, private navParams: NavParams, private storage: StorageProvider,
    private statusBar: StatusBar, private utilsPr: UtilsProvider) {

    this.usuario = new Usuario();
    this.viewArea = true;
    this.viewMateria = false;
    this.viewConcluir = false;
  }

  ionViewWillEnter() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    this.storage.getInfo("usuario")
      .then((usuario) => { this.usuario = usuario; });

    this.requisition = this.navParams.get('requisition');
    this.areas = this.requisition.types;
  }

  solicitarAtendimento(area) {
    //Aguardando 2º passo
    this.conexaoApi.requisitionMatter(this.usuario.token.access_token, area.id, this.usuario.id)
      .then((rsMatter: any) => {
        //Se há matérias, exibe-as
        if (rsMatter.matters.length > 0) {
          this.viewArea = false;
          this.viewMateria = true;
          this.materias = rsMatter.matters;
          for (let i = 0; i < this.materias.length; i++) {

            this.img_materia_64 += this.materias[i].image;
            //this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

            this.materias[i].image == null || this.materias[i].image == "" ? this.materias[i].image = "assets/imgs/no-photo.jpg"
              : this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);

            //Reseta variável para não acrescentar string erroneamente
            this.img_materia_64 = "data:image/png+xml;base64,";
          }

          //Passa as matérias para a pagina de solicitação para que possa ser feito o 3º passo
          //this.navCtrl.push('AtendimentoUsuarioSolicitarPage', {rsMatter: rsMatter.matters} );
        }
        else {
          this.utilsPr.alertInformation("Não há tutores disponíveis para a área de " + area.name + "!")
        }
      })
      .catch((error) => {
        if (error.message) {
          this.utilsPr.alertError(error.message);

        }
        else {
          this.utilsPr.alertError("Não foi possível abrir chamado para essa matéria. Tente novamente!");
        }

      })
    //console.log(materia, this.requisition.sender_call);
  }

  //3º PASSO
  solicitarAtendimentoConcluir(materia) {

    this.conexaoApi.requisitionCreateAll(this.usuario.token.access_token, materia.id, this.usuario.id)
      .then((requisitionCreatellAll) => {
        this.materia = materia;
        this.requisitionConcluir = requisitionCreatellAll;
        this.viewArea = false;
        this.viewMateria = false;
        this.viewConcluir = true;
        //console.log("Veio", this.requisition,requisitionCreatellAll);
        /*this.navCtrl.push('AtendimentoUsuarioSolicitarConcluidoPage', {
          requisition: requisitionCreatellAll,
          materia: materia, access_token: this.usuario.token.access_token
        })*/
      })
      .catch((error) => {
        if (error.message) {
          this.utilsPr.alertError(error.message);
        }
        else {
          this.utilsPr.alertError("Não foi possível abrir chamado para essa matéria. Tente novamente!");
        }

      })
  }

  cancelarSolicitacao() {
    //console.log(this.materia,"\n",this.requisitionConcluir);
    this.conexaoApi.requisitionCancel(this.usuario.token.access_token, this.requisitionConcluir.id_call)
      .then((requisitionCancel: any) => {
        this.utilsPr.alertInformation(requisitionCancel.message)
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.utilsPr.alertError("Não foi possível cancelar a solicitação. Tente novamente!")
      })
  }

}
