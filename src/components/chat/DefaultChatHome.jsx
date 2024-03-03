import React from 'react'
import def_home from '../../assets/images/def_home.JPG'
const DefaultChatHome = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
    <img src={def_home} alt="Default Chat Home" className="max-h-full max-w-full" />
  </div>
  )
}

export default DefaultChatHome 
