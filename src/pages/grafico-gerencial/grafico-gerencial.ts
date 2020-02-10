import { GraficoManagerTutorProvider } from './../../providers/grafico/grafico-manager-tutor';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { IonicPage, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Usuario } from '../../model/usuario';
import { StorageProvider } from '../../providers/storage/storage';
import { GraficoManagerChamadoProvider } from '../../providers/grafico/grafico-manager-chamado';
import { GraficoManagerMateriaProvider } from '../../providers/grafico/grafico-manager-materia';
import { GraficoUtilsProvider } from '../../providers/grafico/grafico-utils';
import { GraficoManagerAlunoProvider } from '../../providers/grafico/grafico-manager-aluno';
import { timer } from 'rxjs/observable/timer';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-grafico-gerencial',
  templateUrl: 'grafico-gerencial.html',
})
export class GraficoGerencialPage {

  private usuario: Usuario;

  //Opções padrão gráfico
  dtIniGrafico: String;
  dtFimGrafico: String;
  tipoEspecificacao: number;
  //Fim opções padrão gráfico

  //Título usado na exibição dos gráficos
  titulo: String;

  //Exibição das opções das especificações dos gráficos
  opcaoGrafico: Array<any>;
  opcaoGraficoTeste: Array<any>;

  //** */Visualização de componentes
  viewPeriodo: boolean;
  //Compenente para exibir os gráficos
  //Visuaizar as especificações do gráfico
  viewEspecificacaoGrafico: boolean;
  viewEspecificacaoMateria: boolean;
  viewGraficoChamado: boolean;
  viewRestartParametros: boolean;

  //Componentes de exibição do gráfico -> POR CHAMADO
  @ViewChild("doughnutChamadoPorMateria") doughnutChamadoPorMateria: ElementRef;
  @ViewChild("doughnutChamadoPorTutor") doughnutChamadoPorTutor: ElementRef;
  @ViewChild("lineChamadoPorHora") lineChamadoPorHora: ElementRef;
  @ViewChild("barTopTenAlMaCh") barTopTenAlMaCh: ElementRef;
  @ViewChild("barTopLessTenAlMaCh") barTopLessTenAlMaCh: ElementRef;

  //COMPONENTES ITEM POR MATÉRIA
  listMateria: Array<any>;
  viewGraficoMateria: boolean;
  materia: String;

  @ViewChild("doughnutMatAtTut") doughnutMatAtTut: ElementRef;
  @ViewChild("doughnutMatDuvMat") doughnutMatDuvMat: ElementRef;
  @ViewChild("lineMatChHoMa") lineMatChHoMa: ElementRef;
  @ViewChild("barMatTenMaCh") barMatTenMaCh: ElementRef;
  @ViewChild("barMatTenMeCh") barMatTenMeCh: ElementRef;

  //COMPONENTES ITEM POR ALUNO e POR TUTOR
  viewEspecificacaoAluno: boolean;
  name: String;
  listParametro: Array<any>;
  viewGraficoAluno: boolean;
  //Usado para incrementar o Scrool
  private listParametroResult: Array<any>;
  private page = 1;
  private perPage = 0;
  /* tslint:disable:no-unused-variable */
  private totalPage = 0;

  @ViewChild("doughnutAlChAlMa") doughnutAlChAlMa: ElementRef;
  @ViewChild("doughnutAlAtePorClas") doughnutAlAtePorClas: ElementRef;

  //Parâmetros especificação tutor
  viewGraficoTutor: boolean;
  @ViewChild("doughnutTutChMat") doughnutTutChMat: ElementRef;
  @ViewChild("doughnutTutChCl") doughnutTutChCl: ElementRef;
  @ViewChild("lineTutAtHoTut") lineTutAtHoTut: ElementRef;


  constructor(private graUtils: GraficoUtilsProvider, private grGerCha: GraficoManagerChamadoProvider,
    private grGerMat: GraficoManagerMateriaProvider, private grGerAl: GraficoManagerAlunoProvider,
    private grGerTut: GraficoManagerTutorProvider, private loadingCtrl: LoadingController,
    private statusBar: StatusBar, private storage: StorageProvider, private utilsPr: UtilsProvider) {

    this.usuario = new Usuario();
  }


