import { register, login } from "../controllers/authController.js";

export default async function (fastify, opts) {
    fastify.post("/register", register);
    fastify.post("/login", login);
}