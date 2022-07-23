import React, { useEffect } from "react";
import Post from "../Components/Post";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { GetAllPost } from "../Redux/Actions/PostActions";
import CreatePost from "../Components/CreatePost";
import ImageIcon from "@mui/icons-material/Image";
import { Skeleton } from "antd";
export default function HomePage() {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.PostReducer);

  const contentPosts = () => {
    return allPosts.map((item, index) => {
      if (item.postDetail?.status === "PUBLIC")
        return (
          <Post key={index} typeAction="" postIndex={index} content={item} />
        );
    });
  };

  useEffect(() => {
    dispatch(GetAllPost());
  }, []);
  return (
    <div className="relative z-10 md:py-20 pt-16 pb-20">
      {/* <div
        onClick={() => {
          dispatch({
            type: "OPEN_MODEL",
            title: "Create your post",
            content: <CreatePost />,
          });
        }}
        className="fixed md:flex hidden bottom-10 text-3xl text-white pb-2 cursor-pointer duration-200 right-40 w-16 h-16  justify-center items-center hover:bg-red-300 rounded-full bg-red-500"
      >
        +
      </div> */}

      <div className="flex w-full px-5 justify-center">
        <div className="md:w-2/5 w-full">
          {allPosts.length > 0 ? (
            <div>
              <div
                onClick={() => {
                  dispatch({
                    type: "OPEN_MODEL",
                    title: "Create your post",
                    content: <CreatePost />,
                  });
                }}
                className="w-full h-10 border flex bg-white rounded-md hover:shadow-md justify-between items-center px-5"
              >
                <div>
                  <p className="m-0">What are you thinking?</p>
                </div>
                <div>
                  <ImageIcon style={{ color: "greenyellow" }} />
                </div>
              </div>

              {contentPosts()}
            </div>
          ) : (
            <div>
              <Skeleton active avatar paragraph={{ rows: 5 }} />
              <Skeleton active avatar paragraph={{ rows: 5 }} />
            </div>
          )}
          }
        </div>
      </div>
    </div>
  );
}
