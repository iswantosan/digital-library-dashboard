import "@fastify/jwt";
import { FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }

    interface FastifyRequest {
        jwt: {
            sign: (payload: object) => string;
            verify: <T = object>(token?: string) => Promise<T>;
        };
        user: { id: number; email: string };
    }
}
