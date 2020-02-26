webpackJsonp([8],{

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtendimentoUsuarioPendentePageModule", function() { return AtendimentoUsuarioPendentePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_pendente__ = __webpack_require__(605);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AtendimentoUsuarioPendentePageModule = /** @class */ (function () {
    function AtendimentoUsuarioPendentePageModule() {
    }
    AtendimentoUsuarioPendentePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_pendente__["a" /* AtendimentoUsuarioPendentePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_pendente__["a" /* AtendimentoUsuarioPendentePage */]),
            ],
        })
    ], AtendimentoUsuarioPendentePageModule);
    return AtendimentoUsuarioPendentePageModule;
}());

//# sourceMappingURL=atendimento-usuario-pendente.module.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtendimentoUsuarioPendentePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AtendimentoUsuarioPendentePage = /** @class */ (function () {
    function AtendimentoUsuarioPendentePage(conexaoApi, navCtrl, navParams, utilsPr, statusBar) {
        this.conexaoApi = conexaoApi;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utilsPr = utilsPr;
        this.statusBar = statusBar;
        this.chamadosPendentes = [];
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
    }
    AtendimentoUsuarioPendentePage.prototype.ionViewWillEnter = function () {
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        this.chamadosPendentes = this.navParams.get('callsPending');
    };
    AtendimentoUsuarioPendentePage.prototype.cancelarChamado = function (materia) {
        var _this = this;
        this.conexaoApi.requisitionCancel(this.navParams.get('access_token'), materia.idCall)
            .then(function (data) {
            _this.utilsPr.alertInformation(data.message);
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            _this.utilsPr.alertError("Não foi possível cancelar essa chamado. Tente novamente!");
        });
    };
    AtendimentoUsuarioPendentePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-atendimento-usuario-pendente',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\atendimento-usuario-pendente\atendimento-usuario-pendente.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Atendimentos pendentes</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list *ngFor="let cp of chamadosPendentes">\n\n    <ion-item>\n\n      {{cp.nameMatter}}\n\n      <ion-icon name="trash" item-end (click)="cancelarChamado(cp)"></ion-icon>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\atendimento-usuario-pendente\atendimento-usuario-pendente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */]])
    ], AtendimentoUsuarioPendentePage);
    return AtendimentoUsuarioPendentePage;
}());

//# sourceMappingURL=atendimento-usuario-pendente.js.map

/***/ })

});
//# sourceMappingURL=8.js.map