webpackJsonp([6],{

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarPageModule", function() { return CadastrarPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cadastrar__ = __webpack_require__(603);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CadastrarPageModule = /** @class */ (function () {
    function CadastrarPageModule() {
    }
    CadastrarPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cadastrar__["a" /* CadastrarPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cadastrar__["a" /* CadastrarPage */]),
            ],
        })
    ], CadastrarPageModule);
    return CadastrarPageModule;
}());

//# sourceMappingURL=cadastrar.module.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastrarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conexao_api_conexao_api__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CadastrarPage = /** @class */ (function () {
    function CadastrarPage(formBuilder, conexaoApi, navCtrl, statusBar, utilsPr) {
        this.formBuilder = formBuilder;
        this.conexaoApi = conexaoApi;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupForm = this.formBuilder.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3)]],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    CadastrarPage.prototype.onSubmit = function () {
        var _this = this;
        this.conexaoApi.userStore(this.name, this.email, this.password)
            .then(function (data) {
            _this.utilsPr.alertInformation(data.json().message);
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            if (error.status == 422) {
                _this.utilsPr.alertInformation(error.json().errors.email[0]);
            }
            else {
                console.log("Erro: ", error);
                _this.utilsPr.alertError("Não foi possível cadastrar o usuario! Tente novamente.");
            }
        });
    };
    CadastrarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cadastrar',template:/*ion-inline-start:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\cadastrar\cadastrar.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Cadastrar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <h1 text-center>\n    <ion-icon name="person-add" color="ppa"></ion-icon>\n  </h1>\n\n  <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">\n    <ion-item>\n      <ion-icon name="person" color="ppa" item-left></ion-icon>\n      <ion-input type="text" placeholder="Nome" formControlName="name" [(ngModel)]="name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name="mail" color="ppa" item-left></ion-icon>\n      <ion-input type="text" placeholder="Email" formControlName="email" [(ngModel)]="email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name="lock" color="ppa" item-left></ion-icon>\n      <ion-input type="password" placeholder="Senha" formControlName="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n\n    <br>\n    <button ion-button full type="submit" color="ppa" [disabled]="signupForm.invalid">Cadastrar</button>\n  </form>\n</ion-content>'/*ion-inline-end:"C:\Users\M4Sistemas\Downloads\ppa-ionic-ios-master\ppa-ionic-ios-master\src\pages\cadastrar\cadastrar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__["a" /* UtilsProvider */]])
    ], CadastrarPage);
    return CadastrarPage;
}());

//# sourceMappingURL=cadastrar.js.map

/***/ })

});
//# sourceMappingURL=6.js.map