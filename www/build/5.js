webpackJsonp([5],{

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EspacoPageModule", function() { return EspacoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__espaco__ = __webpack_require__(608);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EspacoPageModule = /** @class */ (function () {
    function EspacoPageModule() {
    }
    EspacoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__espaco__["a" /* EspacoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__espaco__["a" /* EspacoPage */]),
            ],
        })
    ], EspacoPageModule);
    return EspacoPageModule;
}());

//# sourceMappingURL=espaco.module.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EspacoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_photo_viewer__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(407);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EspacoPage = /** @class */ (function () {
    function EspacoPage(photoViewer, file, statusBar) {
        this.photoViewer = photoViewer;
        this.file = file;
        this.statusBar = statusBar;
        this.images = [
            {
                "img": "assets/imgs/espaco/29.jpg",
            },
            {
                "img": "assets/imgs/espaco/34.jpg",
            },
            {
                "img": "assets/imgs/espaco/13.jpg"
            },
            {
                "img": "assets/imgs/espaco/12.jpg"
            },
            {
                "img": "assets/imgs/espaco/6.jpg"
            },
            {
                "img": "assets/imgs/espaco/35.jpg"
            },
            {
                "img": "assets/imgs/espaco/36.jpg"
            },
            {
                "img": "assets/imgs/espaco/3.jpg"
            },
            {
                "img": "assets/imgs/espaco/2.jpg"
            },
            {
                "img": "assets/imgs/espaco/32.jpg"
            },
            {
                "img": "assets/imgs/espaco/33.jpg"
            }
        ];
        this.grid = true;
        // let status bar overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#311734');
    }
    EspacoPage.prototype.viewPhoto = function (img) {
        this.photoViewer.show(decodeURI(this.file.applicationDirectory + "www/" + img));
    };
    //para mudar de uma foto por linha
    EspacoPage.prototype.changeGrid = function () {
        this.grid = !this.grid;
    };
    EspacoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-espaco',template:/*ion-inline-start:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\espaco\espaco.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Espaço</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="changeGrid()">\n\n        <ion-icon *ngIf="!grid" name="md-grid"></ion-icon>\n\n        <ion-icon *ngIf="grid" name="md-albums"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid *ngIf="images">\n\n    <ion-row>\n\n      <ion-col *ngFor="let photo of images" [attr.col-6]="grid ? true : null" [attr.col-12]="!grid ? true : null">\n\n        <div>\n\n          <img src="{{photo.img}}" (click)="viewPhoto(photo.img)">\n\n        </div>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Murillo Lima\Desktop\atrio_app\src\pages\espaco\espaco.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_photo_viewer__["a" /* PhotoViewer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */]])
    ], EspacoPage);
    return EspacoPage;
}());

//# sourceMappingURL=espaco.js.map

/***/ })

});
//# sourceMappingURL=5.js.map