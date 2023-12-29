import './App.css';
import Subs from './components/Subs';
import ComicsList from './components/ComicsList';
import Comic from './components/Comic';
import Home from './components/Home';
import Search from './components/Search'
import {Route, Link, Routes} from 'react-router-dom';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <div className='App'>
      
     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/marvel-comics/page/:pagenum' element={<ComicsList />} />
        <Route path='/marvel-comics/:id' element={<Comic/>} />
        <Route path='/marvel-comics/search' element={<Search/>} />
        <Route path='/marvel-comics/collections' element={<Subs/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </div>
  );
};

export default App;
