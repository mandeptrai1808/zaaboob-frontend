import { Button, Input } from 'antd';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function UploadImage() {
     const dispatch = useDispatch();
     const {listFile} = useSelector(state => state.FileImageReducer)
     const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className='w-full'>
    <h1 className='border-t'>Upload Image:</h1>
    <p className='m-0 opacity-50'>{listFile.length} images is selected</p>
    {listFile.map((item, index) => {
      return <div  key={index} className='flex justify-between my-1 py-1 border-b'>
         <p className='m-0'>{item.name}</p>
         <Button onClick={() => {
           dispatch({
            type: "DELETE_IMAGE",
            id: index
           })
         }}>Delete</Button>
         </div>
    })}
    {selectedImage && (
      <div className='my-5'>
        <div style={{
          backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }} className='w-full md:w-40 h-40 flex items-end'>
           {/* <button className='w-full bg-black bg-opacity-50 text-white'>Click to Upload >></button> */}
        </div>
      {/* <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} /> */}
      </div>
    )}

    <input
      type="file"
      name="myImage"
      accept="image/png, image/jpeg"
      onChange={(event) => {
        console.log(event.target.files[0]);
        dispatch({
          type: "ADD_IMAGE",
          content: event.target.files[0]
        })
        setSelectedImage(event.target.files[0]);
      }}
    />
   
  </div>
  )
}
