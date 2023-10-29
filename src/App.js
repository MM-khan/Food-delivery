import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Home from './screens/Home';
import Signup from "./screens/Signup";
import Login from "./screens/login";
import './App.css';
import { Routes,Route } from 'react-router-dom';
import CartProvider from "./screens/ContextReducer";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/myorder' element={<MyOrder/>}/>
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
