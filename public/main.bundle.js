webpackJsonp([1,4],{

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(441);


/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.team == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService.prototype.validateBid = function (bid) {
        var re = /\d/g;
        return re.test(bid);
    };
    return ValidateService;
}());
ValidateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ValidateService);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/validate.service.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isDev = false; // Change to false before deployment
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/register');
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUserList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/userlist');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/authenticate');
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateMoney = function (team, money) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var user = { team: team, money: money };
        console.log("updateMoney", user);
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/updatemoney');
        this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            console.log(res);
        });
        ;
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/profile');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.prepEndpoint = function (ep) {
        if (!this.isDev) {
            return ep;
        }
        else {
            return 'http://localhost:8080/' + ep;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/auth.service.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandingsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StandingsService = (function () {
    function StandingsService(http) {
        this.http = http;
        this.isDev = false; // Change to false before deployment
    }
    StandingsService.prototype.getAllResults = function () {
        var ep = this.prepEndpoint('standings/all');
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    StandingsService.prototype.getTeamResults = function (team) {
        var ep = this.prepEndpoint('standings/team/' + team + "/1");
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    StandingsService.prototype.saveGame = function (report, reporter) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('standings/result');
        var date = new Date().getTime();
        report = {
            season: 0,
            reporter: reporter,
            result: report,
            date: date
        };
        this.http.post(ep, report, { headers: headers })
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.result = res;
        });
    };
    StandingsService.prototype.prepEndpoint = function (ep) {
        if (!this.isDev) {
            return ep;
        }
        else {
            return 'http://localhost:8080/' + ep;
        }
    };
    return StandingsService;
}());
StandingsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], StandingsService);

var _a;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/standings.service.js.map

/***/ }),

/***/ 440:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 440;


