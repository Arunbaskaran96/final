const router=require("express").Router()
const MessageModel=require("../Models/MessageModels")

//new message

router.post("/newMessage",async(req,res)=>{
    try {
        const newMessage=new MessageModel({
            senderId:req.body.senderId,
            message:req.body.message,
            conversationId:req.body.conversationId
        })
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

//get message

router.get("/:conversationId",async(req,res)=>{
    try {
        const findMessage=await MessageModel.find({conversationId:req.params.conversationId})
        res.status(200).json(findMessage)
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})

module.exports=router