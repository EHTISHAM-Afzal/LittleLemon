import express from "express";
import { Product, validateProduct } from "../Models/ProductModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const { category } = req.query
    if (category) {
        console.log(category)
        await Product.find({ category: category }).populate("category")
            .then((response) => res.send(response))
            .catch((err) =>
                res.status(400).send({ message: "Oops cant find the Product", error: err })
            );
    }
    else {
        await Product.find().populate("category")
            .then((response) => res.send(response))
            .catch((err) =>
                res.status(400).send({ message: "Oops cant find the Product", error: err })
            );
    }
});

router.get("/:id", async (req, res) => {
    await Product.findById(req.params.id)
        .then((response) => response.length == 0 ? res.status(400).send("Cannot find Product") : res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Product", error: err.message })
        );
});

router.post("/", async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.message);
    await Product.create(req.body)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant save the Product", error: err.message }))
});

router.put("/:id", async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            response === null ? res.status(400).send("Cannot find the Product") :
                res.send({
                    message: "Product updated the new data is ",
                    response: response,
                })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the Product", error: err.message })
        );
});

router.delete("/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the Product", error: err.message })
        );
});

export default router;