import * as React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Container } from "react-bootstrap";
import SuperAdminHome from "./pages/SuperAdmin/home";
import SignIn from "./pages/login";
import AdminProfile from "./pages/Admin/Profile/profile";
import Category from "./pages/Admin/Category/category";
import MenuItem from "./pages/Admin/MenuItem/menu-item";
import Table from "./pages/Admin/Table/table";

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
    {
      path:"admin/category",
      element:(
        <Container>
          <Category/> 
        </Container>
      )
    },
    {
      path:"admin/menu-item",
      element:(
        <Container>
          <MenuItem/>
        </Container>
      )
    },
    {
      path:"admin/table",
      element:(
        <Container>
  <Table/>
        </Container>
      )
    }
  
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
