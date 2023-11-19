import express from "express"
import { User, ValidateUser } from "../Models/UserModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
    await User
        .find()
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the User", error: err.message })
        );
});

router.get("/:id", async (req, res) => {
    await User
        .findById(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the User", error: err.message })
        );
});

router.post("/", (req, res) => {
    const newUser = new User({
        ...req.body
    });
    const { error } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.message);
    newUser.save()
        .then((r) => res.send(r))
        .catch((err) => {
            if (err.code === 11000) {
                // Duplicate cataory
                return res.status(422).send({ message: 'User already exists!' });
            }
            // Some other error
            return res.status(400).send({ message: "Oops cant save", error: err.message })
        }
        );
});

router.put("/:id", async (req, res) => {
    const { error } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.message);
    await User
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            res.send({
                message: "User updated the new data is ",
                response: response,
            })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the User", error: err.message })
        );
});

router.delete("/:id", async (req, res) => {
    await User
        .findOneAndDelete(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the User", error: err.message })
        );
});



export default router;