webpackJsonp([0],{

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorRegistroPontoPageModule", function() { return TutorRegistroPontoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutor_registro_ponto__ = __webpack_require__(610);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TutorRegistroPontoPageModule = /** @class */ (function () {
    function TutorRegistroPontoPageModule() {
    }
    TutorRegistroPontoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tutor_registro_ponto__["a" /* TutorRegistroPontoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tutor_registro_ponto__["a" /* TutorRegistroPontoPage */]),
            ],
        })
    ], TutorRegistroPontoPageModule);
    return TutorRegistroPontoPageModule;
}());

//# sourceMappingURL=tutor-registro-ponto.module.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorRegistroPontoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_conexao_api_conexao_api__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TutorRegistroPontoPage = /** @class */ (function () {
    //Variável para verificar se é entrada(true) ou saída(false) no registro do ponto
    //tipoRegistro: string;
    function TutorRegistroPontoPage(conexaoApi, navCtrl, navParams, utilsPr, statusBar) {
        this.conexaoApi = conexaoApi;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utilsPr = utilsPr;
        this.statusBar = statusBar;
    }
    TutorRegistroPontoPage.prototype.ionViewWillEnter = function () {
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
    };
    TutorRegistroPontoPage.prototype.registrar = function (tipoRegistro) {
        var _this = this;
        if (tipoRegistro == 'entrada') {
            this.conexaoApi.arrival(this.navParams.get('access_token'))
                .then(function (registro) {
                _this.utilsPr.alertInformation(registro.message);
                _this.navCtrl.pop();
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.utilsPr.alertError(error.json().message);
                }
                else {
                    _this.utilsPr.alertError("Não foi possível registrar a entrada do ponto. Tente novamente!");
                }
            });
        }
        else {
            this.conexaoApi.departure(this.navParams.get('access_token'))
                .then(function (registro) {
                _this.utilsPr.alertInformation(registro.message);
                _this.navCtrl.pop();
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.utilsPr.alertError(error.json().message);
                }
                else {
                    _this.utilsPr.alertError("Não foi possível registrar a saída do ponto. Tente novamente!");
                }
            });
        }
    };
    TutorRegistroPontoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutor-registro-ponto',template:/*ion-inline-start:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\tutor-registro-ponto\tutor-registro-ponto.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registro de ponto</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="list-registro">\n    <!-- <ion-list radio-group [(ngModel)]="tipoRegistro" no-lines>\n\n      <ion-item>\n        <ion-label>Entrada</ion-label>\n        <ion-radio value="entrada"></ion-radio>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Saída</ion-label>\n        <ion-radio value="saida"></ion-radio>\n      </ion-item>\n-->\n    <ion-list>\n      <button ion-button color="ppa" block (click)="registrar(\'entrada\')">Entrada</button>\n      <button ion-button color="ppa" block (click)="registrar(\'saida\')" style="margin-top: 10%;">Saída</button>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\tutor-registro-ponto\tutor-registro-ponto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */]])
    ], TutorRegistroPontoPage);
    return TutorRegistroPontoPage;
}());

//# sourceMappingURL=tutor-registro-ponto.js.map

/***/ })

});
//# sourceMappingURL=0.js.map