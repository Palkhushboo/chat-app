import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login page/Login'
import SignUp from './pages/sign Up page/SignUp'
import { Route,Routes } from 'react-router-dom';

function App() {
  
  return (
    <>
     <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
     </Routes>
     </div>
   
    </>
  )
}

export default App
