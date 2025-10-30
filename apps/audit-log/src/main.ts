import { NestFactory } from "@nestjs/core";
import { AuditLogModule } from "./audit-log.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuditLogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://guest:guest@rabbitmq:5672"],
        queue: "audit_log",
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();

  console.log("🚀 Microserviço de logs conectado ao RabbitMQ");
}

bootstrap();
