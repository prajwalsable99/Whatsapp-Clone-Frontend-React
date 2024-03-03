
export const giveChatUserName =(chat,requserid)=>{

    if(chat.users[0].id===requserid){
        return chat.users[1].full_name;
    }else{
        return chat.users[0].full_name;
    }


}

export const giveChatUserPhoto =(chat,requserid)=>{

    if(chat.users[0].id===requserid){
        return chat.users[1].profile_picture;
    }else{
        return chat.users[0].profile_picture;
    }


}

export const giveGroupName =(chat)=>{
    return chat.chat_name;
}

export const giveGroupDp =(chat)=>{
    return chat.chat_image;
}