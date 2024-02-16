import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../apicall/axiosInstance";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setloading } from "../redux/loaderSlice";
import moment from "moment";

function Home() {
  const navigate = useNavigate();
  const [datas, setdatas] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const fetchdatas = async () => {
      try {
        dispatch(setloading(true));
        const response = await axiosinstance.get("https://create-blog-app-rvsw.onrender.com");
        dispatch(setloading(false));
        console.log("success", response.data.data);
        if (response.data.success) {
          setdatas(response.data.data);
          //message.success(response.data.message)
        }
      } catch (error) {
        dispatch(setloading(false));
        message.error(error.message);
      }
    };
    fetchdatas();
  }, []);
  return (
    <div className="px-5 md:px-36 mt-5 h-52">
      {datas &&
        datas.map((data) => {
          return (
            <div
              className="bg-slate-200 flex h-52 cursor-pointer mt-4"
              key={data._id}
              onClick={() => navigate(`/product/${data._id}`)}
            >
              <img
                src={data.image}
                alt=""
                className="w-40 h-full md:w-56 md:h-52 object-cover"
              />
              <div className="ml-10 flex flex-col justify-around">
                <p className="text-xl">Title : {data.name}</p>
                <p className="">Description : {data.des}</p>
                <p>Created By : {data.user.name}</p>
                <p>
                  Created At :{" "}
                  {moment(data.createdAt).format("DD-MM-YYYY hh:mm A")}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
