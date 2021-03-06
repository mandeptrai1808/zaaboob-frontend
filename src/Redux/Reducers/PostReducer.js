const stateDefault = {
  allPosts: [],
  userPosts: [],
  postPageData: {}
};

export const PostReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_POST": {
      state.allPosts = action.content.sort((a, b) => {
        return b.postDetail.id - a.postDetail.id;
      });
      return { ...state };
    }

    case "GET_USER_POSTS": {
      state.userPosts = action.content.sort((a, b) => {
        return b.postDetail.id - a.postDetail.id;
      });
      return { ...state };
    }

    case "RESET_USER_POSTS": {
      state.userPosts = [];
      return { ...state };
    }

    case "LIKE_THIS_POST": {
      state.allPosts[action.index].listLike.push(action.content);
      return { ...state };
    }

    case "UNLIKE_THIS_POST": {
      let arr = state.allPosts[action.index].listLike.filter(
        (item) => item.userId !== action.userId
      );


      state.allPosts[action.index].listLike = arr;
      return { ...state };
    }

    case "UNLIKE_THIS_POST_PAGE": {
      let arr = state.postPageData.listLike.filter(
        (item) => item.userId !== action.userId && item.postId !== action.postId
      );

      state.postPageData.listLike = arr;
      return { ...state };
    }

    case "LIKE_THIS_POST_PAGE": {
      state.postPageData.listLike.push(action.content);
      return { ...state };
    }

    case "UNLIKE_THIS_POST_USER": {
      let arr = state.userPosts[action.index].listLike.filter(
        (item) => item.userId !== action.userId
      );

      state.userPosts[action.index].listLike = arr;
      return { ...state };
    }

    case "LIKE_THIS_POST_USER": {
      state.userPosts[action.index].listLike.push(action.content);
      return { ...state };
    }

    case "GET_POST_PAGE":{
      state.postPageData = action.content
      return {...state}
    }

    default:
      return { ...state };
  }
};
