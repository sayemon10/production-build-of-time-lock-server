import { Repository } from "typeorm";
import { Server } from "./entities/server.entity";
export declare class ServersService {
    private serversRepository;
    private readonly logger;
    servers: Server[];
    constructor(serversRepository: Repository<Server>);
    setServers(): Promise<void>;
}
