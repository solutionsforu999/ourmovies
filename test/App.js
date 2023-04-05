import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { Route,Routes } from 'react-router-dom';
import Comingup from './components/comingup';
function App() {
  const genres=[{name:'comedy',id:'35'},
  {name:'action',id:'28'},
  {name:'family',id:'10752'},
]
  return (
   
    <>
    <Navbar/>
    <Routes>
    <Route path='/'/>
    {/* {genres.map((genre)=><Route path={genre.name} element={<Family genre={genre.id}/>} />)} */}
      <Route path='comingup' element={<Comingup/>}/>
    </Routes>
    </>
  );
}

export default App;
