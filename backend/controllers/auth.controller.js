import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateWebTokenAndCookie from "../utils/generateToken.js";

export const signupUser=async(req,res)=>{
try{
  const{fullname,username,password,confirmedPassword,gender} =req.body;
  if(password !== confirmedPassword){
    return res.status(400).json({error:"password does not match!"})
  }

  const user=await User.findOne({username})
  if(user){
    return res.status(400).json({error:"user already exist....."})
  }
  //HASH PASSWORD HERE
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  //https://avatar.iran.liara.run/public
  const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
  const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
  const newUser=new User({
    fullname,
    username,
    password:hashedPassword,
    gender,
    profilePic:gender==="male"?boyProfilePic :girlProfilePic
  })

  if(newUser){
   generateWebTokenAndCookie(newUser._id,res);
  await newUser.save();
  res.status(201).json({
    _id:newUser._id,
    fullname:newUser.fullname,
    username:newUser.username,
    profilePic:newUser.profilePic
  })}else{
    res.status(400).json({error:"Invalid userData"})
  }
}catch(error){
  console.log("error in signup controller",error.message)
 res.status(500).json({error:"internal server error"})
}
}
export const loginUser=async(req,res)=>{
 try {
  const{username,password}=req.body;
  const user=await User.findOne({username});
  const isPasswordCorrect=await bcrypt.compare(password,user?.password||"")
  if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"invalid credential"})
  }
  generateWebTokenAndCookie(user._id,res)

  res.status(200).json({
    _id:user._id,
    fullname:user.fullname,
    username:user.username,
    profilePic:user.profilePic
  });
 } catch (error) {
  console.log("error in login controller",error.message)
 res.status(500).json({error:"internal server error"})
 }
}
export const logoutUser=(req,res)=>{
try {
  res.cookie("jwt","",{maxAge:0})
  res.status(500).json({message:"Logged out Successfully"})
} catch (error) {
  console.log("error in logout controller",error.message)
  res.status(500).json({error:"internal server error"})
}
}