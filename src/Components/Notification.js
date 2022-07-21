import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteNotification,
  GetNotifications,
} from "../Redux/Actions/NotificationAction";
import { useNavigate } from "react-router-dom";
export default function Notification(props) {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  if (!userData) userData = {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actionNormalNoti = (_postId) => {
    navigate(`/post/${_postId}`);
  };

  const actionRequestNoti = () => {
    navigate('/friends')
  }

  const btnDelete = (_id, _index) => {
    dispatch(DeleteNotification(_id));
    dispatch({
      type: "DELETE_NOTIFICATION",
      id: _index,
    });
  };

  const content = props.notification.map((item, index) => {
    if (item.status === "NORMAL")
      return (
        <div
          key={index}
          className="grid grid-cols-10 border-b my-1 py-1 hover:bg-slate-100 cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-full col-span-2"
            style={{
              backgroundImage: `url(${item.userSend?.avatar?.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            onClick={() => {
              actionNormalNoti(item.postId);
            }}
          ></div>
          <div
            className="col-span-6 mt-2"
            onClick={() => {
              actionNormalNoti(item.postId);
            }}
          >
            <p className="m-0">
              <b>{item.userSend?.name}</b> {item.content}
            </p>
          </div>
          <div className="col-span-2 flex justify-end w-full">
            <button
              onClick={() => {
                btnDelete(item.id, index);
              }}
              className="w-10 h-10 opacity-50  rounded-full hover:bg-slate-200"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      );
    else return(  <div key={index} className="grid grid-cols-10 border-b my-1 py-1 hover:bg-slate-100 cursor-pointer">
    <div
      className="w-8 h-8 rounded-full col-span-2"
      style={{
        backgroundImage: `url(${item.userSend?.avatar?.replaceAll(
            "\\",
            "/"
          )})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onClick={() => {
        actionRequestNoti();
      }}
    ></div>
    <div className="col-span-6 mt-2"   onClick={() => {
        actionRequestNoti();
      }}>
      <p className="m-0"> <b>{item.userSend?.name}</b> {item.content}</p>
    </div>
    <div className="col-span-2 flex justify-end w-full">
      <button onClick={() => {
                btnDelete(item.id, index);
              }} className="w-10 h-10 opacity-50  rounded-full hover:bg-slate-200" >
        <DeleteIcon />
      </button>
    </div>
    {/* <div className="col-span-10 place-self-center mb-2 ">
      <Button type="primary">Accept</Button>
      <Button type="danger">Reject</Button>
    </div> */}
  </div>)
  
  });

  return <div>{ (props.notification.length > 0) ? content : <p>No notifications ;D</p>}</div>;
}
