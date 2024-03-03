import { CREATE_MESSAGE, GET_ALL_MESSAGES } from "./MessageActionType";


export const createMessageAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/messages/send",
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


        // console.log("created message data", response)


        dispatch({ type: CREATE_MESSAGE, payload: response })




    } catch (error) {

        console.log(error)

    }
}



export const getMessagesAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            `http://localhost:8080/api/messages/chat/${data.chatId}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                }

            }
        );


        const response = await res.json();

        // console.log("current chat messages ", response)


        dispatch({ type: GET_ALL_MESSAGES, payload: response })



    } catch (error) {

        console.log(error)
    }
}