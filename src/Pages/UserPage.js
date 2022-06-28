import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AddFriendAPI, DeleteRequestFriend, GetAllUser, GetUserByUserId } from "../Redux/Actions/UserActions";
import Post from '../Components/Post';
import { GetPostsByUserId } from "../Redux/Actions/PostActions";
import { Button } from "antd";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AddFriend from "../Components/AddFriend";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserPage() {

    let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const { userId } = useParams();
  const { allPosts } = useSelector((state) => state.PostReducer);
  const { userInfo, usersIsFriend, usersNotFriend, getRequest } = useSelector((state) => state.UserReducer);
  const {userPosts} = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();

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
  }

  const ControlButton = () => {
    if (usersIsFriend.find(item => item.user?.id == userId)){
        return <div><Button type="primary"><span className="mr-2">Chat</span> <ChatIcon/></Button></div>
    }

    else if (getRequest.find(item => item.user?.id == userId)){
      const index = getRequest.findIndex(item => item.user?.id == userId);
      return <div className="text-center md:flex items-center">
          <p className="m-0 pr-5">{`${userInfo.name} đã gửi lời mời kết bạn cho bạn`}</p>
          <Button type="danger" onClick={() => {
            AcceptRequestBtn(index, userInfo.id)
          }}>Accept</Button>
          <Button onClick={() => {
            DeleteRequest(index, userInfo.id)
          }}>Delete</Button>
      </div>
  }

    else if (usersNotFriend.find(item => item.user?.id == userId)){
        return <div><Button onClick={() => {
            dispatch({
                type: "OPEN_MODEL",
                title: "Infomation user",
                content:  <AddFriend userInfo = {userInfo}/>
              })
        }} type="danger"><span className="mr-2">Add friend</span> <PersonAddIcon/></Button></div>
    }

    

  

  }

  const contentUser = (
    <div className="relative">
      <div
        className="w-full h-72 bg-slate-400"
        style={{
          backgroundImage: `url(https://th.bing.com/th/id/R.646bb3bf4fea68a70dcd87c14a8ae55f?rik=dXnCQdw%2bgijJZw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2ff%2f5%2f8%2f1244590-peaceful-anime-wallpaper-1920x1080-for-meizu.jpg&ehk=uy18lux1zF2s7IROqMpBmcN7ReTdkWzqi2r2NP6t8uY%3d&risl=&pid=ImgRaw&r=0)`,
          backgroudPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full flex justify-center md:justify-between items-center md:pl-40  absolute top-52 md:top-64">
        <div className="flex items-end">
        <div
            style={{
              backgroundImage: `url(${userInfo.avatar?.replaceAll("\\", "/")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`w-40 duration-500 h-40 relative rounded-full shadow-md`}
          ></div>

          <div className="ml-10 hidden md:block">
            <h1 className="text-3xl font-bold">{userInfo.name}</h1>
            <p className="text- mb-0">1,4K friends</p>
          </div>
        </div>
          <div className="pr-20 hidden md:flex">{ControlButton()}</div>
        </div>
      </div>
      <div className="mt-28 block md:hidden w-full text-center">
        <h1 className="text-3xl">{userInfo.name}</h1>
        <p className="text- mb-0">1,4K friends</p>
      </div>
    </div>
  );

  const contentPosts = () => {
    return userPosts.map((item, index) => {
      return <Post key={index} typeAction = "_USER" ownPostId = {userId} postIndex = {index} content={item} />;
    });
  };
  useEffect(() => {
    dispatch({type: "RESET_USER_POSTS"})
    dispatch(GetUserByUserId(userId));
    dispatch(GetPostsByUserId(userId));
    dispatch(GetAllUser(userData.id));


  }, []);
  return <div className="md:pt-10 pb-20 relative z-10">
    {contentUser}
    <div className="px-5 w-full flex justify-center  md:hidden mt-5">
    {ControlButton()}
    </div>
   <div className="flex justify-center border-t  md:mt-40 mt-5">
   <div className="px-5 md:w-2/5 w-full">
    {contentPosts()}

    </div>
   </div>
    </div>;
}
