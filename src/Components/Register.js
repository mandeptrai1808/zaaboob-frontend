import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
export default function Register() {
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
          console.log(value);
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
        <Button color="success" className="w-full" type="submit" variant="contained">
          Register
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
