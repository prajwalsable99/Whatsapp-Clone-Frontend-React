import React from 'react';
const MessageComponent = ({ isReqUser, content, userdp, username, isgroup, timestamp }) => {
  const messageAlignment = isReqUser ? 'justify-end' : 'justify-start';


  const timeDiff = (timestamp) => {

    if(timestamp===null){
        return "10 years ago";

    }

    const date = new Date(timestamp);

    const diff = Date.now() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 24);

    if (weeks > 0) {
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } if (hours > 0) {
        return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } if (minutes > 0) {
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    }  if(seconds>0){
        return seconds + " second" +(seconds===1?"":"s") + " ago";
    }





}




  return (
    <div >


      <div className={`flex ${messageAlignment} mt-1 items-center space-x-1`}>

        <div>
          {
            isgroup && !isReqUser && <img
              className='h-8 w-8 rounded rounded-full'
              src={userdp || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />

          }
        </div>


        <div className={`relative max-w-[50%] ${isReqUser ? 'bg-[#d9fdd3]' : 'bg-[#ffffff]'} p-2 rounded-lg`}>
          {isgroup && <p className='text-xs text-blue-500'>{username}</p>}
          <p className='text-sm'>{content}</p>
        </div>




        <div>
          {
            isgroup && isReqUser && <img
              className='h-8 w-8 rounded rounded-full'
              src={userdp || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />

          }
        </div>

      </div>

      {/* time ago */}

     <div className={`flex ${messageAlignment} mb-2 items-center pl-2 space-x-1`}>
     {
        
        <div>
        <p style={{ fontSize: '0.6rem' }} className='text-xs font-thin'>{timeDiff(timestamp)}</p>
    </div>
    

      }
     </div>



    </div>
  );
};

export default MessageComponent;