/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(559);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/main.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(751),
        styles: [__webpack_require__(737)]
    })
], AppComponent);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/app.component.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_datatable__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_auction_auction_component__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_rules_rules_component__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_standings_standings_component__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_validate_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_standings_service__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_player_player_component__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pipes_data_filter_pipe__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_timeleft_pipe__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pipes_team_pipe__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_playerimage_pipe__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_playerdetails_playerdetails_component__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_teamlogo_pipe__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_watchlist_watchlist_component__ = __webpack_require__(571);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'rules', component: __WEBPACK_IMPORTED_MODULE_14__components_rules_rules_component__["a" /* RulesComponent */] },
    { path: 'player', component: __WEBPACK_IMPORTED_MODULE_22__components_player_player_component__["a" /* PlayerComponent */] /*, canActivate:[AuthGuard]*/ },
    { path: 'player/:id', component: __WEBPACK_IMPORTED_MODULE_22__components_player_player_component__["a" /* PlayerComponent */] /*, canActivate:[AuthGuard]*/ },
    { path: 'player/:id/:id2', component: __WEBPACK_IMPORTED_MODULE_27__components_playerdetails_playerdetails_component__["a" /* PlayerdetailsComponent */] /*, canActivate:[AuthGuard]*/ },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'standings', component: __WEBPACK_IMPORTED_MODULE_15__components_standings_standings_component__["a" /* StandingsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'auction', component: __WEBPACK_IMPORTED_MODULE_13__components_auction_auction_component__["a" /* AuctionComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'watchlist', component: __WEBPACK_IMPORTED_MODULE_29__components_watchlist_watchlist_component__["a" /* WatchlistComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_player_player_component__["a" /* PlayerComponent */],
            __WEBPACK_IMPORTED_MODULE_23__pipes_data_filter_pipe__["a" /* DataFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_13__components_auction_auction_component__["a" /* AuctionComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_rules_rules_component__["a" /* RulesComponent */],
            __WEBPACK_IMPORTED_MODULE_24__pipes_timeleft_pipe__["a" /* TimeleftPipe */],
            __WEBPACK_IMPORTED_MODULE_25__pipes_team_pipe__["a" /* TeamPipe */],
            __WEBPACK_IMPORTED_MODULE_15__components_standings_standings_component__["a" /* StandingsComponent */],
            __WEBPACK_IMPORTED_MODULE_26__pipes_playerimage_pipe__["a" /* PlayerimagePipe */],
            __WEBPACK_IMPORTED_MODULE_27__components_playerdetails_playerdetails_component__["a" /* PlayerdetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_28__pipes_teamlogo_pipe__["a" /* TeamlogoPipe */],
            __WEBPACK_IMPORTED_MODULE_29__components_watchlist_watchlist_component__["a" /* WatchlistComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_20_angular2_flash_messages__["FlashMessagesModule"],
            __WEBPACK_IMPORTED_MODULE_5_angular2_datatable__["DataTableModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_16__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_18__services_player_service__["a" /* PlayerService */], __WEBPACK_IMPORTED_MODULE_19__services_standings_service__["a" /* StandingsService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/app.module.js.map

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_validate_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuctionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuctionComponent = (function () {
    function AuctionComponent(authService, router, playerService, validateService, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.playerService = playerService;
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.filterQuery = "";
        this.searchType = "lastName";
        this.money = 0;
        this.bidMultiplier = [
            [1.0, 1.3, 1.6, 2.0, 2.1],
            [0.8, 1.0, 1.3, 1.6, 1.9],
            [0.64, 0.8, 1.0, 1.3, 1.45],
            [0.51, 0.64, 0.8, 1.0, 1.1],
            [0.47, 0.53, 0.69, 0.91]
        ];
        this.now = 0;
        this.startFA = 1514916000000;
        this.startSuddenDeath = 1515952800000;
        this.endSuddenDeath = 1515960000000;
        this.regularSeasonStart = 1515970000000;
    }
    AuctionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playerService.getFreeAgents().subscribe(function (freeAgents) {
            _this.freeAgents = freeAgents;
        }, function (err) {
            console.log(err);
            return false;
        });
        this.now = Date.now();
        var user = JSON.parse(localStorage.getItem('user'));
        this.money = user.money;
        if (this.now > this.startFA && this.now < this.startSuddenDeath) {
            console.log("auction active");
            this.flashMessage.show("Auctions are active. Sudden Death Timer will be active in " + Math.floor((this.startSuddenDeath - this.now) / 60000) + " Minutes (Sunday January 14th 8 pm CET) for two hours. On Sudden Death Timer every successful bid will be signed after being highest bid for 5 minutes.", {
                cssClass: 'alert-success',
                timeout: 30000
            });
        }
        if (this.now > this.startSuddenDeath && this.now < this.endSuddenDeath) {
            console.log("auction sudden death active");
            this.flashMessage.show("Sudden Death Timer active for " + Math.floor((this.endSuddenDeath - this.now) / 60000) + " minutes. On Sudden Death Timer every successful bid will be signed after being highest bid for 5 minutes.", {
                cssClass: 'alert-danger',
                timeout: 60000
            });
        }
    };
    AuctionComponent.prototype.changeType = function (key) {
        this.searchType = key;
    };
    AuctionComponent.prototype.bid = function (player, salaryBid, yearsBid) {
        var newTeamBid = JSON.parse(localStorage.getItem("user")).team;
        var money = JSON.parse(localStorage.getItem("user")).money;
        player.newTeamBid = newTeamBid;
        var newTimeBid = Date.now() / 1;
        //formatting bid
        player.newSalaryBid = Math.floor(player.newSalaryBid);
        player.newDurationBid = parseInt(player.newDurationBid);
        player.newTimeBid = newTimeBid;
        function trumpBid(player) {
            var bidMultiplier = [[1.0, 1.3, 1.6, 2.0, 2.1],
                [0.8, 1.0, 1.3, 1.6, 1.9],
                [0.64, 0.8, 1.0, 1.3, 1.45],
                [0.51, 0.64, 0.8, 1.0, 1.1],
                [0.47, 0.53, 0.69, 0.91]];
            //first bid
            if (player.durationBid == null && player.salaryBid == null) {
                return true;
            }
            if (player.salaryBid * bidMultiplier[player.newDurationBid - 1][player.durationBid - 1] < player.newSalaryBid) {
                return true;
            }
            return false;
        }
        /*function trumpBid(player){ //returns true if new bid trumped old bid
    
    
          if(player.durationBid == 5 || player.newDurationBid == 5){
            return false;
          }
    
          //first bid
          if(player.durationBid == null && player.salaryBid == null){
              return true;
          }
    
          //same years
          if(player.durationBid == player.newDurationBid && player.salaryBid < player.newSalaryBid){
              return true;
          }
    
    
          //new more
    
          //new one year more
          if(player.durationBid+1 == player.newDurationBid && player.salaryBid*.8 < player.newSalaryBid){
            return true;
          }
    
          //new two years more
          if(player.durationBid+2 == player.newDurationBid && player.salaryBid*.64 < player.newSalaryBid){
            return true;
          }
    
          //new three years more
          if(player.durationBid+3 == player.newDurationBid && player.salaryBid*.51 < player.newSalaryBid){
            return true;
          }
    
          //new four years more
          if(player.durationBid+4 == player.newDurationBid && player.salaryBid*.47 < player.newSalaryBid){
            return true;
          }
    
          //5 years new
          if(
            player.newDurationBid == 5 &&
            player.DurationBid == 4 &&
            player.salaryBid*.91 < player.newSalaryBid
            )
            {
            return true;
          }
    
          if(
            player.newDurationBid == 5 &&
            player.DurationBid == 3 &&
            player.salaryBid*.69 < player.newSalaryBid
            )
            {
            return true;
          }
          //new less
    
          //new one year less
          if(player.durationBid-1 == player.newDurationBid && player.salaryBid*1.3 < player.newSalaryBid){
            return true;
          }
    
          //new two years less
          if(player.durationBid-2 == player.newDurationBid && player.salaryBid*1.6 < player.newSalaryBid){
            return true;
          }
    
          //new three years less
          if(player.durationBid-3 == player.newDurationBid && player.salaryBid*2 < player.newSalaryBid){
            return true;
          }
    
          //new four years less
          if(player.durationBid-4 == player.newDurationBid && player.salaryBid*2.1 < player.newSalaryBid){
            return true;
          }
    
          return false;
        }*/
        function bidSuggestion(player) {
            var bidMultiplier = [[1.0, 1.3, 1.6, 2.0, 2.1],
                [0.8, 1.0, 1.3, 1.6, 1.9],
                [0.64, 0.8, 1.0, 1.3, 1.45],
                [0.51, 0.64, 0.8, 1.0, 1.1],
                [0.47, 0.53, 0.69, 0.91]];
            return player.salaryBid * bidMultiplier[player.newDurationBid - 1][player.durationBid - 1];
        }
        //Validate offer
        if (salaryBid == undefined || yearsBid == undefined) {
            this.flashMessage.show("Invalid Offer - No bid or contract length", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        if (!this.validateService.validateBid(player.newSalaryBid)) {
            this.flashMessage.show('Please use only numbers in your bid', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        //Min salary
        if (salaryBid < 10) {
            this.flashMessage.show("Invalid Offer - Minimum salary is €10", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        //max salary
        if (salaryBid > 1000) {
            {
                this.flashMessage.show("Invalid Offer - Maximum salary is €1000", {
                    cssClass: 'alert-danger',
                    timeout: 10000
                });
                return false;
            }
        }
        //Enough money
        if (salaryBid > money) {
            this.flashMessage.show("Not enough salary cap left for this bid - check profile for your payroll - you have " + money + " Mio left", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        //regular season
        if (this.now > this.regularSeasonStart && yearsBid > 1) {
            this.flashMessage.show("Invalid Offer - You can only offer one season contracts during the regular season.", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        //pre FA start
        if (this.now < this.startFA) {
            this.flashMessage.show("Invalid Offer - Free Agency didn't start yet.", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        //Birds
        if (player.lastTeam != newTeamBid && yearsBid == 5) {
            this.flashMessage.show("Invalid Offer - Only former team can offer five years on a player.", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            return false;
        }
        //bid didn't trump
        if (!trumpBid(player)) {
            this.flashMessage.show("Invalid Offer - Your bid didn't trump the current offer. You have to offer " + (bidSuggestion(player) + 1) + " €", {
                cssClass: 'alert-danger',
                timeout: 10000
            });
            player.newSalaryBid = bidSuggestion(player) + 1;
            return false;
        }
        //succesful bid
        if (trumpBid(player)) {
            var user = JSON.parse(localStorage.getItem('user'));
            user.money -= player.newSalaryBid; // cookie
            this.money -= player.newSalaryBid; // UI
            localStorage.setItem('user', JSON.stringify(user));
            this.playerService.placeBid(player);
            console.log("bid to service");
            console.log(player);
            this.flashMessage.show(player.salaryBid + " bid for " + player.lastName + " by " + player.teamBid, {
                cssClass: 'alert-success',
                timeout: 5000
            });
        }
    };
    AuctionComponent.prototype.addToWatchlist = function (player) {
        var user = JSON.parse(localStorage.getItem('user'));
        this.playerService.updateWatchlist(player, user);
    };
    return AuctionComponent;
}());
AuctionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-auction',
        template: __webpack_require__(752),
        styles: [__webpack_require__(738)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_player_service__["a" /* PlayerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_validate_service__["a" /* ValidateService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], AuctionComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/auction.component.js.map

/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = (function () {
    function DashboardComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUserList().subscribe(function (data) {
            data = data.sort(function (a, b) {
                a = a.team;
                b = b.team;
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            _this.userlist = data;
            console.log(data);
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(753),
        styles: [__webpack_require__(739)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object])
], DashboardComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(754),
        styles: [__webpack_require__(740)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/home.component.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                _this.router.navigate(['login']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(755),
        styles: [__webpack_require__(741)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/login.component.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__(756),
        styles: [__webpack_require__(742)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], NavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlayerComponent = (function () {
    function PlayerComponent(authService, router, playerService, route) {
        this.authService = authService;
        this.router = router;
        this.playerService = playerService;
        this.route = route;
        this.show = false;
        this.filterQuery = "";
        this.searchType = "lastName";
        this.teams = [{ short: "ATL", long: "Atlanta Hawks" }, { short: "BOS", long: "Boston Celtics" }, { short: "BKN", long: "Brooklyn Nets" }, { short: "CHA", long: "Charlotte Hornets" }, { short: "CHI", long: "Chicago Bulls" }, { short: "CLE", long: "Cleveland Cavaliers" }, { short: "DAL", long: "Dallas Mavericks" }, { short: "DEN", long: "Denver Nuggets" }, { short: "DET", long: "Detroit Pistons" }, { short: "GSW", long: "Golden State Warriors" }, { short: "HOU", long: "Houston Rockets" }, { short: "IND", long: "Indiana Pacers" }, { short: "LAC", long: "Los Angeles Clippers" }, { short: "LAL", long: "Los Angeles Lakers" }, { short: "MEM", long: "Memphis Grizzlies" }, { short: "MIA", long: "Miami Heat" }, { short: "MIL", long: "Milwaukee Bucks" }, { short: "MIN", long: "Minnesota Timberwolves" }, { short: "NOP", long: "New Orleans Pelicans" }, { short: "NYK", long: "New York Knicks" }, { short: "OKC", long: "Oklahoma City Thunder" }, { short: "ORL", long: "Orlando Magic" }, { short: "PHI", long: "Philadelphia 76ers" }, { short: "PHX", long: "Phoenix Suns" }, { short: "POR", long: "Portland Trail Blazers" }, { short: "SAC", long: "Sacramento Kings" }, { short: "SAS", long: "San Antonio Spurs" }, { short: "TOR", long: "Toronto Raptors" }, { short: "UTA", long: "Utah Jazz" }, { short: "WAS", long: "Washington Wizards" }];
    }
    PlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playerService.getAllPlayers().subscribe(function (allPlayers) {
            _this.allPlayers = allPlayers;
            //console.log(allPlayers);
        }, function (err) {
            console.log(err);
            return false;
        });
        this.show = true;
        //check for team param
        this.sub = this.route.params.subscribe(function (params) {
            _this.filterQuery = params['id'];
            _this.searchType = "team";
        });
    };
    PlayerComponent.prototype.changeType = function (key) {
        this.searchType = key;
    };
    PlayerComponent.prototype.clickForAllPlayers = function () {
        var _this = this;
        this.resetQuery();
        this.playerService.getAllPlayers().subscribe(function (allPlayers) {
            _this.allPlayers = allPlayers;
            console.log(allPlayers);
        }, function (err) {
            console.log(err);
            return false;
        });
        this.show = true;
    };
    PlayerComponent.prototype.clickForPlayerByLastName = function (lastName) {
        var _this = this;
        this.resetQuery();
        this.playerService.getPlayerByLastName(lastName).subscribe(function (allPlayers) {
            _this.allPlayers = allPlayers;
        }, function (err) {
            console.log(err);
            return false;
        });
        this.show = true;
    };
    PlayerComponent.prototype.clickForPlayerByTeam = function (team) {
        var _this = this;
        this.resetQuery();
        this.playerService.getPlayerByTeam(team).subscribe(function (allPlayers) {
            _this.allPlayers = allPlayers;
        }, function (err) {
            console.log(err);
            return false;
        });
        this.show = true;
    };
    PlayerComponent.prototype.clickForFreeAgents = function () {
        var _this = this;
        this.resetQuery();
        this.playerService.getFreeAgents().subscribe(function (allPlayers) {
            _this.allPlayers = allPlayers;
        }, function (err) {
            console.log(err);
            return false;
        });
        this.show = true;
    };
    PlayerComponent.prototype.resetQuery = function () {
        this.allPlayers = null;
        this.filterQuery = "";
    };
    PlayerComponent.prototype.addToWatchlist = function (player) {
        var user = JSON.parse(localStorage.getItem('user'));
        this.playerService.updateWatchlist(player, user);
    };
    return PlayerComponent;
}());
PlayerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-player',
        template: __webpack_require__(757),
        styles: [__webpack_require__(743)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], PlayerComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/player.component.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerdetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlayerdetailsComponent = (function () {
    function PlayerdetailsComponent(authService, router, playerService, route) {
        this.authService = authService;
        this.router = router;
        this.playerService = playerService;
        this.route = route;
    }
    PlayerdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.lastName = params['id'];
            _this.firstName = params['id2'];
            _this.sub = _this.playerService.getPlayerByFullName(_this.lastName, _this.firstName).subscribe(function (player) {
                _this.player = player;
            });
        });
    };
    return PlayerdetailsComponent;
}());
PlayerdetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-playerdetails',
        template: __webpack_require__(758),
        styles: [__webpack_require__(744)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], PlayerdetailsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/playerdetails.component.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = (function () {
    function ProfileComponent(authService, router, playerService, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.playerService = playerService;
        this.flashMessage = flashMessage;
        this.showBids = false;
        this.payroll = 0;
        this.season = 1;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
            _this.callGetRoster();
            _this.callGetBids();
            setInterval(_this.calculatePayroll(), 500);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent.prototype.switchView = function () {
        this.showBids = !this.showBids;
        this.calculatePayroll();
    };
    ProfileComponent.prototype.callGetRoster = function () {
        var _this = this;
        this.playerService.getRoster(this.user).subscribe(function (roster) {
            _this.roster = roster;
            _this.calculatePayroll();
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent.prototype.callGetBids = function () {
        var _this = this;
        this.playerService.getBids(this.user).subscribe(function (bids) {
            _this.bids = bids;
            _this.calculatePayroll();
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent.prototype.calculatePayroll = function () {
        this.payroll = 0;
        for (var i = 0; i < this.roster.length; i++) {
            this.payroll += this.roster[i].salary;
        }
        for (var i = 0; i < this.bids.length; i++) {
            this.payroll += this.bids[i].salaryBid;
        }
        this.payroll = Math.ceil(this.payroll);
        var user = JSON.parse(localStorage.getItem('user'));
        user.money = 1000 - this.payroll;
        localStorage.setItem('user', JSON.stringify(user));
        this.authService.updateMoney(user.team, user.money);
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(759),
        styles: [__webpack_require__(745)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _d || Object])
], ProfileComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/profile.component.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
        this.teams = [{ short: "ATL", long: "Atlanta Hawks" }, { short: "BOS", long: "Boston Celtics" }, { short: "BKN", long: "Brooklyn Nets" }, { short: "CHA", long: "Charlotte Hornets" }, { short: "CHI", long: "Chicago Bulls" }, { short: "CLE", long: "Cleveland Cavaliers" }, { short: "DAL", long: "Dallas Mavericks" }, { short: "DEN", long: "Denver Nuggets" }, { short: "DET", long: "Detroit Pistons" }, { short: "GSW", long: "Golden State Warriors" }, { short: "HOU", long: "Houston Rockets" }, { short: "IND", long: "Indiana Pacers" }, { short: "LAC", long: "Los Angeles Clippers" }, { short: "LAL", long: "Los Angeles Lakers" }, { short: "MEM", long: "Memphis Grizzlies" }, { short: "MIA", long: "Miami Heat" }, { short: "MIL", long: "Milwaukee Bucks" }, { short: "MIN", long: "Minnesota Timberwolves" }, { short: "NOP", long: "New Orleans Pelicans" }, { short: "NYK", long: "New York Knicks" }, { short: "OKC", long: "Oklahoma City Thunder" }, { short: "ORL", long: "Orlando Magic" }, { short: "PHI", long: "Philadelphia 76ers" }, { short: "PHX", long: "Phoenix Suns" }, { short: "POR", long: "Portland Trail Blazers" }, { short: "SAC", long: "Sacramento Kings" }, { short: "SAS", long: "San Antonio Spurs" }, { short: "TOR", long: "Toronto Raptors" }, { short: "UTA", long: "Utah Jazz" }, { short: "WAS", long: "Washington Wizards" }];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUserList().subscribe(function (data) {
            data = data.sort(function (a, b) {
                a = a.team;
                b = b.team;
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            _this.userlist = data;
        });
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            email: this.email,
            username: this.username,
            password: this.password,
            team: this.team,
            steam: this.steam
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Something went wrong. Are you already registered? Contact an admin.', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(760),
        styles: [__webpack_require__(746)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/register.component.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RulesComponent = (function () {
    function RulesComponent() {
    }
    RulesComponent.prototype.ngOnInit = function () {
    };
    return RulesComponent;
}());
RulesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-rules',
        template: __webpack_require__(761),
        styles: [__webpack_require__(747)]
    }),
    __metadata("design:paramtypes", [])
], RulesComponent);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/rules.component.js.map

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_standings_service__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StandingsComponent = (function () {
    function StandingsComponent(authService, router, flashMessage, standingsService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.standingsService = standingsService;
        this.report = {
            for: Number,
            against: Number,
            opponent: String,
        };
        this.teams = [{ short: "ATL", long: "Atlanta Hawks" }, { short: "BOS", long: "Boston Celtics" }, { short: "BKN", long: "Brooklyn Nets" }, { short: "CHA", long: "Charlotte Hornets" }, { short: "CHI", long: "Chicago Bulls" }, { short: "CLE", long: "Cleveland Cavaliers" }, { short: "DAL", long: "Dallas Mavericks" }, { short: "DEN", long: "Denver Nuggets" }, { short: "DET", long: "Detroit Pistons" }, { short: "GSW", long: "Golden State Warriors" }, { short: "HOU", long: "Houston Rockets" }, { short: "IND", long: "Indiana Pacers" }, { short: "LAC", long: "Los Angeles Clippers" }, { short: "LAL", long: "Los Angeles Lakers" }, { short: "MEM", long: "Memphis Grizzlies" }, { short: "MIA", long: "Miami Heat" }, { short: "MIL", long: "Milwaukee Bucks" }, { short: "MIN", long: "Minnesota Timberwolves" }, { short: "NOP", long: "New Orleans Pelicans" }, { short: "NYK", long: "New York Knicks" }, { short: "OKC", long: "Oklahoma City Thunder" }, { short: "ORL", long: "Orlando Magic" }, { short: "PHI", long: "Philadelphia 76ers" }, { short: "PHX", long: "Phoenix Suns" }, { short: "POR", long: "Portland Trail Blazers" }, { short: "SAC", long: "Sacramento Kings" }, { short: "SAS", long: "San Antonio Spurs" }, { short: "TOR", long: "Toronto Raptors" }, { short: "UTA", long: "Utah Jazz" }, { short: "WAS", long: "Washington Wizards" }];
    }
    StandingsComponent.prototype.ngOnInit = function () {
        this.loadStandings();
        this.user = JSON.parse(localStorage.getItem('user')).team;
        this.loadResults();
        this.getActiveTeams();
    };
    StandingsComponent.prototype.loadStandings = function () {
        var _this = this;
        this.standingsService.getAllResults().subscribe(function (data) {
            _this.results = _this.convertStandings(data);
            _this.sortByWins(_this.results);
            _this.gamesBehind(_this.results);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    StandingsComponent.prototype.loadResults = function () {
        var _this = this;
        this.standingsService.getTeamResults(this.user).subscribe(function (data) {
            _this.teamResults = data[0].reports;
            console.log(_this.teamResults);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    StandingsComponent.prototype.convertStandings = function (reports) {
        var _this = this;
        var standingRow = [];
        reports.forEach(function (value) {
            var row = {
                name: value.reporter,
                w: _this.countWins(value.reports),
                l: value.reports.length - _this.countWins(value.reports),
                pct: Math.floor(_this.countWins(value.reports) / value.reports.length * 100) + "%"
            };
            standingRow.push(row);
        });
        standingRow = this.sortByWins(standingRow);
        standingRow = this.gamesBehind(standingRow);
        return standingRow;
    };
    StandingsComponent.prototype.countWins = function (reports) {
        var wins = 0;
        reports.forEach(function (value) {
            if (value.for > value.against) {
                wins++;
            }
            ;
        });
        return wins;
    };
    StandingsComponent.prototype.sortByWins = function (value) {
        return value.sort(function (a, b) {
            if (a.w < b.w) {
                return 1;
            }
            if (a.w > b.w) {
                return -1;
            }
            //same w
            if (a.l < b.l) {
                return 1;
            }
            if (a.l > b.l) {
                return -1;
            }
            return 0;
        });
    };
    StandingsComponent.prototype.gamesBehind = function (standings) {
        for (var i = 1; i < standings.length; i++) {
            standings[i].gb = ((standings[0].w - standings[i].w) + (standings[i].l - standings[0].l)) / 2;
        }
        return standings;
    };
    StandingsComponent.prototype.reportGame = function (report) {
        console.log(report);
        if (typeof report.for == "function" || report.for == null || typeof report.against == "function" || report.against == null || typeof report.opponent == "function") {
            this.flashMessage.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        this.standingsService.saveGame(report, this.user);
        this.flashMessage.show('Game saved!', { cssClass: 'alert-success', timeout: 3000 });
    };
    StandingsComponent.prototype.getActiveTeams = function () {
        var _this = this;
        this.authService.getUserList().subscribe(function (data) {
            _this.activeTeams = data;
            console.log(_this.activeTeams);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    StandingsComponent.prototype.countInArray = function (array, value) {
        return array.reduce(function (n, x) { return n + (x.opponent === value); }, 0);
    };
    return StandingsComponent;
}());
StandingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-standings',
        template: __webpack_require__(762),
        styles: [__webpack_require__(748)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_standings_service__["a" /* StandingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_standings_service__["a" /* StandingsService */]) === "function" && _d || Object])
], StandingsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/standings.component.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_player_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WatchlistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WatchlistComponent = (function () {
    function WatchlistComponent(authService, playerService, flashMessage) {
        this.authService = authService;
        this.playerService = playerService;
        this.flashMessage = flashMessage;
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    WatchlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playerService.getWatchlist(this.user).subscribe(function (watchlist) {
            _this.watchlist = watchlist;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    WatchlistComponent.prototype.removeFromWatchlist = function (player) {
        this.playerService.updateWatchlist(player, this.user);
        this.watchlist.splice(player.watchlist.indexOf(player.lastName), 1);
    };
    return WatchlistComponent;
}());
WatchlistComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-watchlist',
        template: __webpack_require__(763),
        styles: [__webpack_require__(749)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_player_service__["a" /* PlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], WatchlistComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/watchlist.component.js.map

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataFilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query, type) {
        if (query && type) {
            console.log(type);
            return __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](array, function (item) { return item[type].indexOf(query) > -1; });
        }
        return array;
    };
    return DataFilterPipe;
}());
DataFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
        name: 'dataFilter'
    })
], DataFilterPipe);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/data-filter.pipe.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerimagePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PlayerimagePipe = (function () {
    function PlayerimagePipe() {
    }
    PlayerimagePipe.prototype.transform = function (player) {
        return "http://www.2kratings.com/wp-content/uploads/" + player.firstName.replace(/\s/g, "-") + "-" + player.lastName.replace(/\s/g, "-") + ".png";
    };
    return PlayerimagePipe;
}());
PlayerimagePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'playerimage'
    })
], PlayerimagePipe);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/playerimage.pipe.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TeamPipe = (function () {
    function TeamPipe() {
        this.teams = [{ short: "ATL", long: "Atlanta Hawks" }, { short: "BOS", long: "Boston Celtics" }, { short: "BKN", long: "Brooklyn Nets" }, { short: "CHA", long: "Charlotte Hornets" }, { short: "CHI", long: "Chicago Bulls" }, { short: "CLE", long: "Cleveland Cavaliers" }, { short: "DAL", long: "Dallas Mavericks" }, { short: "DEN", long: "Denver Nuggets" }, { short: "DET", long: "Detroit Pistons" }, { short: "GSW", long: "Golden State Warriors" }, { short: "HOU", long: "Houston Rockets" }, { short: "IND", long: "Indiana Pacers" }, { short: "LAC", long: "Los Angeles Clippers" }, { short: "LAL", long: "Los Angeles Lakers" }, { short: "MEM", long: "Memphis Grizzlies" }, { short: "MIA", long: "Miami Heat" }, { short: "MIL", long: "Milwaukee Bucks" }, { short: "MIN", long: "Minnesota Timberwolves" }, { short: "NOP", long: "New Orleans Pelicans" }, { short: "NYK", long: "New York Knicks" }, { short: "OKC", long: "Oklahoma City Thunder" }, { short: "ORL", long: "Orlando Magic" }, { short: "PHI", long: "Philadelphia 76ers" }, { short: "PHX", long: "Phoenix Suns" }, { short: "POR", long: "Portland Trail Blazers" }, { short: "SAC", long: "Sacramento Kings" }, { short: "SAS", long: "San Antonio Spurs" }, { short: "TOR", long: "Toronto Raptors" }, { short: "UTA", long: "Utah Jazz" }, { short: "WAS", long: "Washington Wizards" }];
    }
    TeamPipe.prototype.transform = function (teamshort) {
        if (teamshort.length != 3) {
            return "Free Agent";
        }
        var index = -1;
        for (var i = 0, len = this.teams.length; i < len; i++) {
            if (this.teams[i].short === teamshort) {
                index = i;
                break;
            }
        }
        return this.teams[i].long;
    };
    return TeamPipe;
}());
TeamPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'team'
    })
], TeamPipe);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/team.pipe.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamlogoPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TeamlogoPipe = (function () {
    function TeamlogoPipe() {
        this.teams = [{ short: "ATL", long: "Atlanta Hawks" }, { short: "BOS", long: "Boston Celtics" }, { short: "BKN", long: "Brooklyn Nets" }, { short: "CHA", long: "Charlotte Hornets" }, { short: "CHI", long: "Chicago Bulls" }, { short: "CLE", long: "Cleveland Cavaliers" }, { short: "DAL", long: "Dallas Mavericks" }, { short: "DEN", long: "Denver Nuggets" }, { short: "DET", long: "Detroit Pistons" }, { short: "GSW", long: "Golden State Warriors" }, { short: "HOU", long: "Houston Rockets" }, { short: "IND", long: "Indiana Pacers" }, { short: "LAC", long: "Los Angeles Clippers" }, { short: "LAL", long: "Los Angeles Lakers" }, { short: "MEM", long: "Memphis Grizzlies" }, { short: "MIA", long: "Miami Heat" }, { short: "MIL", long: "Milwaukee Bucks" }, { short: "MIN", long: "Minnesota Timberwolves" }, { short: "NOP", long: "New Orleans Pelicans" }, { short: "NYK", long: "New York Knicks" }, { short: "OKC", long: "Oklahoma City Thunder" }, { short: "ORL", long: "Orlando Magic" }, { short: "PHI", long: "Philadelphia 76ers" }, { short: "PHX", long: "Phoenix Suns" }, { short: "POR", long: "Portland Trail Blazers" }, { short: "SAC", long: "Sacramento Kings" }, { short: "SAS", long: "San Antonio Spurs" }, { short: "TOR", long: "Toronto Raptors" }, { short: "UTA", long: "Utah Jazz" }, { short: "WAS", long: "Washington Wizards" }];
        /*shortToLong(teamshort: string):any {
          var index = -1;
          for(var i = 0, len = this.teams.length; i < len; i++) {
            if (this.teams[i].short === teamshort) {
                index = i;
                break;
            }
          }
          return this.teams[i].long;
        }*/
    }
    TeamlogoPipe.prototype.transform = function (team) {
        //if(player.team.length != 3){return "Free Agent"}
        //let team = this.shortToLong(player.team).replace(/\s/g, "-");
        team == "NOP" ? team = "no" : "";
        return "http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/" + team + ".png";
    };
    return TeamlogoPipe;
}());
TeamlogoPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'teamlogo'
    })
], TeamlogoPipe);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/teamlogo.pipe.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeleftPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TimeleftPipe = (function () {
    function TimeleftPipe() {
        this.startFA = 1514916000000;
        this.startSuddenDeath = 1515952800000;
        this.endSuddenDeath = 1515960000000;
        this.regularSeasonStart = 1515970000000;
        this.now = Date.now();
    }
    TimeleftPipe.prototype.transform = function (timeBid) {
        var dayAgo = (Date.now() / 1) - 1000 * 60 * 60 * 24;
        //sudden death
        if (this.now > this.startSuddenDeath && this.now < this.endSuddenDeath) {
            dayAgo = (Date.now() / 1) - 1000 * 60 * 5;
        }
        var s = (timeBid - dayAgo); //how much time is left in milliseconds
        if (!s || timeBid == null) {
            return "-";
        }
        if (s < 0) {
            return "signed";
        }
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        return pad(hrs, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
        /*
    
        if(elapsed>60*60*12){
          this.timeleft ="12h+"
        } else if(elapsed>60*60*6){
          this.timeleft ="6h+"
        } else if(elapsed>60*60){
          this.timeleft ="1h+"
        } else if(elapsed>60*30){
          this.timeleft ="30m+"
        } else if(elapsed>60*10){
          this.timeleft ="10m+"
        } else if(elapsed>60*5){
          this.timeleft ="5m+"
        } else if(elapsed>60*1){
          this.timeleft ="1m+"
        } else if(elapsed<60*1 && elapsed>0){
          this.timeleft ="<1m"
        } else if(elapsed<0){
          this.timeleft ="signed"
        }
    
    
    
        return this.timeleft;*/
    };
    return TimeleftPipe;
}());
TimeleftPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'timeleft'
    })
], TimeleftPipe);

//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/timeleft.pipe.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/environment.js.map

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "td{\r\n  padding: 10px;\r\n  vertical-align: top;\r\n}\r\n.name{\r\n  padding: 0 40px;\r\n  color: #f9c03b;\r\n  text-align: center;\r\n}\r\nimg{\r\n  height: 150px\r\n}\r\ntr{\r\n  width: 230px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "table{\r\n  width: 100%;\r\n  margin: 20px 0;\r\n}\r\n\r\nthead{\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n}\r\n\r\ntd{\r\n  padding: 4px;\r\n  border: 1px solid black;\r\n}\r\ntd:nth-child(odd){\r\n  background-color: #DDD;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "img{\r\n  height: 50px\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 751:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <flash-messages></flash-messages>\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 752:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-inline\">\r\n  <input on-focus=\"changeType('lastName')\" [(ngModel)]=\"filterQuery\"/>\r\n  <select class=\"\" [(ngModel)]=\"filterQuery\" name=\"filterQuery\" (ngModelChange)=\"changeType('position')\">\r\n      <option value=\"\">Position</option>\r\n      <option value=\"PG\">Point Guard</option>\r\n      <option value=\"SG\">Shooting Guard</option>\r\n      <option value=\"SF\">Small Forward</option>\r\n      <option value=\"PF\">Power Forward</option>\r\n      <option value=\"C\">Center</option>\r\n  </select>\r\n  <h3 style=\"display:inline\">\r\n    Available cap: {{money | currency : 'EUR': true:\"1.0-0\"}}\r\n  </h3>\r\n</div>\r\n\r\n<table class=\"table table-striped\" [mfData]=\"freeAgents | dataFilter : filterQuery : searchType\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"15\">\r\n    <thead>\r\n      <tr>\r\n          <th><mfDefaultSorter by=\"lastName\">Name</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"overall\">Overall</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"position\">Position</mfDefaultSorter></th>\r\n          <th>Current Offer</th>\r\n          <th><mfDefaultSorter by=\"timeBid\">Time left</mfDefaultSorter></th>\r\n          <th>Offer</th>\r\n          <th>Length</th>\r\n          <th>Confirm</th>\r\n          <th>Watch</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let player of mf.data\">\r\n        <td [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a routerLink=\"/player/{{player.lastName}}/{{player.firstName}}/\">{{player.lastName}}, {{player.firstName}}</a></td>\r\n        <td>{{player.overall}}</td>\r\n        <td>{{player.position}}</td>\r\n        <td>{{player.salaryBid | currency : 'EUR': true:\"1.0-0\"}}/{{player.durationBid}}/{{player.teamBid}}</td>\r\n        <td>{{player.timeBid | timeleft}}</td>\r\n        <td><input type=\"text\" [(ngModel)]=\"player.newSalaryBid\" name=\"\" value=\"\"></td>\r\n        <td><select [(ngModel)]=\"player.newDurationBid\" class=\"\">\r\n              <option value=1>One Year</option>\r\n              <option value=2>Two Years</option>\r\n              <option value=3>Three Years</option>\r\n              <option value=4>Four Years</option>\r\n              <option value=5>Five Years</option>\r\n            </select>\r\n        </td>\r\n        <td><button (click)=\"bid(player, player.newSalaryBid, player.newDurationBid)\" name=\"button\" class=\"btn btn-success\">Confirm Offer</button></td>\r\n        <td><button (click)=\"addToWatchlist(player)\" name=\"button\" class=\"btn btn-success\">Watch</button></td>\r\n    </tr>\r\n    </tbody>\r\n    <tfoot>\r\n    <tr>\r\n        <td colspan=\"8\">\r\n            <mfBootstrapPaginator></mfBootstrapPaginator>\r\n        </td>\r\n    </tr>\r\n    </tfoot>\r\n</table>\r\n\r\n<app-watchlist></app-watchlist>\r\n"

/***/ }),

/***/ 753:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">User List</h2>\n<table class=\"table\">\n  <thead>\n    <tr>\n      <th>User</th>\n      <th>Team</th>\n      <th>Cap Space</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let user of userlist\">\n      <td ><a href=\"{{user.steam}}\">{{user.username}}</a></td>\n      <td [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a routerLink=\"/player/{{user.team}}\">{{user.team | team}}</a></td>\n      <td>{{user.money | currency : 'EUR': true:\"1.0-0\"}}</td>\n    </tr>\n  </tbody>\n</table>\n<h1>Roster/Offers</h1>\n<app-profile></app-profile>\n<h1>Standings</h1>\n<app-standings></app-standings>\n"

/***/ }),

