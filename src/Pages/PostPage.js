import React, {useDebugValue, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../Components/Post';
import { GetPostById } from '../Redux/Actions/PostActions';
import PostDetailPage from '../Components/PostDetailPage';
export default function PostPage() {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const {postPageData} = useSelector(state => state.PostReducer);

    
    useEffect(() => {
      dispatch(GetPostById(postId))
    }, [])
  return (
    <div className='md:pt-10 pb-20 flex justify-center  pt-5 relative z-10'>
      <div className='md:w-2/5'>
        <PostDetailPage  typeAction = "_USER" ownPostId = {postPageData.postDetail?.id} postIndex = {0} content={postPageData} />
      </div>
    </div>
  )
}
