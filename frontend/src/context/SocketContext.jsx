import { createContext, useState ,useEffect, useContext} from "react";
import {  useAuthContext } from "./AuthContext";
import  io  from "socket.io-client";

export const SocketContext=createContext();

export const useSocketContext=()=>{
 return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
 const [socket,setSocket]=useState(null);
 const [onlineUsers,setOnlineUsers]=useState([])
 const {authUser}=useAuthContext();
 //console.log(authUser)
 useEffect(()=>{
  if(authUser){
   const socket=io("http://localhost:5000",{
    query:{
     userId:authUser._id,
    }
   })
   setSocket(socket)

   socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });
   //handle online users is disconnect
   socket.on('getOnlineUsers',(users)=>{
    setOnlineUsers(users);
   })
   return ()=>{socket.close()}
  }else{
   if(socket){
    socket.close()
    setSocket(null)
   }
  }
 },[authUser])
 return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}