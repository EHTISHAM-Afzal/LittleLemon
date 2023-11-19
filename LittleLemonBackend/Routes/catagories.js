import express from "express"
import { Category, validatecategory } from "../Models/CatagoryModel.js";


const catagoriesRouter = express.Router();


catagoriesRouter.get("/", async (req, res) => {
    await Category
        .find()
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the category", error: err.message })
        );
});

catagoriesRouter.get("/:id", async (req, res) => {
    await Category
        .findById(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the category", error: err.message })
        );
});

catagoriesRouter.post("/", (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    const { error } = validatecategory(req.body);
    if (error) return res.status(400).send(error.message);
    category.save()
        .then((r) => res.send(r))
        .catch((err) => {
            if (err.code === 11000) {
                // Duplicate cataory
                return res.status(422).send({ message: 'category already exists!' });
            }
            // Some other error
            return res.status(400).send({ message: "Oops cant save", error: err.message })
        }
        );
});

catagoriesRouter.put("/:id", async (req, res) => {
    const { error } = validatecategory(req.body);
    if (error) return res.status(400).send(error.message);
    await Category
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            res.send({
                message: "category updated the new data is ",
                response: response,
            })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the category", error: err.message })
        );
});

catagoriesRouter.delete("/:id", async (req, res) => {
    await Category
        .findOneAndDelete( req.params.id )
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the category", error: err.message })
        );
});



export default catagoriesRouter;