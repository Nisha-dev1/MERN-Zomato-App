const foodpartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/fooditem.model");

async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;
    const foodPartner = await foodpartnerModel.findById(foodPartnerId).select("-password");
    if (!foodPartner) return res.status(404).json({ message: "Food partner not found" });

    // Fetch all food items for this partner
    const foodItems = await foodModel.find({ foodPartnerId });

    res.status(200).json({
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food partner", error: error.message });
  }
}




module.exports = { getFoodPartnerById };
