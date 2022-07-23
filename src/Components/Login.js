import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import FacebookLogin from 'react-facebook-login';
import { LoginUser, LoginWithFacebook } from "../Redux/Actions/UserActions";
export default function Login() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.UserReducer);
  const {loginLoading} = useSelector(state => state.LoadingReducer)
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });



  const responseFacebook = (response) => {
    console.log(response);
    if (response.id){
      const {name, id} = response;
      const avatar = response.picture.data.url;
      dispatch(LoginWithFacebook({
        name,avatar,email:id
      }))
      console.log({name, id, avatar})
    }
  }
  //---------------------------------

  const handleChange = (event) => {
    const name = event.target.name;
    setDataLogin({
      ...dataLogin,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    if (userData) navigate('/')
  },[])

  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold mb-5">LOGIN</h1>
      <ValidatorForm
        className="w-full"
        // ref="form"
        onSubmit={(value) => {
          //   handleSubmit(value)
          dispatch({type: "IS_LOADING_LOGIN"})
          dispatch(LoginUser(dataLogin))
        }}
        // onError={errors => console.log(errors)}
      >
        <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Email"
          onChange={(e) => {
            handleChange(e);
          }}
          name="email"
          value={dataLogin.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Password"
          onChange={(e) => {
            handleChange(e);
          }}
          name="password"
          value={dataLogin.password}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <Button loading={loginLoading} className="w-full" type="primary" htmlType="submit">
          <p>Login</p>
        </Button>
        <p className="my-5">
          Don't have account?{" "}
          <span onClick={() => {
            navigate("/register")
          }} className="text-blue-600 cursor-pointer hover:text-blue-400">
            Register now
          </span>
        </p>
        <p className="mb-5">Or:</p>
        <div className="flex justify-center">
        <FacebookLogin
        size="small"
              className="w-full"
              appId="365424885678956"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          
        </div>
      </ValidatorForm>
    </div>
  );
}
