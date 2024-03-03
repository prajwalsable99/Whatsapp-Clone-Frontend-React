import { LOG_OUT, REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP, UPDATE_USER } from "./AuthActionType"

const initialValues = {

    signup: null,
    signin: null,
    requser: null,
    updateuser: null,
    searchedusers: []

}

export const AuthReducer = (store = initialValues, action) => {

    if (action.type === SIGN_IN) {

        return { ...store, signin: action.payload }
    } else if (action.type === SIGN_UP) {

        return { ...store, signup: action.payload }
    } else if (action.type === REQ_USER) {

        return { ...store, requser: action.payload }
    } else if (action.type === UPDATE_USER) {

        return { ...store, updateuser: action.payload }
    } else if (action.type === SEARCH_USER) {

        return { ...store, searchedusers: action.payload }
    } else if (action.type === LOG_OUT) {

        return {
            ...store,
            signup: null,
            signin: null,
            requser: null,
            updateuser: null,
            searchedusers: []
        };
    }


    return store;

}