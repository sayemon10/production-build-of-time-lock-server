"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cluster = void 0;
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const cpuCount = (0, os_1.cpus)().length;
class Cluster {
    static register(callback) {
        if (cluster_1.default.isPrimary) {
            console.log(`Primary server started on ${process.pid}`);
            process.on("SIGINT", () => {
                console.log("Cluster shutting down...");
                for (const id in cluster_1.default.workers) {
                    cluster_1.default.workers[id].kill();
                }
                process.exit(0);
            });
            for (let i = 0; i < cpuCount; i++) {
                cluster_1.default.fork();
            }
            cluster_1.default.on("online", (worker) => {
                console.log("Worker %s is online", worker.process.pid);
            });
            cluster_1.default.on("exit", (worker, _code, _signal) => {
                console.log(`Worker ${worker.process.pid} died. Restarting...`);
                cluster_1.default.fork();
            });
        }
        else {
            callback();
        }
    }
}
exports.Cluster = Cluster;
//# sourceMappingURL=cluster.js.map