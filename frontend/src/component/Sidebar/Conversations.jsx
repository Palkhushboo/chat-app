import React from 'react'
import Conversation from './Conversation'

import useGetConversation from '../../hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emoji';


function Conversations() {
 const {loading,conversation}= useGetConversation();
 //console.log("conversation",conversation)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
     {conversation.map((conversations,idx)=>(
      <Conversation key={conversations._id}
       conversations={conversations} 
       emoji={getRandomEmoji()}
       lastIdx={idx === conversation.length-1}
       />))}

      {loading? <span className='loading loading-spinner mx-auto'></span>:null}
    </div>
  )
}

export default Conversations