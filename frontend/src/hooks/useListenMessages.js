import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext'
import userConversation from '../zustand/userConversation'
import notificationSound from '../assets/sounds/notification.mp3'

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
   const sound=new Audio(notificationSound);
   sound.play()
   setMessages( [...messages, newMessage]);
 };

 socket?.on('newMessage', handleNewMessage); // Attach event listener

 // Clean up listener when component unmounts or when socket changes
 return () => {
   socket?.off('newMessage'); // Remove event listener
   console.log('Event listener removed');
 };
}, [socket, setMessages,messages]);
}
export default useListenMessages;