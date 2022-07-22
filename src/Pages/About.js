import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookOutlined,GithubOutlined, YoutubeOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

export default function About() {
  const navigate = useNavigate();

  return (
  <div className='relative w-full h-screen' >
    <div className='h-full w-full bg-slate-200 absolute top-0 left-0'>
        <div className='h-96 w-full bg-slate-500' style={{
          backgroundImage: `url(https://wallpapercave.com/wp/wp6214950.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: "cover"
        }}>

        </div>
    </div>
    <div className='w-full p-5 absolute top-0 left-0 pt-36 flex justify-center'>
      <div className='md:w-2/3 pt-28 pb-10 w-full bg-white rounded-xl shadow-xl'>
        <div className='text-center'>
          <p className='md:text-3xl text-2xl font-bold m-0'>Nguyen Van Man</p>
          <p className='mb-1 opacity-50'>vanman12315@gmail.com</p>
          <p className='md:text-lg opacity-50'>Web developer</p>
        </div>
        <div className='px-10 text-justify md:text-xl'>
          <p>Xin chào, Đây là cái một cái app tên là ZABOOB. Well, thì nó là một cái app mạng xã hội với vài chức năng cơ bản như là đăng bài, thả tym, comment, kết bạn, nhắn tin...Đây là dự án tương đối lớn thứ 3 của tôi, bạn có thể xem thêm những dự án trong link github ở bên dưới. Hi vọng bạn sẽ thích nó, và tất nhiên nếu có bất kì vấn đề gì muốn trao đổi, hãy liên lạc với tối qua các kếnh bên dưới. Cảm ơn vì đã dành thời gian trải nghiệm cái app này. tym :3  </p>
          <div className="text-center md:text-3xl text-2xl mt-5 flex justify-center items-center">
          <a target="_blank" href='https://www.facebook.com/vanmancoder/'><FacebookOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          <a target="_blank" href='https://github.com/mandeptrai1808'><GithubOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          <a target="_blank" href='https://www.youtube.com/channel/UChQQrKebGv_3Cy31KzEjDpg'><YoutubeOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          </div>
        </div>
      </div>
    </div>
    <div className='w-full absolute top-0 left-0 pt-12 flex justify-center'>
      <div className='w-48 h-48 rounded-full relative shadow-2xl' style={{
          backgroundImage: `url(data:image/jpeg;base64,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)`,
          backgroundPosition: 'center',
          backgroundSize: "cover"
        }}  >
      </div>
    </div>
 
    <div className='py-5 md:px-20 px-5'>
    <div className='relative z-20 flex justify-between'>
      <div onClick={() => {
        navigate('/')
      }} className='text-white duration-200 w-10 h-10 rounded-full hover:bg-opacity-50 hover:bg-white hover:text-black flex justify-center items-center border-2'><HomeOutlined/></div>
      <div className='text-white text-2xl'>
       <FacebookOutlined className='mx-2'/>
       <GithubOutlined className='mx-2'/>
      </div>
    </div>
    </div>
  </div>
  )
}
