import {useState} from 'react'
import toast from 'react-hot-toast';

const useSignUp=()=>{
  const [loading,setLoading]=useState(false);
  const signup=async({fullName,username,password,confirmPassword,gender})=>{
    const success=handleInputErrors({fullName,username,password,confirmPassword,gender});
    if(!success) return;
    setLoading(true)
    try {
      //console.log(fullName, username, password, confirmPassword, gender )
      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({fullName,username,password,confirmPassword,gender})
        
      })

      const data=await res.json();
      console.log(data)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
  return {loading,signup}
}

export default useSignUp

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
  //console.log(fullName, password,gender)
  if(!fullName||!username||!password||!confirmPassword||!gender){
    toast.error('Please fill in all fields')
    return false;
  }
  if(password!==confirmPassword){
    toast.error('Password do not match')
    return false;
  }
  if(password.length<6){
    toast.error('Password must be at least 6 character')
    return false;
  }
  return true;
}