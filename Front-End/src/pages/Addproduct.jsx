import React, { useState } from "react";
import { axiosinstance } from "../apicall/axiosInstance";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setloading } from "../redux/loaderSlice";

function Addproduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [file, setfile] = useState(null);
  console.log("file",file);
  const { user } = useSelector((state) => state.users);
  const [name, setname] = useState("");
  const [des, setdes] = useState("");
  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];

    setfile(selectedFile);
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setimage(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const submitdata = async (e) => {
    e.preventDefault()
    if(file){
      try {
        const payload = {
          user: user._id,
          name,
          des,
        };
        dispatch(setloading(true))
        console.log("before");
        const response = await axiosinstance.post(
          "http://localhost:4000/postdata",
          payload
        );
        console.log("create",response.data);
        dispatch(setloading(false))
        const productId = response.data.data._id;
        console.log("productId",productId);
        if (response.data.success) {
          console.log("success created");
        } else {
          throw new Error(response.data.message);
        }
        if (file) {
          console.log("file1", file);
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("productId", productId);
            console.log("formdata", formData);
            dispatch(setloading(true))
            const response = await axiosinstance.post(
              "http://localhost:4000/upload",
              formData
            );
            dispatch(setloading(false))
            if (response.data.success) {
              message.success(response.data.message)
              navigate("/");
              setfile(null);
              console.log("success upload image");
            }
          } catch (error) {
            dispatch(setloading(false))
             message.error(error.message);
          }
        }
      } catch (error) {
        dispatch(setloading(false))
        // message.error(error.message);
      }
    }
     
    
  };
  return (
    <div className="flex flex-col items-center mt-4">
      <div>
        <h1>Create new blog</h1>
      </div>
      <form action="" onSubmit={submitdata}>
      <div className="flex flex-col mt-6 p-1 w-96 md:w-[600px]">
        <label htmlFor="" className="text-2xl">
          Title :
        </label>
        <input
          type="text"
          placeholder="Enter title"
          className="px-4 py-2 mt-2"
          onChange={(e) => setname(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className="flex flex-col p-1 w-96 md:w-[600px]">
        <label htmlFor="" className="text-2xl">
          Description :
        </label>
        <textarea
          type="text"
          rows={8}
          placeholder="Enter your description"
          className="px-4 py-2 mt-2"
          onChange={(e) => setdes(e.target.value)}
          value={des}
          required
        />
      </div>
      <div className="flex flex-col p-1 w-96 md:w-[600px] mt-2">
        <input type="file" onChange={handleImage} className="cursor-pointer" required/>
        {image && (
          <img src={image} alt="image" className="w-52 h-52 rounded mt-5" />
        )}
      </div>
      <div className="w-96 md:w-[600px] mt-8">
        <button type="submit"
          className="px-6 py-2 cursor-pointer w-full bg-blue-500 text-white hover:opacity-90 border-none text-lg"
          // onClick={submitdata}
        >
          Create
        </button>
      </div>
      </form>
    </div>
  );
}

export default Addproduct;
