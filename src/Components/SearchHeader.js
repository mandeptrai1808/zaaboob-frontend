import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Input } from '@mui/material';
export default function SearchHeader() {
  return (
    <div>
        <div className='fixed md:hidden flex px-5 items-center  justify-between z-20 top-0 left-0 h-10 w-full bg-white shadow-md'>
            
               <div className='w-10 flex justify-center mr-10'>
               <SearchIcon/>
               </div>
                <Input className='w-full' placeholder='Search...'/>
                <div className='w-10 flex justify-center ml-10'>
                <ImageIcon/>
                </div>
                <div className='w-10 flex justify-center'>
                <NotificationsIcon/>
                </div>
            
        </div>

    </div>
  )
}
