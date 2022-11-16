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
exports.Key = void 0;
const typeorm_1 = require("typeorm");
let Key = class Key {
    uuid;
    encrypted_partial_data;
    iv;
    admin_password_hash;
    recovery_password_hash;
    lock_duration_seconds;
    unlock_at;
    delete_at;
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "uuid",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Key.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 5000,
        nullable: false,
    }),
    __metadata("design:type", String)
], Key.prototype, "encrypted_partial_data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 256,
        nullable: false,
    }),
    __metadata("design:type", String)
], Key.prototype, "iv", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 1024,
        nullable: false,
    }),
    __metadata("design:type", String)
], Key.prototype, "admin_password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 1024,
        nullable: false,
    }),
    __metadata("design:type", String)
], Key.prototype, "recovery_password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Key.prototype, "lock_duration_seconds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp with time zone",
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Date)
], Key.prototype, "unlock_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp with time zone",
        nullable: false,
    }),
    __metadata("design:type", Date)
], Key.prototype, "delete_at", void 0);
Key = __decorate([
    (0, typeorm_1.Entity)("keys")
], Key);
exports.Key = Key;
//# sourceMappingURL=key.entity.js.map