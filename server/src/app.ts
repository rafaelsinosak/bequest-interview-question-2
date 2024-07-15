import express from "express";
import cors from "cors";
import blockchainRoutes from "./routes/blockchainRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/blockchain", blockchainRoutes);

export default app;
