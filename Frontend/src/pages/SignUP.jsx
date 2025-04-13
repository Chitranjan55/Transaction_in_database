import React, { useState } from 'react'
import Heading from '../components/Heading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='w-screen h-screen bg-green-300'>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='flex justify-center items-center flex-col w-[500px] h-[600px] bg-green-100 rounded-lg shadow-lg'>
          <Heading heading="SIGN UP" />
          <InputBox onChange={(e) =>
            setEmail(e.target.value)} placeholder="Email" />
          <InputBox onChange={(e) =>
            setFirstName(e.target.value)} placeholder="First Name" />
          <InputBox onChange={(e) =>
            setLastName(e.target.value)} placeholder="Last Name" />
          <InputBox onChange={(e) =>
            setPassword(e.target.value)} placeholder="Password" />
          <Button onClick={async (e) => {
            let response = await axios.post("http://54.166.40.97:3000/api/v1/users/signup", {
              username: email,
              firstName: firstName,
              lastName: lastName,
              password: password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }} text="SIGN UP" />
          <div>
            Already a user ? <a href='http://54.85.251.3:5173/signin' className='text-blue-500'>Sign in</a>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUp;