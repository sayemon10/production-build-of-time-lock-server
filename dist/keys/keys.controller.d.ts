import { KeysService } from "./keys.service";
import { CreateKeyDto } from "./dto/create-key.dto";
import { UpdateKeyDto } from "./dto/update-key.dto";
import { DeleteKeyDto } from "./dto/delete-key.dto";
import { ReadKeyDto } from "./dto/read-key.dto";
import { StatusKeyDto } from "./dto/status-key.dto";
import { UnlocKeyDto } from "./dto/unlock-key.dto";
export declare class KeysController {
    private readonly keysService;
    constructor(keysService: KeysService);
    create(createKeyDto: CreateKeyDto): Promise<{
        success: boolean;
        message: string;
        key: {
            uuid: string;
            unlock_at: Date;
            delete_at: Date;
        };
    }>;
    findOne(readKeyDto: ReadKeyDto): Promise<{
        success: boolean;
        message: string;
        key: {
            uuid: string;
            iv: string;
            encrypted_partial_data: string;
            lock_duration_seconds: number;
            unlock_at: Date;
            delete_at: Date;
        };
    }>;
    update(updateKeyDto: UpdateKeyDto): void;
    remove(deleteKeyDto: DeleteKeyDto): Promise<{
        success: boolean;
        message: string;
    }>;
    status(statusKeyDto: StatusKeyDto): Promise<{
        success: boolean;
        message: string;
        key: {
            unlock_at: Date;
            delete_at: Date;
        };
    }>;
    unlock(unlocKeyDto: UnlocKeyDto): Promise<{
        status: string;
        key: Partial<import("./entities/key.entity").Key>;
    }>;
}
