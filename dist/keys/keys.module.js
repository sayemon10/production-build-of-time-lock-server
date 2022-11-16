"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const keys_service_1 = require("./keys.service");
const keys_controller_1 = require("./keys.controller");
const config_1 = require("@nestjs/config");
const key_entity_1 = require("./entities/key.entity");
const time_service_1 = require("../time/time.service");
let KeysModule = class KeysModule {
};
KeysModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forFeature([key_entity_1.Key])],
        controllers: [keys_controller_1.KeysController],
        providers: [keys_service_1.KeysService, time_service_1.TimeService],
    })
], KeysModule);
exports.KeysModule = KeysModule;
//# sourceMappingURL=keys.module.js.map