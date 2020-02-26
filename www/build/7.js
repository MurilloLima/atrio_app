webpackJsonp([7],{

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtendimentoUsuarioPageModule", function() { return AtendimentoUsuarioPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario__ = __webpack_require__(608);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AtendimentoUsuarioPageModule = /** @class */ (function () {
    function AtendimentoUsuarioPageModule() {
    }
    AtendimentoUsuarioPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario__["a" /* AtendimentoUsuarioPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__atendimento_usuario__["a" /* AtendimentoUsuarioPage */]),
            ],
        })
    ], AtendimentoUsuarioPageModule);
    return AtendimentoUsuarioPageModule;
}());

//# sourceMappingURL=atendimento-usuario.module.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtendimentoUsuarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_usuario__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AtendimentoUsuarioPage = /** @class */ (function () {
    function AtendimentoUsuarioPage(conexaoApi, domSanitizer, navCtrl, storage, statusBar, utilsPr) {
        this.conexaoApi = conexaoApi;
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
        this.usuario = new __WEBPACK_IMPORTED_MODULE_3__model_usuario__["a" /* Usuario */]();
    }
    AtendimentoUsuarioPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        this.storage.getInfo("usuario")
            .then(function (usuario) {
            _this.usuario = usuario;
            var img_user_64 = "data:image/png+xml;base64,";
            img_user_64 += _this.usuario.image;
            _this.image_user_toolbar = _this.domSanitizer.bypassSecurityTrustUrl(img_user_64);
            _this.conexaoApi.tutorsJob(_this.usuario.token.access_token)
                .then(function (tutores) {
                _this.listTutorDisponivel = tutores.json();
                _this.convertImageTo64(_this.listTutorDisponivel);
            })
                .catch(function (error) { return _this.utilsPr.alertInformation('Não há tutores disponíveis!'); });
        });
    };
    AtendimentoUsuarioPage.prototype.solicitarAtendimento = function () {
        var _this = this;
        this.utilsPr.getLocation()
            .then(function (coordenadas) {
            _this.conexaoApi.requisition(_this.usuario.token.access_token, _this.usuario.id, coordenadas.lat, coordenadas.long)
                .then(function (requisition) {
                //Retorna as matérias que o aluno pode solicitar atendimento. Envia a lista para página de seleção
                //Após seleção da matéria, acessa a pagina para aluno escolher a matéria e solicitar o atendimento
                _this.navCtrl.push('AtendimentoUsuarioMateriaPage', { requisition: requisition });
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
    AtendimentoUsuarioPage.prototype.chamadosPendentes = function () {
        var _this = this;
        this.conexaoApi.myCallsDatePending(this.usuario.token.access_token)
            .then(function (callsPending) {
            if (callsPending.length > 0) {
                //Lista os chamados pendentes e chama a tela para listar os chamados. Na tela é possível cancelar cada chamado
                _this.navCtrl.push('AtendimentoUsuarioPendentePage', { callsPending: callsPending, access_token: _this.usuario.token.access_token });
            }
            else {
                _this.utilsPr.alertInformation("Não há chamados pendentes!");
            }
        })
            .catch(function () {
            _this.utilsPr.alertError("Não foi possível listar os chamados pendentes. Tente novamente!");
        });
    };
    AtendimentoUsuarioPage.prototype.convertImageTo64 = function (listTutor) {
        for (var i = 0; i < listTutor.length; i++) {
            var img_user_64 = "";
            img_user_64 = "data:image/png+xml;base64,";
            img_user_64 += this.listTutorDisponivel[i].image;
            var image = this.listTutorDisponivel[i].image;
            image == null || image == "" ? image = "assets/imgs/no-photo.jpg"
                : image = this.domSanitizer.bypassSecurityTrustUrl(img_user_64);
            //console.log("Image: ", image);
            this.listTutorDisponivel[i].image = image;
            //this.image_user_toolbar = this.listTutorDisponivel[0].image;
        }
    };
    AtendimentoUsuarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-atendimento-usuario',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\atendimento-usuario\atendimento-usuario.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>PPA</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button color="primary" icon-only>\n\n        <img class="img-toolbar" [src]="image_user_toolbar" width="37" height="37" />\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="content">\n\n\n\n  <div class="div-informativo">\n\n    <h1>Plataforma\n\n      <br> Adaptativa\n\n    </h1>\n\n  </div>\n\n\n\n  <div class="div-atendimento">\n\n    <button ion-button block clear (click)="solicitarAtendimento()">Solicitar atendimento</button>\n\n    <button ion-button block clear (click)="chamadosPendentes()">Atendimentos pendentes</button>\n\n  </div>\n\n\n\n  <div class="div-mentor">\n\n    <h5 text-center>Tutores Disponíveis</h5>\n\n    <ion-row>\n\n      <ion-col col-4 *ngFor="let td of listTutorDisponivel" text-center>\n\n        <img [src]="td.image" class="info-user-foto" />\n\n        <p>{{td.name}} </p>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n\n\n  <!--\n\n<h1 text-center color="light">Plataforma <br>Adaptativa</h1>\n\n*ngFor="let td of listTutorDisponivel"\n\n  <button ion-button block (click)="solicitarAtendimento()">Solicitar atendimento</button>\n\n  <button ion-button block (click)="chamadosPendentes()">Atendimentos pendentes</button>\n\n\n\n  <h3>Tutores Disponíveis</h3>\n\n  <ion-list *ngFor="let td of listTutorDisponivel">\n\n    <ion-item>\n\n      <ion-avatar>\n\n        <img [src]="td.image" />\n\n        {{td.name}}\n\n      </ion-avatar>\n\n    </ion-item>\n\n  </ion-list>\n\n-->\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\atendimento-usuario\atendimento-usuario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__["a" /* UtilsProvider */]])
    ], AtendimentoUsuarioPage);
    return AtendimentoUsuarioPage;
}());

//# sourceMappingURL=atendimento-usuario.js.map

/***/ })

});
//# sourceMappingURL=7.js.map