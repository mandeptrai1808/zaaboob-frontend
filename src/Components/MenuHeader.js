import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';

import {useSelector, useDispatch} from 'react-redux';

import { NavLink, useNavigate } from "react-router-dom";

export default function MenuHeader() {

  const {isPage} = useSelector(state => state.MenuReducer);
  const dispatch = useDispatch();

  return (
    <div className='w-full px-5 grid items-center grid-cols-10 fixed md:top-0 bottom-0 bg-white z-10 h-16 shadow-md border-t border-black'>
        <div className='col-span-2 pl-5 md:block hidden'>
            <h1 className='text-2xl font-bold'>ZABOOB</h1>
        </div>
        <div className='md:col-span-6 col-span-10 flex justify-center'>
           <div className='flex md:justify-center justify-around w-full'>
            <NavLink to={'/'} onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 0
              })
            }}>
              {isPage === 0 ? 
              <HomeIcon className='md:mx-10 border-b-4 border-black ' fontSize='large'/> : 
              <HomeOutlinedIcon className='md:mx-10' fontSize='large'/>}
            </NavLink>

            <NavLink to={'/'} onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 1
              })
            }}>
              {isPage === 1 ? 
              <GroupIcon className='md:mx-10 border-b-4 border-black ' fontSize='large'/> : 
              <GroupOutlinedIcon className='md:mx-10' fontSize='large'/>}
            </NavLink>

            
            <NavLink to={'/'} onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 2
              })
            }}>
              {isPage === 2 ? 
              <ChatIcon className='md:mx-10 border-b-4 border-black ' fontSize='large'/> : 
              <ChatOutlinedIcon className='md:mx-10' fontSize='large'/>}
            </NavLink>

            <NavLink to={'/'} onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                page: 3
              })
            }}>
              {isPage === 3 ? 
              <PersonIcon className='md:mx-10 border-b-4 border-black ' fontSize='large'/> : 
              <PersonOutlineOutlinedIcon className='md:mx-10' fontSize='large'/>}
            </NavLink>

           </div>
        </div>
        <div className='col-span-2  justify-end  md:flex hidden'>
             <div className='mr-2 w-10 h-10 flex justify-center items-center rounded-full shadow-md'>
              <SearchIcon fontSize='large'/>
            </div>
            <div className='mr-2 w-10 h-10 flex justify-center items-center rounded-full shadow-md'>
              <NotificationsNoneIcon fontSize='large'/>
            </div>
            <div style={{
              backgroundImage: `url(https://i.kym-cdn.com/photos/images/newsfeed/000/302/073/d83.png)`,
              backgroundSize: 'cover',
              backgroundPosition:  'center'
            }} className="w-10 h-10 rounded-full shadow-md">
            </div>
           
        </div>
    </div>
  )
}
