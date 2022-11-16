"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const time_module_1 = require("./time/time.module");
const time_service_1 = require("./time/time.service");
const keys_module_1 = require("./keys/keys.module");
const typeorm_1 = require("@nestjs/typeorm");
const servers_module_1 = require("./servers/servers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 300,
            }),
            auth_module_1.AuthModule,
            schedule_1.ScheduleModule.forRoot(),
            time_module_1.TimeModule,
            keys_module_1.KeysModule,
            servers_module_1.ServersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: process.env.PG_DATABASE_HOST,
                port: +process.env.PG_DATABASE_PORT,
                database: process.env.PG_DATABASE_NAME,
                username: process.env.PG_DATABASE_USER,
                password: process.env.PG_DATABASE_PASSWORD,
                ssl: process.env.PG_DATABASE_SSL === "true",
                extra: {
                    options: process.env.PG_DATABASE_EXTRA_OPTIONS,
                },
                synchronize: process.env.SYNC_DATABASE === "true",
                autoLoadEntities: true,
                dropSchema: process.env.DROP_DATABASE === "true",
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, time_service_1.TimeService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map