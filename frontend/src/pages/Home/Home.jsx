import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'

function Home() {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-grey-400 bg-clip-padding backdrop:filter backdrop-blur bg-opacity-0'>
      <Sidebar/>
      {/*<MessageContainer/>*/}
    </div>
  )
}

export default Home