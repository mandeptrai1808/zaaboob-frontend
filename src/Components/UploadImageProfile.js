import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserAvatar } from "../Redux/Actions/UserActions";
export default function UploadImageProfile() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const {avatarUploading} = useSelector(state => state.LoadingReducer);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  return (
    <div className="w-full grid grid-cols-5 gap-5">
      <div
        className="md:col-span-3 col-span-5 md:h-96 h-96 border flex justify-center items-center"
      >
        {(selectedImage) ? 
         
            <div
              style={{
                backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-full h-full"
            >
            </div>
         
        : <p>Choose your avatar</p>}
      </div>

      <div className="md:col-span-2 col-span-5">
        <input
          type="file"
          name="myImage"
          accept="image/png, image/jpeg"
          onChange={(event) => {
            console.log(event.target.files[0]);
            // dispatch({
            //   type: "ADD_IMAGE",
            //   content: event.target.files[0]
            // })
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      <Button loading={avatarUploading} className="col-span-5" type="danger" onClick={() => {
        dispatch({type: "IS_LOADING_AVATAR"})
        dispatch(UpdateUserAvatar(userData.id, selectedImage))
      }}>UPDATE</Button>
    </div>
  );
}
