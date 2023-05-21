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
import Menu from "./pages/user/menu";
import UserLogin from "./pages/user/userLogin";
import NavBar from "./pages/navbar";
import UserRegister from "./pages/user/register";
import Cart from "./pages/user/cart";
import Orders from "./pages/user/orders";
import Invoice from "./pages/user/invoice";
import AdminNavBar from "./pages/admin-navbar";
import Redirect from "./pages/Admin/redirect";
import ConfigData from "./config/config";
import AdminOrders from "./pages/Admin/Orders/orders";
import Footer from "./pages/footer";
import SalesReport from "./pages/Admin/salesReport/saleReport";
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
       <AdminOrders/>
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
    },
    {
      path:"menu-list/:id/:tableno",
      element:(
        <Container>
<Menu/>
        </Container>
      )
    },
    {
      path:"user_login",
      element:(
        <Container>
<UserLogin/>
        </Container>
      )
    },
    {
      path:"register",
      element:(
        <Container>
<UserRegister/>
        </Container>
      )
    },
    {
      path:"cart",
      element:(
        <Container>
<Cart/>
        </Container>
      )
    },
    {
      path:"orders",
      element:(
        <Container>
<Orders/>
        </Container>
      )
    },
    {
      path:"invoice",
      element:<Container>
        <Invoice/>
      </Container>
    },
    {
      path:"logout",
      element: <SignIn></SignIn>
    },
    {
      path:"/",
      element:<Redirect>

      </Redirect>
    }
    ,
    {
      path:"/admin/order",
      element: <AdminOrders>

      </AdminOrders>
    },
    {
      path:"/admin/report",
      element:  <SalesReport/>
    }

  
]);
function App() {
  const user=JSON.parse( localStorage.getItem("user"))
 
 
  return (
    <div>
     {user?user.role=="user"?<NavBar></NavBar>:<AdminNavBar></AdminNavBar>:<></>}
      <RouterProvider router={router}></RouterProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
