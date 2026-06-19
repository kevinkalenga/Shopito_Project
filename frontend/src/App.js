import {useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch} from "react-redux";
import axios from 'axios'
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";


const App = () => {
   const dispatch = useDispatch();
  axios.defaults.withCredentials = true

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])
  
  return (
    <>
        <BrowserRouter>
            <ToastContainer />
            <Header />
           
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                 <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default App