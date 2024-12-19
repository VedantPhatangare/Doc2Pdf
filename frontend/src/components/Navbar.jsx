import React from 'react'

function Navbar() {
  return (
    <div className='md:px-40 px-6 shadow-lg h-[10%] bg-slate-800 text-gray-300 w-full'>
      <div className='mx-auto flex justify-between items-center h-full w-[80%]'>
        <h1 className='font-bold text-2xl cursor-pointer'>Word<span className='text-3xl text-green-500'>To</span>Pdf</h1>
        <h1 className='font-bold text-2xl cursor-pointer hover:scale-110 duration-300'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
