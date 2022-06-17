import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { TestReducer } from "../Reducers/TestReducer";
import { MenuReducer } from "../Reducers/MenuReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   TestReducer,
   MenuReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));