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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
const app_service_1 = require("./app.service");
const time_service_1 = require("./time/time.service");
const throttler_behind_proxy_guard_1 = require("./rate-limit/throttler-behind-proxy.guard");
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("@nestjs/swagger");
const app_openapi_1 = require("./app.openapi");
let AppController = class AppController {
    appService;
    timeService;
    constructor(appService, timeService) {
        this.appService = appService;
        this.timeService = timeService;
    }
    getRoutes() {
        return routes_1.default;
    }
    getCurrentTime() {
        return {
            timestamp: this.timeService.timestamp,
        };
    }
};
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoutes", null);
__decorate([
    (0, common_1.Get)(routes_1.default.GET_TIME),
    (0, throttler_1.Throttle)(120, 60),
    (0, swagger_1.ApiTags)("time"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The current timestamp according to the blockchains.",
        type: app_openapi_1.GetCurrentTimeResponse,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCurrentTime", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiSecurity)("API_ACCESS_TOKEN", ["API_ACCESS_TOKEN"]),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
        type: app_openapi_1.UnauthorizedResponse,
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("api-access-token")),
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    __metadata("design:paramtypes", [app_service_1.AppService,
        time_service_1.TimeService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map