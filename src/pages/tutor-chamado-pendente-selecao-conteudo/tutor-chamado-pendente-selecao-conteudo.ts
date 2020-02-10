import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from './../../model/usuario';
import { StorageProvider } from './../../providers/storage/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { HomePage } from '../home/home';
import { UtilsProvider } from '../../providers/utils/utils';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-tutor-chamado-pendente-selecao-conteudo',
  templateUrl: 'tutor-chamado-pendente-selecao-conteudo.html',
})
export class TutorChamadoPendenteSelecaoConteudoPage {

  requisition;
  status: number;
  //Exibe os itens disponíveis para seleção do conteúdo do chamado
  listItem: Array<any> = [];
  dadosChamado: any;

  //Número de telefone para envio de mensagem no Whatsapp
  studentPhone: number;

  //Variáveis para 3º passo
  listReason: Array<any> = [];
  description: String;
  reason: String;
  //statusFinalizar: String;

  //Valida para verificar se passo 2 já foi passado e pode ir para passo 3
  validador: number;
  statusPassoTres: boolean;

  //Responsáveis pela abertura de novo chamado
  usuario: Usuario;
  viewArea: boolean;
  viewMateria: boolean;
  viewConcluir: boolean;
  viewNewCall: boolean;
  viewEncerrarAtendimento: boolean;
  chamadoAluno: any;
  areas: Array<any> = [];
  //Responsáel por armazenar as seleções dos conteúdos
  conteudoSelecionado: any;

  //2Passo
  materias: any;
  private img_materia_64: any = "data:image/png+xml;base64,";
  //3Passo
  materia: any = {};
  requisitionConcluir: any = {};

  constructor(private conexaoApi: ConexaoApiProvider, private navCtrl: NavController, private domSanitizer: DomSanitizer,
    private navParams: NavParams, private utilsPr: UtilsProvider,
    private statusBar: StatusBar, private storage: StorageProvider) {

    this.validador = 0;
    this.statusPassoTres = false;

    //Novo chamado
    this.usuario = new Usuario();
    this.viewArea = true;
    this.viewMateria = false;
    this.viewConcluir = false;
    this.viewNewCall = false;
    this.viewEncerrarAtendimento = true;

  }

  ionViewWillEnter() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    this.requisition = this.navParams.get('requisition').json();
    this.status = this.navParams.get('requisition').status;
    this.listItem = this.requisition.items;

    //Dados do chamado. Usado para validar se é uma mentoria para envio de mensagem do Whatsapp
    this.dadosChamado = this.navParams.get('chamado');

    //Valida se tutor já selecionou as opções para fechamento do chamado.
    //Se sim, basta concluir o chamado.
    if (this.status == 201) {
      this.conexaoApi.requisitionAnswer(this.requisition.id_call)
        .then((requisitionAnswer: any) => {
          //Conteúdo selecionado para exibição
          this.conteudoSelecionado = requisitionAnswer.json().themeName;
          this.studentPhone = requisitionAnswer.json().studentPhone;

          //passo 2
          this.listReason = requisitionAnswer.json().reasons;
          this.statusPassoTres = true;
        })
        .catch((error) => {
          if (error.status == 401) {
            this.utilsPr.alertError(error.json().message);
            this.navCtrl.pop();
          }
          else {
            this.utilsPr.alertError("Não foi possível continuar. Tente novamente!");
          }
        });
      this.statusPassoTres = true;
    }
    else if (this.status == 401) {
      this.utilsPr.alertInformation("Chamado em atendimento por outro tutor!");
      this.navCtrl.pop();
    }

