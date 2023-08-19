const router=require("express").Router()
const conversationModel=require("../Models/ConversationModel")

//new conv
router.post("/",async(req,res)=>{
    try {
        const find=await conversationModel.findOne({
            members:{
                $all:[req.body.senderId,req.body.receiverId]
            }
        })
        if(!find){
            const newConversation=new conversationModel({
                members:[req.body.senderId,req.body.receiverId]
            })
            await newConversation.save()
            res.status(200).json(newConversation)
        }
        res.status(200).json(find)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

//get conv

router.get("/:userId",async(req,res)=>{
    try {
        const findConv=await conversationModel.find({
            members:{
                $in:[req.params.userId]
            }
        })
        res.status(200).json(findConv)
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/find/:firstUserId/:secondUserId",async(req,res)=>{
    try {
        const findConv=await conversationModel.findOne({
            members:{
                $all:[req.params.firstUserId,req.params.secondUserId]
            }
        })
        res.status(200).json(findConv)
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})



module.exports=router