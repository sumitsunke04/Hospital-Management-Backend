const mongoose = require("mongoose")
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')


const dotenv=require("dotenv");
dotenv.config();
  

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
  
    password:
    {
        type:String,
        required:true
    },
    Specialist:{
        type:String,
        required:true
    },
    created_at    : { type: Date, required: true, default: Date.now }
     ,
    tokens:[{
        token:{
            type:String,
            required:true
        }
        }]
    

})


doctorSchema.methods.generateAuthToken  = async function(){
    try{  // this sectete key we have to keep secrete in env file 
    
           let token =jwt.sign({_id: this._id}, process.env.JWT_PASS);
           this.tokens=this.tokens.concat({token:token});
           await this.save();
           return token
           
    }catch(err){
         console.log(err);
    }
}


doctorSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password=await bcrypt.hash(this.password,12)
    }
    next();
 })

 const Doctor=mongoose.model('DOCTOR',doctorSchema);
 module.exports=Doctor;