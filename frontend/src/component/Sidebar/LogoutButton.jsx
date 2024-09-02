
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';
function LogoutButton() {

  const {loading,logOut}=useLogout()
  return (
    <div className='mt-auto'>
      {!loading?(<RiLogoutBoxLine className='w-6 h-6 text-white cursor-pointer' onClick={logOut} />):(<span className='loading loading-spinner'></span>)}
     
      </div>
  )
}

export default LogoutButton