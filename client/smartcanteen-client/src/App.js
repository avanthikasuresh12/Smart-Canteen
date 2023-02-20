import * as React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Container } from "react-bootstrap";

import RegisterHotel from "./pages/SuperAdmin/RegisterHotel";
import SuperAdminHome from "./pages/SuperAdmin/home";

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
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
