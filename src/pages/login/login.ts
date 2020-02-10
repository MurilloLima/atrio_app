import { UtilsProvider } from './../../providers/utils/utils';
import { ConexaoApiProvider } from './../../providers/conexao-api/conexao-api';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Usuario } from '../../model/usuario';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: Usuario;
  loginUsuario: string;
  senha: string;


  constructor(private conexaoAPI: ConexaoApiProvider, private storageProvider: StorageProvider,
    private navCtrl: NavController, private statusBar: StatusBar, private utilsPr: UtilsProvider) {

  }

  ionViewWillEnter() {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#153530');

    

    //Validar se tem token, se sim, ir direto.
    this.storageProvider.getInfo('usuario')
      .then((infoStorage: Usuario) => {
        //valida dado no storage. Se tem dado, valida token
        let dtAtual = new Date();
        
        if (infoStorage != null) {
          
          let dateExpiration = infoStorage.token.expires_at;
                   
          // Coloca T entre data e hora para converter em milliseconds
          if (new Date(dateExpiration.split(' ').join('T')).getTime() > dtAtual.setDate(dtAtual.getDate() - 1)) {
            //Token válido
            this.navCtrl.setRoot(HomePage);
          }
          else {
            this.storageProvider.resetStorage();
            this.navCtrl.setRoot(LoginPage);
          }
        }
        else {
          this.storageProvider.resetStorage();
          this.usuario = new Usuario();
        }
      })

  }

  login() {

    if ((this.loginUsuario == undefined || this.loginUsuario == '') ||
      (this.senha == undefined || this.senha == '')) {
      this.utilsPr.alertInformation("Preencha os dados corretamente!");
    }
    else {
      this.conexaoAPI.login(this.loginUsuario, this.senha)
        .then((login: any) => {
         
          //Valida status. Se 201, armazena token no storage local
          if (login.status == 201) {
            
            //Seta token na classe usuário para amarzenar no storage local
            this.usuario.token.access_token = login.json().access_token;
            this.usuario.token.expires_at = login.json().expires_at;

            this.conexaoAPI.detalheUsuario(this.usuario.token.access_token)
              .then((detalheUsuario: any) => {
                
                //Seta os detalhes do usuario na classe usuário para amarzenar no storage local
                this.usuario.id = detalheUsuario.id;
                this.usuario.name = detalheUsuario.name;
                this.usuario.email = detalheUsuario.image;
                this.usuario.image = detalheUsuario.image;
                this.usuario.image_extension = detalheUsuario.image_extension;
                this.usuario.tenant_id = detalheUsuario.tenant_id;
                this.usuario.academic_resp = detalheUsuario.academic_resp;
                this.usuario.roles = detalheUsuario.roles;
                this.usuario.tenant = detalheUsuario.tenant;
                //console.log("Detalhe Usuário: ", this.usuario);
                this.conexaoAPI.permissionsRole(this.usuario.token.access_token, this.usuario.roles[0].pivot.role_id)
                  .then((permissionsRole: Array<any>) => {
                    
                    //Seta permissões do usuario na classe usuário para amarzenar no storage local
                    this.usuario.permissions = permissionsRole;
                    this.storageProvider.save("usuario", this.usuario)
                      .then(() => {
                        //Caso salve os dados no Storage, vai para a tela inicial
                        this.navCtrl.setRoot(HomePage);
                      });

                  });
              });

          }
          else {
            this.utilsPr.alertError("Ocorreu um erro. Verifique conexão com a internet ou tente novamente mais tarde");
          }
        })
        .catch((error) => {
          if (error.status == 401) {
            this.utilsPr.alertError(error.json().message)
          }
          else {
            this.utilsPr.alertError("Dados informados inválidos!");
            //console.log("--> ",error);
            //this.navCtrl.setRoot(LoginPage);
            
          }
        });
    }
  }

  openSobrePage() {
    this.navCtrl.push('SobrePage');
  }

  alterarSenha() {
    if ((this.loginUsuario == undefined || this.loginUsuario == '')) {
      this.utilsPr.alertError("Para alterar a senha é necessário preencher o campo e-mail!");
    }
    else {
      this.conexaoAPI.forgot(this.loginUsuario)
        .then(() => {
          this.utilsPr.alertInformation("Nova senha enviada para o e-mail informado.");
        })
        .catch(() => {
          this.utilsPr.alertError("Não foi possível alterar a senha. Tente novamente");
        })
    }

  }

  cadastrar(){
    this.navCtrl.push('CadastrarPage');
  }

}
