import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black z-[9999] opacity-70 flex justify-center items-center'>
        <div className='w-10 h-10 border-2 border-white border-solid border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Spinner