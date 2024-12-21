const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes  = require("./Routes/auth.routes")
const hotelRoutes = require("./Routes/hotel.routes")
require("dotenv").config();

const app = express();




//middleware
app.use(express.json());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));


//routes

app.use("/api/auth",authRoutes );
app.use("/api/hotels",hotelRoutes );


//Database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});