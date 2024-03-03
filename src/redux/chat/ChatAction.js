import { CREATE_CHAT, CREATE_GROUP, USER_CHATS } from "./ChatActionType";


export const createChatAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/chats/single",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,

                },
                body: JSON.stringify(data.data)

            }
        );


        const response = await res.json();


        // console.log("created chat data", response)


        dispatch({ type: CREATE_CHAT, payload: response })




    } catch (error) {

        console.log(error)

    }
}

export const createGroupAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/chats/group",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,

                },
                body: JSON.stringify(data.data)

            }
        );


        const response = await res.json();


        // console.log("created group data", response)


        dispatch({ type: CREATE_GROUP, payload: response })




    } catch (error) {

        console.log(error)

    }
}

export const getUserChatsAction = (jwt) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/chats/userchats",

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                }

            }
        );


        const response = await res.json();

        // console.log("user chats ", response)


        dispatch({ type: USER_CHATS, payload: response })



    } catch (error) {

        console.log(error)
    }
}