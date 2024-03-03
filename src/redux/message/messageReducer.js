import { CREATE_MESSAGE, GET_ALL_MESSAGES } from "./MessageActionType"

const initialValues = {
    createdmessage:null,
    
    chatmessages: []

}

export const messageReducer = (store = initialValues, action) => {

    if (action.type === CREATE_MESSAGE) {

        return { ...store, createdmessage: action.payload }
    } else if (action.type === GET_ALL_MESSAGES) {

        return { ...store, chatmessages: action.payload }
    } 
    return store;
    

}