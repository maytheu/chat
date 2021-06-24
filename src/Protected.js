import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function Protected({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        props.success ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}
