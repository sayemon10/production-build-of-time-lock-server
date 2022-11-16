"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const server_entity_1 = require("./entities/server.entity");
const servers_controller_1 = require("./servers.controller");
const servers_service_1 = require("./servers.service");
let ServersModule = class ServersModule {
};
ServersModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forFeature([server_entity_1.Server])],
        controllers: [servers_controller_1.ServersController],
        providers: [servers_service_1.ServersService],
    })
], ServersModule);
exports.ServersModule = ServersModule;
//# sourceMappingURL=servers.module.js.map