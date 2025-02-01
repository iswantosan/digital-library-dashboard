import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import fastifyJWT from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Fastify instance
const app: FastifyInstance = Fastify({
    logger: true,
});

// Swagger Documentation Configuration
const swaggerOptions: SwaggerOptions = {
    swagger: {
        info: {
            title: "Library API",
            description: "API documentation for the digital library",
            version: "1.0.0",
        },
    },
};
// Register Swagger
app.register(fastifySwagger, swaggerOptions);

// Enable CORS for frontend access
app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

// Register JWT authentication
app.register(fastifyJWT, {
    secret: process.env.JWT_SECRET ?? "digital_library",
});

// Authentication Middleware
app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.code(401).send({ error: "Unauthorized" });
    }
});

// Register Routes
app.register(authRoutes);

// Global Error Handling
app.setErrorHandler((error, request, reply) => {
    reply.status(error.statusCode || 500).send({
        error: error.message || "Internal Server Error",
    });
});

// Start the Server
const start = async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
        console.log(`Server running at http://localhost:3000`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();

export default app;
