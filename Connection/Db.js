const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:final@cluster0.mqittpz.mongodb.net/",{useNewUrlParser: true,useUnifiedTopology : true}).then(result=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})