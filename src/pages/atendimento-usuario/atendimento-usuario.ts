import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { StorageProvider } from '../../providers/storage/storage';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-atendimento-usuario',
  templateUrl: 'atendimento-usuario.html',
})
export class AtendimentoUsuarioPage {

  usuario: Usuario;
  listTutorDisponivel: Array<any>;
  //private img_user_64: any = "data:image/png+xml;base64,";
  image_user_toolbar: any;

  constructor(private conexaoApi: ConexaoApiProvider, private domSanitizer: DomSanitizer, private navCtrl: NavController,
    private storage: StorageProvider, private statusBar: StatusBar, private utilsPr: UtilsProvider) {

    this.usuario = new Usuario()
  }

  ionViewWillEnter() {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    this.storage.getInfo("usuario")
      .then((usuario) => {
        this.usuario = usuario;

        let img_user_64: any = "data:image/png+xml;base64,"
        img_user_64 += this.usuario.image;
        this.image_user_toolbar = this.domSanitizer.bypassSecurityTrustUrl(img_user_64);

        this.conexaoApi.tutorsJob(this.usuario.token.access_token)
          .then((tutores: any) => {
            this.listTutorDisponivel = tutores.json();
            this.convertImageTo64(this.listTutorDisponivel);
          })
          .catch((error) => this.utilsPr.alertInformation('Não há tutores disponíveis!'));
      });
  }

  solicitarAtendimento() {
    this.utilsPr.getLocation()
      .then((coordenadas: any) => {
        this.conexaoApi.requisition(this.usuario.token.access_token, this.usuario.id, coordenadas.lat, coordenadas.long)
          .then((requisition: any) => {
            //Retorna as matérias que o aluno pode solicitar atendimento. Envia a lista para página de seleção
            //Após seleção da matéria, acessa a pagina para aluno escolher a matéria e solicitar o atendimento
            this.navCtrl.push('AtendimentoUsuarioMateriaPage', { requisition: requisition });
          })
          .catch((error) => {
            if(error.status ==401){
              this.utilsPr.alertInformation(error.json().message);
            }
            else{
              this.utilsPr.alertError("Ocorreu um erro ao solicitar o atendimento. Tente novamente!");
            }
          });       
      })
      .catch(()=>{
        this.utilsPr.alertError("Não foi possível acessar a localização do aparelho!");
      })
  }

  chamadosPendentes() {
    this.conexaoApi.myCallsDatePending(this.usuario.token.access_token)
      .then((callsPending: any) => {
        if (callsPending.length > 0) {
          //Lista os chamados pendentes e chama a tela para listar os chamados. Na tela é possível cancelar cada chamado
          this.navCtrl.push('AtendimentoUsuarioPendentePage',
            { callsPending: callsPending, access_token: this.usuario.token.access_token });
        }
        else {
          this.utilsPr.alertInformation("Não há chamados pendentes!");
        }

      })
      .catch(() => {
        this.utilsPr.alertError("Não foi possível listar os chamados pendentes. Tente novamente!");
      })
  }

  convertImageTo64(listTutor: Array<any>) {

    for (let i = 0; i < listTutor.length; i++) {
      let img_user_64: any = "";
      img_user_64 = "data:image/png+xml;base64,"
      img_user_64 += this.listTutorDisponivel[i].image;

      let image = this.listTutorDisponivel[i].image;
      image == null || image == "" ? image = "assets/imgs/no-photo.jpg"
        : image = this.domSanitizer.bypassSecurityTrustUrl(img_user_64);
      //console.log("Image: ", image);
      this.listTutorDisponivel[i].image = image;

      //this.image_user_toolbar = this.listTutorDisponivel[0].image;
    }

  }


}