/***/ 754:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center\">\r\n  <h1>Elite League App</h1>\r\n  <p class=\"lead\">Welcome to the NBA2k PC Sim League</p>\r\n  <div>\r\n    <a class=\"btn btn-primary\" [routerLink]=\"['/register']\">Register</a>\r\n    <a class=\"btn btn-success\" [routerLink]=\"['/login']\">Login</a>\r\n    <a class=\"btn btn-primary\" href=\"https://discord.gg/uWqpHbK\">Discord</a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-4\">\r\n    <h3>Team Management</h3>\r\n    <p>Sign Free Agents, trade with other teams and build your own dynasty.</p>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <h3>Continuous Rosters</h3>\r\n    <p>Play with your team for multiple seasons and win the championship with the team you've built up.</p>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <h3>Simulation League</h3>\r\n    <p>Play with other people online with sim sliders, fight for your playoff seed in a wholesome community. </p>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <h3>How to join?</h3>\r\n    <p>Join the discord to introduce yourself to the community. You can also register on the website after that.</p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 755:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Login</h2>\n<form (submit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>Username (case sensitive)</label>\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n</form>\n"

/***/ }),

/***/ 756:
/***/ (function(module, exports) {

module.exports = "    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n      <a class=\"navbar-brand\" href=\"#\">Elite League</a>\n      <button class=\"navbar-toggler collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarColor02\" aria-controls=\"navbarColor02\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" style=\"\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n\n      <div class=\"navbar-collapse collapse\" id=\"navbarColor02\" style=\"\">\n        <ul class=\"navbar-nav mr-auto navbar-left\">\n          <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item active\">\n            <a [routerLink]=\"['/']\" class=\"nav-link\">Home</a>\n          </li>\n          <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/rules']\">Rules</a>\n          </li>\n        </ul>\n\n        <ul class=\"navbar-nav mr-auto navbar-right\">\n          <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item active\">\n            <a class=\"nav-link\" [routerLink]=\"['/dashboard']\">Dashboard</a>\n          </li>\n          <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/standings']\">Standings</a>\n          </li>\n          <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/profile']\">Profile</a>\n          </li>\n          <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/player']\">Players</a>\n          </li>\n          <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/auction']\">Auction</a>\n          </li>\n          <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/login']\">Login</a>\n          </li>\n          <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/register']\">Register</a>\n          </li>\n          <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\" class=\"nav-item\">\n            <a class=\"nav-link\" (click)=\"onLogoutClick()\" href=\"#\">Logout</a>\n          </li>\n\n        </ul>\n      </div>\n    </nav>\n"

/***/ }),

