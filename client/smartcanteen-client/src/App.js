 import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

 
import "bootstrap/dist/css/bootstrap.min.css"

 import Login from "./pages/login"
 import Home from "./pages/home"
 import Footer from "./components/footer"
 import NavBar from './components/navbar';

const router = createBrowserRouter([
  {
  
    path: "/login",
    element: <Login/>,
  }
  ,{
    path:"/",
    element:<div><NavBar/>
    <Home/>
    <Footer/></div>,
  }
]);
function App() {
  return (
    <div >
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
