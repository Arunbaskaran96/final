const router=require("express").Router()

const UserModel=require("../Models/UserModel")
const bcryt=require("bcrypt")

router.post("/register",async(req,res)=>{
    try {
        const usercheck=await UserModel.findOne({email:req.body.email})
        const salt=await bcryt.genSalt(10)
        const hash=await bcryt.hash(req.body.password,salt)
        req.body.password=hash
        if(!usercheck){
            const newUser=new UserModel(req.body)
            await newUser.save()
            res.status(200).json({message:"User Added"})
        }else{
            res.status(400).json({message:"User Already Exists"}) 
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
})


//login

router.post("/login",async(req,res)=>{
    try {
        const findUser=await UserModel.findOne({email:req.body.email})
        if(findUser){
            const compare=await bcryt.compare(req.body.password,findUser.password)
            if(compare){
                res.status(200).json(findUser)
            }else{
                console.log("error")
                res.status(400).json({message:"Incorrect Username/password"})
            }
        }else{
            console.log("error")
            res.status(400).json({message:"User doesn't exists"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
})




module.exports=router