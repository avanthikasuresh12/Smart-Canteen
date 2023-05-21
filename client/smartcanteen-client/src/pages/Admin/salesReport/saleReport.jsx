import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import ConfigData from "../../../config/config";
import "./salesReport.css";
const SalesReport = (props) => {
  const [allOrdersTotalCount, setAllOrdersTotalCount] = useState(0);
  const [allOrdersPrice, setAllOrdersPrice] = useState(0);
  const [allOrderstotalProductsSold, setAllOrderstotalProductsSold] = useState(0);
  const [todayOrdersTotalCount,setTodayOrdersTotalCount]=useState(0)
  const [todayOrdersPrice,setTodayOrdersPrice]=useState(0)
  const [todayOrderstotalProductsSold,setTodayOrderstotalProductsSold]=useState(0)
 const [day7OrdersTotalCount,setDay7OrdersTotalCount]=useState(0)
 const [day7OrdersPrice,setDay7OrdersPrice]=useState(0)
 const [day7OrderstotalProductsSold,setDay7OrderstotalProductsSold]=useState(0)
 const [day30OrdersTotalCount,setDay30OrdersTotalCount]=useState(0)
 const [day30OrdersPrice,setDay30OrdersPrice]=useState(0)
 const[day30OrderstotalProductsSold,setDay30OrderstotalProductsSold]=useState(0)


  useEffect(() => {
    axios.defaults.withCredentials = true;
    const adminOrderURL = ConfigData.ServerAddress + "/admin/sales-report";
    axios.get(adminOrderURL).then((res) => {
   //Details of all orders
      let allOrdersPriceTemp = 0;
      let allOrdersTotalProductSoldTemp = 0;
      res.data.allOrders.map((o) => {
        allOrdersPriceTemp = o.totalPrice + allOrdersPriceTemp;
        allOrdersTotalProductSoldTemp =
          o.products.length + allOrdersTotalProductSoldTemp;
      });

      setAllOrdersTotalCount(res.data.allOrders.length);
      setAllOrdersPrice(allOrdersPriceTemp);
      setAllOrderstotalProductsSold(allOrdersTotalProductSoldTemp);

      //details of today orders

      let todayOrdersPriceTemp = 0;
      let todayOrdersTotalProductSoldTemp = 0;
      res.data.orderstoday.map((o) => {
        todayOrdersPriceTemp = o.totalPrice + todayOrdersPriceTemp;
        todayOrdersTotalProductSoldTemp =
          o.products.length + todayOrdersTotalProductSoldTemp;
      });

      setTodayOrdersTotalCount(res.data.orderstoday.length);
      setTodayOrdersPrice(todayOrdersPriceTemp);
      setTodayOrderstotalProductsSold(todayOrdersTotalProductSoldTemp);


      //details of 7 days orders

      let day7OrdersPriceTemp = 0;
      let day7OrdersTotalProductSoldTemp = 0;
      res.data.orders7.map((o) => {
        day7OrdersPriceTemp = o.totalPrice + day7OrdersPriceTemp;
        day7OrdersTotalProductSoldTemp =
          o.products.length + day7OrdersTotalProductSoldTemp;
      });

      setDay7OrdersTotalCount(res.data.orders7.length);
      setDay7OrdersPrice(todayOrdersPriceTemp);
      setDay7OrderstotalProductsSold(todayOrdersTotalProductSoldTemp);


      //details of 30 days orders

      let day30OrdersPriceTemp = 0;
      let day30OrdersTotalProductSoldTemp = 0;
      res.data.orders30.map((o) => {
        day30OrdersPriceTemp = o.totalPrice + day30OrdersPriceTemp;
        day30OrdersTotalProductSoldTemp =
          o.products.length + day30OrdersTotalProductSoldTemp;
      });

      setDay30OrdersTotalCount(res.data.orders30.length);
      setDay30OrdersPrice(day30OrdersPriceTemp);
      setDay30OrderstotalProductsSold(day30OrdersTotalProductSoldTemp);
    });
  }, []);

  return (
    <Container>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="tile">
              <div class="wrapper">
                <div class="header">Life Time</div>

                <div class="stats">
                  <div>
                    <strong>Total Orders</strong> {allOrdersTotalCount}
                  </div>

                  <div>
                    <strong>Total Amount</strong> {allOrdersPrice}
                  </div>

                  <div>
                    <strong>Toal Items Sold</strong>{" "}
                    {allOrderstotalProductsSold}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="tile">
              <div class="wrapper">
                <div class="header">Today</div>

                <div class="stats">
                  <div>
                    <strong>Total Orders</strong> {todayOrdersTotalCount}
                  </div>

                  <div>
                    <strong>Total Amount</strong> {todayOrdersPrice}
                  </div>

                  <div>
                    <strong>Toal Items Sold</strong> {todayOrderstotalProductsSold}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="tile">
              <div class="wrapper">
                <div class="header">Last 7 days</div>

                <div class="stats">
                  <div>
                    <strong>Total Orders</strong>{day7OrdersTotalCount}
                  </div>

                  <div>
                    <strong>Total Amount</strong>{day7OrdersPrice}
                  </div>

                  <div>
                    <strong>Toal Items Sold</strong> {day7OrderstotalProductsSold}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="tile">
              <div class="wrapper">
                <div class="header">last 30 days</div>

                <div class="stats">
                  <div>
                    <strong>Total Orders</strong> {day30OrdersTotalCount}
                  </div>

                  <div>
                    <strong>Total Amount</strong> {day30OrdersPrice}
                  </div>

                  <div>
                    <strong>Toal Items Sold</strong> {day30OrderstotalProductsSold}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </Container>
  );
};

export default SalesReport;
