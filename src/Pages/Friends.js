import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KhaBanhFan from "../Components/KhaBanhFan";
import { Button, Input, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddFriendAPI, DeleteRequestFriend, findUserByName, GetAllUser, getRequestHasGet } from "../Redux/Actions/UserActions";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AddFriend from "../Components/AddFriend";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { SendMessage } from "../Redux/Actions/ChatAction";
const { Search } = Input;
export default function Friends() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();

  const { usersIsFriend, usersNotFriend, userFound, getRequest } = useSelector(
    (state) => state.UserReducer
  );

  const [dataSearch, setDataSearch] = useState("");

  // console.log(dataSearch.length)
  const {isLoadingSearch} = useSelector(state => state.LoadingReducer)
  const dispatch = useDispatch();


  const addFriendBtn = (_user) => {
    dispatch({
      type: "OPEN_MODEL",
      title: "Infomation user",
      content:  <AddFriend userInfo = {_user}/>
    })
  }

  const DeleteRequest = (_index, _userSend) => {
    dispatch({
      type: "DELETE_REQUEST_FRIEND",
      index: _index
    })
    dispatch(DeleteRequestFriend({userGet: userData.id, userSend: _userSend}))
  }

  const AcceptRequestBtn = (_index,_userSend) => {
    dispatch({
      type: "DELETE_REQUEST_FRIEND",
      index: _index
    })
    dispatch(DeleteRequestFriend({userGet: userData.id, userSend: _userSend}))
    dispatch(AddFriendAPI({userId: userData.id, friendId: _userSend}));
    dispatch(SendMessage({
      roomId: userData.id + _userSend,
      content: "The two have become friends",
      status: "SYSTEM",
      userSendId: userData.id
    }))
  }

  const vistUserInfo = (_id) => {
    navigate(`/user/${_id}`)
  }

  const requestContent = getRequest.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full shadow-sm bg-white p-5 flex items-center rounded-sm mb-2  justify-between"
      >
        <div onClick={() => {
          vistUserInfo(item.user?.id)
        }} className="flex items-center cursor-pointer">
          <div
            className="w-16 h-16 rounded-full bg-black mr-5"
            style={{
              backgroundImage: `url(${item.user?.avatar.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <p className="m-0 text-lg font-bold">{item.user?.name}</p>
            <p className="m-0 text-sm ">{item.content}</p>
          </div>
        </div>
        <div className="md:flex hidden text-right  flex-col">
         <Button type="primary" className="w-20 mb-2" onClick={(index)=>AcceptRequestBtn(index,item.user?.id)}>Accept</Button>
         <Button className="w-20"  onClick={index => DeleteRequest(index,item.user?.id)}>Delete</Button>
        </div>
        <div className="md:hidden flex text-right  flex-col">
         <Button onClick={(index)=>AcceptRequestBtn(index,item.user?.id)} type="primary"  className="mb-2"><CheckIcon/></Button>
         <Button onClick={index => DeleteRequest(index, item.user?.id)}><DeleteIcon/></Button>
        </div>
      </div>
    );
  });

  const userFoundContent = userFound.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full shadow-sm bg-white h-20 px-5 flex items-center rounded-sm mb-2  justify-between"
      >
        <div onClick={() => {
          vistUserInfo(item.user?.id)
        }} className="flex items-center cursor-pointer">
          <div
            className="w-16 h-16 rounded-full bg-black mr-5"
            style={{
              backgroundImage: `url(${item.user?.avatar.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <p className="m-0 text-xl font-bold">{item.user?.name}</p>
            <p className="m-0">{item.user?.email}</p>
          </div>
        </div>
        <div>
          {(usersIsFriend.find(user => user.user?.id === item.user?.id)) ?
           <Button onClick={() => {
            navigate(`/chats/detail/${item.user?.id+ userData.id}`)
           }} type="primary"><ChatIcon/></Button>:
           <Button onClick={() => {
             addFriendBtn(item.user)
           }} type="danger"><PersonAddIcon/></Button> }
          {/* <Button type="primary"><PersonAddIcon/></Button> */}
        </div>
      </div>
    );
  });

  const isNotFriendList = usersNotFriend.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full shadow-sm bg-white h-20 px-5 flex items-center rounded-sm mb-2  justify-between"
      >
        <div onClick={() => {
          vistUserInfo(item.user?.id)
        }} className="flex items-center cursor-pointer">
          <div
            className="w-16 h-16 rounded-full bg-black mr-5"
            style={{
              backgroundImage: `url(${item.user?.avatar.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <p className="m-0 text-xl font-bold">{item.user?.name}</p>
            <p className="m-0">{item.user?.email}</p>
          </div>
        </div>
        <div>
          <Button onClick={() => {
             addFriendBtn(item.user)
           }} type="danger"><PersonAddIcon/></Button>
        </div>
      </div>
    );
  });

  const isFriendList = usersIsFriend.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full shadow-sm bg-white h-20 px-5 flex items-center rounded-sm mb-2  justify-between"
      >
        <div onClick={() => {
          vistUserInfo(item.user?.id)
        }} className="flex items-center cursor-pointer">
          <div
            className="w-16 h-16 rounded-full bg-black mr-5"
            style={{
              backgroundImage: `url(${item.user?.avatar.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <p className="m-0 text-xl font-bold">{item.user?.name}</p>
            <p className="m-0">{item.user?.email}</p>
          </div>
        </div>
        <div>
          <Button onClick={() => {
            navigate(`/chats/detail/${item.user?.id+ userData.id}`)
           }} type="primary"><ChatIcon/></Button>
        </div>
      </div>
    );
  });
  useEffect(() => {
    dispatch(GetAllUser(userData.id));
    dispatch(getRequestHasGet(userData.id))
  }, []);
  return (
    <div className="relative flex justify-center z-10 md:py-16 py-10">
      {/* <img src="/logo192.png"/> */}
      {/* <KhaBanhFan/> */}
      <div className="md:w-2/5  w-full p-5">
        <h1 className="text-3xl font-bold mb-5 border-b">Friends</h1> 
        <Search
          placeholder="Search with your friend name"
          className="rounded-md mb-5"
          loading={isLoadingSearch}
          allowClear
          onChange={(e) => {
            setDataSearch(e.target.value)
            dispatch({type: "IS_LOADING_SEARCH"})
            dispatch(findUserByName(e.target.value, userData.id))
          }}
          size="large"
          style={{ width: "100%" }}
        />

        {/* Found user  */}
        <div>
          { (isLoadingSearch) ?  
          <Skeleton active avatar/> :
          userFoundContent}
          <p className="font-bold">
          {(!userFound[0]&&dataSearch.length>0) ? "No results":""}
          </p>
        </div>

        {/* Request friend  */}
        <div className="my-5 border-t">
            <h1>Request make friend:</h1>
            { getRequest[0] ? requestContent : "No request!"}
        </div>
        <div className="my-5 border-t">
          <h1>Maybe you know this people:</h1>
          {isNotFriendList}
        </div>
        <div className="my-5 border-t">
          <h1>Your list friends:</h1>
          {isFriendList}
        </div>
      </div>
    </div>
  );
}
