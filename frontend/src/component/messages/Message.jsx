import React from 'react';
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/userConversation'
import { extractTime } from '../../utils/extractTime';

function Message({message}) {
  const {authUser}=useAuthContext();
  //console.log("govinda",authUser.fullName)
  const {selectedConversation}=useConversation();
  //console.log(message.senderId)
  const fromMe=message.senderId === authUser._id;
  //console.log("debugg",selectedConversation.profilePic)
  const formattedTime=extractTime(message.createdAt)
  const chatClassName=fromMe? 'chat-end':'chat-start';
  const profilePic=fromMe?authUser.profilePic:selectedConversation?.profilePic;
  //console.log(`profilePic33 ${profilePic}`)
  const bubbleBgColor=fromMe?'bg-blue-700':" ";
  //console.log(`color`,bubbleBgColor)


  return (
    <div className={`chat ${chatClassName} `}>
     <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
      <img src={profilePic} alt='chat bubble component'/>
      
      </div>
     </div>
     <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor} pb-2`}>
      {message.message}
     </div>
     <time className="chat-footer opacity-70 text-xs flex gap-1 items-center">{formattedTime}</time>
    </div>
  )
}

export default Message;