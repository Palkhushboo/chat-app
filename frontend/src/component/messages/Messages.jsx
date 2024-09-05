import React, { useEffect ,useRef} from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton'
function Messages() {
  const {messages,loading}= useGetMessages()
  const lastMessageRef=useRef()

  useEffect(()=>{
    if(lastMessageRef.current){
      setTimeout(()=>{
        lastMessageRef.current.scrollIntoView({behavior:"smooth"})
       },100)
    }
   
  },[messages])
  console.log(`messages:${JSON.stringify(messages, null, 2)}`)
  return (
    <div className='px-4 flex-1 overflow-auto'> 
     {!loading && 
     messages.length > 0 && 
     messages.map((message)=>(
     <div key={message._id}
     ref={lastMessageRef}
     >
      <Message message={message}/>

     </div>))}


     {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
     
     {!loading && messages.length === 0 && (
      <p className='text-center'> 
      Send a message to start the conversation</p>
     )}
    </div>
  )
}

export default Messages