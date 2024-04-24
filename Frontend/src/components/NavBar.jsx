import React from 'react';
import paymentMethodsSVG from '../assets/payment-methods-svgrepo-com.svg'; // Import SVG file

const NavBar = ({username,balance}) => {
    return (
        <div className='flex justify-center items-center w-screen p-3 shadow-lg'>   
            <div className='flex justify-around bg-transparent w-[100%] items-center mx-20'>
                <img className="h-[10vh]" src={paymentMethodsSVG} alt="Payment Methods" />
                    <h1 className='w-1/2 bg-inherit text-black flex justify-center font-medium pr-6 text-xl'>BALANCE: ₹ {balance}</h1>
                    <label className='flex justify-center ml-10 items-center text-black'>
                        {username}
                        <div className='rounded-full w-[50px] h-[50px] bg-black m-4 flex justify-center items-center text-white'>{username[0]}</div>
                    </label>
            </div>
        </div>
    );
}


export default NavBar;
