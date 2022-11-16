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
exports.ServersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const throttler_behind_proxy_guard_1 = require("../rate-limit/throttler-behind-proxy.guard");
const swagger_1 = require("@nestjs/swagger");
const app_openapi_1 = require("../app.openapi");
const servers_service_1 = require("./servers.service");
let ServersController = class ServersController {
    serversService;
    constructor(serversService) {
        this.serversService = serversService;
    }
    getServers() {
        return this.serversService.servers;
    }
};
__decorate([
    (0, common_1.Get)("/servers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "getServers", null);
ServersController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)("servers"),
    (0, swagger_1.ApiSecurity)("API_ACCESS_TOKEN", ["API_ACCESS_TOKEN"]),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
        type: app_openapi_1.UnauthorizedResponse,
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("api-access-token")),
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    __metadata("design:paramtypes", [servers_service_1.ServersService])
], ServersController);
exports.ServersController = ServersController;
//# sourceMappingURL=servers.controller.js.map