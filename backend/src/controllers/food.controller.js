const foodModel = require("../models/fooditem.model");
const storageService = require("../services/storage.service");
const {v4:uuid} = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      video: fileUploadResult.url,
      description: req.body.description,
      foodPartnerId: req.foodpartner._id
    });

    res.status(201).json({
      message: "food item created successfully",
      food: foodItem
    });

    console.log({
  message: "food item created successfully",
  food: foodItem
});
 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating food item",
      error: error.message
    });
  }
}

async function getAllFood(req, res) {   
  try {
    const foodItems = await foodModel.find({ foodPartnerId: req.foodpartner._id });
    res.status(200).json({
      message: "Food items fetched successfully",
      food: foodItems
    });
    console.log(foodItems)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching food items", 
      error: error.message
    });
  }   
}


module.exports = {
    createFood,
    getAllFood
}