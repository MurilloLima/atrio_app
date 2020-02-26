webpackJsonp([12],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var Usuario = /** @class */ (function () {
    function Usuario() {
        this.image = null;
        this.token = { access_token: null,
            expires_at: null
        };
        this.roles = [];
        this.tenant = {};
        this.permissions = [];
        /*roles=[
              {
                  id: null,
                  name: null,
                  role: null,
                  created_at: null,
                  updated_at: null,
                  pivot: {
                      user_id: null,
                      role_id: null
                    }
              }]
          ;
          tenant: {
              id: number,
              name: String,
              registernumber: number,
              email: String,
              logo: String,
              tutor_default: number,
              theme_default: number,
              uuid: String,
              created_at: any,
              updated_at: any
          };*/
    }
    return Usuario;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_usuario__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utils_schedule__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_grafico_grafico_usuario__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var HomePage = /** @class */ (function () {
    function HomePage(conexaoApi, domSanitizer, graficoUsPr, navCtrl, storage, statusBar, utilsPr, schedule, backgroundMode, storageProvider) {
        this.conexaoApi = conexaoApi;
        this.domSanitizer = domSanitizer;
        this.graficoUsPr = graficoUsPr;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
        this.schedule = schedule;
        this.backgroundMode = backgroundMode;
        this.storageProvider = storageProvider;
        this.img_user_64 = "data:image/png+xml;base64,";
        this.usuario = new __WEBPACK_IMPORTED_MODULE_5__model_usuario__["a" /* Usuario */]();
        this.viewRelatorio = false;
        this.iconRelatorio = "eye";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        //VALIDAR QUESTÃO CONST DO PUSHER PARA FECHAR O CHANAL
        var _this = this;
        this.backgroundMode.enable();
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#3b041b');
        // Pusher.logToConsole = true;
        this.storage.getInfo("usuario")
            .then(function (usuario) {
            _this.usuario = usuario;
            //VALIDAR PARA QUE SÓ CARREGAR A PÁGINA APÓS VALIDAR PERMISSÕES
            //PERMISSÕES DE VISUALIZAÇÃO ALUNO E TUTOR
            _this.validarPermissaoExibirComponenteUsuario(_this.usuario.permissions);
            _this.img_user_64 += _this.usuario.image;
            _this.usuario.image == null || _this.usuario.image == "" ? _this.image_user = "assets/imgs/no-photo.jpg"
                : _this.image_user = _this.domSanitizer.bypassSecurityTrustUrl(_this.img_user_64);
            //CONFIGURAÇÃO PARA ABRIR CHANNEL NO PUSHER
            _this.pusher = new Pusher('263f11c480ae605a75bb', {
                cluster: 'us2',
                forceTLS: true
            });
            var channel = _this.pusher.subscribe('App.User.' + _this.usuario.id);
            channel.bind('App\\Events\\StatusRequisitions', function (data) {
                _this.schedule.createSchedule(data);
            });
            //LISTAR OS TENANTS
            _this.conexaoApi.userListTenants(_this.usuario.token.access_token)
                .then(function (tenant) {
                _this.listTenant = [];
                _this.listTenant = tenant.result;
            })
                .catch(function () { _this.utilsPr.alertError("Não foi possível listar os campos disponíveis!"); });
        });
    };
    HomePage.prototype.openAtendimentoPageAluno = function () {
        this.navCtrl.push('AtendimentoUsuarioPage');
    };
    HomePage.prototype.chamadosPendentesTutor = function () {
        var _this = this;
        this.conexaoApi.requisitionPending(this.usuario.token.access_token)
            .then(function (request) {
            if (request.requests.length > 0) {
                _this.navCtrl.push('TutorChamadoPendentePage', {
                    chamado: request.requests,
                    access_token: _this.usuario.token.access_token,
                    type: true
                });
            }
            else {
                _this.utilsPr.alertInformation("Não há chamados pendentes!");
            }
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.conexaoApi.logout(this.usuario.token.access_token)
            .then(function () {
            _this.storage.resetStorage();
            _this.usuario = new __WEBPACK_IMPORTED_MODULE_5__model_usuario__["a" /* Usuario */]();
            _this.pusher.disconnect();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        })
            .catch(function () {
            _this.storage.resetStorage();
            _this.usuario = new __WEBPACK_IMPORTED_MODULE_5__model_usuario__["a" /* Usuario */]();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        });
    };
    //Valida quais as permissões que o usuário possui para visualizar componentes
    HomePage.prototype.validarPermissaoExibirComponenteUsuario = function (listPermission) {
        //Verifica se pode abrir chamado. É aluno.
        var abrirChamado = listPermission.filter(function (rsAbrirchamado) {
            return rsAbrirchamado.permission_id === "10";
        });
        this.viewAbrirChamado = abrirChamado.length > 0 ? true : false;
        //Gráfico é só para aluno, se viewAbrirChamado é true, significa que é aluno, chama método
        if (this.viewAbrirChamado) {
            //Visualização de gráficos
            this.exibirGraficos();
        }
        //Verifica se pode visualizar chamados pendentes para tutor. É tutor.
        var chamadoPendente = listPermission.filter(function (rsChamadoPendente) {
            return rsChamadoPendente.permission_id === "9";
        });
        this.viewChamadoPendente = chamadoPendente.length > 0 ? true : false;
        //Valida se possui permissão de Dashboard, que são gráficos gerenciais
        var dashboard = listPermission.filter(function (rsDashboard) {
            return rsDashboard.permission_id === "13";
        });
        this.viewGraficoGerencial = dashboard.length > 0 ? true : false;
    };
    //Ao escolher período, validar se é necessário chamar o método para buscar os valroes dos gráficos
    HomePage.prototype.exibirGraficosPeriodo = function () {
        if (this.dtIniGrafico != null && this.dtFimGrafico != null) {
            this.exibirGraficos();
        }
    };
    HomePage.prototype.exibirGraficos = function () {
        var _this = this;
        this.graficoUsPr.dashboardStudentCallsClassification(this.usuario.token.access_token, this.usuario.id, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.doughnutCanvas.nativeElement, data);
        });
        this.graficoUsPr.dashboardStudentCallsMatter(this.usuario.token.access_token, this.usuario.id, this.dtIniGrafico, this.dtFimGrafico)
            .then(function (data) {
            new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.doughnutCanvasMatter.nativeElement, data);
        });
    };
    HomePage.prototype.exibirRelatorio = function () {
        this.viewRelatorio = !this.viewRelatorio;
        //Troca o ícone de acordo com o clique
        if (this.iconRelatorio == "eye") {
            this.iconRelatorio = "eye-off";
        }
        else {
            this.iconRelatorio = "eye";
        }
    };
    HomePage.prototype.changeTenant = function () {
        this.sectionSelect.open();
    };
    HomePage.prototype.saveTenant = function () {
        var _this = this;
        this.conexaoApi.userAlterTenant(this.usuario.token.access_token, this.tenantIdSave)
            .then(function (data) {
            //Para alterar o tenant, é necessário recarregar as informações do usuário, para que ao recarregar
            //a página, no storage esteja os dados atualizados
            _this.recarregarInfoUsuario(data.result);
        })
            .catch(function () {
            _this.utilsPr.alertError("Não foi possível alterar o campus!");
        });
    };
    HomePage.prototype.recarregarInfoUsuario = function (mensagem) {
        var _this = this;
        //recarregar informações do usuário para atualizar Tenant
        this.conexaoApi.detalheUsuario(this.usuario.token.access_token)
            .then(function (detalheUsuario) {
            //Seta os detalhes do usuario na classe usuário para amarzenar no storage local
            _this.usuario.id = detalheUsuario.id;
            _this.usuario.name = detalheUsuario.name;
            _this.usuario.email = detalheUsuario.image;
            _this.usuario.image = detalheUsuario.image;
            _this.usuario.image_extension = detalheUsuario.image_extension;
            _this.usuario.tenant_id = detalheUsuario.tenant_id;
            _this.usuario.academic_resp = detalheUsuario.academic_resp;
            _this.usuario.roles = detalheUsuario.roles;
            _this.usuario.tenant = detalheUsuario.tenant;
            _this.conexaoApi.permissionsRole(_this.usuario.token.access_token, _this.usuario.roles[0].pivot.role_id)
                .then(function (permissionsRole) {
                //Seta permissões do usuario na classe usuário para amarzenar no storage local
                _this.usuario.permissions = permissionsRole;
                _this.storageProvider.save("usuario", _this.usuario)
                    .then(function () {
                    //Caso salve os dados no Storage, vai para a tela inicial
                    _this.utilsPr.alertInformation(mensagem);
                    _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                });
            });
        });
    };
    HomePage.prototype.openTutorRegistroPontoPage = function () {
        this.navCtrl.push('TutorRegistroPontoPage', { access_token: this.usuario.token.access_token });
    };
    HomePage.prototype.openGraficoGerencial = function () {
        this.navCtrl.push('GraficoGerencialPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutCanvas"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "doughnutCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("doughnutCanvasMatter"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "doughnutCanvasMatter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('sectionSelect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Select */])
    ], HomePage.prototype, "sectionSelect", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\home\home.html"*/'<ion-content padding>\n\n\n\n  <div style="width: 100%;height: 100%">\n\n\n\n    <div class="info-user">\n\n      <div class="info-user-sair">\n\n        <ion-row align-items-end>\n\n          <ion-col col-12 text-right>\n\n            <ion-icon name="exit" (click)="logout()"></ion-icon>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n      </div>\n\n\n\n      <div class="info-user-nome">\n\n\n\n        <div style="height: 100%; width: 30%; position: relative;float:left">\n\n          <div class="info-user-img">\n\n            <img [src]="image_user" class="info-user-foto" />\n\n          </div>\n\n        </div>\n\n\n\n        <div style="height: 100%; width: 60%; margin-left:16px; position: relative;float:left;" text-left>\n\n          <h5>{{usuario.name}}</h5>\n\n        </div>\n\n\n\n      </div>\n\n    </div>\n\n\n\n    <div class="info-user-tenant">\n\n      <div style="height: 100%; width: 30%; position: relative;float:left">\n\n\n\n      </div>\n\n      <div style="height: 100%; width: 70%; position: relative;float:left">\n\n        <ion-list>\n\n          <ion-item style="font-size:0.8em;" (click)="changeTenant()" >\n\n            {{usuario.tenant.name}}\n\n          </ion-item>\n\n\n\n          <ion-item [hidden]="true">\n\n            <ion-label>Escolha o campus</ion-label>\n\n            <ion-select #sectionSelect [(ngModel)]="tenantIdSave" cancelText="Cancelar" (ionChange)="saveTenant()">\n\n              <ion-option *ngFor="let opt of listTenant" [value]="opt.tenant_id">{{opt.name}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n\n\n          <ion-item *ngIf="viewAbrirChamado" (click)="exibirRelatorio()">\n\n            <p>Meus Gráficos</p>\n\n          </ion-item>\n\n\n\n        </ion-list>\n\n\n\n      </div>\n\n    </div>\n\n\n\n    <div style="width: 100%;height: 3%;"></div>\n\n\n\n    <ion-scroll scrollY="true" [hidden]="!viewRelatorio">\n\n\n\n      <div>\n\n        <ion-row style="font-size: 0.9em; color:#f4f4f4;">\n\n          <ion-col col-1>De:</ion-col>\n\n          <ion-col col-5 text-left>\n\n            <ion-datetime displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY" [(ngModel)]="dtIniGrafico"\n\n              (ionChange)="exibirGraficosPeriodo()" doneText="OK">\n\n            </ion-datetime>\n\n          </ion-col>\n\n          <ion-col col-1 *ngIf="dtIniGrafico!=null">A: </ion-col>\n\n          <ion-col col-5 *ngIf="dtIniGrafico!=null" text-left>\n\n            <ion-datetime color="toolbar-color" displayFormat="DD/MM/YY" pickerFormat="DD/MM/YYYY"\n\n              [(ngModel)]="dtFimGrafico" (ionChange)="exibirGraficosPeriodo()" doneText="OK"></ion-datetime>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #doughnutCanvas width="350" height="350"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n            <canvas #doughnutCanvasMatter width="330" height="330"></canvas>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n      </div>\n\n    </ion-scroll>\n\n\n\n    <div class="menu-user" *ngIf="!viewRelatorio">\n\n\n\n      <button *ngIf="viewGraficoGerencial" ion-button block clear (click)="openGraficoGerencial()">\n\n        <ion-icon name="stats" style="margin-right: 10%"></ion-icon>\n\n        Gráficos gerenciais\n\n      </button>\n\n\n\n\n\n      <button *ngIf="viewAbrirChamado" ion-button block clear (click)="openAtendimentoPageAluno()">\n\n        <ion-icon name="help-buoy" style="margin-right: 10%"></ion-icon>\n\n        Atendimento\n\n      </button>\n\n\n\n      <button *ngIf="viewChamadoPendente" ion-button block clear (click)="chamadosPendentesTutor()">\n\n        <ion-icon name="list-box" style="margin-right: 10%"></ion-icon>\n\n        Chamados pendentes\n\n      </button>\n\n\n\n      <button *ngIf="viewChamadoPendente" ion-button block clear (click)="openTutorRegistroPontoPage()">\n\n        <ion-icon name="finger-print" style="margin-right: 10%"></ion-icon>\n\n        Registros de pontos\n\n      </button>\n\n\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_12__providers_grafico_grafico_usuario__["a" /* GraficoUsuarioProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_utils_schedule__["a" /* ScheduleProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage__["a" /* StorageProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 188;

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/atendimento-usuario-materia/atendimento-usuario-materia.module": [
		592,
		9
	],
	"../pages/atendimento-usuario-pendente/atendimento-usuario-pendente.module": [
		593,
		8
	],
	"../pages/atendimento-usuario/atendimento-usuario.module": [
		596,
		7
	],
	"../pages/cadastrar/cadastrar.module": [
		594,
		6
	],
	"../pages/espaco/espaco.module": [
		595,
		5
	],
	"../pages/grafico-gerencial/grafico-gerencial.module": [
		597,
		4
	],
	"../pages/home/home.module": [
		599,
		11
	],
	"../pages/login/login.module": [
		600,
		10
	],
	"../pages/sobre/sobre.module": [
		601,
		3
	],
	"../pages/tutor-chamado-pendente-selecao-conteudo/tutor-chamado-pendente-selecao-conteudo.module": [
		598,
		2
	],
	"../pages/tutor-chamado-pendente/tutor-chamado-pendente.module": [
		602,
		1
	],
	"../pages/tutor-registro-ponto/tutor-registro-ponto.module": [
		603,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 229;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_local_notifications__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { StorageProvider } from './../storage/storage';


//import { ConexaoApiProvider } from '../conexao-api/conexao-api';
var ScheduleProvider = /** @class */ (function () {
    function ScheduleProvider(localNotifications) {
        this.localNotifications = localNotifications;
    }
    ScheduleProvider.prototype.createSchedule = function (data) {
        // Schedule a single notification
        this.localNotifications.schedule({
            id: 1,
            title: 'Atenção!',
            text: data.message,
            foreground: true,
            icon: 'res://icon',
            //smallIcon: 'res://ic_stat_onesignal_default',
            color: '#FF0000',
            vibrate: true,
        });
    };
    ScheduleProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], ScheduleProvider);
    return ScheduleProvider;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoUsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_utils__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraficoUsuarioProvider = /** @class */ (function () {
    function GraficoUsuarioProvider(graUtils, http) {
        this.graUtils = graUtils;
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
    }
    //ATENDIMENTO POR CLASSIFICAÇÃO - ALUNO
    GraficoUsuarioProvider.prototype.dashboardStudentCallsClassification = function (access_token, id_user, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idUser: id_user
            });
            _this.http.post(_this.API_URL + "dashboard-student-calls-classification/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                //resolve(result.json());
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Atendimento por matéria
    GraficoUsuarioProvider.prototype.dashboardStudentCallsMatter = function (access_token, id_user, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idUser: id_user
            });
            _this.http.post(_this.API_URL + "dashboard-student-calls-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Atendimento por matéria', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoUsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoUsuarioProvider);
    return GraficoUsuarioProvider;
}());

//# sourceMappingURL=grafico-usuario.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoManagerTutorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_utils__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraficoManagerTutorProvider = /** @class */ (function () {
    function GraficoManagerTutorProvider(graUtils, http) {
        this.graUtils = graUtils;
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
    }
    //Chamados por tutor e matéria
    GraficoManagerTutorProvider.prototype.dashboardCallsToTutorMatter = function (access_token, idTutor, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idTutor: idTutor
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-tutor-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Chamados por tutor e classificação
    GraficoManagerTutorProvider.prototype.dashboardCallsToReasonTutor = function (access_token, idTutor, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idTutor: idTutor
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-reason-tutor/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por classificação', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Atendimentos por hora e tutor
    GraficoManagerTutorProvider.prototype.dashboardAnswearToHourTutor = function (access_token, idTutor, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idTutor: idTutor
            });
            _this.http.post(_this.API_URL + "dashboard-answear-to-hour-tutor/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoManagerTutorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoManagerTutorProvider);
    return GraficoManagerTutorProvider;
}());

//# sourceMappingURL=grafico-manager-tutor.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoManagerChamadoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_utils__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraficoManagerChamadoProvider = /** @class */ (function () {
    function GraficoManagerChamadoProvider(graUtils, http) {
        this.graUtils = graUtils;
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
    }
    //Chamados por matéria
    GraficoManagerChamadoProvider.prototype.dashboardCallsToMatter = function (access_token, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].nameMatter);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Chamados por tutor
    GraficoManagerChamadoProvider.prototype.dashboardCallsToDest = function (access_token, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-dest/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por tutor', labelDoughnut, false));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Chamado por hora
    GraficoManagerChamadoProvider.prototype.dashboardCallsToHour = function (access_token, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-hour/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Top 10 alunos com mais chamados
    GraficoManagerChamadoProvider.prototype.dashboardCallsToOriTopTenDesc = function (access_token, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-ori-top-10-desc/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com mais chamados'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Top 10 alunos com menos chamados
    GraficoManagerChamadoProvider.prototype.dashboardCallsToOriTopTen = function (access_token, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-ori-top-10/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com menos chamados'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoManagerChamadoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoManagerChamadoProvider);
    return GraficoManagerChamadoProvider;
}());

//# sourceMappingURL=grafico-manager-chamado.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoManagerMateriaProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_utils__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraficoManagerMateriaProvider = /** @class */ (function () {
    function GraficoManagerMateriaProvider(graUtils, http) {
        this.graUtils = graUtils;
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
    }
    //Qtde de atendimentos tutores por matéria
    GraficoManagerMateriaProvider.prototype.dashboardCallsToMatter = function (access_token, idMatter, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idMatter: idMatter
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-dest-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Atendimentos tutores', labelDoughnut, false));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Qtde classificação duvidas por matéria
    GraficoManagerMateriaProvider.prototype.dashboardCallsToReasonMatter = function (access_token, idMatter, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idMatter: idMatter
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-reason-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Classificação de dúvidas', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Top 10 alunos com mais chamados por matéria
    GraficoManagerMateriaProvider.prototype.dashboardCallsToMatterTopTenDesc = function (access_token, idMatter, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idMatter: idMatter
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-matter-top-10-desc/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com mais chamados'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Top 10 alunos com menos chamados por matéria
    GraficoManagerMateriaProvider.prototype.dashboardCallsToMatterTopTenAsc = function (access_token, idMatter, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idMatter: idMatter
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-matter-top-10-asc/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com menos chamados'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Chamados por hora e matéria
    GraficoManagerMateriaProvider.prototype.dashboardCallsToHourMatter = function (access_token, idMatter, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idMatter: idMatter
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-hour-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(_this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoManagerMateriaProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoManagerMateriaProvider);
    return GraficoManagerMateriaProvider;
}());

//# sourceMappingURL=grafico-manager-materia.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoManagerAlunoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grafico_utils__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraficoManagerAlunoProvider = /** @class */ (function () {
    function GraficoManagerAlunoProvider(graUtils, http) {
        this.graUtils = graUtils;
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
    }
    //Chamados por aluno e matéria
    GraficoManagerAlunoProvider.prototype.dashboardCallsToStudentMatter = function (access_token, idStudent, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idStudent: idStudent
            });
            _this.http.post(_this.API_URL + "dashboard-calls-to-student-matter/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Atendimentos por classificação
    GraficoManagerAlunoProvider.prototype.dashboardStudentCallsClassification = function (access_token, idStudent, dtIni, dtFim) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idUser: idStudent
            });
            _this.http.post(_this.API_URL + "dashboard-student-calls-classification/", valores, _this.graUtils.geraHeaderPost(access_token))
                .subscribe(function (result) {
                //Por campos serem difente, valida os labels
                var labelDoughnut = [];
                for (var i = 0; i < result.json().data.length; i++) {
                    labelDoughnut.push(result.json().data[i].name);
                }
                resolve(_this.graUtils.geraGrafico(result.json(), 'Atendimentos por classificação', labelDoughnut, true));
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoManagerAlunoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__grafico_utils__["a" /* GraficoUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoManagerAlunoProvider);
    return GraficoManagerAlunoProvider;
}());

//# sourceMappingURL=grafico-manager-aluno.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(537);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraficoUtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Métodos comuns utilizados pelo gráficos gerenciais


var GraficoUtilsProvider = /** @class */ (function () {
    function GraficoUtilsProvider(http) {
        this.http = http;
        this.API_URL = 'http://200.98.142.33/api/';
        this.backgroundColor = [
            '#449D44', '#ec971f', '#00c0ef', '#c9302c', '#b94bdd', '#D8089A', '#E0A574', '#1AA6C9', '#C4EAFC', '#118969', '#8798E5',
            '#A1EA8F', '#F711A3', '#05AA68', '#0F8E62', '#99F7B5', '#ED2180', '#F2A98E', '#C45F36', '#DAE876', '#A8FF99', '#41A6A8',
            '#EAB7F4', '#A6B8EA', '#BF4609', '#EDA171', '#99FCC3', '#FCC2BD', '#F226AB', '#0B8957', '#D308A0', '#D1FFA0', '#57F9A3',
            '#EFBC94', '#D677E5', '#F4B897', '#4A72D4', '#71CC4D', '#7DF2E4', '#A3F989', '#F9F348', '#5B94C6', '#A9E3F2', '#14E0C5',
            '#E5ED95', '#197D84', '#E6F489', '#FCD8C4', '#EA8435', '#64EAC6', '#D87A5B', '#DFE52D', '#6E7BD3', '#ADD7FF', '#62EF8F'
        ];
    }
    //End point para selecionar parâmetros para demais gráficos
    GraficoUtilsProvider.prototype.dashboardSelectParams = function (access_token, tipo_opcao) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                type: tipo_opcao
            });
            _this.http.post(_this.API_URL + "dashboard-select-params/", valores, _this.geraHeaderPost(access_token))
                .subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    GraficoUtilsProvider.prototype.geraGrafico = function (data, title, labelDoughnut, viewLegend) {
        var dataDoughnut = [];
        var doughnutChart;
        if (data.data.length > 0) {
            for (var i = 0; i < data.data.length; i++) {
                //labelDoughnut.push(data.data[i].name);
                dataDoughnut.push(data.data[i].qtde);
            }
            return doughnutChart = {
                type: "doughnut",
                data: {
                    labels: labelDoughnut,
                    datasets: [
                        {
                            data: dataDoughnut,
                            backgroundColor: this.backgroundColor,
                            borderColor: 'transparent',
                            weight: 4
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: title,
                        fontColor: '#fff',
                        textAlign: 'left'
                    },
                    legend: {
                        position: 'left',
                        display: viewLegend,
                        labels: {
                            fontColor: '#fff',
                            fontSize: 9,
                            fontFamily: 'Neo Sans',
                            padding: 7,
                            boxWidth: 10
                        }
                    }
                }
            };
        }
        else {
            return doughnutChart = {
                type: "doughnut",
                data: {
                    labels: ['SEM DADOS'],
                    datasets: [
                        {
                            data: [0],
                            backgroundColor: ['#990000'],
                            borderColor: 'transparent',
                            weight: 0
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: title,
                        fontColor: '#fff',
                        textAlign: 'left'
                    },
                    legend: {
                        position: 'left',
                        labels: {
                            fontColor: '#fff',
                            fontSize: 9,
                            fontFamily: 'Neo Sans',
                            padding: 7,
                            boxWidth: 7
                        }
                    }
                }
            };
        }
    };
    GraficoUtilsProvider.prototype.geraGraficoLine = function (data, title) {
        var configcallstohour;
        var listHour = [];
        var listQtde = [];
        for (var i = 0; i < data.data.length; i++) {
            var element = data.data[i].hour;
            listHour.push(element);
        }
        for (var i = 0; i < data.data.length; i++) {
            var element = data.data[i].qtde;
            listQtde.push(element);
        }
        return configcallstohour = {
            type: 'line',
            data: {
                labels: listHour,
                datasets: [
                    {
                        backgroundColor: '#ffffff',
                        borderColor: '#311734',
                        pointBorderColor: '#ffffff',
                        data: listQtde,
                        fill: false,
                        showLine: true
                    },
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
                    fontColor: "#FFFFFF",
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                                color: "#FFFFFF"
                            },
                            ticks: {
                                fontColor: "#FFFFFF",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Horário',
                                fontColor: '#FFFFFF'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                fontColor: "#FFFFFF",
                            },
                            gridLines: {
                                display: true,
                                color: "#FFFFFF"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Quantidade',
                                fontColor: '#FFFFFF'
                            }
                        }]
                }
            }
        };
    };
    GraficoUtilsProvider.prototype.geraGraficoBar = function (data, title) {
        var barChart;
        var listName = [];
        var listQtde = [];
        for (var i = 0; i < data.data.length; i++) {
            var element = data.data[i].name;
            listName.push(element);
        }
        for (var i = 0; i < data.data.length; i++) {
            var element = data.data[i].qtde;
            listQtde.push(element);
        }
        return barChart = {
            type: "bar",
            data: {
                labels: listName,
                datasets: [
                    {
                        data: listQtde,
                        backgroundColor: this.backgroundColor,
                        borderColor: 'transparent',
                        weight: 4
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
                    fontColor: "#FFFFFF",
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                                color: "#FFFFFF",
                            },
                            ticks: {
                                display: false,
                                fontColor: "#FFFFFF",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Aluno',
                                fontColor: '#FFFFFF',
                            },
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                min: 0,
                                fontColor: "#FFFFFF",
                            },
                            gridLines: {
                                display: true,
                                color: "#FFFFFF"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Quantidade',
                                fontColor: '#FFFFFF'
                            }
                        }]
                }
            }
        };
    };
    GraficoUtilsProvider.prototype.geraHeaderPost = function (access_token) {
        //Configura cabeçalho
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + access_token);
        requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return requestOptions;
    };
    GraficoUtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], GraficoUtilsProvider);
    return GraficoUtilsProvider;
}());

