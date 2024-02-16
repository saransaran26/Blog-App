import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import dataRoute from "./routes/dataRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

const DBURL =
  "mongodb+srv://saranchakravarthy26:pratice@pratice.ywjm4xc.mongodb.net/";
// mongoose.connect(DBURL, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", (error) => {
//   console.error("MongoDB connection error:", error);
// });

// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });
mongoose.connect(DBURL).then(()=>console.log("connected Succesfully")).catch((error)=>console.log("error in connection",error))

app.use("/user", userRoute);
app.use("/", dataRoute);

app.listen(4000, () => {
  console.log("server is running on port 3000");
});
