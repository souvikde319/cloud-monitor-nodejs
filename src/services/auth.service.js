import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";

export const registerUser = async (data) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await createUser({
        email: data.email,
        password: hashedPassword,
        role: data.role || "developer"
    });

    return user;
}

export const loginUser = async (data) => {
    const user = await findUserByEmail(data.email);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, 
    //     { expiresIn: "1d" });
    // return { token, user };


    // ✅ Access Token (short expiry)
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "45m" }
    );

    // ✅ Refresh Token (long expiry)
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();


    return { accessToken, refreshToken, user };


}