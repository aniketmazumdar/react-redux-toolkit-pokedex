import './App.css';
import { Header, Filter, PokedexList } from "./components";
import {Provider} from 'react-redux'
import store from './redux/store'


const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <div className='container'>
          <Header />
          <Filter />
          <PokedexList />
        </div>
      </Provider>
    </div>
  );
}

export default App;
