import React from 'react'

const Person = ({firstName,lastname,onClick}) => {
    return (
        <div className='flex items-center bg-white m-2 rounded-full h-[55px] shadow-xl p-10'>
            <div className='rounded-full w-[30px] h-[30px] bg-black m-4 flex justify-center items-center text-white'>{firstName[0]}</div>
            <h1>{firstName} {lastname}</h1>
            <button onClick={onClick} className='ml-auto mr-4 bg-black border-2 p-4 text-white border-white shadow-2xl text-sm font-medium rounded-full transition ease-in-out hover:-translate-z-1 hover:scale-90 duration-200 ...'>SEND MONEY</button>
        </div>
    )
}

export default Person