    //REFERENTE A NOVO CHAMADO DO TUTOR PARA O ALUNO
    this.chamadoAluno = this.navParams.get('chamado');
    this.storage.getInfo("usuario")
      .then((usuario) => {
        this.usuario = usuario;
        //this.solicitarArea();
      });
  }

  //Método para continuar nos passos 2 do chamado do tutor
  //Envia status 2 para setTheme, agora com id_theme (id do item) e level_theme(level do item)
  setTheme(item) {
    //Se status 200 continua no 1º passo da validação, se status 201, vai para o 2º passo

    //Se passo 3 negativo, faz passo 1 e 2, se positivo, passo 3
    if (!this.statusPassoTres) {
      this.conexaoApi.requisitionSetTheme(this.requisition.id_call, 2, item.id, item.level)
        .then((data: any) => {
          //Se retorno status = 200, reinsere dados no listItem,
          //se 201, significa que já foi escolhido tema. Basta finalizar.
          if (data.status == 200) {
            this.listItem = data.json().items;
          }
          else {
            //Passo 2 da solicitação
            this.conexaoApi.requisitionAnswer(this.requisition.id_call)
              .then((requisitionAnswer: any) => {
                //Conteúdo selecionado para exibição
                this.conteudoSelecionado = requisitionAnswer.json().themeName;
                this.studentPhone = requisitionAnswer.json().studentPhone;

                //passo 2
                this.listReason = requisitionAnswer.json().reasons;
                this.statusPassoTres = true;
              })
              .catch((error) => {
                this.utilsPr.alertError("Não foi possível continuar. Tente novamente!");
              })
          }
        });
    }
  }

  finalizarChamado(statusFinalizar: String) {
    if ((this.description == undefined || this.description == '') ||
      (this.reason == undefined || this.reason == '')) {
      this.utilsPr.alertInformation("Preencha os dados corretamente!");
    }
    else {
      this.conexaoApi.answerRegister(this.requisition.id_call, this.description, this.reason, statusFinalizar)
        .then((data: any) => {

          if (data.status == 201) {
            this.utilsPr.alertInformation(data.json().message);
            if (statusFinalizar == 'new-call') {
              this.statusPassoTres = false;
              this.viewEncerrarAtendimento = false;
              this.viewNewCall = true;
              this.solicitarArea();
              //this.navCtrl.push('AtendimentoUsuarioMateriaPage');
            }
            else {
              this.navCtrl.setRoot(HomePage);
            }

          }
          else {
            this.utilsPr.alertError("Não foi possível finalizar o chamado. Tente novamente!");
          }
        });
    }
  }

  /****************************************************************************************************************** */
  //REFERENTE AS AÇÕES PARA ABERTURA DE NOVO CHAMADO PELO TUTOR
  solicitarArea() {
    this.utilsPr.getLocation()
      .then((coordenadas: any) => {

        //Informa o ID do aluno para que ele abra um novo chamado para esse aluno
        this.conexaoApi.requisition(this.usuario.token.access_token, this.chamadoAluno.user_id, coordenadas.lat, coordenadas.long)
          .then((requisition: any) => {
            this.areas = requisition.types;
            //Habilita visulização da área
            this.viewArea = true;
          })
          .catch((error) => {
            if (error.status == 401) {
              this.utilsPr.alertInformation(error.json().message);
            }
            else {
              this.utilsPr.alertError("Ocorreu um erro ao solicitar o atendimento. Tente novamente!");
            }
          });
      })
      .catch(() => {
        this.utilsPr.alertError("Não foi possível acessar a localização do aparelho!");
      })
  }

  solicitarAtendimento(area) {
    //Aguardando 2º passo
    this.conexaoApi.requisitionMatter(this.usuario.token.access_token, area.id, this.chamadoAluno.user_id)
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
  }

  //3º PASSO
  solicitarAtendimentoConcluir(materia) {

    this.conexaoApi.requisitionCreateAll(this.usuario.token.access_token, materia.id, this.chamadoAluno.user_id)
      .then((requisitionCreatellAll) => {
        this.materia = materia;
        this.requisitionConcluir = requisitionCreatellAll;
        this.viewArea = false;
        this.viewMateria = false;
        this.viewConcluir = true;
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

  cancelarChamado() {
    this.conexaoApi.requisitionCancel(this.usuario.token.access_token, this.requisition.id_call)
      .then((data: any) => {
        this.utilsPr.alertInformation(data.message);
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
      });
    //console.log("Cancelar: ", this.requisition,"\n",this.chamadoAluno);
  }


  mentoria() {

    if (this.studentPhone == null) {
      this.utilsPr.alertInformation(this.dadosChamado.name + ' não possui número de celular vinculado ao seu cadastro!');
    }
    else if(this.studentPhone.toString().length != 12){
      this.utilsPr.alertInformation("O número de telefone cadastrado está incompleto. Atualize-o no portal!");
    }
    else {
      window.open("https://api.whatsapp.com/send?phone=" + this.studentPhone + "&text=Olá " +
        this.dadosChamado.name + ", vamos iniciar a mentoria para o chamado " +
        this.dadosChamado.id_call + "!", '_system', 'location=yes');
    }

  }

}
