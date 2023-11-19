import * as mongoose from "mongoose"
import joi from "joi"

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true },
});

export const Category = mongoose.model("Category", categorySchema);

export const validatecategory = (category) => {
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
    return schema.validate(category)
}