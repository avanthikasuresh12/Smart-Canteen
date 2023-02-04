 import * as React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,Routes
} from "react-router-dom";

 

import { Container  } from "react-bootstrap";

import RegisterHotel  from './pages/SuperAdmin/RegisterHotel';
 import Home from "./pages/Home"
 import Footer from "./components/Footer"
 import NavBar from './components/Navbar';
 
const router = createBrowserRouter([
  {
  
    path: "superadmin/add-hoteladmin",
    element:   <Container>
 
        <RegisterHotel />
     
  </Container>,
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
