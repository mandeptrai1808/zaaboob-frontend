import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ImageIcon from "@mui/icons-material/Image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@mui/material";
import { Badge, Popover } from "antd";
import Notification from "./Notification";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export default function SearchHeader() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  if (!userData) userData = {};

  const { listNotification } = useSelector(
    (state) => state.NotificationReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const contentAvatar = <div className="w-28 text-center">
    <p onClick={() => {
      navigate('/profile');
        dispatch({
          type: "CHANGE_PAGE",
          page: 3,
        });
    }} className="m-0 py-2 border-b cursor-pointer hover:bg-slate-200"> <PersonOutlineOutlined/> Profile</p>
    <p onClick={() => {
      navigate('/about');
    }} className="m-0 py-2 border-b cursor-pointer hover:bg-slate-200"> <InfoOutlinedIcon/> About</p>
    <p onClick={() => {
         localStorage.clear();
         sessionStorage.clear();
          navigate("/login");
          // dispatch({ type: "IS_LOGIN" });
        }} className="m-0 py-2 border-b cursor-pointer hover:bg-slate-200 text-red-500 font-bold"> <LogoutIcon/> Log out</p>
  </div>

  return (
    <div>
      <div className="fixed md:hidden flex px-5 items-center  justify-between z-20 top-0 left-0 h-10 w-full bg-white shadow-md">
        <div className="w-10 flex justify-center mr-10">
          <SearchIcon />
        </div>
        <Input className="w-full" placeholder="Search..." />
        <Popover trigger={"click"} placement="bottomLeft" content={contentAvatar}>
        <div className="w-10 ml-2 flex justify-center">
          <PersonOutlineOutlined />
        </div>
        </Popover>

        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={<Notification notification={listNotification} />}
        >
          
          <div className="w-10 flex justify-center">
            <Badge count={listNotification.length}>
              <NotificationsIcon fontSize="small" />
            </Badge>
          </div>
        </Popover>
        
      </div>
    </div>
  );
}
