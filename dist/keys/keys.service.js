"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysService = void 0;
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcrypt"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const key_entity_1 = require("./entities/key.entity");
const date_fns_1 = require("date-fns");
const time_service_1 = require("../time/time.service");
let KeysService = class KeysService {
    dataSource;
    keysRepository;
    timeService;
    constructor(dataSource, keysRepository, timeService) {
        this.dataSource = dataSource;
        this.keysRepository = keysRepository;
        this.timeService = timeService;
    }
    async create({ admin_password, encrypted_partial_data, iv, lock_duration_seconds, recovery_password, }) {
        const key = new key_entity_1.Key();
        try {
            key.uuid = (0, crypto_1.randomUUID)();
            key.admin_password_hash = await bcrypt.hash(admin_password, 10);
            key.recovery_password_hash = await bcrypt.hash(recovery_password, 10);
            key.unlock_at = null;
            key.delete_at = (0, date_fns_1.addYears)(this.timeService.timestamp * 1000, 1);
            key.iv = iv;
            key.lock_duration_seconds = lock_duration_seconds;
            key.encrypted_partial_data = encrypted_partial_data;
            await this.keysRepository.save(key);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException({
                success: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }, {
                cause: error,
            });
        }
        return {
            success: true,
            message: "Key saved successfully",
            key: {
                uuid: key.uuid,
                unlock_at: key.unlock_at,
                delete_at: key.delete_at,
            },
        };
    }
    findAll() {
        return `This action returns all keys`;
    }
    async findOne({ uuid, admin_password }) {
        const key = await getKey({ keysRepository: this.keysRepository, uuid });
        const match = await bcrypt.compare(admin_password, key.admin_password_hash);
        if (!match) {
            throw new common_1.UnauthorizedException({
                success: false,
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: "admin_password didn't match",
            });
        }
        key.delete_at = (0, date_fns_1.addYears)(this.timeService.timestamp * 1000, 1);
        await this.keysRepository.update({
            uuid,
        }, key);
        return {
            success: true,
            message: "Key retrived successfully",
            key: {
                uuid: key.uuid,
                iv: key.iv,
                encrypted_partial_data: key.encrypted_partial_data,
                lock_duration_seconds: +key.lock_duration_seconds,
                unlock_at: key.unlock_at,
                delete_at: key.delete_at,
            },
        };
    }
    update(updateKeyDto) {
        throw new common_1.NotImplementedException({
            success: false,
            statusCode: common_1.HttpStatus.NOT_IMPLEMENTED,
            message: "This action will be implemented later",
        });
    }
    async remove({ uuid, admin_password }) {
        const key = await getKey({ keysRepository: this.keysRepository, uuid });
        const match = await bcrypt.compare(admin_password, key.admin_password_hash);
        if (!match) {
            throw new common_1.UnauthorizedException({
                success: false,
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: "admin_password didn't match",
            });
        }
        await this.keysRepository.delete({
            uuid,
        });
        return {
            success: true,
            message: "Key deleted successfully",
        };
    }
    async status({ uuid }) {
        const key = await getKey({ keysRepository: this.keysRepository, uuid });
        key.delete_at = (0, date_fns_1.addYears)(this.timeService.timestamp * 1000, 1);
        await this.keysRepository.update({
            uuid,
        }, key);
        return {
            success: true,
            message: "Key status retrieved successfully",
            key: {
                unlock_at: key.unlock_at,
                delete_at: key.delete_at,
            },
        };
    }
    async unlock({ uuid, recovery_password }) {
        const key = await getKey({ keysRepository: this.keysRepository, uuid });
        const match = await bcrypt.compare(recovery_password, key.recovery_password_hash);
        if (!match) {
            throw new common_1.UnauthorizedException({
                success: false,
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: "recovery_password didn't match",
            });
        }
        let status;
        const currentDateTime = new Date(this.timeService.timestamp * 1000);
        if (!key.unlock_at) {
            key.unlock_at = (0, date_fns_1.addSeconds)(currentDateTime, key.lock_duration_seconds);
            status = "STARTED";
        }
        else if ((0, date_fns_1.differenceInSeconds)(currentDateTime, key.unlock_at) > 1) {
            status = "UNLOCKED";
        }
        else {
            status = "PENDING";
        }
        const unlockedKey = {
            ...key,
            admin_password_hash: undefined,
            recovery_password_hash: undefined,
        };
        key.delete_at = (0, date_fns_1.addYears)(this.timeService.timestamp * 1000, 1);
        await this.keysRepository.update({
            uuid,
        }, key);
        return {
            status,
            key: status === "UNLOCKED"
                ? unlockedKey
                : {
                    unlock_at: key.unlock_at,
                    delete_at: key.delete_at,
                },
        };
    }
};
KeysService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(key_entity_1.Key)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        time_service_1.TimeService])
], KeysService);
exports.KeysService = KeysService;
async function getKey({ keysRepository, uuid, }) {
    let key = null;
    try {
        key = await keysRepository.findOne({
            where: {
                uuid,
            },
        });
    }
    catch (error) {
        console.log(error);
        throw new common_1.InternalServerErrorException({
            success: false,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        }, {
            cause: error,
        });
    }
    if (!key) {
        throw new common_1.NotFoundException({
            success: false,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: "Key Not Found for the given UUID",
        });
    }
    return key;
}
//# sourceMappingURL=keys.service.js.map