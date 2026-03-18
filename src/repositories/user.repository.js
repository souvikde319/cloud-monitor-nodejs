import User from "../models/user.model.js";

export const createUser = (data) => {
    return User.create(data);
}

export const findUserByEmail = (email) => {
    return User.findOne({ email });
} 