import React, { useEffect, useState } from 'react'
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { MdOutlineAddComment } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { SiCircle } from "react-icons/si";
import ChatCard from './chat/ChatCard';
import DefaultChatHome from './chat/DefaultChatHome';
import ChatComponent from './chat/ChatComponent';
import ProfileComp from './ProfileComp';
import { useNavigate } from 'react-router-dom';
import MenuComp from './menu/MenuComp';
import { useDispatch, useSelector } from 'react-redux';
import { requserAction, searchUserAction } from '../redux/auth/AuthAction';
import { createChatAction, getUserChatsAction } from '../redux/chat/ChatAction';
import { giveChatUserName, giveChatUserPhoto, giveGroupDp, giveGroupName } from '../config/Helper';

const HomePage = () => {

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const { requser, searchedusers } = useSelector(store => store.auth);


    // console.log(requser)
    const [profileTab, setProfileTab] = useState(false);

    const toggleProfile = () => {
        setProfileTab(!profileTab)
    }

    useEffect(() => {
        // Check if token is absent, then redirect to signin page
        if (!token) {
            navigate('/signin');
        } else {

            dispatch(requserAction(token))

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate,profileTab,token]);


    const [query, setQuery] = useState("");

   

    

    const handleCreateChat = (userId) => {
        // console.log(userId)

        const reqdata = {
            data: {
                userId
            },
            token
        }
        // console.log(reqdata)
        dispatch(createChatAction(reqdata))
        setQuery("")
    }

    const { userchats, createdchat, createdgroup } = useSelector(store => store.chat);
    useEffect(() => {
        if(token){

            dispatch(getUserChatsAction(token));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdchat, createdgroup,])

    const [currentChat, setCurrentChat] = useState(null);
    const startchat=(item)=>{
        // console.log(item)
        setCurrentChat(item)
    }

    const handleQuery = (e) => {
        setQuery(e.target.value)

        const reqdata = {
            query: e.target.value,
            token
        }
        // console.log(reqdata)

        dispatch(searchUserAction(reqdata))

    }






    return (
        <div className='relative  '>
            <div className='  bg-[#00A884] py-16'></div>


            <div className='flex absolute w-full top-5 left-10    w-[95%]  h-[95vh]'>

                {/* left part */}

                {
                    profileTab ?
                        <ProfileComp goback={toggleProfile} />
                        :


                        <div className='left w-[30%] h-full bg-white ' >
                            <div className='w-full '>

                                {/* req user */}
                                <div className='flex p-2 justify-between border bg-gray-100'>
                                    <div className='flex items-center space-x-4 text-lg'>
                                        <img src={ requser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" }alt="profile"
                                            className='rounded-full cursor-pointer w-10 h-10 '
                                            onClick={toggleProfile}
                                        />
                                        <p>{requser?.full_name}</p>
                                    </div>

                                    <div className='align-items justify-center pt-3 space-x-4 text-2xl flex'>
                                        <SiCircle className='cursor-pointer ' onClick={() => { navigate("/status") }} />
                                        {/* <MdOutlineAddComment className='cursor-pointer' /> */}
                                        <MenuComp />
                                        {/* <BsThreeDotsVertical/> */}
                                    </div>
                                </div>
                                {/* search bar */}
                                <div className='relative flex p-2 justify-between border bg-white mb-2' >
                                    <FaSearch className='absolute inset-y-0 left-2 my-auto ml-2' />

                                    <input
                                        type="text"
                                        className="w-full py-2 px-10 rounded-lg  focus:border-gray-400 bg-gray-100 outline-none"
                                        placeholder="Search or start new chat"

                                        value={query}
                                        onChange={handleQuery}
                                    />



                                </div>

                                {/* { to create new user chats -> chat-user-cards} */}
                                <div className='h-[75vh] overflow-y-auto'>

                                    {query !== "" && searchedusers?.length > 0 &&
                                        searchedusers && searchedusers.map((item) =>
                                        (
                                            <div key={item?.id} onClick={() => { handleCreateChat(item?.id) }}>
                                                <  ChatCard key={item?.id}
                                                    name={item?.full_name}
                                                    profile_pic={item?.profile_picture}
                                                    isChat={false}
                                                    isGroup={false}
                                                />
                                            </div>

                                        ))
                                    }

                                    {query === "" && userchats && userchats?.length > 0 &&
                                        userchats.map((item) =>
                                        (
                                            item.group ?
                                                <div key={item?.id} onClick={()=>{startchat(item)}} >
                                                    <  ChatCard key={item?.id}

                                                        name=
                                                        {giveGroupName(item)}
                                                        profile_pic={giveGroupDp(item)}
                                                        isChat={true}
                                                        isGroup={true}
                                                    />
                                                </div>
                                                :
                                                <div key={item?.id} onClick={()=>{startchat(item)}} >
                                                    <  ChatCard key={item?.id}

                                                        name=
                                                        {giveChatUserName(item, requser?.id)}
                                                        profile_pic={giveChatUserPhoto(item, requser?.id)}
                                                        isChat={true}
                                                        isGroup={false}
                                                    />
                                                </div>

                                        ))
                                    }



                                </div>


                            </div>


                        </div>
                }


                {/* right part */}
                <div className='right w-[65%] h-full bg-white border-r'>

                    {
                        currentChat!==null?
                            <ChatComponent chatdata={currentChat} /> :
                            <DefaultChatHome  />
                    }

                </div>

            </div>


        </div>
    )
}

export default HomePage
