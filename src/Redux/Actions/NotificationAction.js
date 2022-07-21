import { NotificationService } from "../../Services/NotificationService"


export const GetNotifications = (_userId) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationService.getNotification(_userId);
        dispatch({
            type: "GET_NOTIFICATION",
            content: data
        })
    } catch (error) {
        console.log(error)
    }
  }
}

export const DeleteNotification = (_id) => {
  return async (dispatch) => {
    try {
    let {data} = await NotificationService.deleteNotification(_id);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
}

export const CreateNotification = (_data) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationService.createNotification(_data);
    } catch (error) {
        
    }
  }
}