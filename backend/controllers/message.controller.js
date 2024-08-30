import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.mongoose.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(req.params);
    console.log(req.user._id);
    
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Convert senderId and receiverId to ObjectId instances
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    // Find an existing conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderObjectId, receiverObjectId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId: senderObjectId,
      receiverId: receiverObjectId,
      message,
    });

    // Save the new message and add its ID to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    
    }
     await Promise.all([conversation.save(),newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// import mongoose from "mongoose";
// import Conversation from "../models/conversation.model.js"
// import Message from "../models/message.mongoose.js";
// export const sendMessage=async(req,res)=>{
//  try {
//   const {message}=req.body;
//   console.log(req.params)
//   console.log(req.user._id);
//   const {id:receiverId}=req.params;
//   const senderId=req.user._id;
//   //console.log(receiverId,senderId);
//   // Convert senderId and receiverId to ObjectId instances
  

//   let conversation=await Conversation.findOne({
//    participants:{$all: [senderId, receiverId]},

//   })

//   if(!conversation){
//    conversation=await Conversation.create({
//     participants:[senderId,receiverId],
//    })
//   }
//   const newMessage=new Message({
//    senderId,
//    receiverId,
//    message,
//   })

//   if(newMessage){
//    conversation.messages.push(newMessage._id)
//   }
//   res.status(201).json(newMessage);
//  } catch (error) {
//   console.log("error in send message controller",error.message)
//   res.status(500).json({error:"internal server error"})
//  }
// }