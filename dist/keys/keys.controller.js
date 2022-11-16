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
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysController = void 0;
const common_1 = require("@nestjs/common");
const keys_service_1 = require("./keys.service");
const create_key_dto_1 = require("./dto/create-key.dto");
const update_key_dto_1 = require("./dto/update-key.dto");
const swagger_1 = require("@nestjs/swagger");
const app_openapi_1 = require("../app.openapi");
const passport_1 = require("@nestjs/passport");
const throttler_behind_proxy_guard_1 = require("../rate-limit/throttler-behind-proxy.guard");
const routes_1 = __importDefault(require("../routes"));
const throttler_1 = require("@nestjs/throttler");
const delete_key_dto_1 = require("./dto/delete-key.dto");
const read_key_dto_1 = require("./dto/read-key.dto");
const status_key_dto_1 = require("./dto/status-key.dto");
const unlock_key_dto_1 = require("./dto/unlock-key.dto");
let KeysController = class KeysController {
    keysService;
    constructor(keysService) {
        this.keysService = keysService;
    }
    create(createKeyDto) {
        return this.keysService.create(createKeyDto);
    }
    findOne(readKeyDto) {
        return this.keysService.findOne(readKeyDto);
    }
    update(updateKeyDto) {
        return this.keysService.update(updateKeyDto);
    }
    remove(deleteKeyDto) {
        return this.keysService.remove(deleteKeyDto);
    }
    status(statusKeyDto) {
        return this.keysService.status(statusKeyDto);
    }
    unlock(unlocKeyDto) {
        return this.keysService.unlock(unlocKeyDto);
    }
};
__decorate([
    (0, throttler_1.Throttle)(5, 3600),
    (0, common_1.Post)(routes_1.default.CREATE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_key_dto_1.CreateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(routes_1.default.READ),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [read_key_dto_1.ReadKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(routes_1.default.UPDATE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_key_dto_1.UpdateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(routes_1.default.DELETE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_key_dto_1.DeleteKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "remove", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(routes_1.default.STATUS),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_key_dto_1.StatusKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "status", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(routes_1.default.UNLOCK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unlock_key_dto_1.UnlocKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "unlock", null);
KeysController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiSecurity)("API_ACCESS_TOKEN", ["API_ACCESS_TOKEN"]),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
        type: app_openapi_1.UnauthorizedResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal Server Error",
        type: app_openapi_1.InternalServerErrorResponse,
    }),
    (0, swagger_1.ApiTags)("key"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("api-access-token")),
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], KeysController);
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map