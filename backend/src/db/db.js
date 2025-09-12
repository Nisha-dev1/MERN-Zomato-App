const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URL,)
        .then(() => console.log("DataBase connected successfully🎉"))
        .catch((err) => console.log(err));
    }

module.exports = connectDB;