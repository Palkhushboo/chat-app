import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login page/Login'
import SignUp from './pages/sign Up page/SignUp'
import { Route,Routes ,Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser}=useAuthContext();
  return (
    <>
     <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to={"/login"}/>}/>
      <Route path='/login' element={authUser?<Navigate to="/"/>:<Login/>}/>
      <Route path='/signUp' element={authUser? <Navigate to='/'/>: <SignUp/>}/>
     </Routes>
     <Toaster/>
     </div>
   
    </>
  )
}

export default App
