"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("@fastify/helmet"));
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
process.on("unhandledRejection", (err, promise) => {
    console.error("Unhandled rejection (promise: ", promise, ", reason: ", err, ").");
});
process.on("uncaughtException", (err) => {
    console.log("Caught exception: ", err);
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: true, trustProxy: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Time-Lock Provider")
        .addApiKey({ type: "apiKey", name: "API_ACCESS_TOKEN", in: "header" }, "API_ACCESS_TOKEN")
        .setDescription("A key-service provider for the Time-Lock encryption")
        .setVersion("1.0")
        .addTag("key")
        .addTag("time")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("openapi", app, document);
    app.register(helmet_1.default, {
        contentSecurityPolicy: false,
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
    }));
    await app.listen(process.env.PORT || 3000, process.env.HOST || "0.0.0.0");
}
bootstrap();
//# sourceMappingURL=main.js.map