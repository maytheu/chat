import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function Protected({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.user.isUserAuth ? <Component {...props} user={rest.user} /> : <Redirect to="/" />
      }
    />
  );
}
