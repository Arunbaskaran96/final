const mongoose=require("mongoose")

const PostModel=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
)


module.exports=mongoose.model("post",PostModel)