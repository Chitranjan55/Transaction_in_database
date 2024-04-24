import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='p-3 m-8 rounded-lg bg-blue-500 text-white w-[330px] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...'>{text}</button>
  );
}

export default Button;
