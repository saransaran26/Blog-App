import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setloading } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';


const rules = [
    {
        required:true,
        message:'requried'
    }
]
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onfinish = async(values) => {
        
        try {
            dispatch(setloading(true))
            const response = await axios.post('http://localhost:4000/user/login',values)
            //console.log(response.data.success);
            dispatch(setloading(false))
            if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem('token',response.data.data)
                window.location.href = '/'
                //navigate('/')
            }
            else{
               throw new Error(response.data.message)
            }
        } catch (error) {
            dispatch(setloading(false))
            message.error(error.message)
        }

    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/')
        }
    },[])
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-96 p-2 bg-slate-200'>
            <h1 className='text-center font-medium text-2xl'>Login</h1>
            <Form layout='vertical' onFinish={onfinish}>
                <Form.Item label="Email" name='email' rules={rules}>
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name='password' rules={rules}>
                    <Input placeholder='password' type='password'/>
                </Form.Item>
                <Button type='primary' block htmlType='submit' className='my-2'>
                    Login
                </Button>
            </Form>
            <div className='mt-4'>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login