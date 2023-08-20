const router=require("express").Router()

const PostModel=require("../Models/postmodel")
const UserModel=require("../Models/UserModel")

//post 

router.post("/" ,async(req,res)=>{
    try {
        const newPost=new PostModel({
            img:req.body.img,
            desc:req.body.desc,
            userId:req.body.userId
        })
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

//update post
router.put("/:id",async(req,res)=>{
    const post=await PostModel.findById({_id:req.params.id})
    if(post.userId===req.body.userId){
        try {
            await post.updateOne({$set:req.body})
            res.status(200).json("post updated successfully")
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"something went wrong"})
        }
    }else{
        res.status(400).json("you can't edit someone's else post")
    }
})

//delete post

router.delete("/:id",async(req,res)=>{
    const post=await PostModel.findById({_id:req.params.id})
    if(post.userId===req.body.userId){
        try {
            await post.deleteOne()
            res.status(200).json("post deleted successfully")
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"something went wrong"})
        }
    }else{
        res.status(400).json("you can't delete someone's else post")
    }
})

//likes
router.put("/:id/like",async(req,res)=>{
    try{
        const post=await PostModel.findById({_id:req.params.id})
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$push:{likes:req.body.userId}})
           res.status(200).json("liked")
        }else{
           await post.updateOne({$pull:{likes:req.body.userId}}) 
           res.status(200).json("disliked")
        }
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
})

router.put("/addcomment/:postid",async(req,res)=>{
    try {
        const post=await PostModel.findById(req.params.postid)
        await post.updateOne({
            $push:{
                comments:{
                    userId:req.body.userId,
                    comment:req.body.comment
                }
            }
        })
        res.status(200).json("updated")

    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
})

//get post

router.get("/:id",async(req,res)=>{
    try{
        const post=await PostModel.findById({_id:req.params.id})
        res.status(200).json(post)
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
})

//get usre's post 

router.get("/userpost/:userId",async(req,res)=>{
    try{
        const currentuser=await UserModel.findById(req.params.userId)
        const userposts=await PostModel.find({userId:req.params.userId})
        res.status(200).json(userposts)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

//get friends

router.get("/friends/:userId",async(req,res)=>{
    try{
        const user=await UserModel.findById(req.params.userId)
        const friends=await Promise.all(
            user.followings.map((friendId)=>{
                return UserModel.findById(friendId)
            })
        )
        let fList=[]
        friends.map(friend=>{
            const {username,profilePicture,_id}=friend
            fList.push({username,profilePicture,_id})
        })
        res.status(200).json(fList)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

//timeline

router.get("/timeline/:userId",async(req,res)=>{
    try{
        const currentuser=await UserModel.findById(req.params.userId)
        const userposts=await PostModel.find({userId:currentuser._id})
        const friendspost=await Promise.all(
            currentuser.followings.map((friendId)=>{
                return PostModel.find({userId:friendId})
            })
        )
        res.status(200).json(userposts.concat(...friendspost))
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})
module.exports=router