/***/ 757:
/***/ (function(module, exports) {

module.exports = "<h1>Player list</h1>\r\n\r\n<input on-focus=\"changeType('lastName')\" class=\"\" placeholder=\"Name\" [(ngModel)]=\"filterQuery\"/>\r\n\r\n<select class=\"\" [(ngModel)]=\"filterQuery\" name=\"filterQuery\" (ngModelChange)=\"changeType('position')\">\r\n    <option value=\"\">Position</option>\r\n    <option value=\"PG\">Point Guard</option>\r\n    <option value=\"SG\">Shooting Guard</option>\r\n    <option value=\"SF\">Small Forward</option>\r\n    <option value=\"PF\">Power Forward</option>\r\n    <option value=\"C\">Center</option>\r\n</select>\r\n<select class=\"\" [(ngModel)]=\"filterQuery\" name=\"filterQuery\" (ngModelChange)=\"changeType('team')\" >\r\n    <option value=\"\">Team</option>\r\n    <option *ngFor=\"let team of teams\" value={{team.short}}>{{team.long}}</option>\r\n</select>\r\n\r\n<table *ngIf=\"show\" class=\"table table-striped\" [mfData]=\"allPlayers | dataFilter : filterQuery : searchType\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"15\">\r\n    <thead>\r\n      <tr>\r\n          <th><mfDefaultSorter by=\"lastName\">Name</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"overall\">Overall</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"position\">Position</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"salary\">Salary</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"duration\">Duration</mfDefaultSorter></th>\r\n          <th><mfDefaultSorter by=\"team\">Team</mfDefaultSorter></th>\r\n          <th>Watch</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let player of mf.data\">\r\n        <td [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a routerLink=\"/player/{{player.lastName}}/{{player.firstName}}/\">{{player.lastName}}, {{player.firstName}}</a></td>\r\n        <td>{{player.overall}}</td>\r\n        <td>{{player.position}}</td>\r\n        <td>{{player.salary | currency : 'EUR': true:\"1.0-0\"}}</td>\r\n        <td>{{player.duration}}</td>\r\n        <td>{{player.team}}</td>\r\n        <td><button (click)=\"addToWatchlist(player)\" name=\"button\" class=\"btn btn-success\">Watch</button></td>\r\n    </tr>\r\n    </tbody>\r\n    <tfoot>\r\n    <tr>\r\n        <td colspan=\"8\">\r\n            <mfBootstrapPaginator></mfBootstrapPaginator>\r\n        </td>\r\n    </tr>\r\n    </tfoot>\r\n</table>\r\n"

/***/ }),

