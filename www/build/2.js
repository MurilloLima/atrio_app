webpackJsonp([2],{

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorChamadoPendenteSelecaoConteudoPageModule", function() { return TutorChamadoPendenteSelecaoConteudoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente_selecao_conteudo__ = __webpack_require__(607);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TutorChamadoPendenteSelecaoConteudoPageModule = /** @class */ (function () {
    function TutorChamadoPendenteSelecaoConteudoPageModule() {
    }
    TutorChamadoPendenteSelecaoConteudoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente_selecao_conteudo__["a" /* TutorChamadoPendenteSelecaoConteudoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente_selecao_conteudo__["a" /* TutorChamadoPendenteSelecaoConteudoPage */]),
            ],
        })
    ], TutorChamadoPendenteSelecaoConteudoPageModule);
    return TutorChamadoPendenteSelecaoConteudoPageModule;
}());

//# sourceMappingURL=tutor-chamado-pendente-selecao-conteudo.module.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorChamadoPendenteSelecaoConteudoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_usuario__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_conexao_api_conexao_api__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TutorChamadoPendenteSelecaoConteudoPage = /** @class */ (function () {
    function TutorChamadoPendenteSelecaoConteudoPage(conexaoApi, navCtrl, domSanitizer, navParams, utilsPr, statusBar, storage) {
        this.conexaoApi = conexaoApi;
        this.navCtrl = navCtrl;
        this.domSanitizer = domSanitizer;
        this.navParams = navParams;
        this.utilsPr = utilsPr;
        this.statusBar = statusBar;
        this.storage = storage;
        //Exibe os itens disponíveis para seleção do conteúdo do chamado
        this.listItem = [];
        //Variáveis para 3º passo
        this.listReason = [];
        this.areas = [];
        this.img_materia_64 = "data:image/png+xml;base64,";
        //3Passo
        this.materia = {};
        this.requisitionConcluir = {};
        this.validador = 0;
        this.statusPassoTres = false;
        //Novo chamado
        this.usuario = new __WEBPACK_IMPORTED_MODULE_1__model_usuario__["a" /* Usuario */]();
        this.viewArea = true;
        this.viewMateria = false;
        this.viewConcluir = false;
        this.viewNewCall = false;
        this.viewEncerrarAtendimento = true;
    }
    TutorChamadoPendenteSelecaoConteudoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
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
                .then(function (requisitionAnswer) {
                //Conteúdo selecionado para exibição
                _this.conteudoSelecionado = requisitionAnswer.json().themeName;
                _this.studentPhone = requisitionAnswer.json().studentPhone;
                //passo 2
                _this.listReason = requisitionAnswer.json().reasons;
                _this.statusPassoTres = true;
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.utilsPr.alertError(error.json().message);
                    _this.navCtrl.pop();
                }
                else {
                    _this.utilsPr.alertError("Não foi possível continuar. Tente novamente!");
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
            .then(function (usuario) {
            _this.usuario = usuario;
            //this.solicitarArea();
        });
    };
    //Método para continuar nos passos 2 do chamado do tutor
    //Envia status 2 para setTheme, agora com id_theme (id do item) e level_theme(level do item)
    TutorChamadoPendenteSelecaoConteudoPage.prototype.setTheme = function (item) {
        //Se status 200 continua no 1º passo da validação, se status 201, vai para o 2º passo
        var _this = this;
        //Se passo 3 negativo, faz passo 1 e 2, se positivo, passo 3
        if (!this.statusPassoTres) {
            this.conexaoApi.requisitionSetTheme(this.requisition.id_call, 2, item.id, item.level)
                .then(function (data) {
                //Se retorno status = 200, reinsere dados no listItem,
                //se 201, significa que já foi escolhido tema. Basta finalizar.
                if (data.status == 200) {
                    _this.listItem = data.json().items;
                }
                else {
                    //Passo 2 da solicitação
                    _this.conexaoApi.requisitionAnswer(_this.requisition.id_call)
                        .then(function (requisitionAnswer) {
                        //Conteúdo selecionado para exibição
                        _this.conteudoSelecionado = requisitionAnswer.json().themeName;
                        _this.studentPhone = requisitionAnswer.json().studentPhone;
                        //passo 2
                        _this.listReason = requisitionAnswer.json().reasons;
                        _this.statusPassoTres = true;
                    })
                        .catch(function (error) {
                        _this.utilsPr.alertError("Não foi possível continuar. Tente novamente!");
                    });
                }
            });
        }
    };
    TutorChamadoPendenteSelecaoConteudoPage.prototype.finalizarChamado = function (statusFinalizar) {
        var _this = this;
        if ((this.description == undefined || this.description == '') ||
            (this.reason == undefined || this.reason == '')) {
            this.utilsPr.alertInformation("Preencha os dados corretamente!");
        }
        else {
            this.conexaoApi.answerRegister(this.requisition.id_call, this.description, this.reason, statusFinalizar)
                .then(function (data) {
                if (data.status == 201) {
                    _this.utilsPr.alertInformation(data.json().message);
                    if (statusFinalizar == 'new-call') {
                        _this.statusPassoTres = false;
                        _this.viewEncerrarAtendimento = false;
                        _this.viewNewCall = true;
                        _this.solicitarArea();
                        //this.navCtrl.push('AtendimentoUsuarioMateriaPage');
                    }
                    else {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                    }
                }
                else {
                    _this.utilsPr.alertError("Não foi possível finalizar o chamado. Tente novamente!");
                }
            });
        }
    };
    /****************************************************************************************************************** */
    //REFERENTE AS AÇÕES PARA ABERTURA DE NOVO CHAMADO PELO TUTOR
    TutorChamadoPendenteSelecaoConteudoPage.prototype.solicitarArea = function () {
        var _this = this;
        this.utilsPr.getLocation()
            .then(function (coordenadas) {
            //Informa o ID do aluno para que ele abra um novo chamado para esse aluno
            _this.conexaoApi.requisition(_this.usuario.token.access_token, _this.chamadoAluno.user_id, coordenadas.lat, coordenadas.long)
                .then(function (requisition) {
                _this.areas = requisition.types;
                //Habilita visulização da área
                _this.viewArea = true;
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.utilsPr.alertInformation(error.json().message);
                }
                else {
                    _this.utilsPr.alertError("Ocorreu um erro ao solicitar o atendimento. Tente novamente!");
                }
            });
        })
            .catch(function () {
            _this.utilsPr.alertError("Não foi possível acessar a localização do aparelho!");
        });
    };
    TutorChamadoPendenteSelecaoConteudoPage.prototype.solicitarAtendimento = function (area) {
        var _this = this;
        //Aguardando 2º passo
        this.conexaoApi.requisitionMatter(this.usuario.token.access_token, area.id, this.chamadoAluno.user_id)
            .then(function (rsMatter) {
            //Se há matérias, exibe-as
            if (rsMatter.matters.length > 0) {
                _this.viewArea = false;
                _this.viewMateria = true;
                _this.materias = rsMatter.matters;
                for (var i = 0; i < _this.materias.length; i++) {
                    _this.img_materia_64 += _this.materias[i].image;
                    //this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);
                    _this.materias[i].image == null || _this.materias[i].image == "" ? _this.materias[i].image = "assets/imgs/no-photo.jpg"
                        : _this.materias[i].image = _this.domSanitizer.bypassSecurityTrustUrl(_this.img_materia_64);
                    //Reseta variável para não acrescentar string erroneamente
                    _this.img_materia_64 = "data:image/png+xml;base64,";
                }
            }
            else {
                _this.utilsPr.alertInformation("Não há tutores disponíveis para a área de " + area.name + "!");
            }
        })
            .catch(function (error) {
            if (error.message) {
                _this.utilsPr.alertError(error.message);
            }
            else {
                _this.utilsPr.alertError("Não foi possível abrir chamado para essa matéria. Tente novamente!");
            }
        });
    };
    //3º PASSO
    TutorChamadoPendenteSelecaoConteudoPage.prototype.solicitarAtendimentoConcluir = function (materia) {
        var _this = this;
        this.conexaoApi.requisitionCreateAll(this.usuario.token.access_token, materia.id, this.chamadoAluno.user_id)
            .then(function (requisitionCreatellAll) {
            _this.materia = materia;
            _this.requisitionConcluir = requisitionCreatellAll;
            _this.viewArea = false;
            _this.viewMateria = false;
            _this.viewConcluir = true;
        })
            .catch(function (error) {
            if (error.message) {
                _this.utilsPr.alertError(error.message);
            }
            else {
                _this.utilsPr.alertError("Não foi possível abrir chamado para essa matéria. Tente novamente!");
            }
        });
    };
    TutorChamadoPendenteSelecaoConteudoPage.prototype.cancelarChamado = function () {
        var _this = this;
        this.conexaoApi.requisitionCancel(this.usuario.token.access_token, this.requisition.id_call)
            .then(function (data) {
            _this.utilsPr.alertInformation(data.message);
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            _this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
        });
        //console.log("Cancelar: ", this.requisition,"\n",this.chamadoAluno);
    };
    TutorChamadoPendenteSelecaoConteudoPage.prototype.mentoria = function () {
        if (this.studentPhone == null) {
            this.utilsPr.alertInformation(this.dadosChamado.name + ' não possui número de celular vinculado ao seu cadastro!');
        }
        else if (this.studentPhone.toString().length != 12) {
            this.utilsPr.alertInformation("O número de telefone cadastrado está incompleto. Atualize-o no portal!");
        }
        else {
            window.open("https://api.whatsapp.com/send?phone=" + this.studentPhone + "&text=Olá " +
                this.dadosChamado.name + ", vamos iniciar a mentoria para o chamado " +
                this.dadosChamado.id_call + "!", '_system', 'location=yes');
        }
    };
    TutorChamadoPendenteSelecaoConteudoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-tutor-chamado-pendente-selecao-conteudo',template:/*ion-inline-start:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\tutor-chamado-pendente-selecao-conteudo\tutor-chamado-pendente-selecao-conteudo.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Encerrar atendimento</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="list-atendimento" *ngIf="viewEncerrarAtendimento">\n\n    <ion-list>\n      <ion-list *ngIf="!statusPassoTres">\n        <ion-item *ngFor="let item of listItem" (click)="setTheme(item)">\n          {{item.name}}\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngIf="statusPassoTres" no-lines>\n        <ion-item>\n          <p>Estudante: {{chamadoAluno.name}}</p>\n          <p>Cabine: {{chamadoAluno.board}}</p>\n          <p text-wrap>Conteúdo: {{conteudoSelecionado}}</p>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked>Descrição</ion-label>\n          <ion-textarea [(ngModel)]="description" rows="7" cols="20" style="border: 1px solid white"></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked>Razão</ion-label>\n          <ion-select [(ngModel)]="reason" interface="popover" style="border-bottom: 1px solid white">\n            <ion-option *ngFor="let rs of listReason" value="{{rs.name}}">\n              {{rs.name}}\n            </ion-option>\n          </ion-select>\n        </ion-item>\n\n        <div class="button-action">\n          <button ion-button small color="toolbar-color" light (click)="finalizarChamado(\'end-call\')" type="submit">\n            Finalizar\n          </button>\n          <button ion-button small color="ppa" light (click)="finalizarChamado(\'new-call\')" type="submit">\n            Novo\n          </button>\n          <button ion-button small color="danger" light (click)="cancelarChamado()" type="submit">\n            Cancelar\n          </button>\n        </div>\n\n        <button ion-button item-end icon-start full clear class="button-mentoria" *ngIf="dadosChamado.matters_id==16"\n        (click)="mentoria()">\n          <ion-icon name="school"></ion-icon>\n          Mentoria\n        </button>\n\n      </ion-list>\n    </ion-list>\n\n  </div>\n\n  <!-- ABRIR CHAMADO PARA ALUNO EXIBIDO QUANDO CLICAR EM NOVO CHAMADO -->\n  <div class="content" *ngIf="viewNewCall">\n\n    <div class="list-info" text-center>\n\n      <ion-list *ngIf="viewArea" no-lines>\n        <h5 text-center>Selecione a área</h5>\n        <ion-item *ngFor="let area of areas" (click)="solicitarAtendimento(area)">\n          {{area.name}}\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngIf="viewMateria" no-lines>\n        <h5 text-center>Selecione a matéria</h5>\n        <ion-item *ngFor="let materia of materias" (click)="solicitarAtendimentoConcluir(materia)">\n          <ion-avatar item-start>\n            <img [src]="materia.image">\n          </ion-avatar>\n          <h2 text-left>{{materia.name}}</h2>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngIf="viewConcluir" class="atendimento-solicitado">\n        <div class="atendimento-texto" text-center>Seu atendimento\n          <br>foi solicitado</div>\n\n        <div class="atendimento-materia" text-center>\n          <img [src]="materia.image" class="img-materia">\n          <h3>{{materia.name}}</h3>\n        </div>\n\n        <div class="atendimento-cancelar">\n          <p text-center>Habilite as notificações do seu celular para ser avisado</p>\n        </div>\n\n        <!--\n        <button color="ppa" ion-button block (click)="cancelarSolicitacao()">Cancelar atendimento</button>\n\n        <ion-item>Seu atendimento foi solicitado</ion-item>\n        <ion-item>\n          <img [src]="materia.image">{{materia.name}}</ion-item>\n        <ion-item>{{materia.name}}</ion-item>\n        <button ion-button block (click)="cancelarSolicitacao()">Cancelar atendimento</button>\n        -->\n      </ion-list>\n\n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\tutor-chamado-pendente-selecao-conteudo\tutor-chamado-pendente-selecao-conteudo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__providers_storage_storage__["a" /* StorageProvider */]])
    ], TutorChamadoPendenteSelecaoConteudoPage);
    return TutorChamadoPendenteSelecaoConteudoPage;
}());

//# sourceMappingURL=tutor-chamado-pendente-selecao-conteudo.js.map

/***/ })

});
//# sourceMappingURL=2.js.map