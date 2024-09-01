import React from 'react'

function Message() {
  return (
    <div className='chat chat-end '>
     <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
      <img src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" } alt='chat bubble component'/>
      
      </div>
     </div>
     <div className={'chat-bubble text-white bg-blue-500'}>
      hello Khushboo
     </div>
     <time className="chat-footer opacity-70 text-xs flex gap-1 items-center">12:45</time>
    </div>
  )
}

export default Message