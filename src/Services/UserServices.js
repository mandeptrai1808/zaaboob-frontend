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
    }
}