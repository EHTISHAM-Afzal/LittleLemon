import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const BookingTableSchema = new mongoose.Schema({
    userName: { type: Schema.Types.ObjectId, ref: "Users" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, min: 1, max: 10, default: 1, required: true },
    occasion: { type: String, enum: ["Birthday", "Anniversary"], required: true }
})

export const BookingTable = mongoose.model("BookingTable", BookingTableSchema);

export const ValidateTable = (table) => {
    const schema = Joi.object({
        date: Joi.string().required(),
        time: Joi.string().required(),
        guests: Joi.number().required(),
        occasion: Joi.string().allow("Birthday", "Anniversary")
    });
    return schema.validate(table);
}