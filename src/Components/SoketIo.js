import React, {useEffect} from 'react'
import {io} from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { GetNotifications } from '../Redux/Actions/NotificationAction';
import { GetHistoriesChat, GetMessages } from '../Redux/Actions/ChatAction';

export const socket = io.connect("http://localhost:6969");
let userData = localStorage.getItem("login_user");
userData = userData && JSON.parse(userData);

export const ResetNotificationSocket = (userId) => {
  socket.emit("ResetNotification", (userId))
}

export const ResetMessage = (userId, userSendId) => {
  socket.emit("ResetMessage", userId,userSendId)
}

export default function SoketIo() {

    const dispatch = useDispatch();

    if (!userData) userData = {};

    useEffect(() => {
        if (userData){
            socket.emit("newUser", userData.id)
        }
    },[])

    useEffect(() => {
      socket.on("DoResetNotification", () => {

        dispatch(GetNotifications(userData.id))
      })

      socket.on("DoResetMessage", (userSendId) => {
        console.log("reset mess")
        dispatch(GetHistoriesChat(userData.id))
        dispatch(GetMessages(userData.id + userSendId))
      })
    }, [socket])

  return (
    <div></div>
  )
}
