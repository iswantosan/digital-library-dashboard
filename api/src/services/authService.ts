import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel";

export const registerUser = async (email: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);
};

export const authenticateUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    return user;
};

