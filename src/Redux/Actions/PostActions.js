import { PostService } from "../../Services/PostService";

export const GetAllPost = () => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.GetAllPost();
      dispatch({
        type: "GET_ALL_POST",
        content: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetPostsByUserId = (_id) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.GetPostsByUserId(_id);
      dispatch({
        type: "GET_USER_POSTS",
        content: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const CreateNewPost = (_dataNewPost) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.CreateNewPost(_dataNewPost);
      dispatch({ type: "IS_LOADED" });
      dispatch({ type: "CLOSE_MODEL" });
      dispatch(GetAllPost());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const CreateNewPostWithImage = (_dataNewPost, _listImg) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.CreateNewPost(_dataNewPost);
      console.log(data);
      _listImg.map(async (item) => {
        await PostService.UploadImageServer(data.id, item, "PostImage");
        // console.log(data);
      });
      dispatch({ type: "IS_LOADED" });
      dispatch({ type: "RESET_FILES" });
      dispatch({ type: "CLOSE_MODEL" });
      dispatch(GetAllPost());
    } catch (error) {
      console.log(error);
    }
  };
};

export const LikeThisPostApi = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.LikeThisPostApi(_data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const UnLikeThisPostApi = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.UnlikeThisPostApi(_data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const CommentThisPost = (_data, _userId) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.CommentThisPost(_data);
      console.log(_userId);

      if (_userId) {
        dispatch(GetPostsByUserId(_userId));
      } else dispatch(GetAllPost());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeletePost = (_id, _userId) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.DeletePost(_id);
      if (_userId) {
        dispatch(GetPostsByUserId(_userId));
      } else dispatch(GetAllPost());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdatePostStatus = (_data, _userId) => {
  return async (dispatch) => {
    try {
      let { data } = await PostService.UpdatePostStatus(_data);
      if (_userId) {
        dispatch(GetPostsByUserId(_userId));
      } else dispatch(GetAllPost());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
