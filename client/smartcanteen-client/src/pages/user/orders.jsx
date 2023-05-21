import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import ConfigData from "../../config/config";
import { Button } from "react-bootstrap";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [refreshPageId, setRefreshPageId] = useState("");
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(ConfigData.ServerAddress + "/get-orders").then((res) => {
      setOrders(res.data);
    });
  }, [refreshPageId]);
  async function displayRazorpay(totalPrice, orderID) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // // creating a new order
    // const result = await axios.post("http://localhost:5000/payment/orders");

    // if (!result) {
    //     alert("Server error. Are you online?");
    //     return;
    // }

    // Getting the order details back
    // const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_1n6JGyiAn0Cu5c", // Enter the Key ID generated from the Dashboard
      amount: totalPrice * 100,
      currency: "INR",
      name: "Smart Canteen.",
      description: "Test Transaction",
      image: "",
      handler: async function (response) {
        axios.post(ConfigData.ServerAddress+"/update-payment",{
          id:orderID,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }).then(()=>{
       setRefreshPageId(Date.now())
        })
      },
      prefill: {
        name: "SmartCanteen",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "SmartCanteen Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  return (
    <>
    {orders.length!=0?
      <section className="h-100 " style={{ backgroundColor: "#ffff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}> </span>!
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  {orders.map((e) => {
                 const statusValue=e.status=="Pending"?20:e.status=="Accepted"?50:100
                 console.log(statusValue);
                    return (
                      <MDBCard className="shadow-0 border mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol md="2">
                              <MDBCardImage
                                src={`/${e.products.length!=0?e.products[0].products.imagePath:""}`}
                                fluid
                                alt=""
                              />
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0">
                                {e.restaurant.restaurantName}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">{new Date( e.date).toDateString()}</p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">{e.time}</p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">
                                Total items :{e.products.length}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted mb-0 small">
                                <b>₹{e.totalPrice}</b>
                              </p>
                            </MDBCol>
                          </MDBRow>
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                          />
                          <MDBRow className="align-items-center">
                            <MDBCol md="10">
                              <MDBProgress
                                style={{ height: "6px", borderRadius: "16px" }}
                              >
                                <MDBProgressBar
                                  style={{
                                    borderRadius: "16px",
                                    backgroundColor: "#a8729a",
                                  }}
                                  width={statusValue}
                                  valuemin={0}
                                  valuemax={100}
                                />
                              </MDBProgress>
                              <div className="d-flex justify-content-around mb-1">
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Pending
                                </p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Accepted
                                </p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Delivered
                                </p>
                              </div>

                              {!e.paymentStatus ? (
                                <Button
                                  className="paybutton mt-5"
                                  onClick={() =>
                                    displayRazorpay(e.totalPrice, e._id)
                                  }
                                >
                                  Pay Now
                                </Button>
                              ) : (
                                <></>
                              )}
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    );
                  })}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>:<>
      <div>
        No Orders
        </div></>}
    </>
  );
}
