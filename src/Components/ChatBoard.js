import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { GetMessages, SendImageMess, SendMessage } from "../Redux/Actions/ChatAction";
import dateFormat from "dateformat";

const { Search } = Input;

export default function ChatBoard() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const { roomId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, userChatData } = useSelector((state) => state.ChatReducer);

  const [textMess, setTextMess] = useState('');

  const messagesEndRef = useRef(null);
  const uploadRef = useRef(null);

  const openUpload = () => {
    uploadRef.current.click();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const scrollToBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

  let contentMessages = messages.map((item, index) => {
    //text mess
    if (item.content.status === "TEXT") {
      if (item.content?.userSendId === userData.id)
        return (
          <div key={index} className="w-full flex justify-end h-fit mb-5">
            <div className="md:w-2/3 grid grid-cols-10 place-content-end">
              <div className="relative py-2 pl-2 pr-5 md:col-span-9 col-span-8 place-self-end bg-blue-100 md:ml-0 ml-2  w-fit rounded-md shadow-md">
                <div>
                  <p className="m-0">{item.content?.content}</p>
                  <p className="m-0 text-right opacity-50">
                    {dateFormat(item.content?.createdAt, "H:MM")}
                  </p>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${item.userSend?.avatar.replaceAll(
                    "\\",
                    "/"
                  )})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="col-span-1 w-10 h-10 bg-slate-700 rounded-full ml-3 shadow-md"
              ></div>
            </div>
          </div>
        );
      else
        return (
          <div key={index} className="w-full flex justify-start h-fit mb-5">
            <div className="md:w-2/3 grid grid-cols-10">
              <div
                style={{
                  backgroundImage: `url(${item.userSend?.avatar.replaceAll(
                    "\\",
                    "/"
                  )})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="md:col-span-1 col-span-1 w-10 h-10 bg-slate-700 rounded-full mr-2 shadow-md"
              ></div>
              <div className="relative py-2 pl-2 pr-5  md:col-span-9 col-span-8 bg-white md:ml-0 ml-2  w-fit rounded-md shadow-md">
                <p className="m-0">{item.content?.content}</p>
                <p className="m-0 opacity-50">
                  {dateFormat(item.content?.createdAt, "H:MM")}
                </p>
              </div>
            </div>
          </div>
        );
    }

    //image text
    if (item.content.status === "IMAGE") {
      if (item.content?.userSendId === userData.id)
        return (
          <div key={index} className="w-full flex justify-end h-fit mb-5">
            <div className="md:w-2/3 grid grid-cols-10 place-content-end">
              <div className="relative py-2 px-2 md:col-span-9 col-span-8 place-self-end bg-blue-100 md:ml-0 ml-2  w-fit rounded-md shadow-md">
                <div>
                  <div
                    className="w-56 md:w-96 h-80 bg-slate-300"
                    style={{
                      backgroundImage: `url(${item.content?.content.replaceAll(
                        "\\",
                        "/"
                      )})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <p className="m-0 text-right opacity-50">
                    {dateFormat(item.content?.createdAt, "H:MM")}
                  </p>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${item.userSend?.avatar.replaceAll(
                    "\\",
                    "/"
                  )})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="col-span-1 w-10 h-10 bg-slate-700 rounded-full ml-3 shadow-md"
              ></div>
            </div>
          </div>
        );
      else
        return (
          <div key={index} className="w-full flex justify-start h-fit mb-5">
            <div className="md:w-2/3 grid grid-cols-10">
              <div
                style={{
                  backgroundImage: `url(${item.userSend?.avatar.replaceAll(
                    "\\",
                    "/"
                  )})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="md:col-span-1 col-span-1 w-10 h-10 bg-slate-700 rounded-full mr-2 shadow-md"
              ></div>
              <div className="relative py-2 px-2   md:col-span-9 col-span-8 bg-white md:ml-0 ml-2  w-fit rounded-md shadow-md">
              <div
                    className="w-56 md:w-96 h-80 bg-slate-300"
                    style={{
                      backgroundImage: `url(${item.content?.content.replaceAll(
                        "\\",
                        "/"
                      )})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                <p className="m-0 opacity-50">
                  {dateFormat(item.content?.createdAt, "H:MM")}
                </p>
              </div>
            </div>
          </div>
        );
    }

    if (item.content.status === "SYSTEM"){
      return <div className="w-full py-2 mb-5 flex justify-center">
          <p className="mt-0 bg-slate-400 rounded-md w-fit px-2 text-white">{item.content?.content}</p>
      </div>
    }
  });

  useEffect(() => {
    if (roomId){
      scrollToBottom();
      dispatch(GetMessages(roomId, roomId - userData.id));
    }
  }, []);
  useEffect(() => {
    scrollToBottomSmooth();
  }, [messages]);
  return (
    <div className="w-full h-full relative pt-12 pb-5 md:pl-5 pl-2 bg-slate-200">
      <input
        ref={uploadRef}
        className="fixed top-0"
        type="file"
        name="myImage"
        accept="image/png, image/jpeg"
        onChange={(event) => {
          console.log(event.target.files[0]);
          dispatch(SendImageMess(userData.id, roomId, event.target.files[0]))
          // dispatch({
          //   type: "ADD_IMAGE",
          //   content: event.target.files[0],
          // });
          // setSelectedImage(event.target.files[0]);
        }}
      ></input>

      <div className="fixed top-0 shadow-md left-0 h-16 w-full md:hidden flex items-center px-5 justify-around z-50 bg-white">
        <button
          onClick={() => {
            // navigate('/chats')
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </button>
        <div className="ml-5 w-2/3">
          <p className="m-0 text-xl font-bold">{userChatData.name}</p>
          <p className="m-0">Is online</p>
        </div>
        <button>
          <MoreHorizIcon />
        </button>
      </div>

      <div className="overflow-y-auto  md:h-100 h-screen md:py-5 py-20">
        {contentMessages}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full h-20 md:absolute fixed bottom-0 right-0 border-t-2 px-5 flex items-center bg-white">
        <div className="w-full flex">
          <Search
            placeholder="Send messenger..."
            value={textMess}
            onChange={e => {setTextMess(e.target.value)}}
            enterButton={<SendIcon />}
            size="lg"
            className="px-2"
            onSearch={(value) => {
              let data = {
                roomId: roomId,
                content: value,
                status: "TEXT",
                userSendId: userData.id,
              };
              setTextMess('')
              dispatch(SendMessage(data));
            }}
          />
          <Button onClick={openUpload}>
            <ImageIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
