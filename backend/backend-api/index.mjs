import "dotenv/config";
import express from "express";
import awsServerlessExpress from "aws-serverless-express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.mjs";

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);


const server = awsServerlessExpress.createServer(app);
export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
