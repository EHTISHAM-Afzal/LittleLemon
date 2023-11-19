import express from "express"
import { Cart, validateCart } from "../Models/CartModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
    await Cart
        .find().populate("Product")
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Cart", error: err.message })
        );
});

router.get("/:id", async (req, res) => {
    await Cart
        .findById(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Cart", error: err.message })
        );
});

router.post("/", (req, res) => {
    const Cart = new Cart({
        id: req.body.id,
    });
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.message);
    Cart.save()
        .then((r) => res.send(r))
        .catch((err) => {
            if (err.code === 11000) {
                // Duplicate cataory
                return res.status(422).send({ message: 'Cart already exists!' });
            }
            // Some other error
            return res.status(400).send({ message: "Oops cant save", error: err.message })
        }
        );
});

router.put("/:id", async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.message);
    await Cart
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            res.send({
                message: "Cart updated the new data is ",
                response: response,
            })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the Cart", error: err.message })
        );
});

router.delete("/:id", async (req, res) => {
    await Cart
        .findOneAndDelete( req.params.id )
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the Cart", error: err.message })
        );
});



export default router;