import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from './Templates/HomeTemplate';
import HomePage from './Pages/HomePage'
import UserFormTemplate from './Templates/UserFormTemplate';
import Login from './Components/Login';
import Register from './Components/Register';
import ModelTemplate from './Templates/ModelTemplate';
import Profile from './Pages/Profile';
import Friends from './Pages/Friends';
import BauCua from './Pages/BauCua';
import UserPage from './Pages/UserPage';
import KhaBanhFan from './Components/KhaBanhFan';

function App() {

  return (
    <div className="App">
      <ModelTemplate/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeTemplate component={<HomePage/>}/>}/>
        <Route path='/profile' element={<HomeTemplate component={<Profile/>}/>}/>
        <Route path='/friends' element={<HomeTemplate component={<Friends/>}/>}/>
        <Route path='/login' element={<UserFormTemplate component={<Login/>}/>}/>
        <Route path='/register' element={<UserFormTemplate component={<Register/>}/>}/>
        <Route path='/chats' element={<HomeTemplate component={<BauCua/>}/>}/>
        <Route path='/user/:userId' element={<HomeTemplate component={<UserPage/>}/>}/>
        {/* <Route path='/khabanh' element={<HomeTemplate component={<KhaBanhFan/>}/>}/> */}

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
