const express=require("express")
const router=express.Router()

const UserModel=require("../Models/UserModel")
const bcryt=require("bcrypt")

//update

router.put("/:id",async(req,res)=>{

        if(req.body.userId==req.params.id || isAdmin){
            if(req.body.password){
                try {
                    const salt=await bcryt.genSalt(10)
                    const hash=await bcryt.hash(req.body.password,salt)
                    req.body.password=hash
                } catch (error) {
                    res.status(500).json("error")
                }
            }
            try {
                const user=await UserModel.findByIdAndUpdate({_id:req.params.id},{
                    $set:req.body
                })
                res.status(200).json({message:"updated successfully"})
            } catch (error) {
                res.status(500).json({message:"something went wrong"})
            }
        }else{
            return res.status(400).json("you can only update ypur account")
        }

})

//delete

router.delete("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id || isAdmin){

        try {
            const user=await UserModel.findByIdAndDelete({_id:req.params.id})
            res.status(200).json({message:"Deleted successfully"})
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    }else{
        return res.status(400).json("you can only update ypur account")
    }
})
//find a user


router.get("/:id",async(req,res)=>{
    try {
        const user=await UserModel.findById({_id:req.params.id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//follow a user

router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !==req.params.id){
        try {
            const user=await UserModel.findById({_id:req.params.id})
            const currentUser=await UserModel.findById({_id:req.body.userId})
            if(!user.followers.includes(req.body.userId )){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("you are following")
            }else{
                res.status(400).json("you can't follow yourself")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(400).json("you can't follow yourself")
    }
})

//unfollow

router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !==req.params.id){
        try {
            const user=await UserModel.findById({_id:req.params.id})
            const currentUser=await UserModel.findById({_id:req.body.userId})
            if(user.followers.includes(req.body.userId )){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("you are unfollowed this user")
            }else{
                res.status(400).json("something went wrong")
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(400).json("you can't unfollow yourself")
    }
})

//get users

router.get("/getusers/:userId",async(req,res)=>{
    try{
        const users=await UserModel.find({
            _id:{
                $ne:req.params.userId
            }
        })
        res.status(200).json(users)
    }catch(err){
        res.status(500).json("something went wrong")
    }
})

//get follwing users

router.get("/getfollowing/:id",async(req,res)=>{
    try {
        const currentUser=await UserModel.findById(req.params.id)

    } catch (error) {
        res.status(500).json("something went wrong")
    }
})

module.exports=router





