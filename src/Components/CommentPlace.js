import React, {useState} from "react";
import { Input } from "antd";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { CommentThisPost } from "../Redux/Actions/PostActions";
import dateFormat, { masks } from "dateformat";
import { CreateNotification } from "../Redux/Actions/NotificationAction";
const { Search } = Input;

export default function CommentPlace(props) {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  if (!userData) userData = {};
  
  const dispatch = useDispatch();
  

  const [dataCmt, setDataCmt] = useState('');

  const listCmtAfterSort = props.postInfo?.listCmt.sort((a,b) => {
    return (b.comment.id - a.comment.id)
  })

  const contentCommments = listCmtAfterSort.map((item, index) => {
    return   <div key={index} className="grid grid-cols-10 mb-5">
    <div
    
      className="w-8 h-8  col-span-1 rounded-full"
      style={{
        backgroundImage: `url(${item.userCmt?.avatar.replaceAll("\\", "/")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
    <div className=" relative py-2 pl-2 pr-5 bg-slate-100 md:ml-0 ml-2 col-span-9 w-fit rounded-md shadow-md">
      <p className="m-0 font-bold">{item.userCmt?.name}</p>
      <p className="">{item.comment?.content}</p>
     
    <p className="m-0  absolute bottom-0 -left-2 text-left scale-75 text-sm opacity-40">
      {dateFormat(item.comment?.createdAt, "H:MM, dd/mm/yyyy")}
      </p>
    </div>
  </div>
  })

  return (
    <div className="my-5">
      <div className="grid grid-cols-10 gap-10 items-center justify-between">
        <div
          className="w-10 h-10 col-span-1 rounded-full"
          style={{
            backgroundImage: `url(${userData.avatar?.replaceAll("\\", "/")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="col-span-8 md:pr-0 pr-6  rounded-lg">
          <Search
            placeholder="Comment somethingg..."
            value={dataCmt}
            onChange={e => {setDataCmt(e.target.value)}}
            enterButton={<SendIcon />}
            size="md"
            className="px-2"
            onSearch={(value) => {
            //   console.log({
            //     userId: userData,
            //     postId: props.postInfo?.postDetail.id,
            //     content: value,
            //   });
              dispatch(
                CommentThisPost({
                  userId: userData.id,
                  postId: props.postInfo?.postDetail.id,
                  content: value,
                }, props.ownPostId)
              );
              if (props.postInfo?.postDetail.userId != userData.id)
              dispatch(CreateNotification({
                userId: props.postInfo?.postDetail.userId,
                content: "comment your post!",
                userSendId: userData.id,
                postId: props.postInfo?.postDetail.id
              }));
              setDataCmt('');
            }}
          />
        </div>
      </div>

      <div className="mt-5">
      {contentCommments}
      </div>
    </div>
  );
}
