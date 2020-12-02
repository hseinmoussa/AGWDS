import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";

const ProtectedRoute = ({ children, ...rest }) => {
  const cookies = new Cookies();
  useEffect(() => {
    try {
        fetch("http://localhost:3001/auth", {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 400) {alert(json.message);
              if(json.redirect == true){
                window.location.replace(json.location)
              }
            }
           
          });
    } catch (err) {
      console.log(err);
    }

  });

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
