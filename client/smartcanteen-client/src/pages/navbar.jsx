import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"

function NavBar() {
  const [restaurantId,setRestaurantId]=useState(0)
  const [tableNo,setTableNo]=useState(0)
  const [navBarVisible,setNavBarVisible]=useState(true)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      if(user.role=="admin"||user.role=="superAdmin"){
        setNavBarVisible(false)
      }
    }
    const restaurant=JSON.parse(localStorage.getItem("restaurant"))
    if(restaurant){
      setRestaurantId(restaurant._id);
    }
  const tableNomber=JSON.parse(localStorage.getItem("table"))
  if(tableNo){
    setTableNo(tableNomber);
  }
  },[])
  return (
    <>
  

      
      {navBarVisible?
      <Navbar bg="light" color='primary' variant="light" sticky='top' className='navbar'>
      
          <Nav className="nav-item m-auto"  >
            <Nav.Link href={ `/menu-list/${restaurantId}/${tableNo}`}>Menu </Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
          </Nav>
        
      </Navbar>:<></>}
    </>
  );
}

export default NavBar;