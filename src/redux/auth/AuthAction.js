import { LOG_OUT, REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP, UPDATE_USER } from "./AuthActionType";

export const sigupAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(data)

            }
        );


        const resp = await res.json();

        // console.log("sign up user data", resp)

        if(resp.auth){

            dispatch({ type: SIGN_UP, payload: resp })
            return resp;
        }else{
            dispatch({ type: SIGN_UP, payload: null})
            return null;
        }




    } catch (error) {
        dispatch({ type: SIGN_UP, payload: null})
        console.log(error)
        return null;
    }
}

export const siginAction = (data) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(data)

            }
        );


        const resp = await res.json();
        // console.log("sign in user data", resp);
        if(resp.auth){

            localStorage.setItem("token",resp.jwt);
            dispatch({ type: SIGN_IN, payload: resp })
            return resp;
        }else{
            dispatch({ type: SIGN_IN, payload: null})
            return null;
        }
        



    } catch (error) {

        console.log(error)
        dispatch({ type: SIGN_IN, payload: null})
    }
}

export const LogoutAction = () => async (dispatch) => {


    try {

        localStorage.removeItem("token");
        

        dispatch({type:LOG_OUT,payload:null})
        // console.log("logged out action")



    } catch (error) {

        console.log(error)
    }
}

export const requserAction = (jwt) => async (dispatch) => {


    try {

        const res = await fetch(
            "http://localhost:8080/api/users/profile",

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                }

            }
        );


        const requser = await res.json();

        // console.log("req  user data", requser)


        dispatch({ type: REQ_USER, payload: requser })



    } catch (error) {

        console.log(error)
    }
}

export const updateUserAction = (data) =>
    async (dispacth) => {

        try {

            const res = await fetch(
                `http://localhost:8080/api/users/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + data.token,
                    },
                    body: JSON.stringify(data.data),
                },

            );

            const user = await res.json();
            // console.log("updated user :", user)
            dispacth({ type: UPDATE_USER, payload: user });

        } catch (error) {
            console.log(error)
        }

    }

export const searchUserAction = (data) =>
    async (dispacth) => {

        try {

            const res = await fetch(
                `http://localhost:8080/api/users/search?query=${data.query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + data.token,
                    }

                }
            );

            const users = await res.json();
            // console.log("searched :", users)
            dispacth({ type: SEARCH_USER, payload: users });

        } catch (error) {
            console.log(error)
        }

    }