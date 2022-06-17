import React from 'react'
import MenuHeader from '../Components/MenuHeader'

export default function HomeTemplate(props) {
  return (
    <div>
        <div style={{backgroundColor: "#F6F7FB"}} className="h-screen fixed top-0 left-0 w-screen z-0"></div>
        <MenuHeader/>
        {props.component}
    </div>
  )
}
