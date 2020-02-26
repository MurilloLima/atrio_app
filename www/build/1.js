webpackJsonp([1],{

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorChamadoPendentePageModule", function() { return TutorChamadoPendentePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente__ = __webpack_require__(611);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TutorChamadoPendentePageModule = /** @class */ (function () {
    function TutorChamadoPendentePageModule() {
    }
    TutorChamadoPendentePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente__["a" /* TutorChamadoPendentePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tutor_chamado_pendente__["a" /* TutorChamadoPendentePage */]),
            ],
        })
    ], TutorChamadoPendentePageModule);
    return TutorChamadoPendentePageModule;
}());

//# sourceMappingURL=tutor-chamado-pendente.module.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorChamadoPendentePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TutorChamadoPendentePage = /** @class */ (function () {
    function TutorChamadoPendentePage(conexaoApi, domSanitizer, statusBar, utilsPr, navParams, navCtrl) {
        this.conexaoApi = conexaoApi;
        this.domSanitizer = domSanitizer;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.chamadosPendente = [];
        this.img_materia_64 = "data:image/png+xml;base64,";
        this.type = true;
        this.phoneNumber = 553491228279;
    }
    TutorChamadoPendentePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        //this.type = this.navParams.get('type');
        //Se página está voltando do POP após tutor abrir chamado para aluno
        //Se não, recebe da página home os chamados. Type==1 veio do home
        if (this.type) {
            this.chamadosPendente = this.navParams.get('chamado');
            for (var i = 0; i < this.chamadosPendente.length; i++) {
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
                .then(function (request) {
                if (request.requests.length > 0) {
                    _this.chamadosPendente = request.requests;
                    for (var i = 0; i < _this.chamadosPendente.length; i++) {
                        _this.img_materia_64 += _this.chamadosPendente[i].image;
                        //this.materias[i].image = this.domSanitizer.bypassSecurityTrustUrl(this.img_materia_64);
                        _this.chamadosPendente[i].image == null || _this.chamadosPendente[i].image == "" ? _this.chamadosPendente[i].image = "assets/imgs/no-photo.jpg"
                            : _this.chamadosPendente[i].image = _this.domSanitizer.bypassSecurityTrustUrl(_this.img_materia_64);
                        //Reseta variável para não acrescentar string erroneamente
                        _this.img_materia_64 = "data:image/png+xml;base64,";
                    }
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
                }
            });
        }
    };
    //1º PASSO (SELEÇÃO DO CONTEÚDO DO CHAMADO) // Deve ser repetido até API retornar status 201
    //Envia o 1 status, que é somente o chamado.id para trazer os itens
    TutorChamadoPendentePage.prototype.requisitionSetTheme = function (chamado) {
        var _this = this;
        this.conexaoApi.requisitionSetTheme(chamado.id_call, 1)
            .then(function (requisition) {
            _this.navCtrl.push('TutorChamadoPendenteSelecaoConteudoPage', { requisition: requisition, chamado: chamado });
        })
            .catch(function (error) { return _this.utilsPr.alertError("Não foi possível fazer essa operação. Tente novamente!"); });
    };
    TutorChamadoPendentePage.prototype.cancelarChamado = function (chamado) {
        var _this = this;
        this.conexaoApi.requisitionCancel(this.navParams.get('access_token'), chamado.id_call)
            .then(function (data) {
            _this.utilsPr.alertInformation(data.message);
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            _this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
        });
    };
    TutorChamadoPendentePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-tutor-chamado-pendente',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\tutor-chamado-pendente\tutor-chamado-pendente.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Chamados pendentes</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div class="content-list">\n\n    <ion-list no-lines>\n\n\n\n      <ion-item-sliding *ngFor="let ch of chamadosPendente" class="sliding">\n\n\n\n        <ion-item (click)="requisitionSetTheme(ch)" [ngClass]="{\'chamado-atendimento\':ch.statuses_id==2}">\n\n          <ion-avatar item-start>\n\n            <img [src]="ch.image">\n\n          </ion-avatar>\n\n          <p>Ticket: {{ch.id_call}}</p>\n\n          <p>{{ch.name}} </p>\n\n          <p>Cabine: {{ch.board}}</p>\n\n          <p>{{ch.matter}}</p>\n\n\n\n          <ion-icon small color="iconColor" name="code-working" item-end></ion-icon>\n\n        </ion-item>\n\n\n\n        <ion-item-options side="right">\n\n          <button ion-button (click)="cancelarChamado(ch)" color="danger">\n\n            <ion-icon name="trash"></ion-icon>\n\n          </button>\n\n        </ion-item-options>\n\n\n\n      </ion-item-sliding>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\tutor-chamado-pendente\tutor-chamado-pendente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */]])
    ], TutorChamadoPendentePage);
    return TutorChamadoPendentePage;
}());

//# sourceMappingURL=tutor-chamado-pendente.js.map

/***/ })

});
//# sourceMappingURL=1.js.map