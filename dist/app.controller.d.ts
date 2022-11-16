import { AppService } from "./app.service";
import { TimeService } from "./time/time.service";
export declare class AppController {
    private readonly appService;
    private readonly timeService;
    constructor(appService: AppService, timeService: TimeService);
    getRoutes(): {
        GET_TIME: string;
        CREATE: string;
        READ: string;
        UPDATE: string;
        DELETE: string;
        UNLOCK: string;
        STATUS: string;
    };
    getCurrentTime(): {
        timestamp: number;
    };
}
