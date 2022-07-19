import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GetHistoriesChat } from '../Redux/Actions/ChatAction';
import ListChat from '../Components/ListChat';
import ChatBoard from '../Components/ChatBoard';

export default function ChatDetail() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

 
  return (
    <div className='relative md:z-10 z-50 h-screen md:mt-5 grid grid-cols-10 pt-0'>

      <div className='md:col-span-3 col-span-10 md:pt-5  hidden md:block'>
        <ListChat/>
      </div>

      <div className='md:col-span-7 col-span-10 w-full'>
        <ChatBoard/>
        </div> 

    </div>
  )
}
