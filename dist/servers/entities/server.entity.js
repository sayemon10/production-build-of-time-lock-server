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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const typeorm_1 = require("typeorm");
let Server = class Server {
    id;
    base_url;
    authentication;
    routes;
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "integer",
        unique: true,
        generated: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Server.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 2048,
        nullable: false,
    }),
    __metadata("design:type", String)
], Server.prototype, "base_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "json",
        nullable: true,
    }),
    __metadata("design:type", String)
], Server.prototype, "authentication", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "json",
        nullable: false,
    }),
    __metadata("design:type", String)
], Server.prototype, "routes", void 0);
Server = __decorate([
    (0, typeorm_1.Entity)("servers")
], Server);
exports.Server = Server;
//# sourceMappingURL=server.entity.js.map