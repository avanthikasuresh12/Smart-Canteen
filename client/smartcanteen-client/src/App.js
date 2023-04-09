import * as React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Container } from "react-bootstrap";

import RegisterHotel from "./pages/SuperAdmin/RegisterHotel";
import SuperAdminHome from "./pages/SuperAdmin/home";
import SignIn from "./pages/login";
import AdminProfile from "./pages/Admin/profile";

const router = createBrowserRouter([
 
  {
    path: "superadmin",
    element: (
      <Container>
        <SuperAdminHome />
      </Container>
    ),
  },
  {
    path: "login",
    element: (
      <Container>
        <SignIn />
      </Container>
    ),
  },
  
    {
      path: "admin",
      element: (
        <Container>
          <SuperAdminHome />
        </Container>
      ),
    },
    {
      path: "admin/profile",
      element: (
        <Container>
          <AdminProfile/>
        </Container>
      ),
    },
  
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
