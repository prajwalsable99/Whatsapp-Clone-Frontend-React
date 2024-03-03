import React from 'react'

const ChatCard = ({name,profile_pic,isGroup,isChat}) => {
    return (
        <div className='flex items-center    w-full p-2  cursor-pointer'>
            <div className='mr-4 '>
                <img src= { profile_pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile"
                    className='rounded-full cursor-pointer w-10 h-10 '
                />

            </div>
            <div className='flex flex-col w-[85%] border-b pb-2'>
                <div className='flex justify-between '>
                    <p>{name}</p>
                    { !isChat? <div></div>:
                        <p className='text-xs font-thin'></p>}
                </div>

              {isChat &&  <div className='flex justify-between align-items item-center'>
                    <p className='text-sm font-thin'></p>
                    <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full text-white text-xs font-thin">
                        
                    </div>


                </div>}
            </div>

        </div>
    )
}


export default ChatCard
