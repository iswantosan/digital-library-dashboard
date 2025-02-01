import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (email, hashedPassword) => {
    return prisma.user.create({ data: { email, password: hashedPassword } });
};

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};
