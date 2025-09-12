const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    foodPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner",
        required: true
    }
},
    {
        timestamps: true
    }
);
const foodModel = mongoose.model("fooditem", foodSchema);
module.exports = foodModel;
