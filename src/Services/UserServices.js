import axios from 'axios'
import {BASE_URL} from './configURL';

export const UserServices = {
    LoginUser: (_dataLogin) => {
      return axios({
        url: `${BASE_URL}/users/login`,
        method: "POST",
        data: _dataLogin
      })
    },
    LoginWithFacebook: (_dataLogin) => {
      return axios({
        url: `${BASE_URL}/users/loginfacebook`,
        method: "POST",
        data: _dataLogin
      })
    },
    Register: (_dataRegister) => {
      return axios({
        url: `${BASE_URL}/users/register`,
        method: "POST",
        data: _dataRegister
      })
    },
    UpdateUserAvatar: (_userId, _dataFile) => {
      let formData = new FormData();
      formData.append("Avatar", _dataFile);
      return axios({
        url: `${BASE_URL}/users/upload-avatar/${_userId}`,
        data: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },
    GetAllUser: () => {
      return axios({
        url: `${BASE_URL}/users/getall`,
        method: "GET"
      })      
    },
    findUserByName: (_name) => {
      if (!_name) _name = "COIQAHBWRTQ93";
      return axios({
        url: `${BASE_URL}/users/finduser/${_name}`,
        method: "GET",
    
      })
    },
    sendRequestFriend: (_data) => {
      return axios({
        url: `${BASE_URL}/users/sendrequest`,
        method: "POST",
        data: _data
      })
    },
    getRequestHasSend: (_id) => {
      return axios({
        url: `${BASE_URL}/users/request-has-send/${_id}`,
        method: "GET"
      })
    },

    getRequestHasGet: (_id) => {
      return axios({
        url: `${BASE_URL}/users/request-has-get/${_id}`,
        method: "GET"
      })
    },

    DeleteRequestFriend: (_data) => {
      return axios({
        url: `${BASE_URL}/users/deleterequest`,
        method: "DELETE",
        data: _data
      })
    },

    AddFriend: (_data) => {
      return axios({
        url: `${BASE_URL}/users/addfriend`,
        method: "POST",
        data: _data
      })
    },

    GetUserByUserId: (_id) => {
      return axios({
        url: `${BASE_URL}/users/user/${_id}`,
        method: "GET"
      })
    }

}