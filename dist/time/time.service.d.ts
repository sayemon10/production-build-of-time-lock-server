export declare class TimeService {
    private readonly logger;
    timestamp: number;
    private interval;
    updateTime(): Promise<void>;
}
