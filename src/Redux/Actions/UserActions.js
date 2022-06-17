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