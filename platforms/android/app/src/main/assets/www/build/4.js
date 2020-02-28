webpackJsonp([4],{

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraficoGerencialPageModule", function() { return GraficoGerencialPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_gerencial__ = __webpack_require__(609);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GraficoGerencialPageModule = /** @class */ (function () {
    function GraficoGerencialPageModule() {
    }
    GraficoGerencialPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__grafico_gerencial__["a" /* GraficoGerencialPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__grafico_gerencial__["a" /* GraficoGerencialPage */]),
            ],
        })
    ], GraficoGerencialPageModule);
    return GraficoGerencialPageModule;
}());

//# sourceMappingURL=grafico-gerencial.module.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoGerencialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_grafico_grafico_manager_tutor__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_usuario__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_storage_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_grafico_grafico_manager_chamado__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_grafico_grafico_manager_materia__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_grafico_grafico_utils__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_grafico_grafico_manager_aluno__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_observable_timer__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_utils_utils__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var GraficoGerencialPage = /** @class */ (function () {
    function GraficoGerencialPage(graUtils, grGerCha, grGerMat, grGerAl, grGerTut, loadingCtrl, statusBar, storage, utilsPr) {
        this.graUtils = graUtils;
        this.grGerCha = grGerCha;
        this.grGerMat = grGerMat;
        this.grGerAl = grGerAl;
        this.grGerTut = grGerTut;
        this.loadingCtrl = loadingCtrl;
        this.statusBar = statusBar;
        this.storage = storage;
        this.utilsPr = utilsPr;
        this.page = 1;
        this.perPage = 0;
        /* tslint:disable:no-unused-variable */
        this.totalPage = 0;
        this.usuario = new __WEBPACK_IMPORTED_MODULE_5__model_usuario__["a" /* Usuario */]();
    }
    GraficoGerencialPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        this.iniciarProcesso();
        this.storage.getInfo("usuario")
            .then(function (usuario) {
            _this.usuario = usuario;
            //this.teste();
        });
    };
    GraficoGerencialPage.prototype.exibirPeriodo = function (tipo) {
        this.viewPeriodo = !this.viewPeriodo;
        this.viewRestartParametros = !this.viewRestartParametros;
        this.viewEspecificacaoGrafico = !this.viewEspecificacaoGrafico;
        this.tipoEspecificacao = tipo;
        this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;
    };
    //Ao escolher período, validar se é necessário chamar o método para buscar os valores dos gráficos
    GraficoGerencialPage.prototype.validarPeriodo = function () {
        if (this.dtIniGrafico != null && this.dtFimGrafico != null) {
            //Libera opção para visualizar graficos do chamado
            //
            this.validarOpcaoGrafico();
            //this.materiaTeste();
        }
    };
    GraficoGerencialPage.prototype.validarOpcaoGrafico = function () {
        var _this = this;
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
                var loading_1 = this.loadingCtrl.create({
                    spinner: 'bubbles',
                    content: 'Aguarde, carregando os dados...'
                });
                loading_1.present();
                //Listar exibição de parâmetros para matéria
                this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por matéria")
                    .then(function (data) {
                    loading_1.dismiss();
                    //ao usar o loading, o ion-list fica estático. Necessário dar um timer para que o loading
                    //saia da tela totalmente para depois continuar. Deve ser feito com ion-list com vários itens
                    Object(__WEBPACK_IMPORTED_MODULE_11_rxjs_observable_timer__["timer"])(300).subscribe(function () {
                        _this.listMateria = data.items;
                        _this.viewPeriodo = false;
                        _this.viewEspecificacaoMateria = true;
                    });
                })
                    .catch(function (error) {
                    loading_1.dismiss();
                    _this.utilsPr.alertError("Não foi possível carregar os dados!");
                });
            }
            else {
                if (this.tipoEspecificacao == 3) {
                    this.viewGraficoChamado = false;
                    this.viewPeriodo = false;
                    this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;
                    var loading_2 = this.loadingCtrl.create({
                        spinner: 'bubbles',
                        content: 'Aguarde, carregando os dados...'
                    });
                    loading_2.present();
                    //Listar exibição de parâmetros para aluno
                    this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por aluno")
                        .then(function (data) {
                        loading_2.dismiss();
                        _this.viewEspecificacaoAluno = true;
                        _this.listParametroResult = data.items;
                        for (var i = 0; i <= 20; i++) {
                            _this.listParametro.push(_this.listParametroResult[i]);
                        }
                        _this.perPage = 20;
                        _this.totalPage = 20;
                    })
                        .catch(function (error) {
                        loading_2.dismiss();
                        _this.utilsPr.alertError("Não foi possível carregar os dados!");
                    });
                }
                //Listar exibição de parâmetros para tutor
                else {
                    this.viewGraficoChamado = false;
                    this.viewPeriodo = false;
                    this.titulo = this.opcaoGrafico[this.tipoEspecificacao - 1].titulo;
                    var loading_3 = this.loadingCtrl.create({
                        spinner: 'bubbles',
                        content: 'Aguarde, carregando os dados...'
                    });
                    loading_3.present();
                    this.graUtils.dashboardSelectParams(this.usuario.token.access_token, "Por tutor")
                        .then(function (data) {
                        loading_3.dismiss();
                        _this.viewEspecificacaoAluno = true;
                        _this.listParametroResult = data.items;
                        for (var i = 0; i <= 20; i++) {
                            _this.listParametro.push(_this.listParametroResult[i]);
                        }
                        _this.perPage = 20;
                        //this.totalData = this.listAlunoResult.length;
                        _this.totalPage = 20;
                    })
                        .catch(function (error) {
                        loading_3.dismiss();
                        _this.utilsPr.alertError("Não foi possível carregar os dados!");
                    });
                }
            }
        }
    };
    //CHAMADA DE MÉTODOS PARA CHAMADOS
    GraficoGerencialPage.prototype.graficoChamado = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, gerando os gráficos...'
        });
        loading.present();
        //GRÁFICO DE OPÇÃO CHAMADO
        //Chamados por matéria
        this.grGerCha.dashboardCallsToMatter(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutChamadoPorMateria.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por materia'");
        });
        //Chamados por tutor
        this.grGerCha.dashboardCallsToDest(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutChamadoPorTutor.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por tutor'");
        });
        //Chamados por Hora
        this.grGerCha.dashboardCallsToHour(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.lineChamadoPorHora.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'");
        });
        //Top 10 alunos mais chamados
        this.grGerCha.dashboardCallsToOriTopTenDesc(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.barTopTenAlMaCh.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com mais chamados'");
        });
        //Top 10 alunos menos chamados
        this.grGerCha.dashboardCallsToOriTopTen(this.usuario.token.access_token, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.barTopLessTenAlMaCh.nativeElement, data);
            loading.dismiss();
        })
            .catch(function () {
            loading.dismiss();
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com menos chamados'");
        });
    };
    //CHAMADA DE MÉTODOS PARA MATÉRIA
    GraficoGerencialPage.prototype.graficoMateria = function (idMatter, nameMatter) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, gerando os gráficos...'
        });
        loading.present();
        this.viewGraficoMateria = true;
        this.viewEspecificacaoMateria = false;
        this.materia = nameMatter;
        //Qtde de atendimentos tutores por matéria
        this.grGerMat.dashboardCallsToMatter(this.usuario.token.access_token, idMatter, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutMatAtTut.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados do gráfico 'Atendimentos tutores'!");
        });
        //Qtde classificação duvidas por matéria
        this.grGerMat.dashboardCallsToReasonMatter(this.usuario.token.access_token, idMatter, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutMatDuvMat.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Classificação de dúvidas'!");
        });
        //Top 10 alunos com mais chamados por matéria
        this.grGerMat.dashboardCallsToMatterTopTenDesc(this.usuario.token.access_token, idMatter, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.barMatTenMaCh.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com mais chamados por matéria'!");
        });
        //Top 10 alunos com menos chamados por matéria
        this.grGerMat.dashboardCallsToMatterTopTenAsc(this.usuario.token.access_token, idMatter, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.barMatTenMeCh.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Top 10 alunos com menos chamados por matéria'!");
        });
        //Chamados por hora e matéria
        this.grGerMat.dashboardCallsToHourMatter(this.usuario.token.access_token, idMatter, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.lineMatChHoMa.nativeElement, data);
            loading.dismiss();
        })
            .catch(function () {
            loading.dismiss();
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'!");
        });
    };
    //Como o scroll infinito é usado por tutor e aluno, é necessário diferenciar, para chamar o gráfico correto
    GraficoGerencialPage.prototype.validarGraficoAlunoTutor = function (id, name) {
        if (this.tipoEspecificacao == 3) {
            this.graficoAluno(id, name);
        }
        else {
            if (this.tipoEspecificacao == 4) {
                this.graficoTutor(id, name);
            }
        }
    };
    //CHAMADO DE GRÁFICOS GERENCIAL PARA ALUNO
    GraficoGerencialPage.prototype.graficoAluno = function (idStudent, nameAluno) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, gerando os gráficos...'
        });
        loading.present();
        this.name = nameAluno;
        this.viewEspecificacaoAluno = false;
        this.viewGraficoAluno = true;
        //Chamados por aluno e matéria
        this.grGerAl.dashboardCallsToStudentMatter(this.usuario.token.access_token, idStudent, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutAlChAlMa.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por matéria'!");
        });
        //Atendimento por classificação
        this.grGerAl.dashboardStudentCallsClassification(this.usuario.token.access_token, idStudent, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            loading.dismiss();
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutAlAtePorClas.nativeElement, data);
        })
            .catch(function () {
            loading.dismiss();
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Atendimentos por classificação'!");
        });
    };
    //GRÁFICOS PARA TUTOR
    GraficoGerencialPage.prototype.graficoTutor = function (idTutor, nameTutor) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, gerando os gráficos...'
        });
        loading.present();
        this.viewEspecificacaoAluno = false;
        this.viewGraficoTutor = true;
        this.name = nameTutor;
        //Atendimento por matéria
        this.grGerTut.dashboardCallsToTutorMatter(this.usuario.token.access_token, idTutor, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutTutChMat.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por matéria'!");
        });
        //Chamados por classificação
        this.grGerTut.dashboardCallsToReasonTutor(this.usuario.token.access_token, idTutor, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutTutChCl.nativeElement, data);
        })
            .catch(function () {
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por classificação'!");
        });
        //Atendimentos por hora e tutor
        this.grGerTut.dashboardAnswearToHourTutor(this.usuario.token.access_token, idTutor, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            loading.dismiss();
            new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.lineTutAtHoTut.nativeElement, data);
        })
            .catch(function () {
            loading.dismiss();
            _this.utilsPr.alertInformation("Não foi possível carregar os dados dográfico 'Chamados por hora'!");
        });
    };
    //Inicia o processo de consulta de gráficos
    GraficoGerencialPage.prototype.iniciarProcesso = function () {
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
    };
    //**INFINITE SCROLL - listagem por etapas da lista de alunos e tutores ************************/
    GraficoGerencialPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.totalPage = this.page * 20;
        setTimeout(function () {
            var result = _this.listParametroResult.slice(_this.page * 20);
            for (var i = 1; i <= _this.perPage; i++) {
                if (result[i] != undefined) {
                    _this.listParametro.push(result[i]);
                }
            }
            _this.page += 1;
            infiniteScroll.complete();
        }, 2000);
    };
    //Procura itens na listagem de parametros
    GraficoGerencialPage.prototype.procurarItems = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.listParametro = this.listParametroResult.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    GraficoGerencialPage.prototype.cancelProcurar = function (ev) {
        this.validarOpcaoGrafico();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutChamadoPorMateria"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutChamadoPorMateria", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutChamadoPorTutor"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutChamadoPorTutor", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("lineChamadoPorHora"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "lineChamadoPorHora", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("barTopTenAlMaCh"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "barTopTenAlMaCh", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("barTopLessTenAlMaCh"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "barTopLessTenAlMaCh", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutMatAtTut"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutMatAtTut", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutMatDuvMat"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutMatDuvMat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("lineMatChHoMa"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "lineMatChHoMa", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("barMatTenMaCh"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "barMatTenMaCh", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("barMatTenMeCh"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "barMatTenMeCh", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutAlChAlMa"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutAlChAlMa", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutAlAtePorClas"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutAlAtePorClas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutTutChMat"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutTutChMat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutTutChCl"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "doughnutTutChCl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("lineTutAtHoTut"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], GraficoGerencialPage.prototype, "lineTutAtHoTut", void 0);
    GraficoGerencialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-grafico-gerencial',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\grafico-gerencial\grafico-gerencial.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Gerencial</ion-title>\n\n\n\n    <ion-buttons end *ngIf="viewRestartParametros">\n\n      <button ion-button color="ligth" icon-only (click)="iniciarProcesso()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <!--<div class="content">\n\n    <div>\n\n      <ion-list *ngIf="viewEspecificacaoGrafico" no-lines class="list-info">\n\n        <h5 text-center>Selecione o tipo de análise desejada</h5>\n\n        <ion-item *ngFor="let opGr of opcaoGrafico">\n\n          {{opGr.name}}\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n      <div *ngIf="viewPeriodo" class="list-info">\n\n        <h4 text-center>Análise {{titulo}}</h4>\n\n        <h5 text-center>Escolha o período</h5>\n\n\n\n        <ion-item no-lines>\n\n          <ion-label color="light" text-left>De:</ion-label>\n\n          <ion-datetime displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dtIniGrafico" doneText="OK">\n\n          </ion-datetime>\n\n        </ion-item>\n\n\n\n        <ion-item no-lines>\n\n          <ion-label color="light" text-left>A:</ion-label>\n\n          <ion-datetime displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dtFimGrafico"\n\n            (ionChange)="materiaTeste()" doneText="OK">\n\n          </ion-datetime>\n\n        </ion-item>\n\n      </div>\n\n\n\n      <ion-list *ngIf="viewEspecificacaoMateria" no-lines class="list-info">\n\n        <h5 text-center>Selecione a matéria</h5>\n\n        <ion-item *ngFor="let opGrMat of listMateria" (click)="graficoMateria(opGrMat.id,opGrMat.name)">\n\n          {{opGrMat.name}}\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n    </div>\n\n\n\n    <div [hidden]="!viewGraficoMateria" padding-top>\n\n      <h4 text-center>Análise {{titulo}}</h4>\n\n      <h5 text-center style="word-spacing: 7px;">{{dtIniGrafico | date: \'dd/MM/yyyy\'}} à\n\n        {{dtFimGrafico | date: \'dd/MM/yyyy\'}}</h5>\n\n      <h5 text-center>{{materia}}</h5>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutMatDuvMat width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutMatAtTut width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #lineMatChHoMa width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #barMatTenMaCh width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #barMatTenMeCh width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n    </div>\n\n\n\n  </div>\n\n-->\n\n  <div class="content">\n\n\n\n    <div>\n\n      <!--EXIBIÇÃO DA ESPECIFICAÇÃO DO GRÁFICO-->\n\n      <ion-list *ngIf="viewEspecificacaoGrafico" no-lines class="list-info">\n\n        <h5 text-center>Selecione o tipo de análise desejada</h5>\n\n        <ion-item *ngFor="let opGr of opcaoGrafico" (click)="exibirPeriodo(opGr.tipo)">\n\n          {{opGr.name}}\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n      <!--ESPECIFICAÇÃO DE MATERIA-->\n\n\n\n      <ion-list *ngIf="viewEspecificacaoMateria" no-lines class="list-info">\n\n        <h5 text-center>Selecione a matéria</h5>\n\n        <ion-item *ngFor="let opGrMat of listMateria" (click)="graficoMateria(opGrMat.id,opGrMat.name)">\n\n          {{opGrMat.name}}\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n\n\n      <!--SELECIONAR O PERÍODO DOS GRÁFICOS-->\n\n      <div *ngIf="viewPeriodo" class="list-info">\n\n        <h4 text-center>Análise {{titulo}}</h4>\n\n        <h5 text-center>Escolha o período</h5>\n\n\n\n        <ion-item no-lines>\n\n          <ion-label color="light" text-left>De:</ion-label>\n\n          <ion-datetime displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dtIniGrafico" \n\n          (ionChange)="validarPeriodo()" doneText="OK">\n\n          </ion-datetime>\n\n        </ion-item>\n\n\n\n        <ion-item no-lines>\n\n          <ion-label color="light" text-left>A:</ion-label>\n\n          <ion-datetime displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dtFimGrafico"\n\n            (ionChange)="validarPeriodo()" doneText="OK">\n\n          </ion-datetime>\n\n        </ion-item>\n\n      </div>\n\n\n\n\n\n\n\n      <!--ESPECIFICAÇÃO DE ALUNO e TUTOR-->\n\n      <ion-searchbar *ngIf="viewEspecificacaoAluno" (ionInput)="procurarItems($event)" placeholder="Procurar"\n\n        (ionCancel)="cancelProcurar($event)" cancelButtonText="Cancelar" showCancelButton="true"></ion-searchbar>\n\n      <ion-list *ngIf="viewEspecificacaoAluno" no-lines class="list-info">\n\n        <ion-list>\n\n          <ion-item *ngFor="let lsPa of listParametro" (click)="validarGraficoAlunoTutor(lsPa.id,lsPa.name)">\n\n            {{lsPa.name}}\n\n          </ion-item>\n\n        </ion-list>\n\n\n\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n        </ion-infinite-scroll>\n\n\n\n      </ion-list>\n\n\n\n      <!--************* Gráficos do chamado ***********************************************-->\n\n\n\n\n\n      <div [hidden]="!viewGraficoChamado" padding-top>\n\n        <h4 text-center>Análise {{titulo}}</h4>\n\n        <h5 text-center style="word-spacing: 7px;">{{dtIniGrafico | date: \'dd/MM/yyyy\'}} à\n\n          {{dtFimGrafico | date: \'dd/MM/yyyy\'}}</h5>\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #doughnutChamadoPorMateria width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card margin-top>\n\n          <ion-card-content>\n\n            <canvas #doughnutChamadoPorTutor width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card margin-top>\n\n          <ion-card-content>\n\n            <canvas #lineChamadoPorHora width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card margin-top>\n\n          <ion-card-content>\n\n            <canvas #barTopTenAlMaCh width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card margin-top>\n\n          <ion-card-content>\n\n            <canvas #barTopLessTenAlMaCh width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n      </div>\n\n\n\n      <!--GRÁFICOS PARA ESPECIFICAÇÃO DE MATÉRIA-->\n\n      <div [hidden]="!viewGraficoMateria" padding-top>\n\n        <h4 text-center>Análise {{titulo}}</h4>\n\n        <h5 text-center style="word-spacing: 7px;">{{dtIniGrafico | date: \'dd/MM/yyyy\'}} à\n\n          {{dtFimGrafico | date: \'dd/MM/yyyy\'}}</h5>\n\n        <h5 text-center>{{materia}}</h5>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #doughnutMatDuvMat width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #doughnutMatAtTut width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #lineMatChHoMa width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #barMatTenMaCh width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #barMatTenMeCh width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n      </div>\n\n\n\n\n\n    </div>\n\n\n\n    <!--GRÁFICOS PARA ESPECIFICAÇÃO DE ALUNO-->\n\n    <div [hidden]="!viewGraficoAluno" padding-top>\n\n      <h4 text-center>Análise {{titulo}}</h4>\n\n      <h5 text-center style="word-spacing: 7px;">{{dtIniGrafico | date: \'dd/MM/yyyy\'}} à\n\n        {{dtFimGrafico | date: \'dd/MM/yyyy\'}}</h5>\n\n      <h5 text-center>{{name}}</h5>\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutAlChAlMa width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutAlAtePorClas width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n    </div>\n\n\n\n\n\n    <!--GRÁFICOS PARA ESPECIFICAÇÃO DE TUTOR-->\n\n    <div [hidden]="!viewGraficoTutor" padding-top>\n\n      <h4 text-center>Análise {{titulo}}</h4>\n\n      <h5 text-center style="word-spacing: 7px;">{{dtIniGrafico | date: \'dd/MM/yyyy\'}} à\n\n        {{dtFimGrafico | date: \'dd/MM/yyyy\'}}</h5>\n\n      <h5 text-center>{{name}}</h5>\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutTutChMat width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #doughnutTutChCl width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n      <ion-card>\n\n        <ion-card-content>\n\n          <canvas #lineTutAtHoTut width="350" height="350"></canvas>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n\n\n    <!--<a ion-button href="https://api.whatsapp.com/send?phone=5564992552031">SEND</a>-->\n\n\n\n\n\n  </div>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\grafico-gerencial\grafico-gerencial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__providers_grafico_grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_grafico_grafico_manager_chamado__["a" /* GraficoManagerChamadoProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_grafico_grafico_manager_materia__["a" /* GraficoManagerMateriaProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_grafico_grafico_manager_aluno__["a" /* GraficoManagerAlunoProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_grafico_grafico_manager_tutor__["a" /* GraficoManagerTutorProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_utils_utils__["a" /* UtilsProvider */]])
    ], GraficoGerencialPage);
    return GraficoGerencialPage;
}());

//# sourceMappingURL=grafico-gerencial.js.map

/***/ })

});
//# sourceMappingURL=4.js.map