import React, { useState } from 'react'
import Heading from '../components/Heading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='w-screen h-screen bg-green-300'>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='flex justify-center items-center flex-col w-[500px] h-[600px] bg-green-100 rounded-lg shadow-lg'>
          <Heading heading="SIGN IN" />
          <InputBox onChange={(e) =>
            setEmail(e.target.value)} placeholder="Email" />
          <InputBox onChange={(e) =>
            setPassword(e.target.value)} placeholder="Password" />
          <Button onClick={async(e)=>{
              let response = await axios.post("http://54.166.40.97:3000/api/v1/users/signin",{
                username: email,
                password: password
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");

          }} text="SIGN IN"  />
          <div>
            New user ? <a href='http://localhost:5173/signup' className='text-blue-500'>Sign up</a>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignIn