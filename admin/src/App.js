import TopBar from "./components/topbar/TopBar";
import Sidebar from "./components/sidebar/Sidebar";
import './app.css'
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from './pages/newUser/NewUser'
import ProductList from "./pages/productlist/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import List from './pages/list/List'
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import {useContext} from 'react'
import NewList from "./pages/newList/NewList";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
        <TopBar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/login" element={user ? <Navigate to='/'/> : <Login />} />
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
            {
              user && (
                <>
                  <Route path="/users" element={<UserList/>} />
                  <Route path="/user/:userId" element={<User/>} />
                  <Route path="/newUser" element={<NewUser/>} />
                  <Route path="/movies" element={<ProductList/>} />
                  <Route path="/product/:productId" element={<Product/>} />
                  <Route path="/newProduct" element={<NewProduct/>} />
                  <Route path="/lists" element={<ListList/>} />
                  <Route path="/list/:listId" element={<List/>} />
                  <Route path="/newList" element={<NewList/>} />
                  </>
              )
            }
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
