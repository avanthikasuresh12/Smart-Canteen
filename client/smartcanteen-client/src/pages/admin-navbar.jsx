import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const [restaurantName,setRestaurantName]=useState("")
  useEffect(()=>{
    const restaurant=JSON.parse(localStorage.getItem("user"))
    if(restaurant){
      setRestaurantName(restaurant.restaurantName)
    }
  },[])
  return (
    <>
  

      <br />
      <Navbar bg="light" variant="light" sticky='top' className='navbar-col'>
        <Container>
          <Navbar.Brand href="/admin/order ">{restaurantName}</Navbar.Brand>      
          <Nav className="me-auto">
            <Nav.Link href="/admin/category">Category</Nav.Link>
            <Nav.Link href="/admin/menu-item">Menu</Nav.Link>
            <Nav.Link href="/admin/table">Table</Nav.Link>
            <Nav.Link href="/admin/report">Report</Nav.Link>
            <Nav.Link href="/admin/profile">Profile</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;