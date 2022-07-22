import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { GetHistoriesChat, GetMessages, SeenMessages } from "../Redux/Actions/ChatAction";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
export default function ListChat() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatHistories, userChatData } = useSelector(
    (state) => state.ChatReducer
  );

  const contentPeopleChat = chatHistories.map((item, index) => {
    if (item.name)
    return (
      <div
        key={index}
        className={`grid  ${
          item.id === userChatData.id ? "bg-slate-200" : "cursor-pointer"
        } grid-cols-10 px-5 py-2 border-b duration-200 hover:bg-slate-200`}
        onClick={() => {
          navigate(`/chats/detail/${item.id + userData.id}`);
          dispatch({
            type: "SEEN_MESSAGE",
            id: index
          })
          dispatch(SeenMessages(item.id + userData.id, userData.id))
          dispatch(GetMessages(item.id + userData.id, item.id));
        }}
      >
        <div
          className="w-16 h-16 col-span-2 rounded-full"
          style={{
            backgroundImage: `url(${item.avatar?.replaceAll("\\", "/")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="col-span-6 pl-4 pt-1">
          <p className="m-0 text-lg font-bold">{item.name}</p>
          <p className="opacity-75">
            {item.lastMess?.status === "IMAGE"
              ? "Send a picture"
              : item.lastMess?.userSendId === userData.id
              ? `You ${item.lastMess?.content}`
              : `${item.lastMess?.content}`}
          </p>
        </div>

        <div className="col-span-2 flex items-center justify-end">
          {(item.messNotSeen > 0 && userChatData.id !== item.id) ? (
            <div className="w-5 h-5 rounded-full bg-red-400 flex justify-center items-center">
              <span className="text-white">{item.messNotSeen}</span>
            </div>
          ) : (
            ""
          )}

          <div className="h-10 w-10 rounded-full hover:bg-slate-300 flex justify-center items-center">
            <MoreHorizIcon />
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(GetHistoriesChat(userData.id));
  }, []);

  return (
    <div className="relative z-10 md:pt-10 h-full bg-white pt-14 shadow-md pb-20">
      { (chatHistories.length>0) ? contentPeopleChat : 
      <div className="px-5 py-10 text-xl">
        <p>Chưa có bạn bè?</p>  
        <div onClick={() => {
            navigate('/friends')
            dispatch({
              type: "CHANGE_PAGE",
              page: 1,
            });
       
        }} className="text-blue-500 hover:text-blue-300 cursor-pointer"> <span>Kết bạn ngay </span> <PersonAddAltIcon/> </div>
      </div>}
    </div>
  );
}
