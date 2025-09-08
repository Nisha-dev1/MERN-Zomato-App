const foodModel = require("../models/fooditem.model");
const storageService = require("../services/storage.service");
const {v4:uuid} = require("uuid");

async function createFood(req, res) {
    console.log(req.foodpartner);
    console.log(req.body);
    console.log(req.file);
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    console.log(fileUploadResult);
    // const food = await foodModel.create({           
    //     name: req.body.name,
    //     video: fileUploadResult.url,
    //     description: req.body.description,
    //     foodPartnerId: req.foodpartner._id
    // });

    res.send("food item created");
}

module.exports = {
    createFood,
}