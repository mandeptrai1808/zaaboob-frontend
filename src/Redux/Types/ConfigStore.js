import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { TestReducer } from "../Reducers/TestReducer";
import { MenuReducer } from "../Reducers/MenuReducer";
import { UserReducer } from "../Reducers/UserReducer";
import { PostReducer } from "../Reducers/PostReducer";
import { ModelReducer } from "../Reducers/ModelReducer";
import { LoadingReducer } from "../Reducers/LoadingReducer";
import { FileImageReducer } from "../Reducers/FileImageReducer";
import { ChatReducer } from "../Reducers/ChatReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   TestReducer,
   MenuReducer,
   UserReducer,
   PostReducer,
   ModelReducer,
   LoadingReducer,
   FileImageReducer,
   ChatReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));