const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors())

app.use(function(req, res, next) {
  //sommige headers van
  if (req.accepts("json")) {
    next();
  } else {
    res.send(400);
  }
});

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE, GET, POST, OPTIONS")
  next();
})


const pokemon = require("./routes/api/pokemon");

app.use("/api/pokemon", pokemon);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     )

//     if(req.method === "OPTIONS"){
//         res.header('Allow','OPTIONS' ,'POST','GET')
//         return res.status(200).json({})
//     }
//     next()
// })

//post get and options

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port: ${port}`));
