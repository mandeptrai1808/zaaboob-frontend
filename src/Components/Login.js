import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { yellow } from "@mui/material/colors";
export default function Login() {

    const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setDataLogin({
      ...dataLogin,
      [name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // your submit logic
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold mb-5">LOGIN</h1>
      <ValidatorForm
        className="w-full"
        // ref="form"
        onSubmit={(value) => {
          //   handleSubmit(value)
          console.log(value);
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
        <Button className="w-full" type="submit" variant="contained">
          Login
        </Button>
        <p className="my-5">
          Don't have account?{" "}
          <span onClick={() => {
            navigate("/register")
          }} className="text-blue-600 cursor-pointer hover:text-blue-400">
            Register now
          </span>
        </p>
        <p className="mb-5">Or login with:</p>
        <div className="flex justify-center">
            <div>
                <GoogleIcon sx={{ color: yellow[900] }} fontSize="large" className="mx-2 duration-200 cursor-pointer hover:scale-125"/>
                <FacebookRoundedIcon color="primary" fontSize="large" className="mx-2 duration-200 cursor-pointer hover:scale-125"/>
            </div>
        </div>
      </ValidatorForm>
    </div>
  );
}
