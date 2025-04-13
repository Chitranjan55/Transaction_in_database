import React from 'react'
import Heading from '../components/Heading'
import Button from '../components/Button'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SendMoney = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const[amount, setAmount] = React.useState('');
  return (
    <div className='flex justify-center items-center bg-gradient-to-t from-green-900 to-stone-50 w-screen h-screen'>
        <div className='flex flex-col justify-center items-center bg-stone-100 w-[40%] h-[60%]'>
            <Heading heading="SEND MONEY"/>
            <div className='flex items-center p-10'>
                <div className='rounded-full w-[30px] h-[30px] bg-black m-2 flex justify-center items-center text-white'>{searchParams.get("firstName")[0]}</div>
                <label className='m-2'>{searchParams.get("firstName")}</label>
                <input onChange={(e)=>{
                    setAmount(e.target.value);
                }} className='bg-green-200 shadow-xl border-3 p-1 flex justify-center items-center text-center' type="text" />
            </div>
            <Button onClick={async(e)=>{
                try {
                    let res = await axios.post("http://54.85.251.3:3000/api/v1/amount/sendmoney",{
                        to: searchParams.get("to"),
                        amount: amount
                    },{
                        headers:{
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    navigate("/success");
                } catch (error) {
                    console.log("error while transferring"+error);
                }
            }}text="SEND"/>
            

        </div>
        
    </div>
  )
}

export default SendMoney