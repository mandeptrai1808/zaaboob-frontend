import axios, { AxiosError } from "axios";
import { BASE_URL } from "./configURL";

export const NotificationService = {
    getNotification: (_userId) => {
      return axios({
        url: `${BASE_URL}/notifications/byuser/${_userId}`,
        method: "GET"
      })
    },

    deleteNotification: (_id) => {
      return axios({
        url: `${BASE_URL}/notifications/delete/${_id}`,
        method: "DELETE"
      })
    },

    createNotification: (_data) => {
        return axios({
            url: `${BASE_URL}/notifications/create`,
            method: "POST",
            data: _data
        })
    }
}