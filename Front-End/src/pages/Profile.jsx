import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setloading } from "../redux/loaderSlice";
import { axiosinstance } from "../apicall/axiosInstance";
import { message } from "antd";
import moment from "moment";

function Profile() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [datas, setdatas] = useState();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getuserdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await axiosinstance.get(
        "http://localhost:4000/get-user-data"
      );
      dispatch(setloading(false));
      console.log("for profile", response.data.data);
      if (response.data.success) {
        setdatas(response.data.data);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <>
      <div className="px-4 md:px-[200px] flex-col-reverse flex md:flex-row">
        <div className="md:w-[70%] w-full">
          {datas && datas.length > 0 ? (
            datas.map((data) => (
              <div className="flex my-5 bg-slate-200 cursor-pointer" key={data._id}
              onClick={() => navigate(`/product/${data._id}`)}
              >
                <img
                  src={data.image}
                  alt=""
                  className="w-40 h-32 object cover"
                />
                <div className="ml-7 flex flex-col justify-around">
                  <p>Title : {data.name}</p>
                  <p>Description : {data.des}</p>
                  <p>
                    CreatedAt :{" "}
                    {moment(data.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // <p className=""></p>
            <h1 className="text-2xl text-red-500 w-[70%] text-center mt-8 ml-20">No posts available</h1>
          )}
        </div>
        <div className="w-full md:w-[30%] ml-8 mt-5">
          <h2 className="text-3xl font-semibold">Profile</h2>
          <div className="flex flex-col">
            <p className="text-xl mt-5">Your Name : {user.name}</p>
            <p className="mt-7 text-xl">Your Email : {user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
