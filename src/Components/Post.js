import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PublicIcon from "@mui/icons-material/Public";
import HttpsIcon from "@mui/icons-material/Https";
import dateFormat, { masks } from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, Select } from "antd";
import { red } from "@mui/material/colors";
import {
  DeletePost,
  LikeThisPostApi,
  UnLikeThisPostApi,
  UpdatePostStatus,
} from "../Redux/Actions/PostActions";
import CommentPlace from "./CommentPlace";

const { Option } = Select;
export default function Post(props) {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();

  const [showComment, setShowComment] = useState(false);

  const dispatch = useDispatch();
  const { content, postIndex, typeAction } = props;

  const contentPopover = () => {
    if (userData.id === content.ownOfPost.id) {
      return (
        <div>
          <div className="my-2 py-2 border-b duration-200 hover:bg-slate-100">
            <p className="m-0">Change status</p>
            <Select
              onChange={(value) => {
                dispatch(UpdatePostStatus({
                  id: content.postDetail.id,
                  status: value
                },props.ownPostId))
                console.log(value)
              }}
              defaultValue={content.postDetail.status.toString()}
              style={{ width: 150 }}
            >
              <Option value="PUBLIC">
                PUBLIC <PublicIcon />
              </Option>
              <Option value="PRIVATE">
                PRIVATE <HttpsIcon />
              </Option>
            </Select>
          </div>
          <p
            onClick={() => {
              dispatch(DeletePost(content.postDetail.id, props.ownPostId));
            }}
            className="my-2 py-2 bg-red-300  border-b duration-200 hover:bg-slate-100 px-5"
          >
            Delete this post
          </p>
        </div>
      );
    } else
      return (
        <div>
          <p className="my-2 py-2 border-b duration-200 hover:bg-slate-100 px-5 cursor-pointer">Report this post</p>
          <p onClick={() => {
             navigate(`/user/${content.ownOfPost.id}`)
          }} className="my-2 py-2 border-b duration-200 hover:bg-slate-100 px-5 cursor-pointer">Profile of user</p>
        </div>
      );
  };

  const contentImage = () => {
    if (content.listImg?.length === 1)
      return (
        <div
          style={{
            backgroundImage: `url(${content.listImg[0].linkImg?.replaceAll(
              "\\",
              "/"
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="col-span-10 h-96"
        ></div>
      );
    if (content.listImg?.length > 1)
      return content.listImg.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundImage: `url(${item.linkImg?.replaceAll("\\", "/")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-60 col-span-5"
          ></div>
        );
      });
  };
  return (
    <div className="w-full rounded-md p-5 bg-white shadow-md my-5">
      <div className="flex justify-between">
        <div className="flex items-center pb-5">
          <div
            style={{
              backgroundImage: `url(${content.ownOfPost?.avatar.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-10 h-10 rounded-full"
          ></div>
          <div>
            <p className="mb-0 text-lg font-bold ml-5">
              {content.ownOfPost?.name}
            </p>
            <div className="flex items-center">
              <p className="mb-0 opacity-50 ml-5">
                {dateFormat(content.postDetail?.createdAt, "H:MM, dd/mm/yyyy")}
              </p>
              <div className="scale-75 opacity-50">
                {content.postDetail?.status === "PUBLIC" ? (
                  <PublicIcon />
                ) : (
                  <HttpsIcon />
                )}
              </div>
            </div>
          </div>
        </div>
        <Popover
          content={contentPopover()}
          placement="bottomLeft"
          trigger="click"
        >
          <div className="w-10 h-10 duration-200 cursor-pointer flex justify-center items-center hover:bg-slate-300 rounded-full ">
            <MoreHorizIcon />
          </div>
        </Popover>
      </div>
      <div>
        {content.postDetail?.content.split("\n").map((str, idStr) => {
          return (
            <p className="m-0" key={idStr}>
              {str}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-10 gap-1">
        {/* <div  style={{
                backgroundImage: `url(&quot; ${url} &quot;)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} className='col-span-10 h-96'>

            </div> */}
        {contentImage()}
      </div>

      <div className="flex justify-between items-center my-2">
        <div>
          <FavoriteIcon sx={{ color: red[300] }} />
          <span>{content.listLike?.length} like</span>
        </div>
        <div>
          <p className="m-0">{content.listCmt?.length} comments</p>
        </div>
      </div>

      <div className="flex justify-around border-t pt-2 border-slate-300">
        {content.listLike.find(
          (item) =>
            item.userId == userData.id && item.postId == content.postDetail?.id
        ) ? (
          <div
            onClick={() => {
              dispatch({
                type: `UNLIKE_THIS_POST${typeAction}`,
                index: postIndex,
                userId: userData.id,
                postId: content.postDetail?.id,
              });
              dispatch(
                UnLikeThisPostApi({
                  userId: userData.id,
                  postId: content.postDetail?.id,
                })
              );
            }}
            className="w-1/3 mx-2 duration-200 py-2 cursor-pointer text-center rounded-md hover:bg-slate-200"
          >
            <FavoriteIcon sx={{ color: red[300] }} /> <span>Liked</span>
          </div>
        ) : (
          <div
            onClick={() => {
              dispatch({
                type: `LIKE_THIS_POST${typeAction}`,
                index: postIndex,
                content: {
                  userId: userData.id,
                  postId: content.postDetail?.id,
                },
              });
              dispatch(
                LikeThisPostApi({
                  userId: userData.id,
                  postId: content.postDetail?.id,
                })
              );
            }}
            className="w-1/3 mx-2 duration-200 py-2 cursor-pointer text-center rounded-md hover:bg-slate-200"
          >
            <FavoriteBorderOutlinedIcon /> <span>Like</span>
          </div>
        )}

        <div
          onClick={() => {
            setShowComment(!showComment);
          }}
          className="w-1/3 mx-2 cursor-pointer duration-200 py-2 text-center rounded-md hover:bg-slate-200"
        >
          <ModeCommentOutlinedIcon /> <span>Comment</span>
        </div>
        <div className="w-1/3 mx-2 duration-200 py-2 text-center rounded-md hover:bg-slate-200">
          <ShareOutlinedIcon /> <span>Share</span>
        </div>
      </div>
      <div>
        {showComment ? (
          <CommentPlace ownPostId={props.ownPostId} postInfo={content} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
