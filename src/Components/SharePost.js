import { Button } from 'antd';
import React from 'react'
import {  Typography } from 'antd';
import { useParams, useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

export default function SharePost(props) {
  return (
    <div>
        <p className='font-bold'>Copy this link and send it for other people:</p>
        <Paragraph className='border p-2 text-lg' copyable>{`https://localhost:3000/post/${props.postId}`}</Paragraph>
    </div>
  )
}