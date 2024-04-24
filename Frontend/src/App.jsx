import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import DashBoard from './pages/DashBoard';
import SendMoney from './pages/SendMoney';
import Success from "./pages/Success"
import SignUp from './pages/SignUP';
import SignIn from './pages/SignIn';


function App() {


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/success" element={<Success />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
