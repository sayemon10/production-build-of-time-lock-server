import { ConfigService } from "@nestjs/config";
import Strategy from "passport-headerapikey";
declare const HeaderApiAccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class HeaderApiAccessTokenStrategy extends HeaderApiAccessTokenStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate: (token: string, done: (error: Error, data: unknown) => unknown) => void;
}
export {};
