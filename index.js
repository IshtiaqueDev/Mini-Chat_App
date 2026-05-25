const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride = require("method-override");
const app=express();
const port=8080;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection Formed!");
}).catch((err)=>{
    console.log("Error !");


})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}



app.listen(port,()=>{
    console.log("Server is Running...");
})

app.get("/",(req,res)=>{
    res.send("Root is Working!"); 
})


//Index Route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
})

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("form.ejs");
})


//Create Route
app.post("/chats",(req,res)=>{
    let {Sender,Reciever,message}=req.body;
    let newChat=new Chat({
        from:Sender,
        to:Reciever,
        msg:message,
        created_at:new Date()
    })

    newChat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats")
})


//Edit Route
app.get("/chats/:id/edit",async(req,res)=>{
    let id=req.params.id;
    let user= await Chat.findById(id);
    console.log(user);
    res.render("edit.ejs",{user});
})


//Update Route
app.put("/chats/:id",async(req,res)=>{
    let id=req.params.id;
    let newMsg=req.body.msg;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    // console.log(updatedChat);
    res.redirect("/chats");
})




// Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let id=req.params.id;
    await Chat.findByIdAndDelete(id); 
    res.redirect("/chats");
})