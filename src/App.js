import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from './Templates/HomeTemplate';
import HomePage from './Pages/HomePage'
import UserFormTemplate from './Templates/UserFormTemplate';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeTemplate component={<HomePage/>}/>}/>
        <Route path='/login' element={<UserFormTemplate component={<Login/>}/>}/>
        <Route path='/register' element={<UserFormTemplate component={<Register/>}/>}/>
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
