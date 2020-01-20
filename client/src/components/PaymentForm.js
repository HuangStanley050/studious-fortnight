import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdDMuY29tIiwiaWQiOiI1ZTIxMjliN2Q4YTYxYjE5MmI4Y2MxZDIiLCJpYXQiOjE1Nzk0ODcyNjAsImV4cCI6MTU3OTQ5MDg2MH0.JGbmELtrGMyl4pu47BaSmytnhWI8CDCnC41W_w0bRp0";

const Payment = () => {
  const onToken = async token => {
    await axios({
      headers: { Authorization: `bearer ${jwt}` },
      method: "post",
      url: "/api/donation",
      data: token
    });
  };

  return (
    <StripeCheckout
      name="Meditation App"
      amount={500}
      panelLabel="Make Payment"
      label="Donate"
      currency="AUD"
      token={onToken}
      stripeKey={"pk_test_rOnIUC7hbo7ElO2ZOTW2mbDZ"}
    />
  );
};

export default Payment;
