import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../Redux/Actions/UserActions";
export default function Register() {
  const {loginLoading} = useSelector(state => state.LoadingReducer)
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })

    const handleChange = (event) => {
        const name = event.target.name;
        setDataRegister({
          ...dataRegister,
          [name]: event.target.value,
        });
      };
  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold mb-5">REGISTER</h1>
      <ValidatorForm
        className="w-full"
        // ref="form"
        onSubmit={(value) => {
          //   handleSubmit(value)
          dispatch(RegisterUser(dataRegister));
          console.log(dataRegister);
        }}
        // onError={errors => console.log(errors)}
      >
         <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Name"
          onChange={(e) => {
            handleChange(e);
          }}
          name="name"
          value={dataRegister.name}
          validators={["required"]}
          errorMessages={["type your username please!"]}
        />
        <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Email"
          onChange={(e) => {
            handleChange(e);
          }}
          name="email"
          value={dataRegister.email}
          validators={["required", "isEmail"]}
          errorMessages={["type your email please!", "email is not valid"]}
        />
        <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Phone"
          onChange={(e) => {
            handleChange(e);
          }}
          name="phone"
          value={dataRegister.phone}
          validators={["required"]}
          errorMessages={["type your phone please!"]}
        />
        <TextValidator
          style={{ marginBottom: 10 }}
          className="w-full"
          label="Password"
          onChange={(e) => {
            handleChange(e);
          }}
          name="password"
          value={dataRegister.password}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <Button loading={loginLoading}  className="w-full" type="danger" htmlType="submit" >
          <p>Register</p>
        </Button>
        <p className="my-5">
            Have an account?{" "}
          <span onClick={() => {
            navigate("/login")
          }} className="text-blue-600 cursor-pointer hover:text-blue-400">
            Login now
          </span>
        </p>
      </ValidatorForm>
    </div>
  )
}
