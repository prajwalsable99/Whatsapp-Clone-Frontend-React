import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
// import { conversation } from './SampleConv';
import { FaPlus } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import MessageComponent from './MessageComponent';
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { giveChatUserName, giveChatUserPhoto, giveGroupDp, giveGroupName } from '../../config/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { createMessageAction, getMessagesAction } from '../../redux/message/MessageAction';
const ChatComponent = ({chatdata}) => {

    // console.log(chatdata)

    

    const [content, setContent] = useState("");

    const token=localStorage.getItem("token");
    const dispacth=useDispatch();

    const senMessageData=()=>{

        const messdata={
            token,
            data:{
                chatId:chatdata?.id,
                content:content
            }
            

        }
        // console.log(messdata)
        dispacth(createMessageAction(messdata));


    }

    const sendMessage = (e) => {
        if (e.key === "Enter") {
         
            senMessageData()
          setContent("")
        }
      };

    const sendMessage2=()=>{
        senMessageData()

          setContent("")
    }
    

    const { createdmessage,  chatmessages}=useSelector(store=>store.message);

    const { requser} = useSelector(store => store.auth);
    
    useEffect(() => {
        if (chatdata) {
            const gdata = {
                token,
                chatId: chatdata.id,
            };
            dispacth(getMessagesAction(gdata));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatdata, createdmessage]);
    

   
      
    return (
        <div>
            {/* top name img */}
            <div className='flex justify-between items-center bg-[gray-100] w-full p-2'>
                <div className='flex items-center '>

                    <img src={
                    
                    (chatdata.group?
                        giveGroupDp(chatdata)
                        :
                        giveChatUserPhoto(chatdata,requser?.id)
                    )
                     
                    
                    || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    
                    
                    alt="profile"
                        className='rounded-full cursor-pointer w-10 h-10'
                    />
                    <p className="ml-4">
                        
                        {
                            chatdata.group?
                            giveGroupName(chatdata)
                            :
                            giveChatUserName(chatdata,requser?.id)
                        }
                        
                        </p>
                </div>



                <div className='flex text-xl space-x-3 pr-3 text-gray-500'>
                    <  FaSearch className='cursor-pointer' />
                    <BsThreeDotsVertical className='cursor-pointer' />

                </div>
            </div>

            {/* Messages */}

            <div className='w-full bg-[#efeae2] p-4 overflow-y-auto h-[75vh]'>
                { chatmessages.length>0 && chatmessages.map((item, index) => (
                    
                    <MessageComponent 
                    key={index}
                    isgroup={chatdata?.group}  
                    userdp={item.user.profile_picture} 
                    username={item.user.full_name} 
                      isReqUser={item.user.id===requser?.id}
                       content={item.content} 
                       timestamp={item.timestamp}
                       />
                ))}
            </div>

            

            {/* send message */}

            <div className='flex p-4 items-center border space-x-3 bg-gray-100 mb-2' >

                <FaRegSmile className='text-xl  text-gray-500 cursor-pointer'/>
                <FaPlus className='text-gray-500 cursor-pointer'/>
            



                <input type="text"
                    className="w-full py-2 px-5  rounded-lg  focus:border-gray-400 bg-white outline-none"
                    placeholder="Type a message"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                    onKeyPress={sendMessage}  />

              <div className=''>
              {
                    content===""?
                    <FaMicrophone className='text-gray-500 text-xl cursor-pointer' />
                    :
                    <IoMdSend  className= 'text-2xl text-gray-500 cursor-pointer' onClick={sendMessage2}/>
                }
              </div>



            </div>



        </div>
    )
}

export default ChatComponent
