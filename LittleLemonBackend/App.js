import express from "express";
import morgan from 'morgan';
import ProductRoutes from './Routes/Product.js'
import categoriesRouter from './Routes/Categories.js'
import connectDB from './MongoDB/Connect.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import TablesRoutes from "./Routes/BookingTable.js";
import UserRoutes from "./Routes/User.js";


dotenv.config();

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/products", ProductRoutes);
app.use("/api/categories", categoriesRouter);
app.use("/api/tables", TablesRoutes );
app.use("/api/users", UserRoutes );


const port = process.env.PORT || 3002;

const StartServer = async () => {
    try {
        // eslint-disable-next-line no-undef
        connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`app is runnig on ${port} `);
        });
    } catch (error) {
        console.log(error);
    }
}
StartServer();