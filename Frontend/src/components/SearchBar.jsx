import React from 'react'

const SearchBar = ({onChange}) => {
  return (
    <div className='flex justify-center items-center m-10 p-5'>
        <input onChange={onChange} className="p-2 rounded-lg w-[1000px] bg-gray-800 text-white hover:placeholder-text-white transition ease-in-out hover:-translate-y-1 hover:scale-200 hover:bg-gray-900 duration-300 ..." type="text" placeholder="Search Users...." />
    </div>
  )
}

export default SearchBar