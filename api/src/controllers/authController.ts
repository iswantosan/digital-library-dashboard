import { FastifyReply, FastifyRequest } from "fastify";
import { registerUser, authenticateUser } from "../services/authService";

interface AuthRequestBody {
    email: string;
    password: string;
}

export const register = async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply): Promise<void> => {
    const { email, password } = request.body;

    try {
        await registerUser(email, password);
        reply.code(201).send({ message: "User registered successfully" });
    } catch (error) {
        reply.code(500).send({ error: "Registration failed", details: (error as Error).message });
    }
};

export const login = async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply): Promise<void> => {
    const { email, password } = request.body;

    try {
        const user = await authenticateUser(email, password);

        const token = request.jwt.sign({ id: user.id, email: user.email });

        reply.send({ token });
    } catch (error) {
        reply.code(401).send({ error: "Invalid credentials", details: (error as Error).message });
    }
};
