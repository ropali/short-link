const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoute = require("./routes/api/main");
const cors = require('cors')
const path = require('path')
const config = require("./config/config");

// Set up port
const port = process.env.PORT || 5000;

const app = express();

// Enable cors
app.use(cors())

// Set BodyParser middleware
app.use(bodyParser.json());

// DB conection
const dbURL = config.mongoDBUrl;

mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'client', 'build')))

// Use routes
app.use("/", apiRoute);

// Set static folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
// Serve the static assets if in the prodcution 
// if(process.env.NODE_ENV === "production" ) {
  
// }

// Start listening
app.listen(port, () => console.log("Server started at port " + port));


