webpackJsonp([9],{

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtendimentoUsuarioMateriaPageModule", function() { return AtendimentoUsuarioMateriaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_materia__ = __webpack_require__(601);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AtendimentoUsuarioMateriaPageModule = /** @class */ (function () {
    function AtendimentoUsuarioMateriaPageModule() {
    }
    AtendimentoUsuarioMateriaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_materia__["a" /* AtendimentoUsuarioMateriaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__atendimento_usuario_materia__["a" /* AtendimentoUsuarioMateriaPage */]),
            ],
        })
    ], AtendimentoUsuarioMateriaPageModule);
    return AtendimentoUsuarioMateriaPageModule;
}());

//# sourceMappingURL=atendimento-usuario-materia.module.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtendimentoUsuarioMateriaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_conexao_api_conexao_api__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_usuario__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AtendimentoUsuarioMateriaPage = /** @class */ (function () {
    function AtendimentoUsuarioMateriaPage(conexaoApi, domSanitizer, navCtrl, navParams, storage, statusBar, utilsPr) {
        this.conexaoApi = conexaoApi;
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
        this.areas = [];
        this.img_materia_64 = "data:image/png+xml;base64,";
        //Exibição chamado concluído - 3º passo
        this.materia = {};
        this.requisitionConcluir = {};
        this.usuario = new __WEBPACK_IMPORTED_MODULE_4__model_usuario__["a" /* Usuario */]();
        this.viewArea = true;
        this.viewMateria = false;
        this.viewConcluir = false;
    }
    AtendimentoUsuarioMateriaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        this.storage.getInfo("usuario")
            .then(function (usuario) { _this.usuario = usuario; });
        this.requisition = this.navParams.get('requisition');
        this.areas = this.requisition.types;
    };
    AtendimentoUsuarioMateriaPage.prototype.solicitarAtendimento = function (area) {
        var _this = this;
        //Aguardando 2º passo
        this.conexaoApi.requisitionMatter(this.usuario.token.access_token, area.id, this.usuario.id)
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
                //Passa as matérias para a pagina de solicitação para que possa ser feito o 3º passo
                //this.navCtrl.push('AtendimentoUsuarioSolicitarPage', {rsMatter: rsMatter.matters} );
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
        //console.log(materia, this.requisition.sender_call);
    };
    //3º PASSO
    AtendimentoUsuarioMateriaPage.prototype.solicitarAtendimentoConcluir = function (materia) {
        var _this = this;
        this.conexaoApi.requisitionCreateAll(this.usuario.token.access_token, materia.id, this.usuario.id)
            .then(function (requisitionCreatellAll) {
            _this.materia = materia;
            _this.requisitionConcluir = requisitionCreatellAll;
            _this.viewArea = false;
            _this.viewMateria = false;
            _this.viewConcluir = true;
            //console.log("Veio", this.requisition,requisitionCreatellAll);
            /*this.navCtrl.push('AtendimentoUsuarioSolicitarConcluidoPage', {
              requisition: requisitionCreatellAll,
              materia: materia, access_token: this.usuario.token.access_token
            })*/
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
    AtendimentoUsuarioMateriaPage.prototype.cancelarSolicitacao = function () {
        var _this = this;
        //console.log(this.materia,"\n",this.requisitionConcluir);
        this.conexaoApi.requisitionCancel(this.usuario.token.access_token, this.requisitionConcluir.id_call)
            .then(function (requisitionCancel) {
            _this.utilsPr.alertInformation(requisitionCancel.message);
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            _this.utilsPr.alertError("Não foi possível cancelar a solicitação. Tente novamente!");
        });
    };
    AtendimentoUsuarioMateriaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-atendimento-usuario-materia',template:/*ion-inline-start:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\atendimento-usuario-materia\atendimento-usuario-materia.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>PPA</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div class="content">\n\n    <div class="list-info">\n      <ion-list *ngIf="viewArea" no-lines>\n        <h5 text-center>Selecione a área</h5>\n        <ion-item *ngFor="let area of areas" (click)="solicitarAtendimento(area)">\n          {{area.name}}\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngIf="viewMateria" no-lines>\n        <h5 text-center>Selecione a matéria</h5>\n        <ion-item *ngFor="let materia of materias" (click)="solicitarAtendimentoConcluir(materia)" >\n          <ion-avatar item-start >\n            <img [src]="materia.image" >\n          </ion-avatar>\n          <h2 text-left>{{materia.name}}</h2>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngIf="viewConcluir" class="atendimento-solicitado">\n          <div class="atendimento-texto" text-center>Seu atendimento <br>foi solicitado</div>\n\n          <div class="atendimento-materia" text-center>\n              <img [src]="materia.image" class="img-materia">\n              <h3>{{materia.name}}</h3>\n          </div>\n\n          <div class="atendimento-cancelar">\n            <p text-center>Habilite as notificações do seu celular para ser avisado</p>\n\n          </div>\n          <button color="ppa" ion-button block (click)="cancelarSolicitacao()">Cancelar atendimento</button>\n        <!--\n        <ion-item>Seu atendimento foi solicitado</ion-item>\n        <ion-item>\n          <img [src]="materia.image">{{materia.name}}</ion-item>\n        <ion-item>{{materia.name}}</ion-item>\n        <button ion-button block (click)="cancelarSolicitacao()">Cancelar atendimento</button>\n        -->\n      </ion-list>\n\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\atendimento-usuario-materia\atendimento-usuario-materia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__["a" /* UtilsProvider */]])
    ], AtendimentoUsuarioMateriaPage);
    return AtendimentoUsuarioMateriaPage;
}());

//# sourceMappingURL=atendimento-usuario-materia.js.map

/***/ })

});
//# sourceMappingURL=9.js.map