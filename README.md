# Pokedex - React Redux Toolkit App
React Redux Toolkit app - Pokemon list page with filtering by name, id, gender, type, strategy range etc and details on popup.

![Screenshot](/src/assets/img/desktop.png?raw=true)



### Description
This is a single page responsive app. Page contains pokemon card list. There is a **Search Box**, where we can filter the pokemon list by id & name. There are two filter dropdowns based on **Type** and **Gender**. There is a **multiple range slider** based on **Stat** values for filtering items. By clicking any card item, **Pokemon Details Popup** is appeared. Here **Page Scroll Pagination** feature is integrated.



### Technologies
Project is created with:
* HTML 5
* CSS 3
* React JS (18.2.0)
* Redux Toolkit (^1.9.5)

\
Here we use Redux Toolkit & Hooks. For redux toolkit, we use `createSlice` & `createAsyncThunk`. For redux hooks, we use two hooks: `useSelector` & `useDispatch`.

`createSlice`: is a higher order function that accepts: **Slice Name**, **Initial States**, **All Reducer Functions** & **Extra Reducer Functions**. It generates **Action Creators** & **Action Types** that correspond to the reducers and state.


```js
// pokemonSlice.js

import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
      allPokemons: [],
      allGenders: [],
      allTypes: [],
      isLoading: false
    },
    reducers: {
      genderListFetch: (state, action) => {
          state.allGenders = action?.payload?.result;
      },
      typeListFetch: (state, action) => {
          state.allTypes = action?.payload?.result;
      },
    },
    extraReducers: {},
});

export const { genderListFetch, typeListFetch } = pokemonSlice.actions;

export default pokemonSlice.reducer;
```

\
`createAsyncThunk`: is used to manage **Asychronous Tasks** in the slice. It takes **two** params: **Action Name** & **Callback method**. It returns a **Promise**. On the results there is a param named `payload`, which returns actually the result value.

The Callback method of `createAsyncThunk` takes **two** arguments: `args` & `thunkAPI`.

`args`: refers all the custom arguments of the method passing at the time of invoke. It takes all the params in a **object** format.\
`thunkAPI`: refers all the normal redux methods & objects like `dispatch`, `getState` etc.

```js
// apiAction.js

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPokemonListFromApi = createAsyncThunk(
    'pokemon/fetchPokemonListFromApi',
    async (args, thunkAPI) => {
        const { gender, type } = args;
        const { dispatch, getState } = thunkAPI;

        try {
          dispatch(actionToFecthGenderListFromApi());
          dispatch(actionToFecthTypeListFromApi());

          let pokemons = await getState().allPokemons;
            if (pokemons && pokemons.length > 0) {
              return pokemons;
            }

            return await fetch(`https://pokeapi.co/api/v2/pokemon/${gender}/${type}`)
                .then(res => res.json())
                .then(res => res?.payload?.results);
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
);
```

\
`extraReducers`: Now, for `createAsyncThunk` methods we use different reducer methods, where based on Promise states (*pending, fulfilled & rejected*), we set our redux state.

```js
// apiAction.js

export const extraReducers = {
    [fetchPokemonListFromApi.pending]: (state) => {
        state.isLoading = true;
    },
    [fetchPokemonListFromApi.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.allPokemons = [...state.allPokemons, ...action.payload];
    },
    [fetchPokemonListFromApi.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
    },
}
```

\
All of these reducers are taken in an object and this object value is passed as the value of `extraReducers` param of `createSlice`.

```js
// pokemonSlice.js

import { extraReducers } from "./apiAction";

export const pokemonSlice = createSlice({
    name: 'pokemon',
    .... ,
    .... ,
    extraReducers: extraReducers,
});

```

\
We need to import all the actions of slice and asyncThunk in our component. We use redux hook `useSelector` to fetch the redux states and `useDispatch` to dispatch the actions.

```js
// App.js

import { useSelector, useDispatch } from 'react-redux'
import { genderListFetch, typeListFetch, fetchPokemonListFromApi } from "./pokemonSlice";

export default App = () => {
  const dispatch = useDispatch()
  const { allPokemons, allGenders, allTypes, isLoading } = useSelector(state => state);

  if (!allGenders || allGenders.length) {
    dispatch(genderListFetch(['Male', 'Female', 'Other']));
  }

  if (!allTypes || allTypes.length) {
    dispatch(typeListFetch(['Water', 'Land', 'Sky']));
  }


  return (
    <div className="App">
      <div>
        <h4>POKEMON LIST</h4>
        <ul>
          {allPokemons?.map((item, indx) => {
            return <li>{item.name}</li>
          })}
        </ul>
      </div>

      <div>
        <h4>Filter by Gender & Type </h4>
        <input
          name="gender"
          placeholder="Gender"
          onChange={(e) => dispatch(fetchPokemonListFromApi({ gender: e.target.value }))}
        />

        <input
          name="type"
          placeholder="Type"
          onChange={(e) => dispatch(fetchPokemonListFromApi({ type: e.target.value }))}
        />
      </div>
    </div>
  );
}
```



### API Services
[pokeapi.co](https://pokeapi.co/api/v2/) is used to generate Pokemon data.



### Setup Steps
1. Fork the project and clone it locally.
2. To run this app, open the terminal into the project directory and install it locally using npm:
```shell
$ npm install
$ npm start
```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### Unit Test
Jest and RTL (React Test Library) are used for unit test cases.
1. Run command to run the test cases.
```shell
$ npm run test
```
2. After running the command, `coverage` folder is created. Find the `index.html` and open in the browser. Test coverage is showing here.

![Screenshot](/src/assets/img/coverage.png?raw=true)
3. Each component has a `index.test.js` file for unit test cases. Everytime after adding or changing the test file, we need to run the test command to check the test result case and reload the coverage file `coverage/index.html` to check the coverage.



### Gallery
<div style="float:left">
<img src="/src/assets/img/desktop.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/desktop-2.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/desktop-3.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/desktop-4.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/desktop-5.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/mobile-1.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/mobile-2.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/mobile-3.png?raw=true" width="32.5%" height="150">
<img src="/src/assets/img/mobile-4.png?raw=true" width="32.5%" height="150">
</div>
