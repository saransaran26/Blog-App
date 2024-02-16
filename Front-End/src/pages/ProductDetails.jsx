import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setloading } from "../redux/loaderSlice";
import axios from "axios";
import { message } from "antd";
import { axiosinstance } from "../apicall/axiosInstance";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ProductDetails() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [datas, setdatas] = useState([]);
  console.log("datas", datas);
  const { id } = useParams();
  const getspecficdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await axiosinstance.get(
        `https://create-blog-app-rvsw.onrender.com/get-data/${id}`
      );
      // console.log("res",response.data.data);
      dispatch(setloading(false));
      if (response.data.success) {
        setdatas(response.data.data);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  const handleDelete = async() =>{
    try {
      dispatch(setloading(true))
      const response = await axiosinstance.delete(`https://create-blog-app-rvsw.onrender.com/delete/${id}`)
      dispatch(setloading(false))
      if(response.data.success){
        message.success(response.data.message)
        navigate('/')
      }
    } catch (error) {
      dispatch(setloading(false))
      message.error(error.message)
    }
  }
  useEffect(() => {
    getspecficdata();
  }, []);
  return (
    <>
      {datas && datas.user && (
        <div className="px-4 md:px-40 mt-6">
          <div className="flex justify-between items-center">
            <h1>{datas.name}</h1>
            {datas.user._id == user._id && (
              <div className="space-x-4 flex justify-center items-center">
                <div class="relative group">
                  <FaRegEdit className="text-2xl cursor-pointer" onClick={()=>navigate(`/edit/${id}`)}/>
                  <div class="absolute -top-11 -left-8 hidden group-hover:block px-4 py-2 mt-2 text-xl text-green-900 ">
                    Edit
                  </div>
                </div>{" "}
                {/* transform -translate-x-1/2 */}
                <div class="relative group">
                  <MdDelete className="text-2xl cursor-pointer" onClick={handleDelete}/>
                  <div class="absolute -top-11 -left-8 hidden group-hover:block px-4 py-2 mt-2 text-xl text-red-900 ">
                    Delete
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between my-5">
            <p>Created By : {datas.user.name}</p>
            <p>
              Created At :{" "}
              {moment(datas.createdAt).format("DD-MM-YYYY hh:mm A")}
            </p>
          </div>
          <div className="">
            <p className="text-xl">Description : {datas.des}</p>
          </div>
          <div className="mt-5">
            <img src={datas.image} alt="" className="w-full object-cover" />
          </div>
          
        </div>
      )}
    </>
  );
}

export default ProductDetails;
