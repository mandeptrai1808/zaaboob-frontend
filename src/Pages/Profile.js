import React, {useEffect} from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../Components/CreatePost';
import { GetPostsByUserId } from '../Redux/Actions/PostActions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Post from '../Components/Post';
import { Skeleton, Typography  } from "antd";

import UploadImageProfile from '../Components/UploadImageProfile';
import { UpdateUser } from '../Redux/Actions/UserActions';

const { Paragraph } = Typography;
export default function Profile() {

    let userData = localStorage.getItem("login_user");
    userData = userData && JSON.parse(userData);
    
 
  const {isLogin} = useSelector(state => state.UserReducer);

    const dispatch = useDispatch();
    const {userPosts} = useSelector(state => state.PostReducer);

    const contentPosts = () => {
        return userPosts.map((item, index) => {
          return <Post key={index} typeAction = "_USER" ownPostId={userData.id} postIndex = {index} content={item} />;
        });
      };

    const UpdateName = (_name) => {
      let data = {name: _name};
      dispatch(UpdateUser(userData.id,data));
    }
    useEffect(() => {
      dispatch(GetPostsByUserId(userData.id));
    }, [])
  return (
    <div className='relative z-10 md:pt-10 pb-20'>
        <div className='w-full h-72 bg-slate-400' style={{
            backgroundImage: `url(https://th.bing.com/th/id/R.646bb3bf4fea68a70dcd87c14a8ae55f?rik=dXnCQdw%2bgijJZw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2ff%2f5%2f8%2f1244590-peaceful-anime-wallpaper-1920x1080-for-meizu.jpg&ehk=uy18lux1zF2s7IROqMpBmcN7ReTdkWzqi2r2NP6t8uY%3d&risl=&pid=ImgRaw&r=0)`,
            backgroudPosition: 'center',
            backgroundSize: 'cover'
        }}>
        
        </div>

       <div className='w-full flex justify-center md:justify-start items-end md:pl-40  absolute top-52 md:top-64'>
       <div
          style={{
            backgroundImage: `url(${userData.avatar.replaceAll('\\', '/')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`w-40 duration-500 h-40 relative rounded-full shadow-md`}
        >
            <div onClick={() => {
        dispatch({
          type: "OPEN_MODEL",
          title: "Change your avatar",
          content: <UploadImageProfile/>
        })
      }} className='w-10 right-0 flex justify-center items-center h-10 rounded-full shadow-md bg-white hover:scale-110 hover:bg-slate-500 duration-200 cursor-pointer absolute bottom-0'>
                <CameraAltIcon/>
            </div>
        </div>

        <div className='ml-10 hidden md:block'>
            <Paragraph editable={{
          tooltip: 'click to edit text',
          onChange: (value) => {
            UpdateName(value)
          }
        }} className='text-3xl font-bold' style={{marginBottom: 10}}>{userData.name}</Paragraph>
            <p className='text- mb-0'>1,4K friends</p>
        </div>
       </div>
       <div className='mt-28 block md:hidden w-full text-center'>
            <Paragraph editable={{
          tooltip: 'click to edit text',
          onChange: (value) => {
            UpdateName(value)
          }
          // triggerType: chooseTrigger,
        }} className='text-3xl'>{userData.name}</Paragraph>
            <p className='text- mb-0'>1,4K friends</p>
        </div>

        <div className="flex w-full px-5 justify-center md:pt-40 pt-2">
        <div className="md:w-2/5 w-full h-40 md:p-5">
            <div onClick={() => {
        dispatch({
          type: "OPEN_MODEL",
          title: "Create your post",
          content: <CreatePost/>
        })
      }} className='w-full h-10 border flex bg-white rounded-md hover:shadow-md justify-between items-center px-5'>
                <div>
                    <p className='m-0'>What are you thinking?</p>
                </div>
                <div>
                    <ImageIcon style={{color: 'greenyellow'}}/>
                </div>
            </div>

            <div>
            { (userPosts) ? contentPosts() : 
            <div>
              <Skeleton active avatar paragraph={{ rows: 5 }} />
              <Skeleton active avatar paragraph={{ rows: 5 }} />
              </div>}
            </div>
        </div>
      </div>
    </div>
  )
}
