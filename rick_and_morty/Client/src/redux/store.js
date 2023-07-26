import { createStore, appliMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { applyMiddleware } from "redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
