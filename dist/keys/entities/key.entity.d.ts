export declare class Key {
    uuid: string;
    encrypted_partial_data: string;
    iv: string;
    admin_password_hash: string;
    recovery_password_hash: string;
    lock_duration_seconds: number;
    unlock_at: Date;
    delete_at: Date;
}
