import { GET_ALL_STORIES, GET_CURRENT_USER_STORIES } from "./StoryActionType";


const initialValues = {
  
    
    allstories: null,
    mystories:[]

}

export const storyReducer = (store = initialValues, action) => {

    if (action.type === GET_ALL_STORIES) {

        return { ...store, allstories: action.payload }
    } else if (action.type === GET_CURRENT_USER_STORIES) {

        return { ...store, mystories: action.payload }
    } 
    return store;
    

}