import React from 'react'

const InputBox = ({placeholder,onChange}) => {
  return (
    <div>
        <input onChange={onChange} className="p-3 m-2 w-[350px] bg-gray-800 shadow-lg text-white placeholder-white placeholder-opacity-50 rounded-lg flex justify-center items-center hover:bg-gray-700 border-slate-950 border-2 focus:outline-none " type="text" placeholder={placeholder} />
    </div>
  )
}

export default InputBox