import React from 'react'
import userConversation from '../../zustand/userConversation'

function Conversation({conversations,lastIdx,emoji}) {
  console.log(conversations,lastIdx,emoji)
  const {selectedConversation,setSelectedConversation}=userConversation();
  const isSelected=selectedConversation?._id ===conversations._id;
  return <>
  <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-sky-500":' '}`}
  onClick={()=>{setSelectedConversation(conversations)}}
  >
    <div className='avatar online'>
     <div className='w-12 rounded-full'> 
      <img src={conversations.profilePic} alt='user-avatar'/>
     </div>
    </div>
    <div className="flex flex-col flex-1">
     <div className='flex gap-3 justify-between'>
      <p className='font-bold text-gray-200'>{conversations.fullName}</p>
       <span className='text-xl'>{emoji} </span>
      
     </div>
    </div>
  </div>
  {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
  </>
}

export default Conversation