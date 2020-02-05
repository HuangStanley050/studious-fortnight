import React from "react";
import StripeCheckout from "react-stripe-checkout";
import API from "../api";
import { Button } from "reactstrap";
import axios from "axios";

// this jwt is only temporariy for testing, will need to fetch it from localstorage in the future

export const Payment = () => {
  const jwtToken = localStorage.getItem("CMCFlow");
  const onToken = async token => {
    await axios({
      headers: { Authorization: `bearer ${jwtToken}` },
      method: "post",
      url: API.donation,
      data: token
    });
  };

  return (
    <StripeCheckout
      ComponentClass="div"
      name="Meditation App"
      amount={500}
      panelLabel="Make Payment"
      label="Donate"
      currency="AUD"
      token={onToken}
      stripeKey={"pk_test_rOnIUC7hbo7ElO2ZOTW2mbDZ"}
    >
      <Button variant="contained" color="secondary">
        Donate $5
      </Button>
    </StripeCheckout>
  );
};

export default Payment;
