import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./global.css";

const Sis = lazy(() => import("./pages/Sis"));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

export default function Routes() {
  return (
    <Router className="dash">
      {
        //suspense lal loading
        //y3ne mnontor l lazy funct la y5also ,
        //bhal w2t bt kun l page btkun mashye l fallback (y3ne loading)
      }
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        }
      >
        <Switch>
          <Provider store={store}>
            <PrivateRoute path="/" component={Sis} />
          </Provider>
        </Switch>
      </Suspense>
    </Router>
  );
}
