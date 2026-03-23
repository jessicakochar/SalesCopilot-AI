import express from "express";
import cors from "cors";
import salesRoutes from "./routes/sales.routes.js";
import {logger} from "./middleware/logger.js";
import {errorHandler} from "./middleware/errorHandler.js"; 
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use(logger);
app.use("/sales", salesRoutes);  
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));