  ionViewDidLoad() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');
    this.iniciarProcesso();
    this.storage.getInfo("usuario")
      .then((usuario) => {
        this.usuario = usuario;
        //this.teste();
      });
  }

  exibirPeriodo(tipo: number) {
    this.viewPeriodo = !this.viewPeriodo;
    this.viewRestartParametros = !this.viewRestartParametros;
    this.viewEspecificacaoGrafico = !this.viewEspecificacaoGrafico;
    this.tipoEspecificacao = tipo;
    this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;
  }

  //Ao escolher período, validar se é necessário chamar o método para buscar os valores dos gráficos
  validarPeriodo() {
    if (this.dtIniGrafico != null && this.dtFimGrafico != null) {
      //Libera opção para visualizar graficos do chamado
      //
      this.validarOpcaoGrafico();
      //this.materiaTeste();
    }
  }

  validarOpcaoGrafico() {
    //Opção de chamado
    if (this.tipoEspecificacao == 1) {
      this.viewGraficoChamado = true;
      this.viewPeriodo = false;
      this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;

      this.graficoChamado();
    }
    else {

      if (this.tipoEspecificacao == 2) {

        this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;

        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Aguarde, carregando os dados...'
        });
        loading.present();

        //Listar exibição de parâmetros para matéria
        this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por matéria")
          .then((data: any, ) => {
            loading.dismiss();
            //ao usar o loading, o ion-list fica estático. Necessário dar um timer para que o loading
            //saia da tela totalmente para depois continuar. Deve ser feito com ion-list com vários itens
            timer(300).subscribe(() => {
              this.listMateria = data.items;
              this.viewPeriodo = false;
              this.viewEspecificacaoMateria = true;
            })

          })
          .catch((error) => {
            loading.dismiss();
            this.utilsPr.alertError("Não foi possível carregar os dados!");
          })
      }
      else {
        if (this.tipoEspecificacao == 3) {
          this.viewGraficoChamado = false;
          this.viewPeriodo = false;
          this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;

          let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, carregando os dados...'
          });
          loading.present();

          //Listar exibição de parâmetros para aluno
          this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por aluno")
            .then((data: any) => {
              loading.dismiss();
              this.viewEspecificacaoAluno = true;
              this.listParametroResult = data.items;

              for (let i = 0; i <= 20; i++) {
                this.listParametro.push(this.listParametroResult[i]);
              }
              this.perPage = 20;
              this.totalPage = 20;

            })
            .catch((error) => {
              loading.dismiss();
              this.utilsPr.alertError("Não foi possível carregar os dados!");
            })
        }
        //Listar exibição de parâmetros para tutor
        else {
          this.viewGraficoChamado = false;
          this.viewPeriodo = false;
          this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;

          let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, carregando os dados...'
          });
          loading.present();

          this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por tutor")
            .then((data: any) => {

              loading.dismiss();
              this.viewEspecificacaoAluno = true;
              this.listParametroResult = data.items;

              for (let i = 0; i <= 20; i++) {
                this.listParametro.push(this.listParametroResult[i]);
              }
              this.perPage = 20;
              //this.totalData = this.listAlunoResult.length;
              this.totalPage = 20;
            })
            .catch((error) => {
              loading.dismiss();
              this.utilsPr.alertError("Não foi possível carregar os dados!");
            })
        }
      }
    }
  }

  //CHAMADA DE MÉTODOS PARA CHAMADOS
  private graficoChamado() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, gerando os gráficos...'
    });
    loading.present();
    //GRÁFICO DE OPÇÃO CHAMADO
    //Chamados por matéria
    this.grGerCha.dashboardCallsToMatter(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutChamadoPorMateria.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por materia'")
       });

    //Chamados por tutor
    this.grGerCha.dashboardCallsToDest(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutChamadoPorTutor.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por tutor'")
       });

    //Chamados por Hora
    this.grGerCha.dashboardCallsToHour(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.lineChamadoPorHora.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'")
       });

    //Top 10 alunos mais chamados
    this.grGerCha.dashboardCallsToOriTopTenDesc(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.barTopTenAlMaCh.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com mais chamados'")
       });

    //Top 10 alunos menos chamados
    this.grGerCha.dashboardCallsToOriTopTen(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.barTopLessTenAlMaCh.nativeElement, data);
        loading.dismiss();
      })
      .catch(() => {
        loading.dismiss();
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com menos chamados'")
       });
  }

  //CHAMADA DE MÉTODOS PARA MATÉRIA
  private graficoMateria(idMatter: number, nameMatter: String) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, gerando os gráficos...'
    });
    loading.present();

    this.viewGraficoMateria = true;
    this.viewEspecificacaoMateria = false;
    this.materia = nameMatter;

    //Qtde de atendimentos tutores por matéria
    this.grGerMat.dashboardCallsToMatter(this.usuario.token.access_token, idMatter,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutMatAtTut.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados do gráfico 'Atendimentos tutores'!");
       });

    //Qtde classificação duvidas por matéria
    this.grGerMat.dashboardCallsToReasonMatter(this.usuario.token.access_token, idMatter,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutMatDuvMat.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Classificação de dúvidas'!");
       });

    //Top 10 alunos com mais chamados por matéria
    this.grGerMat.dashboardCallsToMatterTopTenDesc(this.usuario.token.access_token, idMatter,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.barMatTenMaCh.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com mais chamados por matéria'!");
       });

    //Top 10 alunos com menos chamados por matéria
    this.grGerMat.dashboardCallsToMatterTopTenAsc(this.usuario.token.access_token, idMatter,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.barMatTenMeCh.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com menos chamados por matéria'!");
      })

    //Chamados por hora e matéria
    this.grGerMat.dashboardCallsToHourMatter(this.usuario.token.access_token, idMatter,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.lineMatChHoMa.nativeElement, data);
        loading.dismiss();
      })
      .catch(() => {
        loading.dismiss();
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'!");
      });
  }

  //Como o scroll infinito é usado por tutor e aluno, é necessário diferenciar, para chamar o gráfico correto
  validarGraficoAlunoTutor(id: number, name: String) {
    if (this.tipoEspecificacao == 3) {
      this.graficoAluno(id, name);
    }
    else {
      if (this.tipoEspecificacao == 4) {
        this.graficoTutor(id, name);
      }
    }
  }

  //CHAMADO DE GRÁFICOS GERENCIAL PARA ALUNO
  private graficoAluno(idStudent, nameAluno) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, gerando os gráficos...'
    });
    loading.present();

    this.name = nameAluno;
    this.viewEspecificacaoAluno = false;
    this.viewGraficoAluno = true;

    //Chamados por aluno e matéria
    this.grGerAl.dashboardCallsToStudentMatter(this.usuario.token.access_token, idStudent,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutAlChAlMa.nativeElement, data);
      })
      .catch(()=>{
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por matéria'!");
      });

    //Atendimento por classificação
    this.grGerAl.dashboardStudentCallsClassification(this.usuario.token.access_token, idStudent,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        loading.dismiss();
        new Chart(this.doughnutAlAtePorClas.nativeElement, data);
      })
      .catch(() => {
        loading.dismiss();
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Atendimentos por classificação'!");
      });
  }

  //GRÁFICOS PARA TUTOR
  private graficoTutor(idTutor, nameTutor) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, gerando os gráficos...'
    });
    loading.present();

    this.viewEspecificacaoAluno = false;
    this.viewGraficoTutor = true;
    this.name = nameTutor;

    //Atendimento por matéria
    this.grGerTut.dashboardCallsToTutorMatter(this.usuario.token.access_token, idTutor,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutTutChMat.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por matéria'!");
       });

    //Chamados por classificação
    this.grGerTut.dashboardCallsToReasonTutor(this.usuario.token.access_token, idTutor,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        new Chart(this.doughnutTutChCl.nativeElement, data);
      })
      .catch(() => {
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por classificação'!");
       });

    //Atendimentos por hora e tutor
    this.grGerTut.dashboardAnswearToHourTutor(this.usuario.token.access_token, idTutor,
      this.dtIniGrafico, this.dtFimGrafico)
      .then((data) => {
        loading.dismiss();
        new Chart(this.lineTutAtHoTut.nativeElement, data);
      })
      .catch(() => {
        loading.dismiss();
        this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'!");
      });
  }

  //Inicia o processo de consulta de gráficos
  iniciarProcesso() {

    //Listas
    this.listParametro = [];
    this.listParametroResult = [];
    this.listMateria = [];
    this.opcaoGrafico = [];

    //Adiciona dados a opções do gráfico
    this.opcaoGrafico[0] = ({ name: 'Chamados', tipo: 1, titulo: 'Chamados' });
    this.opcaoGrafico[1] = ({ name: 'Por matéria', tipo: 2, titulo: 'Por Matéria' });
    this.opcaoGrafico[2] = ({ name: 'Por aluno', tipo: 3, titulo: 'Por Aluno' });
    this.opcaoGrafico[3] = ({ name: 'Por tutor', tipo: 4, titulo: 'Por Tutor' });

    this.titulo = "";

    //Seta as visualizações
    this.viewEspecificacaoGrafico = true;
    this.viewGraficoChamado = false;
    this.viewEspecificacaoMateria = false;
    this.viewPeriodo = false;
    this.viewGraficoMateria = false;
    this.viewEspecificacaoAluno = false;
    this.viewGraficoAluno = false;
    this.viewGraficoTutor = false;
    this.viewRestartParametros = false;

    //Datas
    this.dtIniGrafico = null;
    this.dtFimGrafico = null;

  }

  //**INFINITE SCROLL - listagem por etapas da lista de alunos e tutores ************************/

  doInfinite(infiniteScroll) {

    this.totalPage = this.page * 20;

    setTimeout(() => {
      let result = this.listParametroResult.slice(this.page * 20);

      for (let i = 1; i <= this.perPage; i++) {
        if (result[i] != undefined) {
          this.listParametro.push(result[i]);
        }

      }

      this.page += 1;
      infiniteScroll.complete();
    }, 2000);
  }

  //Procura itens na listagem de parametros
  procurarItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listParametro = this.listParametroResult.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  cancelProcurar(ev: any) {
    this.validarOpcaoGrafico();
  }
  /**FIM INFINITE SCROLL ********************************************/

}
