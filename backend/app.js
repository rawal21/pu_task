require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app =  express();
const port = process.env.PORT;
const mongourl = process.env.MONGO_URL;
const authroutes = require('./routes/authroutes.js')
const cors = require("cors")

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("connection sucessfull")
})

.catch((e)=>{
  console.log("error ", e);
})

app.use(cors());
app.use(express.json());
app.use(authroutes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
