const stateDefault = {
    chatHistories: [],
    messages: [],
    userChatData: {},
    haveMessNotSeen: false
}

export const ChatReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_CHAT_HISTORIES":{

      let arr = action.content.sort((a,b) => {
        return b.index - a.index
      });
        state.chatHistories = arr
        return {...state}
    }
      
    case "GET_MESSAGES": {
      state.messages = action.content;
      return {...state}
    }

    case "GET_USER_CHAT_DATA":{
      state.userChatData = action.content;
      return {...state}
    }

    case "SEND_MESSAGE": {
      state.messages.push(action.content);
      return {...state}
    }

    case "SEEN_MESSAGE": {
      state.chatHistories[action.id].messNotSeen = 0;
      return {...state}
    }

    case "HAVE_MESS_NOT_SEND":{
      state.haveMessNotSeen = true;
      return {...state}
    }

    case "RESET_MESS_NOT_SEND":{
      state.haveMessNotSeen = false;
      return {...state}
    }
  
    default:
        return {...state}
  }
}