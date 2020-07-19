import React, { Fragment } from "react";
import PropTypes from "prop-types";
import spinner from "./spinner.gif";

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt=""
        style={{
          width: "200px",
          margin: "auto",
          display: "block",
          alt: "Loading...",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Fragment>
  );
};
