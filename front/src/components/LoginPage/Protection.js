import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ children, ...rest }) => {
  const cookies = new Cookies();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookies.get("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
