const mongoose=require("mongoose")
const validator=require("validator")

const userschmea=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            minlength:3
        },
        email:
        {
            type:String,
            required:true, 
            validate(value)
            {
                if(!validator.isEmail(value))
                {
                    throw new error("invalid email")
                }
            }
        },
        phone:
        {
            type:String, 
            required:true, 
            min:10
        },
        message:
        {
            type:String, 
            required:true, 
            min:3
        },
        date:
        {
            type:Date ,
            default:Date.now
        }
    }
)
//creating a colletion 
const User=mongoose.model("User",userschmea)
module.exports=User
