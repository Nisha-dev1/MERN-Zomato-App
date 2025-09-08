// this file start the server
const app = require('./src/app');
const connectDB = require('./src/db/db');
require('dotenv').config();

// connect to database
connectDB();

app.listen(3000, ()=>{
    console.log("server started at port: 3000");
})

