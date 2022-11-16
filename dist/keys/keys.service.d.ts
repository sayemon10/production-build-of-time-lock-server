import { DataSource, Repository } from "typeorm";
import { CreateKeyDto } from "./dto/create-key.dto";
import { UpdateKeyDto } from "./dto/update-key.dto";
import { Key } from "./entities/key.entity";
import { TimeService } from "src/time/time.service";
import { DeleteKeyDto } from "./dto/delete-key.dto";
import { ReadKeyDto } from "./dto/read-key.dto";
import { StatusKeyDto } from "./dto/status-key.dto";
import { UnlocKeyDto } from "./dto/unlock-key.dto";
export declare class KeysService {
    private dataSource;
    private keysRepository;
    private readonly timeService;
    constructor(dataSource: DataSource, keysRepository: Repository<Key>, timeService: TimeService);
    create({ admin_password, encrypted_partial_data, iv, lock_duration_seconds, recovery_password, }: CreateKeyDto): Promise<{
        success: boolean;
        message: string;
        key: {
            uuid: string;
            unlock_at: Date;
            delete_at: Date;
        };
    }>;
    findAll(): string;
    findOne({ uuid, admin_password }: ReadKeyDto): Promise<{
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
    remove({ uuid, admin_password }: DeleteKeyDto): Promise<{
        success: boolean;
        message: string;
    }>;
    status({ uuid }: StatusKeyDto): Promise<{
        success: boolean;
        message: string;
        key: {
            unlock_at: Date;
            delete_at: Date;
        };
    }>;
    unlock({ uuid, recovery_password }: UnlocKeyDto): Promise<{
        status: string;
        key: Partial<Key>;
    }>;
}
