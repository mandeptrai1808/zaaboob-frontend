import { UserServices } from "../../Services/UserServices"
import { notification } from 'antd';
const successNotification = (_tittle, _content) => {
    notification["success"]({
      message: _tittle,
      description: _content,
    });
  };
  
  const errorNotification = (_tittle, _content) => {
    notification["error"]({
      message: _tittle,
      description: _content,
    });
  };

export const LoginUser = (_dataLogin) => {
  return async (dispatch) => {
    try {
        let {data} = await UserServices.LoginUser(_dataLogin);
        successNotification("Đăng nhập thành công", "Bạn đã đăng nhập thành công!!")
        localStorage.setItem('login_user', JSON.stringify(data.userFind));
        localStorage.setItem('access_token', data.token);
        dispatch({type: "IS_LOGIN"});
        window.location.reload()
    } catch (error) {
        console.log(error)
        errorNotification("Đăng nhập thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
    }    
  }
}

export const LoginWithFacebook = (_dataLogin) => {
  return async (dispatch) => {
    try {
        let {data} = await UserServices.LoginWithFacebook(_dataLogin)
        successNotification("Đăng nhập thành công", "Bạn đã đăng nhập thành công!!")
        localStorage.setItem('login_user', JSON.stringify(data));
        // localStorage.setItem('access_token', data.token);
        dispatch({type: "IS_LOGIN"});
        window.location.reload()
        console.log(data);
    } catch (error) {
        console.log(error)
        errorNotification("Đăng nhập thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")

    }
  }
}

export const RegisterUser = (_dataRegister) => {
  return async (dispatch) => {
    try {
        let {data} = await UserServices.Register(_dataRegister);
        successNotification("Đăng kí tài khoảng thành công", "Bạn đã đăng kí thành công!!")

    } catch (error) {
        console.log(error)
        errorNotification("Đăng kí thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
    }
  }
}

export const UpdateUserAvatar = (_userId, _dataFile) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.UpdateUserAvatar(_userId, _dataFile);
      successNotification("Cập nhật avatar thành công", "Bạn đã Cập nhật avatar thành công!!")
      localStorage.setItem('login_user', JSON.stringify(data.user));
      // localStorage.setItem('access_token', data.token);
      dispatch({type: "IS_LOGIN"});
    } catch (error) {
      console.log(error)
    }
  }
}

export const GetAllUser = (_userId) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.GetAllUser();
      dispatch({
        type: "GET_FRIEND_USERS",
        userId: _userId,
        content: data.filter(item => item.user?.id !== _userId)
      })
      dispatch({
        type: "GET_NOT_FRIENDS_USERS",
        userId: _userId,
        content: data.filter(item => item.user?.id !== _userId)
      })
      // console.log(data.filter(item => item.user.id !== _userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const findUserByName = (_name, _userId) => {
  return async (dispatch) => {
   try {
    let {data} = await UserServices.findUserByName(_name);
    dispatch({
      type: "GET_USER_FOUND",
      content: data.filter(item => item.user?.id !== _userId)
    })
    dispatch({type: "IS_LOADED_SEARCH"})
   } catch (error) {
    console.log(error)
   }
  }
}

export const sendRequestFriend = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.sendRequestFriend(_data);
      // dispatch(getRequestHasSend(_data.userSend))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRequestHasSend = (_id) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.getRequestHasSend(_id);
      dispatch({
        type: "GET_REQUEST_HAS_SEND",
        content: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRequestHasGet = (_id) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.getRequestHasGet(_id);
      dispatch({
        type: "GET_REQUEST_HAS_GET",
        content: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const DeleteRequestFriend = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.DeleteRequestFriend(_data);
    } catch (error) {
      console.log(error);      
    }
  }
}

export const AddFriendAPI = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.AddFriend(_data);
      dispatch(GetAllUser(_data.userId))
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
}

export const GetUserByUserId = (_id) => {
  return async (dispatch) => {
    try {
      let {data} = await UserServices.GetUserByUserId(_id);
      dispatch({
        type: "GET_USER_INFO",
        content: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}