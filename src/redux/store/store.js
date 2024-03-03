import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from "../auth/authReducer";
import { ChatReducer } from "../chat/chatReducer";
import { messageReducer } from "../message/messageReducer";
import { storyReducer } from "../story/storyReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers(
    {
        auth:AuthReducer,
        chat:ChatReducer,
        message:messageReducer,
        story:storyReducer,
    }
)


export const store=legacy_createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ))