const express = require("express");
const app = express();
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  text: String
});

const Message = mongoose.model("Message", messageSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "myform"
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.get("/form", async (req, res) => {
  const messageData = {
    name: req.query.name,
    lastname: req.query.lastname,
    email: req.query.email,
    text: req.query.text
  };

  await Message.create(messageData);

  res.sendFile("thanks.html", { root: __dirname + "/public" });
});

app.listen(8000, () => {
  console.log("Server is connected");
  console.log("http://localhost:8000/home");
});
