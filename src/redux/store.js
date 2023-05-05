import { configureStore } from '@reduxjs/toolkit' //create react app redux toolkit  
import pokemonSlice from './slice/pokemonSlice' //import our reducer from step 4 
export default configureStore({
  reducer: pokemonSlice
});