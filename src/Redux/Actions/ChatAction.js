import { ChatService } from "../../Services/ChatService";
import { UserServices } from "../../Services/UserServices";

export const GetHistoriesChat = (_id) => {
  return async (dispatch) => {
    try {
      let { data } = await ChatService.getHistory(_id);
      dispatch({
        type: "GET_CHAT_HISTORIES",
        content: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetMessages = (_roomId, _friendId, ) => {
  return async (dispatch) => {
    try {
      let { data } = await ChatService.getMessages(_roomId);
      dispatch({
        type: "GET_MESSAGES",
        content: data,
      });
      let user = await UserServices.GetUserByUserId(_friendId);

      dispatch({
        type: "GET_USER_CHAT_DATA",
        content: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SendMessage = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await ChatService.sendMessage(_data);
      let messages = await ChatService.getMessages(_data.roomId);
      dispatch(PushHistories({userId: _data.roomId - _data.userSendId, friendId: _data.userSendId}))
      dispatch(PushHistories({userId: _data.userSendId, friendId: _data.roomId - _data.userSendId}))
      dispatch({
        type: "GET_MESSAGES",
        content: messages.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SendImageMess = (_userSendId, _roomId, _dataImg) => {
  return async (dispatch) => {
    try {
      let {data} = await ChatService.sendImageMessage(_userSendId, _roomId, _dataImg);
      let messages = await ChatService.getMessages(_roomId);
      dispatch(PushHistories({userId: _roomId - _userSendId, friendId: _userSendId}))
      dispatch(PushHistories({userId: _userSendId, friendId: _roomId - _userSendId}))
      dispatch({
        type: "GET_MESSAGES",
        content: messages.data,
      });
    } catch (error) {
      
    }
  }
}

export const PushHistories = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await ChatService.pushHistories(_data);
      dispatch(GetHistoriesChat(_data.userId));
    } catch (error) {
      console.log(error)
    }
  };
};

export const SeenMessages = (_roomId, _userId) => {
  return async (dispatch) => {
    try {
      let {data} = await ChatService.seenMessages(_roomId, _userId);
    } catch (error) {
      console.log(error)
    }
  }
}