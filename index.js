const express = require("express");
const { connect } = require("http2");
const app = express();
const path = require("path");
const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
    {
        name: String,
        lastname: String,
        email:String,
        text:String
    }
)
const Message = mongoose.model("Message",messageSchema);

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"myform"
}
).then(()=>
{
    console.log("connected to database");
}).catch((err)=>
{
    console.log(err);
})

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.get("/home",(req,res)=>
{
    res.render("index.ejs")
})
app.get("/thanks",(req,res)=>
{
    res.render("thanks.ejs")
})
app.post("/form", async (req,res)=>
{
    const messageData =   {
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        text:req.body.text
    }

    await Message.create(messageData)

      res.redirect("/thanks")

})



app.listen(8000,()=>
{
    console.log("Server is Connected")
    console.log("http://localhost:8000/home")
})