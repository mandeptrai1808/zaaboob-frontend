const stateDefault = {
  isLogin: false,
  allUsers: [],
  usersIsFriend: [],
  usersNotFriend: [],
  userFound: [],
  sendRequest: [],
  getRequest: [],
  userInfo: {}
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "IS_LOGIN": {
      state.isLogin = !state.isLogin;
      return { ...state };
    }

    case "GetAllUser": {
      state.allUsers = action.content;
      return { ...state };
    }

    case "GET_REQUEST_HAS_SEND":{
      state.sendRequest = action.content
      return {...state}
    }

    case "GET_USER_INFO":{
      state.userInfo = action.content;
      return {...state};
    }

    case "ADD_REQUEST": {
      state.sendRequest.push(action.content);
      return {...state}
    }

    case "GET_REQUEST_HAS_GET": {
      state.getRequest = action.content;
      return {...state}
    }

    case "DELETE_REQUEST_FRIEND": {
      state.getRequest.splice(action.index, 1);
      return {...state}
    }
    case "GET_FRIEND_USERS": {
      let arr = action.content;
      // arr.filter(item => item.id !== action.userId)
      // arr.filter(item => item.listFriends.find(item => item.friendId === 1))
      let results = [];
      arr.map((item) => {
        if (item.listFriends?.find((item) => item.friendId === action.userId))
          results.push(item);
      });
      state.usersIsFriend = results
      return { ...state };
    }

    case "GET_NOT_FRIENDS_USERS":{
        let arr = action.content;
        // arr.filter(item => item.id !== action.userId)
        // arr.filter(item => item.listFriends.find(item => item.friendId === 1))
        let results = [];
        arr.map((item) => {
          if (!item.listFriends?.find((item) => item.friendId === action.userId))
            results.push(item);
        });
        state.usersNotFriend = results
        return { ...state };
    }

    case "GET_USER_FOUND": {
        state.userFound = action.content;
        return {...state}
    }

    default:
      return { ...state };
  }
};
