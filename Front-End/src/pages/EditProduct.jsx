import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setloading } from '../redux/loaderSlice';
import { axiosinstance } from '../apicall/axiosInstance';
import { message } from 'antd';

function EditProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[image,setimage] = useState(null)
    const[name,setname] = useState("")
    const[file,setfile] = useState(null)
    const[des,setdes] = useState("")
    const[datas,setdatas] = useState()
    console.log("edit datas",datas);
    const {id} = useParams()
    console.log("edit",id);

    const handleImage = async (e) => {
       
        setimage(null)
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
        try {
          const payload = {
            name,
            des,
          };
          dispatch(setloading(true))
          const response = await axiosinstance.put(
            `http://localhost:4000/edit/${id}`,
            payload
          );
          dispatch(setloading(false))
          //const productId = response.data.data._id;
          if (response.data.success) {
            // setname("");
            // setdes("");
            if(!file){
                navigate('/')
            }
            
          } else {
            throw new Error(response.data.message);
          }
          if (file) {
            console.log("file", file);
            try {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("id", id);
              console.log("formdata", formData);
              dispatch(setloading(true))
              const response = await axiosinstance.post(
                "http://localhost:4000/update-upload",
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
          message.error(error.message);
        }
      };

    const geteditdata = async () => {
        try {
          dispatch(setloading(true));
          const response = await axiosinstance.get(
            `http://localhost:4000/get-data/${id}`
          );
          dispatch(setloading(false));
          if (response.data.success) {
            setdatas(response.data.data);
            setname(response.data.data.name)
            setdes(response.data.data.des)
            setimage(response.data.data.image)
          }
        } catch (error) {
          dispatch(setloading(false));
          message.error(error.message);
        }
      };
      useEffect(()=>{
        geteditdata()
      },[])
  return (
    <div className="flex flex-col items-center mt-4">
      <div>
        <h1>Update blog</h1>
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
        />
      </div>
      <div className="flex flex-col p-1 w-96 md:w-[600px] mt-2">
        <input type="file" className="cursor-pointer" onChange={handleImage}/>
        {image && (
          <img src={image} alt="image" className="w-52 h-52 rounded mt-5" />
        )}
      </div>
      <div className="w-96 md:w-[600px] mt-8">
        <button
          className="px-6 py-2 cursor-pointer w-full bg-blue-500 text-white hover:opacity-90 border-none text-lg"
          
        >
          Update
        </button>
      </div>
      </form>
    </div>
  )
}

export default EditProduct