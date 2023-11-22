//////////////////////////////////////////////////////////////////////////////////////////////////
// import the dependencies
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from "express";
import connectDb from "../db/conn.mjs";
import Shipwrecks from "../schemas/shipwreckSchema.mjs";

const readRouter = express.Router();

//////////////////////////////////////////////////////////////////////////////////////////////////
// functions to retrieve documents
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
// 1. retrieve all documents in the collection (/shipwrecks)
//    NOTE: set a limit of 100 documents
//////////////////////////////////////////////////////////////////////////////////////////////////

const retrieveDocs = async (res) => {
  try {
    const allDocs = await Shipwrecks.find().limit(100);
    let totalAllDocs = allDocs.length;
    console.log(`Total number of shipwrecks: ${totalAllDocs}`);
    return allDocs;
  } catch (error) {
    console.log("Error in reading all documents", error);
    res.status(500).send("Internal Server Error");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// 2. retrieve the document by ID (/shipwrecks/id)
//////////////////////////////////////////////////////////////////////////////////////////////////

const retrieveById = async (shipId, res) => {
  try {
    const oneDoc = await Shipwrecks.findById(shipId);
    return oneDoc;
  } catch (error) {
    console.log("Error in reading document by ID", error);
    res.status(500).send("Internal Server Error");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// 3. retrieve only visible shipwrecks (feature_type: .*visible) (/shipwrecks/visible)
//    NOTE: set a limit of 100 documents
//////////////////////////////////////////////////////////////////////////////////////////////////

const retrieveVisible = async (res) => {
  try {
    const visibleDocs = await Shipwrecks.find({
      feature_type: { $regex: /.*Visible/ },
    }).limit(100);
    return visibleDocs;
  } catch (error) {
    console.log("Error in retrieving visible shipwrecks", error);
    res.status(500).send("Internal Server Error");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// 4. retrieve only dangerous shipwrecks (feature_type: .*dangerous) (/shipwrecks/dangerous)
//    NOTE: set a limit of 100 documents
//////////////////////////////////////////////////////////////////////////////////////////////////

let dangerousDocs;

const retrieveDangerous = async (res) => {
  try {
    dangerousDocs = await Shipwrecks.find({
      feature_type: { $regex: /.*dangerous/ },
    }).limit(100);
    return dangerousDocs;
  } catch (error) {
    console.log("Error in retrieving dangerous shipwrecks", error);
    res.status(500).send("Internal Server Error");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// establish the connection to mongodb, then evoke function of each route
//////////////////////////////////////////////////////////////////////////////////////////////////

const startServer = async () => {
  await connectDb();

  readRouter.get("/", async (req, res) => {
    try {
      const allDocs = await retrieveDocs(res);
      res.send(allDocs);
    } catch (error) {
      console.error("error in handling the route", error);
    }
  });

  readRouter.get("/visible", async (req, res) => {
    try {
      const visibleDocs = await retrieveVisible(res);
      res.send(visibleDocs);
    } catch (error) {
      console.log("Error in route /visible", error);
    }
  });

  readRouter.get("/dangerous", async (req, res) => {
    try {
      const dangerousDocs = await retrieveDangerous(res);
      res.send(dangerousDocs);
    } catch (error) {
      console.log("Error in route /dangerous", error);
    }
  });

  readRouter.get("/:id", async (req, res) => {
    const shipWreckId = req.params.id;

    try {
      const oneDoc = await retrieveById(shipWreckId, res);
      res.send(oneDoc);
    } catch (error) {
      console.error("Error in route /:id", error);
    }
  });
};

startServer();

//////////////////////////////////////////////////////////////////////////////////////////////////
// export module
//////////////////////////////////////////////////////////////////////////////////////////////////

export default readRouter;
