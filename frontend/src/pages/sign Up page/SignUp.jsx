import React from 'react'
import GenderCheckBox from './GenderCheckBox'
import {Link} from 'react-router-dom'
import  { useState } from 'react';

function SignUp() {
  const [inputs,setInputs]=useState({
    fullname:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:'',
  })

  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs)
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className='text-3xl font-semibold text-center'>Sign Up <span className='text-blue-500'>Chat-App</span></h1>

      <form onSubmit={handleSubmit}>
        <div >
        <label className='label'><span className='text-base label-text'>Full Name</span></label>
        <input
        type="text" 
        placeholder='John deo'
        className='w-full  input input-bordered h-10' 
        value={inputs.fullname}
        onChange={(e)=>setInputs({...inputs,fullname:e.target.value})}/>
        </div>

        <div>
        <label className='label'>
          <span className='text-base label-text'>Password</span>
        </label>
        <input type="password"
         placeholder='Enter password'
         className='w-full  input input-bordered h-10'
         value={inputs.password} 
         onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
         </div>

        <div>
        <label className='label'><span className='text-base label-text'>Confirm password</span></label>
        <input
         type="password" 
         placeholder='Confirmed password'
         className='w-full  input input-bordered h-10'
         value={inputs.confirmPassword}
         onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}/>
        
        </div>

        <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectGender={inputs.gender}/>
        <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
          Already have an account?
        </Link>
        <div>
        <button className='btn btn-block btn-sm mt-2 '>SignUp</button>
       </div>

      </form>
      </div>

    </div>
  )
}

export default SignUp