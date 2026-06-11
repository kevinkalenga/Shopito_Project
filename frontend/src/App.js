import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Spinner } from './components/loader/Loader'
// import Loader from './components/loader/Loader'


const App = () => {
  return (
    <>
        <BrowserRouter>
            
            <Header />
            <Spinner />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default App