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
exports.GetCurrentTimeResponse = exports.UnauthorizedResponse = exports.InternalServerErrorResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class InternalServerErrorResponse {
    statusCode;
    message;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [500],
        example: 500,
    }),
    __metadata("design:type", Number)
], InternalServerErrorResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ["Internal Server Error"],
        example: "Internal Server Error",
    }),
    __metadata("design:type", String)
], InternalServerErrorResponse.prototype, "message", void 0);
exports.InternalServerErrorResponse = InternalServerErrorResponse;
class UnauthorizedResponse {
    statusCode;
    message;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [401],
        example: 401,
    }),
    __metadata("design:type", Number)
], UnauthorizedResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ["Unauthorized"],
        example: "Unauthorized",
    }),
    __metadata("design:type", String)
], UnauthorizedResponse.prototype, "message", void 0);
exports.UnauthorizedResponse = UnauthorizedResponse;
class GetCurrentTimeResponse {
    timestamp;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The current unix timestamp (seconds)",
        example: 1668177598,
    }),
    __metadata("design:type", Number)
], GetCurrentTimeResponse.prototype, "timestamp", void 0);
exports.GetCurrentTimeResponse = GetCurrentTimeResponse;
//# sourceMappingURL=app.openapi.js.map