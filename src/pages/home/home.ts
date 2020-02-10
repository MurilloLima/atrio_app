import { UtilsProvider } from './../../providers/utils/utils';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Select } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from '../../model/usuario';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { LoginPage } from '../login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { ScheduleProvider } from '../../providers/utils/schedule';
import { Chart } from 'chart.js';
import { BackgroundMode } from '@ionic-native/background-mode';
import { GraficoUsuarioProvider } from '../../providers/grafico/grafico-usuario';

declare const Pusher: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pusher: any;

  private img_user_64: any = "data:image/png+xml;base64,";
  image_user;
  usuario: Usuario;
  listTenant: Array<any>;
  tenantIdSave: number;

  //Variáveis para exibição de componentes ao usuário
  viewAbrirChamado: boolean;
  viewChamadoPendente: boolean;
  viewGraficoGerencial: boolean;
  viewRelatorio: boolean;
  iconRelatorio: String;

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("doughnutCanvasMatter") doughnutCanvasMatter: ElementRef;

  @ViewChild('sectionSelect') sectionSelect: Select;

  private dtIniGrafico: String;
  private dtFimGrafico: String;


  constructor(private conexaoApi: ConexaoApiProvider, private domSanitizer: DomSanitizer,
    private graficoUsPr: GraficoUsuarioProvider, private navCtrl: NavController, private storage: StorageProvider,
    private statusBar: StatusBar, private utilsPr: UtilsProvider, private schedule: ScheduleProvider,
    private backgroundMode: BackgroundMode, private storageProvider: StorageProvider) {

    this.usuario = new Usuario();
    this.viewRelatorio = false;
    this.iconRelatorio = "eye";

  }

  ionViewDidLoad() {
    //VALIDAR QUESTÃO CONST DO PUSHER PARA FECHAR O CHANAL

    this.backgroundMode.enable();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#3b041b');
    // Pusher.logToConsole = true;

    this.storage.getInfo("usuario")
      .then((usuario) => {

        this.usuario = usuario;
        //VALIDAR PARA QUE SÓ CARREGAR A PÁGINA APÓS VALIDAR PERMISSÕES
        //PERMISSÕES DE VISUALIZAÇÃO ALUNO E TUTOR
        this.validarPermissaoExibirComponenteUsuario(this.usuario.permissions);
        this.img_user_64 += this.usuario.image;
        this.usuario.image == null || this.usuario.image == "" ? this.image_user = "assets/imgs/no-photo.jpg"
          : this.image_user = this.domSanitizer.bypassSecurityTrustUrl(this.img_user_64);


        //CONFIGURAÇÃO PARA ABRIR CHANNEL NO PUSHER
        this.pusher = new Pusher('263f11c480ae605a75bb', {
          cluster: 'us2',
          forceTLS: true
        });
        var channel = this.pusher.subscribe('App.User.' + this.usuario.id);
        channel.bind('App\\Events\\StatusRequisitions', (data) => {
          this.schedule.createSchedule(data);
        });

        //LISTAR OS TENANTS
        this.conexaoApi.userListTenants(this.usuario.token.access_token)
          .then((tenant: any) => {
            this.listTenant = [];
            this.listTenant = tenant.result;
          })
          .catch(() => { this.utilsPr.alertError("Não foi possível listar os campos disponíveis!") });

      })

  }

  openAtendimentoPageAluno() {
    this.navCtrl.push('AtendimentoUsuarioPage');
  }

  chamadosPendentesTutor() {
    this.conexaoApi.requisitionPending(this.usuario.token.access_token)
      .then((request: any) => {
        if (request.requests.length > 0) {
          this.navCtrl.push('TutorChamadoPendentePage', {
            chamado: request.requests,
            access_token: this.usuario.token.access_token,
            type: true
          });
        }
        else {
          this.utilsPr.alertInformation("Não há chamados pendentes!");
        }
      });
  }

  logout() {
    this.conexaoApi.logout(this.usuario.token.access_token)
      .then(() => {
        this.storage.resetStorage();
        this.usuario = new Usuario();
        this.pusher.disconnect();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(() => {
        this.storage.resetStorage();
        this.usuario = new Usuario();
        this.navCtrl.setRoot(LoginPage);
      })
  }

  //Valida quais as permissões que o usuário possui para visualizar componentes
  private validarPermissaoExibirComponenteUsuario(listPermission: Array<any>) {

    //Verifica se pode abrir chamado. É aluno.
    let abrirChamado = listPermission.filter((rsAbrirchamado) => {
      return rsAbrirchamado.permission_id === "10"
    })

    this.viewAbrirChamado = abrirChamado.length > 0 ? true : false;

    //Gráfico é só para aluno, se viewAbrirChamado é true, significa que é aluno, chama método
    if (this.viewAbrirChamado) {
      //Visualização de gráficos
      this.exibirGraficos();
    }
    //Verifica se pode visualizar chamados pendentes para tutor. É tutor.
    let chamadoPendente = listPermission.filter((rsChamadoPendente) => {
      return rsChamadoPendente.permission_id === "9"
    })
    this.viewChamadoPendente = chamadoPendente.length > 0 ? true : false;

    //Valida se possui permissão de Dashboard, que são gráficos gerenciais
    let dashboard = listPermission.filter((rsDashboard) => {
      return rsDashboard.permission_id === "13"
    })
    this.viewGraficoGerencial = dashboard.length > 0 ? true : false;
  }

  //Ao escolher período, validar se é necessário chamar o método para buscar os valroes dos gráficos
  exibirGraficosPeriodo() {
    if (this.dtIniGrafico != null && this.dtFimGrafico != null) {
      this.exibirGraficos();
    }
  }

  exibirGraficos() {
    this.graficoUsPr.dashboardStudentCallsClassification(this.usuario.token.access_token, this.usuario.id,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutCanvas.nativeElement, data);
      })

    this.graficoUsPr.dashboardStudentCallsMatter(this.usuario.token.access_token, this.usuario.id,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutCanvasMatter.nativeElement, data);
      })

  }

  exibirRelatorio() {
    this.viewRelatorio = !this.viewRelatorio;
    //Troca o ícone de acordo com o clique
    if (this.iconRelatorio == "eye") {
      this.iconRelatorio = "eye-off";
    }
    else {
      this.iconRelatorio = "eye";
    }
  }

  changeTenant() {
    this.sectionSelect.open();
  }

  saveTenant() {

    this.conexaoApi.userAlterTenant(this.usuario.token.access_token, this.tenantIdSave)
      .then((data: any) => {
        //Para alterar o tenant, é necessário recarregar as informações do usuário, para que ao recarregar
        //a página, no storage esteja os dados atualizados
        this.recarregarInfoUsuario(data.result);
      })
      .catch(() => {
        this.utilsPr.alertError("Não foi possível alterar o campus!");
      });
  }

  recarregarInfoUsuario(mensagem: string) {
    //recarregar informações do usuário para atualizar Tenant
    this.conexaoApi.detalheUsuario(this.usuario.token.access_token)
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

        this.conexaoApi.permissionsRole(this.usuario.token.access_token, this.usuario.roles[0].pivot.role_id)
          .then((permissionsRole: Array<any>) => {

            //Seta permissões do usuario na classe usuário para amarzenar no storage local
            this.usuario.permissions = permissionsRole;
            this.storageProvider.save("usuario", this.usuario)
              .then(() => {
                //Caso salve os dados no Storage, vai para a tela inicial
                this.utilsPr.alertInformation(mensagem);
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
              });

          });
      });
  }


  openTutorRegistroPontoPage() {
    this.navCtrl.push('TutorRegistroPontoPage', { access_token: this.usuario.token.access_token });
  }

  openGraficoGerencial() {
    this.navCtrl.push('GraficoGerencialPage');
  }

}
