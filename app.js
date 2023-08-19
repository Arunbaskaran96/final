const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const dotenv=require("dotenv")
const cors=require("cors")
const multer=require("multer")
const path=require("path")


dotenv.config()
app.use(bodyparser.json())
app.use(cors())
app.use("/images",express.static(path.join(__dirname,"public/Images")))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})
app.post("/upload",upload.single("file"),(req,res)=>{
    try {
        res.status(200).json("uploaded successfully")
    } catch (error) {
        console.log(error)
    }
    
})


const authController=require("./Routers/auth")
const userController=require("./Routers/UserController")
const postController=require("./Routers/postControllers")
const conversationController=require("./Routers/ConversationController")
const messageController=require("./Routers/MessageControllers")

app.use("/api/auth",authController)
app.use("/api/users",userController)
app.use("/api/posts",postController)
app.use("/api/conversation",conversationController)
app.use("/api/message",messageController)



module.exports=app