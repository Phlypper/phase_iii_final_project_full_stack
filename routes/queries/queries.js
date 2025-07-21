// query.js
import express from "express";
import fs from "fs";

const router = express.Router();
const filePath = "queries.json";

// ✅ POST /queries — save query list to file
router.post("/", (req, res) => {
  try {
    const queryArray = req.body;
    const jsonString = JSON.stringify(queryArray, null, 2);
    fs.writeFileSync(filePath, jsonString, "utf8");
    res.status(200).send("query array saved");
  } catch (err) {
    console.error("Failed to save queries:", err);
    res.status(500).send("failed to save query array");
  }
});

// ✅ GET /queries — load query list from file
router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("queries.json file not found");
  }
});

export default router;
