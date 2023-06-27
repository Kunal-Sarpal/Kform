const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
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

app.get("/home", (req, res) => {
  fs.readFile("index.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/form", async (req, res) => {
  const messageData = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    text: req.body.text
  };

  await Message.create(messageData);

  fs.readFile("thanks.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(8000, () => {
  console.log("Server is connected");
  console.log("http://localhost:8000/home");
});
