import { GET_ALL_STORIES, GET_CURRENT_USER_STORIES } from "./StoryActionType";

export const getStoriesAction = (token) => async (dispatch) => {


    try {

        const res = await fetch(
            `http://localhost:8080/api/stories/all`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }

            }
        );


        const response = await res.json();

        


        dispatch({ type:GET_ALL_STORIES, payload: response })



    } catch (error) {

        console.log(error)
    }
}

export const getReqUserStoriesAction = (token) => async (dispatch) => {


    try {

        const res = await fetch(
            `http://localhost:8080/api/stories/mystory`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " +token,
                }

            }
        );


        const response = await res.json();

       


        dispatch({ type:GET_CURRENT_USER_STORIES, payload: response })



    } catch (error) {

        console.log(error)
    }
}