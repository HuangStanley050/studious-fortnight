import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  const background = {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: "0",
    zIndex: "100",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  };
  return (
    <section style={background}>
      <Spinner
        style={{ width: "5rem", height: "5rem", zIndex: "111" }}
        color="warning"
      />
    </section>
  );
};

export default Loader;
