import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import ConfigData from "../../config/config";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice,setTotalPrice]=useState(0)
  useEffect(() => {
    axios.defaults.withCredentials = true;
    const cartURL = ConfigData.ServerAddress + "/get-cart";
    axios
      .get(cartURL, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
      let price=0;
      res.data.map((pro)=>{
        price=price+parseFloat(pro.products.price)*pro.quantity
      })
        setProducts(res.data);
        setTotalPrice(price)
      });
  }, []);

  
  const handleConfirm=()=>{
const ConfrimOrderURL=ConfigData.ServerAddress+"/confirm-order";
let restaurant=localStorage.getItem("restaurant")
restaurant=JSON.parse(restaurant)
console.log(restaurant);
const ordersData={
  products:products,
  totalPrice:totalPrice,
  restaurant:restaurant
}
axios.defaults.withCredentials = true;
axios
  .post(ConfrimOrderURL, {
    data:ordersData,
        headers: {
          "Content-Type": "application/json",
        },
    withCredentials: true,
  })
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#FFFFFF" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {products.length} items
                        </MDBTypography>
                      </div>
                      {products.map((e) => {
                         let defaultPath= require(`../../uploads/image.png`)
                         let path=`../../uploads/${e.imagePath}`
                         const tryRequire=(path)=>{
                           try{
                             return require(path)
                           }catch(err){
                             return null
                           }
                           
                         }
                         const imagePath=tryRequire(path)?tryRequire(path):defaultPath;
                        return (
                          <>
                            {" "}
                            <hr className="my-4" />
                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={imagePath}
                                  fluid
                                  className="rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-muted">
                                  {e.products.category}
                                </MDBTypography>
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {e.products.name}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol
                                md="3"
                                lg="3"
                                xl="3"
                                className="d-flex align-items-center"
                              >
                                <MDBBtn color="link" className="px-2">
                                  <MDBIcon fas icon="minus" />
                                </MDBBtn>
                                <MDBIcon fas icon="minus" />
<p>{e.quantity}</p>
<MDBIcon fas icon="plus" />
                                <MDBBtn color="link" className="px-2">
                                  <MDBIcon fas icon="plus" />
                                </MDBBtn>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  {Math.trunc(

                                        e.products.price
                                  ) * e.quantity}{" "}
                                  ₹
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <a href="#!" className="text-muted">
                                  <MDBIcon fas icon="times" />
                                </a>
                              </MDBCol>
                            </MDBRow>
                          </>
                        );
                      })}
                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">{totalPrice} ₹</MDBTypography>
                      </div>

                      <MDBBtn
                        block
                        size="lg"
                        style={{
                          backgroundColor: "#ccaa6a",
                          borderColor: "#ccaa6a",
                        }}
                        onClick={handleConfirm}
                      >
                      Confirm
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
