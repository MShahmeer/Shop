//We will write code to connect to the extension
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {productsReducer, productDetailsReducer} from "./reducers/productReducer"
import thunk from 'redux-thunk'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer
});

let initialState = {}; // put all the state just before we load the application

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
