import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupIcon from "@mui/icons-material/Group";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import { Input } from "@mui/material";
import Notification from "./Notification";
import { GetNotifications } from "../Redux/Actions/NotificationAction";

export default function MenuHeader() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  if (!userData) userData = {};
  const [isSearch, setIsSearch] = useState(false);
  const [haveNotSeenMess, setHaveNotSeenMess] = useState(false);
  console.log(haveNotSeenMess)

  const navigate = useNavigate();
  const { isPage } = useSelector((state) => state.MenuReducer);
  const {isLogin} = useSelector(state => state.UserReducer);
  const {listNotification} = useSelector(state => state.NotificationReducer);
  const { chatHistories } = useSelector(
    (state) => state.ChatReducer
  );

  const dispatch = useDispatch();


  const contentAvatar = <div className="w-28 text-center">
    <p onClick={() => {
      navigate('/profile');
        dispatch({
          type: "CHANGE_PAGE",
          page: 3,
        });
    }} className="m-0 py-2 border-b cursor-pointer hover:bg-slate-200"> <PersonOutlineOutlinedIcon/> Profile</p>
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

  useEffect(() => {
    if (!userData.id) navigate("/login");
    dispatch(GetNotifications(userData.id))

  }, []);

  useEffect(() => {
    var temp = false;
    chatHistories.map((item) => {
      if (item.messNotSeen > 0){
        temp= true
      }
    })
    setHaveNotSeenMess(temp)
  }, [chatHistories])

  return (
    <div className="w-full px-5 grid items-center grid-cols-10 fixed md:top-0 bottom-0 bg-white z-20 h-16 shadow-md border-t border-black">
      <div className="col-span-2 pl-5 md:block hidden">
        <h1 className="text-2xl font-bold">ZABOOB</h1>
      </div>
      <div className="md:col-span-6 col-span-10 flex justify-center">
        <div className="flex md:justify-center justify-around w-full">
          <NavLink
            to={"/"}
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 0,
              });
            }}
          >
            {isPage === 0 ? (
              <HomeIcon
                sx={{ color: brown[900] }}
                className="md:mx-10 border-b-4 border-black "
                fontSize="large"
              />
            ) : (
              <HomeOutlinedIcon
                sx={{ color: brown[900] }}
                className="md:mx-10"
                fontSize="large"
              />
            )}
          </NavLink>

          <NavLink
            to={"/friends"}
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 1,
              });
            }}
          >
            {isPage === 1 ? (
              <GroupIcon
                sx={{ color: brown[900] }}
                className="md:mx-10 border-b-4 border-black "
                fontSize="large"
              />
            ) : (
              <GroupOutlinedIcon
                sx={{ color: brown[900] }}
                className="md:mx-10"
                fontSize="large"
              />
            )}
          </NavLink>

          <NavLink
            to={"/chats"}
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 2,
              });
            }}
          >
            <div className="md:mx-10">

            <Badge  dot={haveNotSeenMess}>
            {isPage === 2 ? (
              <ChatIcon
                sx={{ color: brown[900] }}
                className=" border-b-4 border-black "
                fontSize="large"
              />
            ) : (
              <ChatOutlinedIcon
                sx={{ color: brown[900] }}
                fontSize="large"
              />
            )}
            </Badge>
            </div>
          
          </NavLink>

          <NavLink
            to={"/profile"}
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 3,
              });
            }}
          >
            {isPage === 3 ? (
              <PersonIcon
                sx={{ color: brown[900] }}
                className="md:mx-10 border-b-4 border-black "
                fontSize="large"
              />
            ) : (
              <PersonOutlineOutlinedIcon
                sx={{ color: brown[900] }}
                className="md:mx-10"
                fontSize="large"
              />
            )}
          </NavLink>
        </div>
      </div>
      <div className="col-span-2  justify-end  md:flex hidden">
        <div
       
          className={`mr-2 duration-500 ${
            isSearch ? "w-full bg-red-200" : "w-10"
          } h-10 flex justify-center items-center rounded-full shadow-md`}
        >
          <Input placeholder="Search something..." className={` duration-200 ${isSearch ? "w-40" : "w-0"}`} />

          <SearchIcon  onClick={() => {
          setIsSearch(!isSearch)
        }} fontSize="large" className="cursor-pointer"/>
        </div>
       
       <Popover trigger={"click"} placement="bottomLeft" content={<Notification notification={listNotification}/>}>
       <div className={`w-10 h-10 ${isSearch ? "hidden" : "flex"} cursor-pointer justify-center items-center rounded-full shadow-md`}>
        <Badge count={listNotification.length}>
          <NotificationsNoneIcon fontSize="large" />
        </Badge>
        </div>
       </Popover>

      
        <Popover trigger={"click"} placement="bottomLeft" content={contentAvatar}>
        <div
          style={{
            backgroundImage: `url(${userData.avatar?.replaceAll('\\', '/')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`w-10 ml-5 duration-500 h-10 rounded-full shadow-md ${isSearch ? "hidden" : "block"}`}
        ></div>
        </Popover>
      </div>
    </div>
  );
}
