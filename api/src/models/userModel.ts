import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
    return prisma.user.create({ data: { email, password: hashedPassword } });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
};
