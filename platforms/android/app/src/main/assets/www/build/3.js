webpackJsonp([3],{

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SobrePageModule", function() { return SobrePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sobre__ = __webpack_require__(610);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SobrePageModule = /** @class */ (function () {
    function SobrePageModule() {
    }
    SobrePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sobre__["a" /* SobrePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sobre__["a" /* SobrePage */]),
            ],
        })
    ], SobrePageModule);
    return SobrePageModule;
}());

//# sourceMappingURL=sobre.module.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SobrePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SobrePage = /** @class */ (function () {
    function SobrePage(dom, navCtrl, statusBar) {
        this.dom = dom;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.vid = "https://www.youtube.com/embed/r5YBlFpJAsE";
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
        this.viewConteudo = true;
        this.viewCurso = false;
        this.viewEspaco = false;
        this.viewMetodologia = false;
        this.viewContato = false;
    }
    SobrePage.prototype.ionViewDidLoad = function () {
    };
    SobrePage.prototype.backPage = function () {
        if (this.viewConteudo) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        }
        else {
            this.viewConteudo = true;
            this.viewCurso = false;
            this.viewEspaco = false;
            this.viewMetodologia = false;
            this.viewContato = false;
        }
    };
    SobrePage.prototype.exibir = function (view) {
        if (view == 1) {
            this.viewConteudo = false;
            this.viewCurso = true;
            this.viewEspaco = false;
            this.viewMetodologia = false;
            this.viewContato = false;
        }
        else if (view == 2) {
            this.viewConteudo = false;
            this.viewCurso = false;
            this.viewEspaco = true;
            this.viewMetodologia = false;
            this.viewContato = false;
        }
        else if (view == 3) {
            this.viewConteudo = false;
            this.viewCurso = false;
            this.viewEspaco = false;
            this.viewMetodologia = true;
            this.viewContato = false;
        }
        else if (view == 4) {
            this.viewConteudo = false;
            this.viewCurso = false;
            this.viewEspaco = false;
            this.viewMetodologia = false;
            this.viewContato = true;
        }
        else {
        }
    };
    SobrePage.prototype.openEspaco = function () {
        this.navCtrl.push('EspacoPage');
    };
    SobrePage.prototype.sanitize = function (vid) {
        return this.dom.bypassSecurityTrustResourceUrl(vid);
    };
    SobrePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sobre',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\sobre\sobre.html"*/'<ion-content padding>\n\n  <div class="content">\n\n    <div class="cabecalho" (click)="backPage()">\n\n      <div class="cabecalho-back" text-left>\n\n        <ion-icon name="home"></ion-icon>\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </div>\n\n      <div class="cabecalho-imagem-vest" *ngIf="viewConteudo">\n\n        <img src="assets/imgs/sobre/sobre-logo-vest.png">\n\n      </div>\n\n      <div class="cabecalho-imagem-med" *ngIf="viewConteudo">\n\n        <img src="assets/imgs/sobre/sobre-logo-med.png" />\n\n      </div>\n\n    </div>\n\n\n\n    <div class="conteudo">\n\n      <ion-list no-lines *ngIf="viewConteudo">\n\n\n\n        <ion-item text-center (click)="exibir(1)">\n\n          <h5>Cursos</h5>\n\n          <img src="assets/imgs/sobre/botao_cursos.png" />\n\n        </ion-item>\n\n\n\n        <ion-item text-center (click)="openEspaco()">\n\n          <h5>Espaço</h5>\n\n          <img src="assets/imgs/sobre/botao_espaco.png" />\n\n        </ion-item>\n\n\n\n        <ion-item text-center (click)="exibir(3)">\n\n          <h5>Metodologia</h5>\n\n          <img src="assets/imgs/sobre/botao_metodologia.png">\n\n        </ion-item>\n\n\n\n        <ion-item text-center (click)="exibir(4)">\n\n          <h5>Contatos</h5>\n\n          <img src="assets/imgs/sobre/botao_contato.png" />\n\n        </ion-item>\n\n\n\n      </ion-list>\n\n\n\n      <!--INFORMÇAÕES DO CURSO-->\n\n\n\n\n\n      <ion-list *ngIf="viewCurso" class="view-curso">\n\n        <h2>Cursos </h2>\n\n        <ion-item>\n\n          <h3 text-wrap>Pré-Vestibular Integral +conforto</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            O pré-vestibular integral +conforto é um curso semestra, cujo objetivo é trabalhar\n\n            todo o conteúdo do Ensino Médio, partindo de uma abordagem básica, até reflexões mais\n\n            profundas. Com planeamento diário de atividades, aulas dinâmicas e com linguagem\n\n            contextualizada, além de todo esse conteúdo, oferecemos, em nossa grade-horária,\n\n            aula prática de redação, de atualidades, de obras clássicas,\n\n            de situação-problema (objetivando desenvolver nos estudantes repertório sociocultural e\n\n            habilidade em resolver problemas). O diferencial desse curso é a metodologia ativa\n\n            que o PPA oferece, o encontro semanal com nossos mentores e o material do Ari de Sá (SAS),\n\n            cuja plataforma digital apresenta as melhores ferramentas educacionais de apoio ao estudante.\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <h3 text-wrap>Estudo Orientado Campus Integral</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            O Campus é nossa realidade mais orgânica. Com trabalho duro, com garra, com planejamento,\n\n            organizamos a rotina diária do estudante. Não se trata de um reforço escolar, mas, sim,\n\n            do desenvolvimento do hábido de estudo, do comportamento necessário para se tornar um indivíduo\n\n            de alta performance. Neste curso, por meio da Jornada de Transformação, transformamos o Aluno\n\n            em Estudante e o Participante em Candidato. O encontro semana com os mentores e as atividades\n\n            complementares são nossos diferenciais.\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <h3 text-wrap>Pré-vestibular Integral turma</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            O pré-vestibular integral turam é um curso semestral, cujo objetivo é trabalhar todo o\n\n            conteúdo do Ensino Médio partindo de uma abordagem básia até reflexões de atividades,\n\n            aulas dinâmicas e com linguagem contextualizada, além de todo esse conteúdo, oferecemos,\n\n            em nossa grade-horária, aula prática de redação, de atualidades, de obras clássicas,\n\n            de situação-problema (objetivando desenvolver nos estudantes repertório sociocultural e\n\n            habilidade em resolver problemas). O diferencial desse curso é a metodologia ativa que o\n\n            PPA oferece, o encontro semanal com nossos mentores e o material do Ari de Sá (SAS),\n\n            cuja plataforma digital apresenta as melhores ferramentas educacionais de apoio ao estudante.\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <h3 text-wrap>Estudo Orientado Campus Complementar</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            O campus é a nossa realidade mais orgânica. Com trabalho duro, com garra, com planejamento de atividades,\n\n            com estudo estratégico, organizamos o contraturno escolar do estudante. Não se trata de um reforço escolar,\n\n            mas, sim, do desenvolvimento do hábito de estudo, do comportamento necessário para se tornar um indíviduo de\n\n            alta performance. Neste curso, por meio da Jornada de Transformação, transformamos o Aluno em Estudante e o\n\n            Participante em Candidato. O encontro semanal com os mentores e as atividades complementares são nossos\n\n            diferenciais.\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <h3 text-wrap>\n\n            Pré-MED DF matutino e noturno</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n\n            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\n\n            ea commodo consequat.\n\n            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n            Excepteur sint occaecat\n\n            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n          <h3 text-wrap>\n\n            Redação com Filosofia</h3>\n\n          <br>\n\n          <p text-wrap>\n\n            A prova de redação do Enem é uma prova de LEITURA. O objetivo deste curso é apresentar aos candidatos as\n\n            regras do jogo. Detalhamos o funcionamento da planilha de correção (nível a nível) para comprovar que\n\n            redação é treino, é prática é LEITURA estratégica, e não sorte ou inspiração. Com uma pitada crítica de\n\n            filosofia, desenvolvemos repertório sociocultural produtivo e autoria sempre buscando as melhores soluções\n\n            para as situações-problemas trabalhadas durante as aulas.\n\n\n\n          </p>\n\n\n\n        </ion-item>\n\n\n\n      </ion-list>\n\n\n\n      <!--INFORMÇAÕES DE METODOLOGIA -->\n\n      <ion-list *ngIf="viewMetodologia" class="view-curso">\n\n        <ion-item>\n\n          <h2 text-wrap style="color: #7cc0b5; font-weight: bold;\n\n                  border-bottom: 1px solid #7cc0b5; margin-left: 0%; padding-top: 3%;">\n\n            METODOLOGIA</h2>\n\n          <br>\n\n          <p text-wrap>\n\n            Após belos e longos anos lecionando em grandes instituições de Brasília e de Goiânia e com\n\n            caminhada profissional consolidada, nós (Paulo Pérez e Riemma) podemos dizer que a história do\n\n            PPA começou há 16 anos. Difícil desvincular nossas impressões profissionais do que é o PPA.\n\n            Digamos que com "casa própria" com metodologia e com sistematização, iniciamos o PPA em 2017.\n\n            A filosofia PPA, entretanto, sempre esteve presente em nossas relações. Ou seja, não somos novos;\n\n            somos novidade!\n\n            <br><br>\n\n            O PPA é uma troca entre envolvimento e comprometimento. Fazemos a diferença na vida de nossos\n\n            estudantes, assim como esses jovens fazer a diferença em nossas vidas! PPA é a sigla de\n\n            Planejamento, Preparação e Aplicação. Reunimos as três ações que acreditamos ser a base de uma\n\n            caminhada direcionada a conquistas.\n\n            <br><br>\n\n            Reunimos as três ações nas quais acreditamos a ser a base de uma caminhada direcionada a conquistas.\n\n          </p>\n\n          <br>\n\n          <div>\n\n            <h5 style="color: #7cc0b5">O PLANEJAMENTO:</h5>\n\n            <p text-wrap>(Saber o que estudar, como estudar, por que estudar e quando estudar)</p>\n\n            <br>\n\n          </div>\n\n\n\n          <div>\n\n            <h5 style="color: #7cc0b5"> A PREPARAÇÃO: </h5>\n\n            <p text-wrap>(Estudar de fato! Ser competente. O estudo ativo e orientado)</p>\n\n            <br>\n\n          </div>\n\n\n\n          <div>\n\n            <h5 style="color: #7cc0b5"> A APLICAÇÃO: </h5>\n\n            <p text-wrap>(Saber fazer - praticar - ter habilidade)<br>\n\n              Por isso, PPA - Estudo Orientado, aprendendo a conquistar!\n\n              <br><br>\n\n              Nossa metodologia foi desenvolvida em anos de experiência teórico-vivencial e está\n\n              consolidada com o tempo e com o alto índice de casos de sucesso. O PPA se propõe a\n\n              transformar alunos em estudantes e participantes em candidatos.\n\n            </p>\n\n\n\n          </div>\n\n        </ion-item>\n\n        <iframe [src]="sanitize(vid)" frameborder="0" allowfullscreen></iframe>\n\n        <ion-item no-lines></ion-item>\n\n      </ion-list>\n\n\n\n\n\n      <!--INFORMAÇÕES DE CONTATO-->\n\n      <ion-list *ngIf="viewContato" class="view-contato">\n\n        <h3 text-left>Contato</h3>\n\n        <ion-item text-wrap>\n\n          Centro Empresarial Brasil 21<br>\n\n          Bloco A, salas 503/504, 5º andar<br>\n\n          CEP 70.316-102<br>\n\n          Telefon: 352-2286<br>\n\n          e-mail: ppa@campusppa.com.br<br>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n\n\n\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\sobre\sobre.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
    ], SobrePage);
    return SobrePage;
}());

//# sourceMappingURL=sobre.js.map

/***/ })

});
//# sourceMappingURL=3.js.map