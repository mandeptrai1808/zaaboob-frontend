import axios from "axios";
import { BASE_URL } from "./configURL";

export const PostService = {
    GetAllPost: () => {
      return axios({
        url: `${BASE_URL}/posts/getallpost`,
        method: "GET"
      })
    },
    GetPostsByUserId: (_id) => {
      return axios({
        url: `${BASE_URL}/posts/byuserid/${_id}`,
        method: "GET"
      })
    },
    CreateNewPost: (_dataNewPost) => {
      return axios({
        url: `${BASE_URL}/posts/newpost`,
        method: 'POST',
        data: _dataNewPost
      })
    },

    UploadImageServer: (_postId,_dataImg, _nameForm) => {
      let formData = new FormData();
      formData.append(_nameForm, _dataImg);
      return axios({
        url: `${BASE_URL}/posts/upload-image/${_postId}`,
        data: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },

    LikeThisPostApi: (_data) => {
      return axios({
        url: `${BASE_URL}/posts/likepost`,
        method: "POST",
        data: _data
      })
    },

    UnlikeThisPostApi:  (_data) => {
      return axios({
        url: `${BASE_URL}/posts/unlikepost`,
        method: "DELETE",
        data: _data
      })
    },

    CommentThisPost: (_data) => {
      return axios({
        url: `${BASE_URL}/posts/comment`,
        method: "POST",
        data: _data
      })
    }

}