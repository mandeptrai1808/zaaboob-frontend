import React from 'react'
import { Spin } from 'antd';
export default function LoadingPage() {
  return (
    <div className='fixed -top-2 z-50 w-full h-full bg-black bg-opacity-90 flex justify-center items-center'>
        <Spin  size="large" />
        
    </div>
  )
}
