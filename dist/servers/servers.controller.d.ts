import { ServersService } from "./servers.service";
export declare class ServersController {
    private readonly serversService;
    constructor(serversService: ServersService);
    getServers(): import("./entities/server.entity").Server[];
}
