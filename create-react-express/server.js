const express = require("express");
const path = require("path");
const cors = require('cors');
const mongoose = require("mongoose")
const connectmongo = require('./server/config/db');
const PORT = process.env.PORT || 8001;
const app = express();
connectmongo();


// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/users', require('./server/routes/users'));
app.use('/api/task', require('./server/routes/task'));
app.use('/api/project', require('./server/routes/project'));

// Send every other request to the React app
// Define any API routes before this runs
//app.get("*", (req, res) => {
//res.sendFile(path.join(__dirname, "./client/index.html"));
//});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
