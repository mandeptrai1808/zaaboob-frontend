import axios from "axios";
import { BASE_URL } from "./configURL";

export const ChatService = {
    getHistory: (_id) => {
      return axios({
        url: `${BASE_URL}/chat-histories/getbyuser/${_id}`,
        method: 'GET'
      })
    },

    getMessages: (_roomId) => {
      return axios({
        url: `${BASE_URL}/messengers/getmessage/${_roomId}`,
        method: "GET"
      })
    },

    sendMessage: (_data) => {
      return axios({
        url: `${BASE_URL}/messengers/create`,
        data: _data,
        method: "POST"
      })
    },

    sendImageMessage:(_userSendId, _roomId,_dataImg) => {
      let formData = new FormData();
      formData.append("MessImage", _dataImg);
      return axios({
        url: `${BASE_URL}/messengers/sendimage/${_roomId}/${_userSendId}`,
        data: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },

    pushHistories: (_data) => {
      return axios({
        url: `${BASE_URL}/chat-histories/push`,
        data: _data,
        method: "POST"
      })
    }
}