//# sourceMappingURL=grafico-utils.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_utils_schedule__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_local_notifications__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_photo_viewer__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_grafico_grafico_usuario__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_grafico_grafico_manager_chamado__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_grafico_grafico_manager_materia__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_grafico_grafico_manager_aluno__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_grafico_grafico_manager_tutor__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_grafico_grafico_utils__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













5;













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/atendimento-usuario-materia/atendimento-usuario-materia.module#AtendimentoUsuarioMateriaPageModule', name: 'AtendimentoUsuarioMateriaPage', segment: 'atendimento-usuario-materia', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/atendimento-usuario-pendente/atendimento-usuario-pendente.module#AtendimentoUsuarioPendentePageModule', name: 'AtendimentoUsuarioPendentePage', segment: 'atendimento-usuario-pendente', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cadastrar/cadastrar.module#CadastrarPageModule', name: 'CadastrarPage', segment: 'cadastrar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/espaco/espaco.module#EspacoPageModule', name: 'EspacoPage', segment: 'espaco', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/atendimento-usuario/atendimento-usuario.module#AtendimentoUsuarioPageModule', name: 'AtendimentoUsuarioPage', segment: 'atendimento-usuario', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/grafico-gerencial/grafico-gerencial.module#GraficoGerencialPageModule', name: 'GraficoGerencialPage', segment: 'grafico-gerencial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutor-chamado-pendente-selecao-conteudo/tutor-chamado-pendente-selecao-conteudo.module#TutorChamadoPendenteSelecaoConteudoPageModule', name: 'TutorChamadoPendenteSelecaoConteudoPage', segment: 'tutor-chamado-pendente-selecao-conteudo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sobre/sobre.module#SobrePageModule', name: 'SobrePage', segment: 'sobre', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutor-chamado-pendente/tutor-chamado-pendente.module#TutorChamadoPendentePageModule', name: 'TutorChamadoPendentePage', segment: 'tutor-chamado-pendente', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutor-registro-ponto/tutor-registro-ponto.module#TutorRegistroPontoPageModule', name: 'TutorRegistroPontoPage', segment: 'tutor-registro-ponto', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_8__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_10__providers_storage_storage__["a" /* StorageProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_utils_utils__["a" /* UtilsProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_utils_schedule__["a" /* ScheduleProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_23__providers_grafico_grafico_utils__["a" /* GraficoUtilsProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_grafico_grafico_usuario__["a" /* GraficoUsuarioProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_grafico_grafico_manager_chamado__["a" /* GraficoManagerChamadoProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_grafico_grafico_manager_aluno__["a" /* GraficoManagerAlunoProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_grafico_grafico_manager_tutor__["a" /* GraficoManagerTutorProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_grafico_grafico_manager_materia__["a" /* GraficoManagerMateriaProvider */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 235,
	"./af.js": 235,
	"./ar": 236,
	"./ar-dz": 237,
	"./ar-dz.js": 237,
	"./ar-kw": 238,
	"./ar-kw.js": 238,
	"./ar-ly": 239,
	"./ar-ly.js": 239,
	"./ar-ma": 240,
	"./ar-ma.js": 240,
	"./ar-sa": 241,
	"./ar-sa.js": 241,
	"./ar-tn": 242,
	"./ar-tn.js": 242,
	"./ar.js": 236,
	"./az": 243,
	"./az.js": 243,
	"./be": 244,
	"./be.js": 244,
	"./bg": 245,
	"./bg.js": 245,
	"./bm": 246,
	"./bm.js": 246,
	"./bn": 247,
	"./bn.js": 247,
	"./bo": 248,
	"./bo.js": 248,
	"./br": 249,
	"./br.js": 249,
	"./bs": 250,
	"./bs.js": 250,
	"./ca": 251,
	"./ca.js": 251,
	"./cs": 252,
	"./cs.js": 252,
	"./cv": 253,
	"./cv.js": 253,
	"./cy": 254,
	"./cy.js": 254,
	"./da": 255,
	"./da.js": 255,
	"./de": 256,
	"./de-at": 257,
	"./de-at.js": 257,
	"./de-ch": 258,
	"./de-ch.js": 258,
	"./de.js": 256,
	"./dv": 259,
	"./dv.js": 259,
	"./el": 260,
	"./el.js": 260,
	"./en-SG": 261,
	"./en-SG.js": 261,
	"./en-au": 262,
	"./en-au.js": 262,
	"./en-ca": 263,
	"./en-ca.js": 263,
	"./en-gb": 264,
	"./en-gb.js": 264,
	"./en-ie": 265,
	"./en-ie.js": 265,
	"./en-il": 266,
	"./en-il.js": 266,
	"./en-nz": 267,
	"./en-nz.js": 267,
	"./eo": 268,
	"./eo.js": 268,
	"./es": 269,
	"./es-do": 270,
	"./es-do.js": 270,
	"./es-us": 271,
	"./es-us.js": 271,
	"./es.js": 269,
	"./et": 272,
	"./et.js": 272,
	"./eu": 273,
	"./eu.js": 273,
	"./fa": 274,
	"./fa.js": 274,
	"./fi": 275,
	"./fi.js": 275,
	"./fo": 276,
	"./fo.js": 276,
	"./fr": 277,
	"./fr-ca": 278,
	"./fr-ca.js": 278,
	"./fr-ch": 279,
	"./fr-ch.js": 279,
	"./fr.js": 277,
	"./fy": 280,
	"./fy.js": 280,
	"./ga": 281,
	"./ga.js": 281,
	"./gd": 282,
	"./gd.js": 282,
	"./gl": 283,
	"./gl.js": 283,
	"./gom-latn": 284,
	"./gom-latn.js": 284,
	"./gu": 285,
	"./gu.js": 285,
	"./he": 286,
	"./he.js": 286,
	"./hi": 287,
	"./hi.js": 287,
	"./hr": 288,
	"./hr.js": 288,
	"./hu": 289,
	"./hu.js": 289,
	"./hy-am": 290,
	"./hy-am.js": 290,
	"./id": 291,
	"./id.js": 291,
	"./is": 292,
	"./is.js": 292,
	"./it": 293,
	"./it-ch": 294,
	"./it-ch.js": 294,
	"./it.js": 293,
	"./ja": 295,
	"./ja.js": 295,
	"./jv": 296,
	"./jv.js": 296,
	"./ka": 297,
	"./ka.js": 297,
	"./kk": 298,
	"./kk.js": 298,
	"./km": 299,
	"./km.js": 299,
	"./kn": 300,
	"./kn.js": 300,
	"./ko": 301,
	"./ko.js": 301,
	"./ku": 302,
	"./ku.js": 302,
	"./ky": 303,
	"./ky.js": 303,
	"./lb": 304,
	"./lb.js": 304,
	"./lo": 305,
	"./lo.js": 305,
	"./lt": 306,
	"./lt.js": 306,
	"./lv": 307,
	"./lv.js": 307,
	"./me": 308,
	"./me.js": 308,
	"./mi": 309,
	"./mi.js": 309,
	"./mk": 310,
	"./mk.js": 310,
	"./ml": 311,
	"./ml.js": 311,
	"./mn": 312,
	"./mn.js": 312,
	"./mr": 313,
	"./mr.js": 313,
	"./ms": 314,
	"./ms-my": 315,
	"./ms-my.js": 315,
	"./ms.js": 314,
	"./mt": 316,
	"./mt.js": 316,
	"./my": 317,
	"./my.js": 317,
	"./nb": 318,
	"./nb.js": 318,
	"./ne": 319,
	"./ne.js": 319,
	"./nl": 320,
	"./nl-be": 321,
	"./nl-be.js": 321,
	"./nl.js": 320,
	"./nn": 322,
	"./nn.js": 322,
	"./pa-in": 323,
	"./pa-in.js": 323,
	"./pl": 324,
	"./pl.js": 324,
	"./pt": 325,
	"./pt-br": 326,
	"./pt-br.js": 326,
	"./pt.js": 325,
	"./ro": 327,
	"./ro.js": 327,
	"./ru": 328,
	"./ru.js": 328,
	"./sd": 329,
	"./sd.js": 329,
	"./se": 330,
	"./se.js": 330,
	"./si": 331,
	"./si.js": 331,
	"./sk": 332,
	"./sk.js": 332,
	"./sl": 333,
	"./sl.js": 333,
	"./sq": 334,
	"./sq.js": 334,
	"./sr": 335,
	"./sr-cyrl": 336,
	"./sr-cyrl.js": 336,
	"./sr.js": 335,
	"./ss": 337,
	"./ss.js": 337,
	"./sv": 338,
	"./sv.js": 338,
	"./sw": 339,
	"./sw.js": 339,
	"./ta": 340,
	"./ta.js": 340,
	"./te": 341,
	"./te.js": 341,
	"./tet": 342,
	"./tet.js": 342,
	"./tg": 343,
	"./tg.js": 343,
	"./th": 344,
	"./th.js": 344,
	"./tl-ph": 345,
	"./tl-ph.js": 345,
	"./tlh": 346,
	"./tlh.js": 346,
	"./tr": 347,
	"./tr.js": 347,
	"./tzl": 348,
	"./tzl.js": 348,
	"./tzm": 349,
	"./tzm-latn": 350,
	"./tzm-latn.js": 350,
	"./tzm.js": 349,
	"./ug-cn": 351,
	"./ug-cn.js": 351,
	"./uk": 352,
	"./uk.js": 352,
	"./ur": 353,
	"./ur.js": 353,
	"./uz": 354,
	"./uz-latn": 355,
	"./uz-latn.js": 355,
	"./uz.js": 354,
	"./vi": 356,
	"./vi.js": 356,
	"./x-pseudo": 357,
	"./x-pseudo.js": 357,
	"./yo": 358,
	"./yo.js": 358,
	"./zh-cn": 359,
	"./zh-cn.js": 359,
	"./zh-hk": 360,
	"./zh-hk.js": 360,
	"./zh-tw": 361,
	"./zh-tw.js": 361
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 573;

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import {timer} from 'rxjs/observable/timer';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */];
        //rootPage: any = ChartsPage;
        this.showSplash = true;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.overlaysWebView(false);
            Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__["timer"])(1000).subscribe(function () { return splashScreen.hide(); });
            Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__["timer"])(3000).subscribe(function () { return _this.showSplash = false; });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\app\app.html"*/'<div *ngIf="showSplash" class="splash">\n\n    <div class="spinner">\n\n        <div class="cube1"></div>\n\n        <div class="cube2"></div>\n\n    </div>\n\n</div>\n\n\n\n<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UtilsProvider = /** @class */ (function () {
    function UtilsProvider(alert, diag, geolocation, loadingCtrl) {
        this.alert = alert;
        this.diag = diag;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
    }
    UtilsProvider.prototype.alertInformation = function (mensagem) {
        return this.alert.create({
            title: 'Informação',
            message: mensagem,
            buttons: ['OK']
        }).present();
    };
    //Função para exibir alertas de erro
    UtilsProvider.prototype.alertError = function (mensagem, loading) {
        if (loading) {
            loading.dismiss();
        }
        this.alert.create({
            title: 'Erro',
            message: mensagem,
            buttons: ['OK']
        }).present();
    };
    //Função para obter coordenadas do aparelho
    UtilsProvider.prototype.getLocation = function () {
        //Ativar geolocation
        var _this = this;
        //Validar se está ativado
        //Validar se tem permissão
        //Se não tiver, solicitar permissão para o app
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Obtendo localização do aparelho...'
        });
        loading.present();
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition()
                .then(function (position) {
                loading.dismiss();
                resolve({ lat: position.coords.latitude, long: position.coords.longitude });
            })
                .catch(function (error) {
                _this.diag.isLocationEnabled()
                    .then(function (state) {
                    if (!state) {
                        loading.dismiss();
                        _this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
                            "esteja habilitado!");
                    }
                    else {
                        _this.diag.isLocationAuthorized()
                            .then(function (state) {
                            if (!state) {
                                loading.dismiss();
                                _this.alertInformation("Para abertura de chamados é necessário que o 'App PPA' esteja com " +
                                    "permissão de visualizar a localização do aparelho. Habilite a permissão e tente novamente!");
                            }
                            else {
                                loading.dismiss();
                                _this.alertError("Não foi possível obter a sua localização para abertura de chamado!");
                            }
                        })
                            .catch(function (error) {
                            loading.dismiss();
                            _this.alertInformation("Não foi possível verificar se sua localização está autorizada para abertura de chamado!");
                        });
                    }
                })
                    .catch(function (error) {
                    loading.dismiss();
                    _this.alertInformation("Não foi possível verificar se sua localização está ativa para abertura de chamado!");
                });
            });
        });
        //Validar se está ativado
        //Validar se tem permissão
        //Se não tiver, solicitar permissão para o app
        /* let loading = this.loadingCtrl.create({
             spinner: 'bubbles',
             content: 'Obtendo localização do aparelho...'
           });
           loading.present();
        return new Promise(resolve => {
     
           
     /*
         this.geolocation.getCurrentPosition().then((position) => {
           loading.dismiss();
           this.alertInformation(position.coords.latitude + " " + position.coords.longitude);
           resolve({ lat: position.coords.latitude, long: position.coords.longitude });
         }).catch((error) => {
           loading.dismiss();
           this.alertError("Não foi possível obter a sua localização para abertura de chamado. " +
             "É nessário estar com a 'Localização/GPS' ativado e a permissão de visuzaliar a " +
             "localização do aparelho configurada!");
         });
       });
     
     
         /*this.diag.isGpsLocationEnabled()
             .then((state: AnalyserNode) => {
               this.alertInformation("sem promisse");
               if (!state) {
                 loading.dismiss();
                 this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
                   "esteja habilitado!");
               }
             });
     
         return new Promise(resolve => {
           
     
           this.diag.isGpsLocationEnabled()
             .then((state: AnalyserNode) => {
               this.alertInformation("OOO");
               if (!state) {
                 loading.dismiss();
                 this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
                   "esteja habilitado!");
               }
               else {
                 this.alertInformation("Else");
                 this.diag.isLocationAuthorized()
                   .then((state: AnalyserNode) => {
                     this.alertInformation("OOO");
                     if (!state) {
                       loading.dismiss();
                       this.alertInformation("Para abertura de chamados é necessário que o 'App PPA' esteja com " +
                         "permissão de visuzaliar a " +
                         "localização do aparelho. Habilite a permissão e tente novamente!");
                     }
                     else {
                       this.geolocation.getCurrentPosition().then((position) => {
                         loading.dismiss();
                         resolve({ lat: position.coords.latitude, long: position.coords.longitude });
                       }).catch((error) => {
                         loading.dismiss();
                         this.alertError("Não foi possível obter a sua localização para abertura de chamado. " +
                           "Tente novamente!");
                       });
                     }
                   })
                   .catch((error) => {
                     loading.dismiss();
                     this.alertError("Não foi possível verificar a permissão de localizaçã do 'App PPA'. Tente novamente!");
                   })
               }
             })
             .catch((error) => {
               loading.dismiss();
               this.alertError("Não foi possível verificar se sua localização está ativa. Tente novamente!");
             })
         });*/
    };
    UtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* LoadingController */]])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConexaoApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConexaoApiProvider = /** @class */ (function () {
    function ConexaoApiProvider(http, loadingCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        //private API_URL = 'http://200.98.142.33/api/';
        this.API_URL = 'http://webppa.ddns.net/api/';
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
    }
    //Cadastro do usuário
    ConexaoApiProvider.prototype.userStore = function (name, email, password) {
        var _this = this;
        //Configura cabeçalho
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, estamos validando os dados informados...'
            });
            loading.present();
            var valores = JSON.stringify({
                name: name,
                email: email,
                password: password,
                academic_resp: email,
                baia: "",
                role: ""
            });
            requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post(_this.API_URL + "user-store/", valores, requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result);
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //Faz login em uma conta. Recebe o email e password e faz um 'post' na API_URL
    //No retorno, resolve o arquivo para 'json'.
    ConexaoApiProvider.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Configura cabeçalho
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            var requestOptions;
            headers.append('Content-Type', 'application/json');
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, estamos validando os dados informados...'
            });
            loading.present();
            var valores = JSON.stringify({
                email: email,
                password: password
            });
            requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post(_this.API_URL + "login/", valores, requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result);
                console.log(result);
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    ConexaoApiProvider.prototype.detalheUsuario = function (access_token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Acesso liberado. Baixando as informações do usuário. Aguarde...'
            });
            loading.present();
            _this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            _this.headers.append('Content-Type', 'application/json');
            _this.headers.append('Authorization', 'Bearer ' + access_token);
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            _this.http.get(_this.API_URL + "user/", _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    ConexaoApiProvider.prototype.permissionsRole = function (access_token, role_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Baixando as permissões do usuário. Aguarde...'
            });
            loading.present();
            //this.headers.append('Authorization', access_token);
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                role_id: role_id
            });
            _this.http.post(_this.API_URL + "permissionsRole/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    ConexaoApiProvider.prototype.logout = function (access_token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Saindo do app...'
            });
            loading.present();
            //Configura cabeçalho
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            var requestOptions;
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + access_token);
            requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.API_URL + "logout/", requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result);
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //Resetar senha
    ConexaoApiProvider.prototype.forgot = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde...'
            });
            loading.present();
            //this.headers.append('Authorization', access_token);
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                email: email,
            });
            _this.http.post(_this.API_URL + "forgot/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //*****REFERENTE A CHAMADOS FEITA PELO ALUNO */
    ConexaoApiProvider.prototype.requisition = function (access_token, id_usuario, latitude, longitude) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, buscando as áreas...'
            });
            loading.present();
            //1º passo
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                sender_call: id_usuario,
                latitude: latitude,
                longitude: longitude
            });
            _this.http.post(_this.API_URL + "requisition/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //2º Passo
    ConexaoApiProvider.prototype.requisitionMatter = function (access_token, classification_id, id_usuario) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, carregando...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                sender_call: id_usuario,
                classification_id: classification_id
            });
            _this.http.post(_this.API_URL + "requisition-matter/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__["timer"])(300).subscribe(function () {
                    resolve(result.json());
                });
            }, function (error) {
                loading.dismiss();
                reject(error.json());
            });
        });
    };
    //3º passo
    ConexaoApiProvider.prototype.requisitionCreateAll = function (access_token, matter_id, id_usuario) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, carregando...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                sender_call: id_usuario,
                matter_id: matter_id
            });
            _this.http.post(_this.API_URL + "requisition-create-call/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error.json());
            });
        });
    };
    //Cancelar chamado
    ConexaoApiProvider.prototype.requisitionCancel = function (access_token, id_call) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, cancelando chamado...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                id_call: id_call
            });
            _this.http.post(_this.API_URL + "requisition-cancel/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //CHAMADOS PENDENTES ALUNO
    ConexaoApiProvider.prototype.myCallsDatePending = function (access_token) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, listando seus chamados pendentes...'
        });
        loading.present();
        //Cabeçalho criado novo pois usando o ativo ele enviava 2 tokens
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + access_token);
        requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_URL + "my-calls-date-pending/", requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error.json());
            });
        });
    };
    //LISTAR TUTORES DISPONÍVEIS PARA O ALUNO
    ConexaoApiProvider.prototype.tutorsJob = function (access_token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            _this.headers.append('Content-Type', 'application/json');
            _this.headers.append('Authorization', 'Bearer ' + access_token);
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            _this.http.get(_this.API_URL + "tutors-job/", _this.requestOptions)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    //**FIM DE CHAMADOS PARA O ALUNO */
    //** REFERENTE A CHAMADOS PARA O TUTOR */
    //CHAMADOS PENDENTES PARA O TUTOR
    ConexaoApiProvider.prototype.requisitionPending = function (access_token) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, listando seus chamados pendentes...'
        });
        loading.present();
        //Cabeçalho criado novo pois usando o ativo ele enviava 2 tokens
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + access_token);
        requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_URL + "requisition-pending/", requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error.json());
            });
        });
    };
    //1º PASSO (SELEÇÃO DO CONTEÚDO DO CHAMADO)
    ConexaoApiProvider.prototype.requisitionSetTheme = function (id_call, status, id_theme, level_theme) {
        var _this = this;
        //O requisitionSetTheme é dividio em 2 status. O 1º envia somente o id_call para trazer todos os items.
        //Seleção do conteúdo do chamado
        //O 2º passo envia o id_theme e level_theme, que são os códigos de cada item. Seleção dos parâmetros
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, buscando itens...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = {};
            //Valida qual passo está. se 1, envia só id call, se 2, envia tambem id_theme e level_theme
            if (status == 1) {
                valores = JSON.stringify({
                    id_call: id_call
                });
            }
            else {
                valores = JSON.stringify({
                    id_call: id_call,
                    id_theme: id_theme,
                    level_theme: level_theme,
                });
            }
            _this.http.post(_this.API_URL + "requisition-set-theme/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__["timer"])(300).subscribe(function () {
                    resolve(result);
                });
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //2º PASSO
    ConexaoApiProvider.prototype.requisitionAnswer = function (id_call) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, buscando itens...'
        });
        loading.present();
        this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                id_call: id_call
            });
            _this.http.post(_this.API_URL + "requisition-answer/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result);
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //3º PASSO
    ConexaoApiProvider.prototype.answerRegister = function (id_call, description, reason, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, finalizando o chamado...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                id_call: id_call,
                description: description,
                reason: reason,
                type: type
            });
            _this.http.post(_this.API_URL + "answer-register/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result);
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //**FIM CHAMADOS PARA O TUTOR */
    //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
    ConexaoApiProvider.prototype.arrival = function (access_token) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, registrando a entrada...'
        });
        loading.present();
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + access_token);
        this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_URL + "arrival/", _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
    ConexaoApiProvider.prototype.departure = function (access_token) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Aguarde, registrando a entrada...'
        });
        loading.present();
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + access_token);
        this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_URL + "departure?=", _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    //************************* RELATÓRIOS */
    //ATENDIMENTO POR CLASSIFICAÇÃO - ALUNO
    ConexaoApiProvider.prototype.dashboardStudentCallsClassification = function (access_token, id_user, dtIni, dtFim) {
        var _this = this;
        //Configura cabeçalho
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + access_token);
        requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idUser: id_user
            });
            _this.http.post(_this.API_URL + "dashboard-student-calls-classification/", valores, requestOptions)
                .subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //Atendimento por matéria
    ConexaoApiProvider.prototype.dashboardStudentCallsMatter = function (access_token, id_user, dtIni, dtFim) {
        var _this = this;
        //Configura cabeçalho
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        var requestOptions;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + access_token);
        requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return new Promise(function (resolve, reject) {
            var valores = JSON.stringify({
                dtIni: dtIni,
                dtFim: dtFim,
                idUser: id_user
            });
            _this.http.post(_this.API_URL + "dashboard-student-calls-matter/", valores, requestOptions)
                .subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    //RELAÇÃO A TENANTS DE USUÁRIO
    //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
    ConexaoApiProvider.prototype.userListTenants = function (access_token) {
        var _this = this;
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + access_token);
        this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.API_URL + "user-list-tenants?=", _this.requestOptions)
                .subscribe(function (result) {
                resolve(result.json());
            }, function (error) {
                reject(error);
            });
        });
    };
    //ALTERAR O TENANT
    ConexaoApiProvider.prototype.userAlterTenant = function (access_token, tenant_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Aguarde, alterando o campus...'
            });
            loading.present();
            _this.requestOptions = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
            var valores = JSON.stringify({
                token: access_token,
                tenant_id: tenant_id
            });
            _this.http.post(_this.API_URL + "user-alter-tenant/", valores, _this.requestOptions)
                .subscribe(function (result) {
                loading.dismiss();
                resolve(result.json());
            }, function (error) {
                loading.dismiss();
                reject(error);
            });
        });
    };
    ConexaoApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], ConexaoApiProvider);
    return ConexaoApiProvider;
}());

