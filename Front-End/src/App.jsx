import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Protected from './components/Protected'
import Addproduct from './pages/Addproduct'
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import EditProduct from './pages/EditProduct'
import About from './pages/About'

function App() {
  
  const {loading} = useSelector((state)=>state.loaders)
  return (
   <>
   {loading&&<Spinner/>}
   <BrowserRouter>
   <Routes>
    <Route path='/login' element={<Login/>}></Route> 
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/' element={<Protected><Home/></Protected>}></Route>
    <Route path='/add' element={<Protected><Addproduct/></Protected>}></Route>
    <Route path='/about' element={<Protected><About/></Protected>}></Route>
    <Route path='/profile/:id' element={<Protected><Profile/></Protected>}></Route>
    <Route path='/edit/:id' element={<Protected><EditProduct/></Protected>}></Route>
    <Route path='/product/:id' element={<Protected><ProductDetails/></Protected>}></Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
