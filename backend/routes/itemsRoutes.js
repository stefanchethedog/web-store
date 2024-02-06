import express from "express";
import { Item } from "../models/itemModel.js";

const router = express.Router();

//Get All items
router.get("/", async (request, response) => {
  try {
    const items = await Item.find({});

    return response.status(200).json(items);
  } catch (err) {
    console.log(err.message)
    response.status(500).send({message: err.message})
  }
});

export default router;
