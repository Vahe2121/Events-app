import "@fastify/jwt"
import "fastify"
import { FastifyReply, FastifyRequest} from "fastify";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { sub: string; email: string };
        user: { sub: string; email: string };
    }
}