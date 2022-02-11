import './app.scss'
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {useContext} from 'react'
import {AuthContext} from '../src/authContext/AuthContext'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to = '/login'/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to = '/'/> }/>
        <Route path='/register' element={!user ? <Register/> : <Navigate to = '/'/>}/>
        {
          user && (
            <>
              <Route path='/series' element={<Home type = "series"/>}/>
              <Route path='/movies' element={<Home type = "movie"/>}/>
              <Route path='/watch' element={<Watch/>}/>
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  )
};

export default App;