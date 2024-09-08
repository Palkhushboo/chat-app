import React, { useEffect, useState } from 'react'
import userConversation from '../zustand/userConversation';
import toast from 'react-hot-toast'
const useGetMessages=()=>{
 const [loading,setLoading]=useState(false);
 const {messages,setMessages,selectedConversation} =userConversation()
 //console.log(messages)


useEffect(()=>{
 const getMessages=async()=>{
  if (!selectedConversation?._id) return;
  setLoading(true)
  try {
   const res=await fetch(`/api/messages/${selectedConversation._id}`)
   const data=await res.json()

   console.log('API Response:', data); 
   
   if(data.error) throw new Error(data.error)
    // setMessages(data);
   setMessages(Array.isArray(data) ? data : []);

  } catch (error) {
   toast.error(error.message)
  }finally{
   setLoading(false)
  }
 }
 if(selectedConversation?._id) getMessages()
},[selectedConversation?._id,setMessages])
//console.log(messages)
 return {messages:messages||[],loading}
}
export default useGetMessages