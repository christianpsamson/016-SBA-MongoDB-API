//////////////////////////////////////////////////////////////////////////////////////////////////
// import the dependencies
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from "express";
import { connectDb, oneDoc } from "../db/conn.mjs";

const readRouter = express.Router();

const startServer = async () => {
  await connectDb();

  readRouter.get("/", async (req, res) => {
    try {
      res.send(oneDoc);
    } catch (error) {
      console.error("error in handling the route", error);
    }
  });
};

startServer();

export default readRouter;
