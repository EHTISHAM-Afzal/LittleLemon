import express from "express";
import { BookingTable, ValidateTable } from "../Models/TableModel.js";
const TablesRoutes = express.Router();

TablesRoutes.get("/", async (req, res) => {
    const { AvailibleTimesOnDate } = req.query;
    if (AvailibleTimesOnDate) {
        AvailibleTimesOnDate  === "undefined" ? res.status(400).send("Please select date") :
        await BookingTable.find({ date: AvailibleTimesOnDate }).select({ time: 1, _id: 0 })
            .then((response) => {
                let AllTimes = ["9", "10", "11", "12", "1", "2"]
                const BookedTimes = response.map((table) => table.time)
                const AvailibleTimes = AllTimes.filter((time) => !BookedTimes.includes(time))
                AvailibleTimes.length > 0 ? res.send(AvailibleTimes) : res.status(400).send(`There is no availible tables on ${new Date(AvailibleTimesOnDate).toLocaleDateString()} `)
            })
            .catch((err) =>
                res.status(400).send({ message: "Oops cant find the Table", error: err })
            )
    } else {
        await BookingTable.find()
            .then((response) => res.send(response))
            .catch((err) =>
                res.status(400).send({ message: "Oops cant find the Table", error: err })
            );
    }
});

TablesRoutes.get("/:id", async (req, res) => {
    await BookingTable.findById(req.params.id)
        .then((response) => response.length == 0 ? res.status(400).send("Cannot find Table") : res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Table", error: err.message })
        );
});

TablesRoutes.post("/", async (req, res) => {
    const { error } = ValidateTable(req.body);
    if (error) return res.status(400).send(error.message);
    // check if the table is already booked on the same date
    const isTableBooked = await BookingTable.findOne({ date: req.body.date, time: req.body.time }) 
    if (isTableBooked) return res.status(400).send("Table is already booked")
    await BookingTable.create(req.body)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant save the Table", error: err.message }))
});

TablesRoutes.put("/:id", async (req, res) => {
    await BookingTable.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            response === null ? res.status(400).send("Cannot find the Table") :
                res.send({
                    message: "BookingTable updated the new data is ",
                    response: response,
                })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the Table", error: err.message })
        );
});

TablesRoutes.delete("/:id", async (req, res) => {
    await BookingTable.findByIdAndDelete(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the Table", error: err.message })
        );
});

export default TablesRoutes;