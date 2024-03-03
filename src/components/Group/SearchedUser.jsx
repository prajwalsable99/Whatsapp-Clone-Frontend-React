import React from 'react'

const SearchedUser = ({item}) => {
    return (

        <div className='flex items-center     w-full p-2  cursor-pointer'>
            <div className='mr-4 '>
                <img src={ item?.profile_picture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile"
                    className='rounded-full cursor-pointer w-10 h-10 '
                />

            </div>
            <div className={ 'flex flex-col w-[85%] border-b pb-2'}>
                <div className='flex flex-col justify-center '>
                    <p className='text-sm' >{  item?.full_name}</p>
                    {/* <p className='text-xs font-thin'>today at 12:45</p> */}
                </div>


            </div>



        </div>
    )
}

export default SearchedUser

