import { registerUser, authenticateUser } from "../services/authService.js";

export const register = async (request, reply) => {
    const { email, password } = request.body;

    try {
        await registerUser(email, password);
        reply.code(201).send({ message: "User registered" });
    } catch (error) {
        reply.code(500).send({ error: "Registration failed", details: error.message });
    }
};

export const login = async (request, reply) => {
    const { email, password } = request.body;

    try {
        const result = await authenticateUser(email, password, request.jwt);
        reply.send(result);
    } catch (error) {
        reply.code(401).send({ error: error.message });
    }
};
