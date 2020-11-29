import React, { useState, Suspense, lazy, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";

// Icons
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";

// Styled Components
import Sidebar from "./Sidebar";
import { Wrap, Main, NavBar } from "./styles";

const Dashboard = lazy(() => import("./Dashboard"));
const NewAdmin = lazy(() => import("./New_admin"));
const Contact = lazy(() => import("./Edit_Contact"));
const Change = lazy(() => import("./Change_Pass"));
const about= lazy(() => import("./Edit_About"));
export default function Sis() {
  const [drag, setDrag] = useState(false);
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    try {
      fetch("http://localhost:3001/Contact", {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((json) =>
        {
          setAdmin(json.message.FirstName + " " + json.message.LastName)
        }
        );
    } catch (err) {
      console.log(err);
    }
  });
  function handleChange(newValue) {
    setDrag(newValue);
  }
  return (
    <Wrap className="dash">
      <Main>
        <NavBar>
          {/* <FiMenu className="toggle" style={{ marginLeft: drag ? 145 : 0}} onClick={(e) => drag ? setDrag(false) : setDrag(true)} /> */}

          {/*lama tez8ar l screen bt bayin */}
          <FiMenu
            className="toggle"
            style={{ marginLeft: drag ? 170 : 0 }}
            onClick={(e) => (drag ? setDrag(false) : setDrag(true))}
          />

          <span>
            Hello , <span className="name">{admin}</span>
          </span>
        </NavBar>
        <div className="content">
          <div className="row">
            <Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="loader"></div>
                </div>
              }
            >
              {/* Your pages */}
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/AddAdmin" component={NewAdmin} />
                <Route path="/EditContact" component={Contact} />
                <Route path="/Change" component={Change} />
                <Route path="/About" component={about} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Main>
      <Sidebar drag={drag} handleChange={handleChange} />
    </Wrap>
  );
}
