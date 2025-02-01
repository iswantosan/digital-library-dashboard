import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(email, hashedPassword);
};

export const authenticateUser = async (email, password, jwt) => {
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, email: user.email });
    return { token };
};
