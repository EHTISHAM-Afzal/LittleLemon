import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    lastActiveAt: { type: Date, default: Date.now },
    cart : { type: Schema.Types.ObjectId, ref: "Cart" }
})

export const User = mongoose.model("User", UserSchema);

export const ValidateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(50),
        isAdmin: Joi.boolean().default(false),
        lastActiveAt: Joi.date().default(Date.now),
        cart : Joi.string() 
    });
    return schema.validate(user);
}