/***/ 758:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let player of player\" class=\"\">\n  <table>\n    <td class=\"name\">\n      <h1>{{player.firstName}} {{player.lastName}}</h1>\n      <h3>{{player.team |team}}</h3>\n      <h2>#{{player.number}}</h2>\n    </td>\n    <td>\n      <tr>\n        <td>\n          <p>Born: </p>\n          <p>Age: </p>\n          <p>Height: </p>\n          <p>Weight: </p>\n          <p>From: </p>\n        </td>\n        <td>\n          <p>{{player.born}}</p>\n          <p>{{2018 - player.born.substr(0,4)}}</p>\n          <p>{{player.height}} cm</p>\n          <p>{{player.weight}} kg</p>\n          <p>{{player.college}}</p>\n        </td>\n      </tr>\n    </td>\n    <td>\n      <img src=\"{{player | playerimage }}\" alt=\"\">\n    </td>\n    <td>\n      <img src=\"{{player.team | teamlogo}}\" alt=\"\">\n    </td>\n  </table>\n  <h1>Player Stats</h1>\n  <table>\n    <th></th>\n  </table>\n</div>\n"

/***/ }),

/***/ 759:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\" class=\"\">\r\n  <!--<button class=\"btn btn-primary\" *ngIf=\"showBids\" (click)=\"switchView()\">Show roster</button>\r\n  <button class=\"btn btn-primary\" *ngIf=\"!showBids\" (click)=\"switchView()\">Show offers</button>-->\r\n  <ul class=\"list-inline\">\r\n    <li class=\"list-inline-item\">Username: {{user.username}}</li>\r\n    <li class=\"list-inline-item\">Team: {{user.team | team}}</li>\r\n    <li class=\"list-inline-item\">Payroll: {{payroll | currency : 'EUR': true:\"1.0-0\"}}</li>\r\n    <li class=\"list-inline-item\">Available: {{1000-payroll | currency : 'EUR': true:\"1.0-0\"}}</li>\r\n  </ul>\r\n</div>\r\n<table class=\"table table-striped\" [mfData]=\"roster\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"15\">\r\n  <thead>\r\n    <tr>\r\n        <th><mfDefaultSorter by=\"lastName\">Roster</mfDefaultSorter></th>\r\n        <th><mfDefaultSorter by=\"overall\">Overall</mfDefaultSorter></th>\r\n        <th><mfDefaultSorter by=\"position\">Position</mfDefaultSorter></th>\r\n        <th><mfDefaultSorter by=\"salary\">Season #{{season}}</mfDefaultSorter></th>\r\n        <th>Season #{{season+1}}</th>\r\n        <th>Season #{{season+2}}</th>\r\n        <th>Season #{{season+3}}</th>\r\n        <th>Season #{{season+4}}</th>\r\n    </tr>\r\n  </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let player of mf.data\">\r\n        <td [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a routerLink=\"/player/{{player.lastName}}/{{player.firstName}}/\">{{player.lastName}}, {{player.firstName}}</a></td>\r\n        <td>{{player.overall}}</td>\r\n        <td>{{player.position}}</td>\r\n        <td>{{player.duration > 0 ? (player.salary | currency : 'EUR': true:\"1.0-0\"): \"\"}}</td>\r\n        <td>{{player.duration > 1 ? (player.salary | currency : 'EUR': true:\"1.0-0\"): \"\"}}</td>\r\n        <td>{{player.duration > 2 ? (player.salary | currency : 'EUR': true:\"1.0-0\"): \"\"}}</td>\r\n        <td>{{player.duration > 3 ? (player.salary | currency : 'EUR': true:\"1.0-0\"): \"\"}}</td>\r\n        <td>{{player.duration > 4 ? (player.salary | currency : 'EUR': true:\"1.0-0\"): \"\"}}</td>\r\n    </tr>\r\n    <!--<tr>\r\n      <td>Total</td>\r\n      <td></td>\r\n      <td></td>\r\n      <td></td>\r\n      <td></td>\r\n      <td></td>\r\n      <td></td>\r\n      <td></td>\r\n    </tr>-->\r\n    </tbody>\r\n</table>\r\n<table class=\"table table-striped\">\r\n  <thead>\r\n    <tr>\r\n        <th>Offers</th>\r\n        <th>Overall</th>\r\n        <th>Position</th>\r\n        <th>Salary</th>\r\n        <th>Duration</th>\r\n        <th>Time left</th>\r\n    </tr>\r\n  </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let player of bids\">\r\n        <td>{{player.lastName}}, {{player.firstName}}</td>\r\n        <td>{{player.overall}}</td>\r\n        <td>{{player.position}}</td>\r\n        <td>{{player.salaryBid | currency : 'EUR': true:\"1.0-0\"}}</td>\r\n        <td>{{player.durationBid}}</td>\r\n        <td>{{player.timeBid | timeleft}}</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<app-watchlist> </app-watchlist>\r\n"

