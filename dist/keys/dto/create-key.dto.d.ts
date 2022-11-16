export declare class CreateKeyDto {
    admin_password: string;
    recovery_password: string;
    iv: string;
    encrypted_partial_data: string;
    lock_duration_seconds: number;
}
