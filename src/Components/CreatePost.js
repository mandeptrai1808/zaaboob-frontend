import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Skeleton } from "antd";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HttpsIcon from '@mui/icons-material/Https';
import PublicIcon from '@mui/icons-material/Public';
import { CreateNewPost, CreateNewPostWithImage } from "../Redux/Actions/PostActions";
import UploadImage from "./UploadImage";
const { TextArea } = Input;
export default function CreatePost() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);


  if (!userData) userData = {};

  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.LoadingReducer);
  const {listFile} = useSelector(state => state.FileImageReducer)

  const [dataNewPost, setDataNewPost] = useState({
    content: '',
    userId: userData.id,
    status: "PUBLIC"
  });
  const [showAddImg, setShowAddImg] = useState(false);
 
  return (
    <div className="">
    <div className="md:flex mb-5 justify-between items-center">
    <div className="flex items-center mb-5">
        <div
          style={{
            backgroundImage: `url(${userData.avatar.replaceAll("\\", "/")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-10 h-10 rounded-full"
        ></div>

        <span className="ml-5 font-bold">{userData.name}</span>
      </div>
      <Select
    
          value={dataNewPost.status}
          onChange={(e) => {
            setDataNewPost({
                ...dataNewPost,
                status: e.target.value
            })
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="h-8 opacity-50"
        >
          <MenuItem value={"PUBLIC"} className="opacity-50 hover:opacity-100"> <PublicIcon/> </MenuItem>
          <MenuItem value={"PRIVATE"} className="opacity-50 hover:opacity-100"> <HttpsIcon/></MenuItem>
        </Select>
    </div>
      <TextArea
        value={dataNewPost.content}
        onChange={(e) => {
            setDataNewPost({
                ...dataNewPost,
                content: e.target.value
            })
        }}
        style={{ fontSize: 20 }}
        placeholder="Hey, What are you thinking?"
        autoSize={{ minRows: 3 }}
      />
      <div
        className={`mt-5 flex justify-between ${!showAddImg ? "" : "hidden"}`}
      >
        <UploadImage/>
        {/* <Button
          type="primary"
          onClick={() => {
            console.log(dataNewPost)
            dispatch({type: "IS_LOADING"})
            dispatch(CreateNewPost(dataNewPost))  
            setShowAddImg(true);
          }}
        >
          Add Some Images
        </Button> */}
       
      </div>
      <Button loading={isLoading} className="w-full my-5" type="danger" onClick={() => {
        dispatch({type: "IS_LOADING"})
        if (listFile[0])
        dispatch(CreateNewPostWithImage(dataNewPost, listFile))
        else  
        dispatch(CreateNewPost(dataNewPost))
        setDataNewPost({
          ...dataNewPost,
          content: ""
      })
        }}>POST</Button>
        
      {/* <div className={`${showAddImg ? "" : "hidden"} my-5`}>
        {isLoading ? <Skeleton active /> : "Upload"}
      </div> */}
    </div>
  );
}