/***/ }),

/***/ 760:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Register</h2>\n<form (submit)=\"onRegisterSubmit()\">\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Email</label>\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" >\n  </div>\n  <div class=\"form-group\">\n    <label>Team</label>\n    <select class=\"form-control\" [(ngModel)]=\"team\" name=\"team\">\n      <option *ngFor=\"let team of teams\" value={{team.short}}>{{team.long}}</option>\n    </select>\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Steam Profile</label>\n    <input type=\"text\" [(ngModel)]=\"steam\" name=\"steam\" class=\"form-control\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n</form>\n<h2>Reserved teams:</h2>\n<p>You can not register with them. Teams that are managed by the Commision can be attained. Contact a commissioner via discord.</p>\n<ul *ngFor=\"let user of userlist\">\n  <li>{{user.team}} by {{user.username}}</li>\n</ul>\n"

/***/ }),

/***/ 761:
/***/ (function(module, exports) {

module.exports = "<h1>Elite League Rules</h1>\r\n\r\n<h2>General</h2>\r\n<p>This league is emulating the myGM-Mode expierence within an online environment.</p>\r\n<ul>\r\n  <li>There will be 25 teams to ensure every team has enough talent to be fun.</li>\r\n  <li>There will be two seasons per year. Each season constitutes of a regular season, playoffs, and off-season.</li>\r\n  <li>Each team will play against the other teams twice per season.</li>\r\n</ul>\r\n<h2 id=\"gameplay\">Gameplay</h2>\r\n\r\n<h3>Offense</h3>\r\n<ul>\r\n  <li>Don't abuse cheese. We appreciate a realistic playstyle.</li>\r\n</ul>\r\n\r\n<h3>Defense</h3>\r\n<ul>\r\n  <li>Inbound passes: You can steal any inbound pass that's on your defensive side of the court including the half court line.</li>\r\n  <li>No switching your defense in the middle of a possession (between man-to-man and zone except junk defense)</li>\r\n</ul>\r\n\r\n<h3>Misc</h3>\r\n<ul>\r\n  <li>Disconnects: Every D/C game will be a different situation and the league will act accordingly, for the most part i will let the two players decide on how to act upon a D/C</li>\r\n  <li>Sliders will be adjusted by the commission.</li>\r\n</ul>\r\n\r\n\r\n<h2 id=\"FA\">Free Agency</h2>\r\n<p>Free Agents will be auctioned off, meaning every team has the chance to acquire a free agent. As in an auction, the highest bidder wins. However, to win the auction, your bid must stand the highest for at least 24 hours. The minimum contract length is\r\n  1 year. The maximum is 4 years, 5 years with bird rights. We will use this table for determining the trumping of bids:</p>\r\n<table>\r\n  <thead>\r\n    <tr>\r\n      <td colspan=\"7\">\r\n        <div class=\"h2center\">Free Agency Bid Table</div>\r\n      </td>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr>\r\n      <td></td>\r\n      <td>Original bid: 1 year</td>\r\n      <td>Original bid: 2 years</td>\r\n      <td>Original bid: 3 years</td>\r\n      <td>Original bid: 4 years</td>\r\n      <td>Original bid: 5 years</td>\r\n    </tr>\r\n    <tr>\r\n      <td>New bid: 1 year</td>\r\n      <td>1</td>\r\n      <td>1.3</td>\r\n      <td>1.6</td>\r\n      <td>2</td>\r\n      <td>2.1</td>\r\n    </tr>\r\n    <tr>\r\n      <td>New bid: 2 years</td>\r\n      <td>0.8</td>\r\n      <td>1</td>\r\n      <td>1.3</td>\r\n      <td>1.6</td>\r\n      <td>1.9</td>\r\n    </tr>\r\n    <tr>\r\n      <td>New bid: 3 years</td>\r\n      <td>0.64</td>\r\n      <td>0.8</td>\r\n      <td>1</td>\r\n      <td>1.3</td>\r\n      <td>1.45</td>\r\n    </tr>\r\n    <tr>\r\n      <td>New bid: 4 years</td>\r\n      <td>0.51</td>\r\n      <td>0.64</td>\r\n      <td>0.8</td>\r\n      <td>1</td>\r\n      <td>1.1</td>\r\n    </tr>\r\n    <tr>\r\n      <td>New bid: 5 years</td>\r\n      <td>0.47</td>\r\n      <td>0.53</td>\r\n      <td>0.69</td>\r\n      <td>0.91</td>\r\n      <td>-</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n<p>The numbers in the table are the standard multipliers. The rows represent the number of years in your proposed contract, and the columns represent the number of years of the previous proposed contract, or contract. Minimum bid for a player is $1M. There\r\n  is no maximum bid other than your remaining cap space.</p>\r\n<p>To top a bid with the same number of years the bid must increase by $1. Only multiples of $1 are eligble as bids. Bids will be rounded down to the next $1</p>\r\n<p>Only the incumbent team can offer a five year contract to the player. During regular season players can only sign contracts until the end of the season.</p>\r\n<h2>Roster</h2>\r\n<p>You can only have up to 15 players on your roster ingame. If you have less than 13 players on your roster it will be filled up by a low overall player.</p>\r\n<p>You have a salary cap of $1000 each season. You can never go over it. If you abuse a bug to get over the cap without reporting it you might be excluded from the league.</p>\r\n<p>You can only sign players who are available in the standard roster of the current NBA2K.</p>\r\n<p>New general managers can void one contract during the offseason in order to fix their team.</p>\r\n<h2>Trades</h2>\r\n<p>Trades are allowed throughout the season until the start of the playoffs. Trades must be posted in the appropriate discord channel and have to be approved by the trade board before taking effect. The trade board will evaluate each contract in the trade on a scale from -50 to +50. The evaluations of each member will be averaged across all voting trading-board members. If the average absolute difference of the entire trade is within 10 points, the trade will be approved.</p>\r\n<p>If there are larger differences in asset values, the trade board will consider specific team circumstances (roster need and cap-sheet). These reasons need to be specified by the trade parties before submission. The trade board can only consider reasons provided by the trade parties.</p>\r\n<p>Trades with an asset value difference that exceeds 25 points will be rejected and the asset evaluation will be published and specific instructions on how the trade could be restructured will be provided based on the trade board’s asset evaluation.</p>\r\n<h2>Waiving contracts</h2>\r\n<p>Players can be waived throughout the regular season and off-season. The waiving team will have to pay a penalty for one season depending on the previous contract of the player. The waived player will be a free agent. The waive will be announced 24h before the player hits free agency. If the waived player is signed by another team the penalty stays in place. The waiving team can not sign or acquire via trade the waived player in the same season</p>\r\n<p>The waiving team will have to pay a percentage of the yearly salary, depending on contract length, as given below. The penalty will be rounded to the next highest integer.</p>\r\n<table>\r\n  <tr>\r\n    <td>One Season</td>\r\n    <td>66%</td>\r\n  </tr>\r\n  <tr>\r\n    <td>Two Seasons</td>\r\n    <td>119%</td>\r\n  </tr>\r\n  <tr>\r\n    <td>Three Seasons</td>\r\n    <td>161%</td>\r\n  </tr>\r\n  <tr>\r\n    <td>Four Seasons</td>\r\n    <td>195%</td>\r\n  </tr>\r\n  <tr>\r\n      <td>Five Seasons</td>\r\n      <td>222%</td>\r\n  </tr>\r\n</table>\r\n<h2>Draft</h2>\r\n<p>There will be no draft. Rookies are available through the free agency when they are available ingame.</p>\r\n"

/***/ }),

