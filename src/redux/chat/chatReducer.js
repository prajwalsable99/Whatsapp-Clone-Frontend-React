import { CREATE_CHAT, CREATE_GROUP, USER_CHATS } from "./ChatActionType"

const initialValues = {
    createdchat:null,
    createdgroup:null,
    userchats: []

}

export const ChatReducer = (store = initialValues, action) => {

    if (action.type === CREATE_CHAT) {

        return { ...store, createdchat: action.payload }
    } else if (action.type === CREATE_GROUP) {

        return { ...store, createdgroup: action.payload }
    } else if (action.type === USER_CHATS) {

        return { ...store, userchats: action.payload }
   

    }
    return store;
    

}