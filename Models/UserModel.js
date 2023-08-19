const mongoose=require("mongoose")

const UserModel=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
    },
    from:{
        type:String,
    },
    realtionship:{
        type:String
    }
},
{timestamps:true}
)


module.exports=mongoose.model("user",UserModel)