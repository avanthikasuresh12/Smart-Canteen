import * as React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Container } from "react-bootstrap";

import RegisterHotel from "./pages/SuperAdmin/RegisterHotel";
import SuperAdminHome from "./pages/SuperAdmin/home";
import SignIn from "./pages/SuperAdmin/login";

const router = createBrowserRouter([
  {
    path: "superadmin/add-hoteladmin",
    element: (
      <Container>
        <RegisterHotel />
      </Container>
    ),
  },
  {
    path: "superadmin",
    element: (
      <Container>
        <SuperAdminHome />
      </Container>
    ),
  },
  {
    path: "superadmin/login",
    element: (
      <Container>
        <SignIn />
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
