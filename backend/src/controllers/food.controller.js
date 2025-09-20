const foodModel = require("../models/fooditem.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.modal");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid() + "-" + req.file.originalname
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      video: fileUploadResult.url,
      description: req.body.description,
      foodPartnerId: req.user?._id, // ✅ safe access
    });

    return res.status(201).json({
      message: "success",
      food: foodItem,
    });
  } catch (error) {
    console.error("❌ CreateFood Error:", error.message);
    res.status(500).json({
      message: "Error creating food item",
      error: error.message,
    });
  }
}

async function getAllFood(req, res) {
  try {
    const foodItems = await foodModel.find();
    res.status(200).json({
      message: "Food items fetched successfully",
      food: foodItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching food items",
      error: error.message,
    });
  }
}

async function getPartnerFood(req, res) {
  try {
    const partnerId = req.user._id;
    const foodItems = await foodModel.find({ foodPartnerId: partnerId });
    res.json({ foodItems });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching partner food",
      error: err.message,
    });
  }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      food: foodId,
      user: user._id,
    });


    if (isAlreadyLiked) {
      await likeModel.deleteOne({
        food: foodId,
        user: user._id,
      })

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: {likesCount: -1}
      })

      return res.status(200).json({ 
        message: "Food item unliked", 
      });

    }

    const like = await likeModel.create({
      food: foodId,
      user: user._id,
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: {likesCount: 1}      
    })
    return res.status(201).json({ 
      message: "Food item liked", like 
    });
  }
  catch (error) {
    console.error("❌ LikeFood Error:", error.message);
    res.status(500).json({  
      message: "Error liking food item",
      error: error.message,
    });
  } 
}

async function saveFood(req, res){
    try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
      food: foodId,
      user: user._id,
    });


    if (isAlreadySaved) {
      await saveModel.deleteOne({
        food: foodId,
        user: user._id,
      })

      return res.status(200).json({ 
        message: "Food item unsaved", 
      });

    }

    const save = await saveModel.create({
      food: foodId,
      user: user._id,
    })

    return res.status(201).json({ 
      message: "Food item saved", like 
    });
  }
  catch (error) {
    console.error("❌ saveFood Error:", error.message);
    res.status(500).json({  
      message: "Error liking food item",
      error: error.message,
    });
  } 
}

module.exports = {
  createFood,
  getAllFood,
  getPartnerFood,
  likeFood,
  saveFood
};
