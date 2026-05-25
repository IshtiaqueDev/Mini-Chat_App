const mongoose=require("mongoose");
const Chat=require("./models/chat.js");


main().then(()=>{
    console.log("Connection Formed!");
}).catch((err)=>{
    console.log("Error !");


})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

// Chat.insertMany([
//     {
//    from:"rohit",
//     to:"mohit",
//     msg:"teach me js callbacks!",
//     created_at:new Date()
//     },
//     {
//     from:"neha",
//     to:"Priya",
//     msg:"send me your exam notes"
//     },{
//     from:"amit",
//     to:"sumit",
//     msg:"All the best!",
//     created_at:new Date()
//     },{
//     from:"anita",
//     to:"ramesh",
//     msg:"bring me some fruits!",
//     created_at:new Date()
//     },{
//     from:"tony",
//     to:"Priya",
//     msg:"love you 3000 ",
//     created_at:new Date()
//     }
// ])

// Chat.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


Chat.findByIdAndDelete('6a14210758336a5338fbfdbe').then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})