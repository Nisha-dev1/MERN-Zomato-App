const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const FoodItem = require("../models/fooditem.model"); // adjust path if needed

const upload = multer({ 
    storage: multer.memoryStorage(),
}); 
// Post /api/food
router.post('/', authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood);

//GET /api/food
router.get('/', 
    authMiddleware.authFoodPartnerMiddleware,
    foodController.getAllFood); 

// Public GET /api/food (for frontend reels)
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    // Map MongoDB fields to frontend expected fields
    const mappedItems = foodItems.map(item => ({
      src: item.video, // MongoDB field 'video' becomes 'src'
      foodPartner: item.foodPartnerId?.toString(), // MongoDB field 'foodPartnerId'
      description: item.description,
    }));
    res.json({ foodItems: mappedItems });
  } catch (err) {
    res.status(500).json({ message: "Error fetching food items", error: err.message });
  }
});

router.post(
  "/create",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),   // 👈 matches "video" in FormData
  foodController.createFood
);

// If you want a protected GET for partners, use a different route:
router.get("/partner", 
    authMiddleware.authFoodPartnerMiddleware,
    foodController.getAllFood
);

router.post('/like', 
  authMiddleware.authFoodPartnerMiddleware, 
  foodController.likeFood
);

router.post('/save', 
  authMiddleware.authFoodPartnerMiddleware,
    foodController.saveFood
)

module.exports = router;

