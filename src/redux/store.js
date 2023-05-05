// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducer/index";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   /* preloadedState, */ 
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;

import { configureStore } from '@reduxjs/toolkit' //create react app redux toolkit  
import pokemonSlice from './slice/pokemonSlice' //import our reducer from step 4 
export default configureStore({
  reducer: pokemonSlice
});