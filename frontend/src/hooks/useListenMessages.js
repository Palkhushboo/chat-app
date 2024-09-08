import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext'
import userConversation from '../zustand/userConversation'

const useListenMessages=()=>{
 const {socket}=useSocketContext()
 // const {messages,setMessages}=userConversation();
 const { messages, setMessages } = userConversation((state) => ({
  messages: state.messages,
  setMessages: state.setMessages,
}));
 useEffect(()=>{
  if (!socket) {
   console.error('Socket is not initialized');
   return;
  }
  console.log('Socket is initialized:', socket);

  const handleNewMessage = (newMessage) => {
   console.log('Received new message:', newMessage);
   setMessages((prevMessages) => [...prevMessages, newMessage]);
 };

 socket.on('newMessage', handleNewMessage); // Attach event listener

 // Clean up listener when component unmounts or when socket changes
 return () => {
   socket.off('newMessage', handleNewMessage); // Remove event listener
   console.log('Event listener removed');
 };
}, [socket, setMessages]);
}
export default useListenMessages;