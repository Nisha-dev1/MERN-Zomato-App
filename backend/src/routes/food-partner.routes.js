const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Route middleware hit`);
  next();
});

/* /api/food-partner/:id */
router.get(
  "/:id",
  (req, res, next) => {
    console.log("Food partner route hit with ID:", req.params.id);
    next();
  },
  authMiddleware.authFoodPartnerMiddleware,
  foodPartnerController.getFoodPartnerById
);
module.exports = router;