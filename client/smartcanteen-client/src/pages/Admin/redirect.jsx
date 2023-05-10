import React, { useEffect, useState } from "react";
import ConfigData from "../../config/config";

 
 
const Redirect = ( ) => {
    useEffect(()=>{
window.location.href=ConfigData.originAddress+"/login"
    },[])
  return(
    <></>
  )
};

export default Redirect;