//# sourceMappingURL=conexao-api.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StorageProvider = /** @class */ (function () {
    function StorageProvider(storage) {
        this.storage = storage;
    }
    StorageProvider.prototype.getInfo = function (key) {
        return this.storage.get(key)
            .catch(function (error) {
            alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
        });
    };
    StorageProvider.prototype.save = function (key, usuario) {
        return this.storage.set(key, usuario)
            .catch(function (error) {
            alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
        });
    };
    StorageProvider.prototype.resetStorage = function () {
        this.storage.clear()
            .catch(function (error) {
            alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
        });
    };
    StorageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], StorageProvider);
    return StorageProvider;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_conexao_api_conexao_api__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_usuario__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(157);
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








var LoginPage = /** @class */ (function () {
    function LoginPage(conexaoAPI, storageProvider, navCtrl, statusBar, utilsPr) {
        this.conexaoAPI = conexaoAPI;
        this.storageProvider = storageProvider;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.utilsPr = utilsPr;
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#153530');
        //Validar se tem token, se sim, ir direto.
        this.storageProvider.getInfo('usuario')
            .then(function (infoStorage) {
            //valida dado no storage. Se tem dado, valida token
            var dtAtual = new Date();
            if (infoStorage != null) {
                var dateExpiration = infoStorage.token.expires_at;
                // Coloca T entre data e hora para converter em milliseconds
                if (new Date(dateExpiration.split(' ').join('T')).getTime() > dtAtual.setDate(dtAtual.getDate() - 1)) {
                    //Token válido
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.storageProvider.resetStorage();
                    _this.navCtrl.setRoot(LoginPage_1);
                }
            }
            else {
                _this.storageProvider.resetStorage();
                _this.usuario = new __WEBPACK_IMPORTED_MODULE_5__model_usuario__["a" /* Usuario */]();
            }
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if ((this.loginUsuario == undefined || this.loginUsuario == '') ||
            (this.senha == undefined || this.senha == '')) {
            this.utilsPr.alertInformation("Preencha os dados corretamente!");
        }
        else {
            this.conexaoAPI.login(this.loginUsuario, this.senha)
                .then(function (login) {
                //Valida status. Se 201, armazena token no storage local
                if (login.status == 201) {
                    //Seta token na classe usuário para amarzenar no storage local
                    _this.usuario.token.access_token = login.json().access_token;
                    _this.usuario.token.expires_at = login.json().expires_at;
                    _this.conexaoAPI.detalheUsuario(_this.usuario.token.access_token)
                        .then(function (detalheUsuario) {
                        //Seta os detalhes do usuario na classe usuário para amarzenar no storage local
                        _this.usuario.id = detalheUsuario.id;
                        _this.usuario.name = detalheUsuario.name;
                        _this.usuario.email = detalheUsuario.image;
                        _this.usuario.image = detalheUsuario.image;
                        _this.usuario.image_extension = detalheUsuario.image_extension;
                        _this.usuario.tenant_id = detalheUsuario.tenant_id;
                        _this.usuario.academic_resp = detalheUsuario.academic_resp;
                        _this.usuario.roles = detalheUsuario.roles;
                        _this.usuario.tenant = detalheUsuario.tenant;
                        //console.log("Detalhe Usuário: ", this.usuario);
                        _this.conexaoAPI.permissionsRole(_this.usuario.token.access_token, _this.usuario.roles[0].pivot.role_id)
                            .then(function (permissionsRole) {
                            //Seta permissões do usuario na classe usuário para amarzenar no storage local
                            _this.usuario.permissions = permissionsRole;
                            _this.storageProvider.save("usuario", _this.usuario)
                                .then(function () {
                                //Caso salve os dados no Storage, vai para a tela inicial
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                            });
                        });
                    });
                }
                else {
                    _this.utilsPr.alertError("Ocorreu um erro. Verifique conexão com a internet ou tente novamente mais tarde");
                }
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.utilsPr.alertError(error.json().message);
                }
                else {
                    _this.utilsPr.alertError("Dados informados inválidos!");
                    //console.log("--> ",error);
                    //this.navCtrl.setRoot(LoginPage);
                }
            });
        }
    };
    LoginPage.prototype.openSobrePage = function () {
        this.navCtrl.push('SobrePage');
    };
    LoginPage.prototype.alterarSenha = function () {
        var _this = this;
        if ((this.loginUsuario == undefined || this.loginUsuario == '')) {
            this.utilsPr.alertError("Para alterar a senha é necessário preencher o campo e-mail!");
        }
        else {
            this.conexaoAPI.forgot(this.loginUsuario)
                .then(function () {
                _this.utilsPr.alertInformation("Nova senha enviada para o e-mail informado.");
            })
                .catch(function () {
                _this.utilsPr.alertError("Não foi possível alterar a senha. Tente novamente");
            });
        }
    };
    LoginPage.prototype.cadastrar = function () {
        this.navCtrl.push('CadastrarPage');
    };
    var LoginPage_1;
    LoginPage = LoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\login\login.html"*/'<ion-content class="background">\n\n\n\n  <img src="assets/imgs/login-logo.png" alt="logo" style="margin-top: 15px;">\n\n\n\n  <ion-card>\n\n\n\n    <ion-card-header>\n\n\n\n    </ion-card-header>\n\n\n\n    <ion-card-content>\n\n\n\n      <ion-list no-lines>\n\n\n\n        <ion-item>\n\n          <button ion-button icon-only item-left color="ppa">\n\n            <ion-icon name="person"></ion-icon>\n\n          </button>\n\n          <ion-input type="text" placeholder="USUÁRIO" text-center clearInput [(ngModel)]="loginUsuario"> </ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <button ion-button icon-only item-left color="ppa">\n\n            <ion-icon name="lock"></ion-icon>\n\n          </button>\n\n          <ion-input type="password" placeholder="SENHA" text-center clearInput [(ngModel)]="senha"></ion-input>\n\n        </ion-item>\n\n\n\n        <button ion-button small color="ppa" (click)="login()" class="btn-action">Entrar</button>\n\n        <br><br>\n\n        <p (click)="alterarSenha()" class="esquecer-senha">Esqueceu sua senha?</p>\n\n\n\n      </ion-list>\n\n\n\n      <div class="conheca-ppa">\n\n        <button ion-button clear color="light" (click)="cadastrar()">Cadastre-se</button><br/>\n\n        <button ion-button clear color="light" (click)="openSobrePage()">Conheça o PPA</button>\n\n      </div>\n\n\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n\n\n<!--\n\n\n\n<ion-content class="div-content">\n\n\n\n  <div class="div-logo"></div>\n\n\n\n  <div class="div-login">\n\n    <ion-grid>\n\n      <ion-row align-items-center class="rowUsuario">\n\n        <ion-col col-2>\n\n          <div class="col-img-login">\n\n            <div class="img-login">\n\n              <ion-icon name="person"></ion-icon>\n\n            </div>\n\n          </div>\n\n        </ion-col>\n\n        <ion-col col-10>\n\n          <ion-input type="text" placeholder="USUÁRIO" text-center clearInput [(ngModel)]="loginUsuario"></ion-input>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row align-items-center class="rowUsuario">\n\n        <ion-col col-2>\n\n          <div class="col-img-login">\n\n            <div class="img-login">\n\n              <ion-icon name="lock"></ion-icon>\n\n            </div>\n\n          </div>\n\n        </ion-col>\n\n        <ion-col col-10>\n\n          <ion-input type="password" placeholder="SENHA" text-center clearInput [(ngModel)]="senha"></ion-input>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n\n\n  <div class="div-rodape"></div>\n\n\n\n</ion-content>\n\n-->'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_conexao_api_conexao_api__["a" /* ConexaoApiProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_0__providers_utils_utils__["a" /* UtilsProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[413]);
//# sourceMappingURL=main.js.map