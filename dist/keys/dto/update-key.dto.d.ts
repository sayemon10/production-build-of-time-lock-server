import { CreateKeyDto } from "./create-key.dto";
declare const UpdateKeyDto_base: import("@nestjs/common").Type<Partial<CreateKeyDto>>;
export declare class UpdateKeyDto extends UpdateKeyDto_base {
    uuid: string;
}
export {};
