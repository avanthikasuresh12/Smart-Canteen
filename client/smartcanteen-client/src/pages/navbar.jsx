import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
  

      <br />
      {navBarVisible?
      <Navbar bg="light" variant="light" sticky='top'>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href={ `/menu-list/${restaurantId}/${tableNo}`}>Menu </Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>:<></>}
    </>
  );
}

export default NavBar;