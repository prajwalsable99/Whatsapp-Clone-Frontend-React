import React from 'react'

const StatusUserCard = ({ isreq, stories }) => {

    // console.log(stories?.[0]?.user.profile_picture )

    return (
        <div className='flex items-center     w-full p-2  cursor-pointer'>
            <div className='mr-4 '>
                {
                    
                    <img src={stories?.[0]?.user.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile"
                        className={`rounded-full cursor-pointer w-10 h-10 ' ${stories.length !== 0 && 'border border-green-400'}`
                 } />
                }

            </div>
            <div className={isreq ? 'flex flex-col w-[85%] pb-2' : 'flex flex-col w-[85%] border-b pb-2'}>
                <div className='flex flex-col justify-center '>
                    <p className='text-sm' >{isreq ? "My Status" : stories?.[0]?.user.full_name}</p>
                    {/* <p className='text-xs font-thin'>today at 12:45</p> */}
                </div>


            </div>

        </div>
    )
}

export default StatusUserCard
