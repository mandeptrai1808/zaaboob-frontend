import React from 'react'
import Login from '../Components/Login'

export default function UserFormTemplate(props) {
  return (
    <div className='w-screen py-5 h-screen flex justify-center items-center' style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }}>
        <div className='md:h-full h-4/5 p-5 rounded-xl shadow-lg md:w-96 w-4/5 bg-white bg-opacity-90'>
            <h1 className=' border-b opacity-50 mb-5 border-black font-bold'>ZAABOOB</h1>
            {props.component}
        </div>
    </div>
  )
}
