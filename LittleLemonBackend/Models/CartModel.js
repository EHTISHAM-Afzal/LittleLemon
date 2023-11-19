import * as mongoose from 'mongoose'
import Joi from "joi"

const ObjectId = mongoose.Types.ObjectId;

const CartItemSchema = new mongoose.Schema({
    productId: { type: ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    items: [CartItemSchema],
});

export const Cart = mongoose.model("Cart", CartSchema);


export const validateCart = (cart) => {
    const schema = Joi.object({
        userId: Joi.string().custom((value, helpers) => {
            if (!ObjectId.isValid(value)) return helpers.error('any.invalid');
            return value;
        }, 'Object Id Validation'),
        items: Joi.array().items(
            Joi.object({
                productId: Joi.string().custom((value, helpers) => {
                    if (!ObjectId.isValid(value)) return helpers.error('any.invalid');
                    return value;
                }, 'Object Id Validation'),
                quantity: Joi.number().required(),
            })
        ),
    });

    return schema.validate(cart);
};