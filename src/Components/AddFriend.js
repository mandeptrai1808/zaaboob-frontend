import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import {
  getRequestHasSend,
  sendRequestFriend,
} from "../Redux/Actions/UserActions";
import { CreateNewPost } from "../Redux/Actions/PostActions";
import { CreateNotification } from "../Redux/Actions/NotificationAction";
const { TextArea } = Input;
export default function AddFriend(props) {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const dispatch = useDispatch();
  const { sendRequest } = useSelector((state) => state.UserReducer);
  const {requestLoading} = useSelector(state => state.LoadingReducer)
  const [dataRequest, setDataRequest] = useState({
    userSend: userData.id,
    userGet: props.userInfo?.id,
    content: `Hi, I'm ${userData.name}!`,
  });

  useEffect(() => {
    dispatch(getRequestHasSend(userData.id));
  }, []);
  return (
    <div className="w-full">
      <div
        style={{
          backgroundImage: `url(https://images4.alphacoders.com/236/236784.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-40 w-full md:mb-40 mb-24 relative pt-20"
      >
        <div className="text-center">
          <div
            style={{
              backgroundImage: `url(${props.userInfo.avatar?.replaceAll(
                "\\",
                "/"
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-32 h-32 md:h-40 md:w-40 inline-block shadow-lg rounded-full"
          ></div>
          <p className="font-bold text-2xl">{props.userInfo.name}</p>
        </div>
      </div>
      <div className="my-5">
        <TextArea
          value={dataRequest.content}
          onChange={(e) =>
            setDataRequest({
              ...dataRequest,
              content: e.target.value,
            })
          }
          placeholder={`Write something for ${props.userInfo?.name}`}
          autoSize={{ minRows: 3, maxRows: 5 }}
          size="large"
        />
      </div>

      {sendRequest.find((item) => (item.userGet === props.userInfo.id)) ? (
        <Button
          className="w-full"
          disabled
          type="primary"
        >
          Request has send <CheckIcon/>
        </Button>
      ) : (
        <Button
          loading={requestLoading}
          onClick={() => {
            dispatch({type: "IS_LOADING_REQUEST"})
            dispatch({
                type: "ADD_REQUEST",
                content: dataRequest
            })
            dispatch(CreateNotification({
              userId: props.userInfo?.id,
              content: "want to make friend with you",
              userSendId: userData.id,
              status: "REQUEST"
            }))
            dispatch(sendRequestFriend(dataRequest));
          }}
          className="w-full"
          type="danger"
        >
          Send Request
        </Button>
      )}
    </div>
  );
}