/***/ 762:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n  <h2>Report your game:</h2>\n  {{user | team}} <input type=\"number\" name=\"for\" [(ngModel)]=\"report.for\" value=\"\" min=\"0\" max=\"200\" required> vs <input type=\"number\" [(ngModel)]=\"report.against\" name=\"against\" value=\"\" min=\"0\" max=\"200\" required>\n  <select class=\"\" name=\"opponent\" [(ngModel)]=\"report.opponent\">\n      <option *ngFor=\"let team of teams\" value={{team.short}}>{{team.long}}</option>\n  </select>\n  <input type=\"button\" class=\"btn-small btn-danger\" name=\"submit\" value=\"Submit\" (click)=\"reportGame(report)\">\n  <input class=\"btn-small btn-success\" type=\"button\" (click)=\"this.loadStandings()\" value=\"reload standings\">\n</div>\n<table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>#</th>\n        <th>Team</th>\n        <th></th>\n        <th>W</th>\n        <th>L</th>\n        <th>%</th>\n        <th>GB</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let standing of results;let i = index\" [attr.data-index]=\"i\">\n          <td>{{i+1}}</td>\n          <td><img src='{{standing.name | teamlogo}}'></td>\n          <td>{{standing.name | team}}</td>\n          <td>{{standing.w}}</td>\n          <td>{{standing.l}}</td>\n          <td>{{standing.pct}}</td>\n          <td>{{standing.gb}}</td>\n      </tr>\n    </tbody>\n    <tfoot>\n    </tfoot>\n</table>\n\n\n<h2>Recent results</h2>\n<table class=\"table table-striped\">\n    <tbody>\n      <tr>\n          <td *ngFor=\"let game of teamResults | slice:0:4; let i=index\">{{game.for < game.against?\"L\":\"W\"}} vs <img src='{{game.opponent | teamlogo}}'> </td>\n      </tr>\n    </tbody>\n    <tfoot>\n    </tfoot>\n</table>\n<h2>Games played</h2>\n<table class=\"table table-striped\">\n  <thead>\n  </thead>\n    <tbody>\n      <tr *ngFor=\"let team of activeTeams\">\n        <td>{{countInArray(teamResults, team.team)}}/2</td>\n        <td><img src='{{team.team | teamlogo}}'> <td>\n        <td>{{team.team | team}}</td>\n        <td><a href=\"{{team.steam}}\">{{team.username}}</a></td>\n      </tr>\n    </tbody>\n    <tfoot>\n    </tfoot>\n</table>\n"

