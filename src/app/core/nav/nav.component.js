"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    }
  };
var core_1 = require("@angular/core");
var app_config_1 = require("./../../config/app.config.ts");
var NavComponent = (function () {
  function NavComponent(appConfig) {
    this.appConfig = appConfig;
    this.menuItems = [
      {link: '/', name: 'Home'},
      {link: '/' + appConfig.routes.heroes, name: 'Heroes list'}
    ];
  }

  return NavComponent;
}());
NavComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    selector: 'toh-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
  }),
  __param(0, core_1.Inject(app_config_1.APP_CONFIG)),
  __metadata("design:paramtypes", [Object])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map
