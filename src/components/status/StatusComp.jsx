import React, { useEffect, useState } from 'react';
// import ChatCard from '../chat/ChatCard';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import StatusUserCard from './StatusUserCard';
import { FaLock } from "react-icons/fa";
import StatusViewer from './StatusViewer';
import curimg from '../../assets/images/def_home2.JPG'
import { useDispatch, useSelector } from 'react-redux';
import { getReqUserStoriesAction, getStoriesAction } from '../../redux/story/storyAction';
import { requserAction } from '../../redux/auth/AuthAction';
const StatusComp = (requserid) => {
    const [status, setStatus] = useState([]); // Initialize status state
    const navi = useNavigate();

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    useEffect(() => {
        // Check if token is absent, then redirect to signin page
        if (!token) {
            navi('/signin');
        } else {
            dispatch(requserAction(token))
            dispatch(getStoriesAction(token))

                dispatch(getReqUserStoriesAction(token))
            

            

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navi, token]);


    const { allstories, mystories } = useSelector(store => store.story);
    const { requser} = useSelector(store => store.auth);

    return (
        <div className='flex justify-center w-full p-4 '>
            <div className='flex w-[85%] mt-3'>
                {/* left */}
                <div className='w-[35%] bg-white'>
                    <div className='bg-[#008069] h-[10vh] flex flex-col justify-between py-2 px-6'>
                        <div></div>
                        <div className='flex text-white items-center text-xl space-x-7'>
                            <FaLongArrowAltLeft className='cursor-pointer' onClick={() => { navi(-1) }} />
                            <p>Status</p>
                        </div>
                    </div>
                    {/* user status */}
                    <div className='bg-white p-2 mb-4' onClick={() => { setStatus(mystories) }}>
                        <StatusUserCard isreq={true} stories={mystories} />
                    </div>




                    <div className='pl-6 text-xs mb-2 text-green-600'>
                        <p>RECENT</p>
                    </div>
                    
                    
                    
                    {/* friends status */}
                    <div className='h-[60vh]  overflow-y-auto bg-white'>


                        {
                            allstories && Object.keys(allstories).map(key => {
                                // Check if the user id is equal to the requserid
                                if (allstories[key][0].user.id !== requser?.id) {
                                    return (
                                        <div key={key} onClick={() => { setStatus(allstories[key]) }}>
                                            <StatusUserCard key={key} isreq={false} stories={allstories[key]} />
                                        </div>
                                    );
                                } else {
                                    return null; // If user id matches requserid, don't render the card
                                }
                            })
                        }




                    </div>
                    <div className='flex justify-center text-xs font-thin items-center m-2'>
                        <FaLock className='text-gray-500 ' />
                        <p>Your status are end to end iencrypted</p>
                    </div>
                </div>
                {/* right */}
                <div className='w-full h-full  p-4 border'>
                    {status.length===0 ? (
                        <div className='w-full flex  h-full justify-center items-center bg-gray-100'>
                            <img className='h-[80vh] ' src={curimg} alt="" />
                        </div>
                    ) : (
                        <div className='w-full flex bg-black h-full justify-center items-center'>
                            <StatusViewer stories={status}  />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StatusComp;
