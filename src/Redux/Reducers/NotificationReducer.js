const stateDefault = {
    listNotification: []
}

export const NotificationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_NOTIFICATION":{
        state.listNotification = action.content;
        return {...state}
    }
        
    case "DELETE_NOTIFICATION":{
        state.listNotification.splice(action.id, 1);
        return {...state}
    }
    case "CREATE_NOTIFICATION":{
        state.listNotification.push(action.content);
        return {...state}
    }
    default:
        return {...state}
  }
}