/***/ }),

/***/ 763:
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-striped\" [mfData]=\"watchlist\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"15\">\n  <thead>\n    <tr>\n        <th><mfDefaultSorter by=\"lastName\">Watchlist</mfDefaultSorter></th>\n        <th><mfDefaultSorter by=\"overall\">Overall</mfDefaultSorter></th>\n        <th><mfDefaultSorter by=\"position\">Position</mfDefaultSorter></th>\n        <th>Contract/Offer</th>\n        <th>Unwatch</th>\n\n    </tr>\n  </thead>\n    <tbody>\n    <tr *ngFor=\"let player of mf.data\">\n        <td [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a routerLink=\"/player/{{player.lastName}}/{{player.firstName}}/\">{{player.lastName}}, {{player.firstName}}</a></td>\n        <td>{{player.overall}}</td>\n        <td>{{player.position}}</td>\n        <td>{{(player.team != \"\")? \"\":\"FA: \" }}{{(player.team != \"\")? (player.salary | currency : 'EUR': true:\"1.0-0\"): (player.salaryBid | currency : 'EUR': true:\"1.0-0\") }}/{{(player.team != \"\")? (player.duration): (player.durationBid)}}/{{(player.team != \"\")? player.team: (player.teamBid)}}/{{(player.team != \"\")? \"\": (player.timeBid | timeleft)}}</td>\n        <td><button (click)=\"removeFromWatchlist(player)\" name=\"button\" class=\"button button-success\">\n          Unwatch\n        </button></td>\n    </tr>\n    </tbody>\n</table>\n"

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        this.isDev = false; // Change to false before deployment
    }
    PlayerService.prototype.getAllPlayers = function () {
        var ep = this.prepEndpoint('player/all');
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getPlayerByLastName = function (lastName) {
        var ep = this.prepEndpoint('player/lastname/');
        return this.http.get(ep + lastName)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getPlayerByFullName = function (lastName, firstName) {
        var ep = this.prepEndpoint('player/name/');
        return this.http.get(ep + lastName + "/" + firstName)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getPlayerByTeam = function (team) {
        var ep = this.prepEndpoint('player/team/');
        return this.http.get(ep + team)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getRoster = function (user) {
        var ep = this.prepEndpoint('player/team/');
        return this.http.get(ep + user.team)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getFreeAgents = function () {
        var ep = this.prepEndpoint('player/freeagents');
        return this.http.get(ep)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.placeBid = function (player) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint("player/placebid");
        //new bid to current bid
        player.durationBid = player.newDurationBid;
        player.newDurationBid = null;
        player.salaryBid = player.newSalaryBid;
        player.newSalaryBid = null;
        player.timeBid = player.newTimeBid;
        player.newTimeBid = null;
        player.teamBid = player.newTeamBid;
        player.newTeamBid = null;
        this.http.post(ep, player, { headers: headers })
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.result = res;
            //console.log(this.result);
        });
    };
    PlayerService.prototype.getBids = function (user) {
        var ep = this.prepEndpoint('player/bids/team/');
        return this.http.get(ep + user.team).map(function (res) { return res.json(); });
    };
    PlayerService.prototype.getWatchlist = function (user) {
        var ep = this.prepEndpoint('player/watchlist/team/');
        return this.http.get(ep + user.team).map(function (res) { return res.json(); });
    };
    PlayerService.prototype.updateWatchlist = function (player, user) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint("player/watchlist/edit/");
        this.http.post(ep + user.team, player, { headers: headers })
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.result = res;
        });
    };
    // deleteBid(id){
    //   let ep = this.prepEndpoint("bid/delete/"+id);
    //   this.http.delete(ep)
    //    .map((res) => res.json()).subscribe(res => {
    //      this.result = res;
    //      console.log(this.result);
    //    });
    // }
    PlayerService.prototype.prepEndpoint = function (ep) {
        if (!this.isDev) {
            return ep;
        }
        else {
            return 'http://localhost:8080/' + ep;
        }
    };
    return PlayerService;
}());
PlayerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], PlayerService);

var _a;
//# sourceMappingURL=C:/Users/Manuel/Downloads/JS Learning/traversy/auktion/angular-src/src/player.service.js.map

/***/ })

},[1029]);
//# sourceMappingURL=main.bundle.js.map