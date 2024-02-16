import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../apicall/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../redux/userSlice";
import { message } from "antd";
import { FaRegUserCircle } from "react-icons/fa";

function Protected({ children }) {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  //console.log("user",user);
  const verifyuser = async () => {
    try {
      const response = await axiosinstance.get(
        "http://localhost:4000/user/get-current-user"
      );
      console.log("first", response.data);
      if (response.data.success) {
        dispatch(adduser(response.data.data));
      } else {
        navigate("/login");
        
      }
    } catch (error) {
      navigate("/login");
      
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      verifyuser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user && (
        <div>
          <div className="w-full h-16 bg-black text-white flex items-center justify-between px-9">
            <div>
              <h2 className="cursor-pointer" onClick={()=>{
                navigate('/')
                // setshow(!show)
              }}>Blog App</h2>
            </div>
            <div className="flex space-x-8 items-center">
              <p className="text-xl cursor-pointer" onClick={()=>navigate('/about')}>About</p>
              <div className="flex items-center">
                <FaRegUserCircle
                  className="text-4xl cursor-pointer"
                  onClick={() => setshow(!show)}
                />
              </div>
            </div>
          </div>
          {show && (
            <div className="absolute right-6 top-16 bg-slate-300 p-3 rounded text-lg">
              <p
                className="cursor-pointer"
                onClick={() => {
                  navigate("/add");
                  setshow(!show);
                }}
              >
                Add Blog
              </p>
              <p className="mt-2 cursor-pointer" onClick={()=>{
                navigate(`/profile/${user._id}`)
                setshow(!show)
              }}>Profile</p>
              <p
                className="mt-2 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </p>
            </div>
          )}

          <p>{children}</p>
        </div>
      )}
      {/* <div className='w-full h-16 bg-slate-300 flex items-center justify-between px-9'>
        <div>
            <h2>Sample</h2>
        </div>
        <div className='flex space-x-8 '>
            
            <p className="cursor-pointer">Add product</p>
            <p className="cursor-pointer ">Logout</p>
            <p className="cursor-pointer ">username</p>
        </div>
       
    </div>
    <p>{children}</p> */}
    </>
  );
}

export default Protected;
