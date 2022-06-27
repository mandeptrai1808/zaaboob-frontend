import { height } from "@mui/system";
import { Button } from "antd";
import React, { useState } from "react";

export default function KhaBanhFan() {
  const [speed, setSpeed] = useState(1);
  return (
    <div
      style={{
        backgroundImage:
          "url(https://c.tenor.com/21pd89_xRqYAAAAd/disco-club.gif)",
        backgroundPosition: "center",
        backgroundSize: 'cover',
        height: 700
      }}
      className="w-full pt-14 flex justify-center"
    >
      <div className="relative">
        <div
          className={`w-96 z-20 relative duration-100 rounded-full animate-spin${speed} h-96 border-4`}
        >
          <img alt="khabanh" src="/khabanhfan.png"></img>
        </div>
        <img
          className="absolute z-10 top-20 scale-150 left-0"
          alt="quat"
          src="dequat.png"
        ></img>
        <div className="absolute bottom-32 left-28  z-30">
        <button
          className="duration-200 hover:scale-110 w-10 h-10 bg-black rounded-full"
          onClick={() => {
            setSpeed(0);
          }}
        >
          Off
        </button>
        <button
          className={`duration-200 hover:scale-110 w-10 h-10 rounded-full ${
            speed == 1 ? "bg-slate-300" : "bg-white"
          }`}
          onClick={() => {
            setSpeed(1);
          }}
        >
          1
        </button>
        <button
          className={`duration-200 hover:scale-110 w-10 h-10 rounded-full ${
            speed == 2 ? "bg-slate-300" : "bg-white"
          }`}
          onClick={() => {
            setSpeed(2);
          }}
        >
          2
        </button>
        <button
          className={`duration-200 hover:scale-110 w-10 h-10 rounded-full ${
            speed == 3 ? "bg-slate-300" : "bg-white"
          }`}
          onClick={() => {
            setSpeed(3);
          }}
        >
          3
        </button>
      </div>
      </div>
   
    </div>
  );
}
