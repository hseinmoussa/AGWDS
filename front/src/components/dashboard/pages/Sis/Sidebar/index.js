import React, { memo } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

// Styled
import { Side } from "./styles";

// Logout function
//import { logout } from "../../../services/auth";

// Logo
import Logo from "../../../assets/img/kadoo.png";

// Icons
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";

// Connection Redux
import { connect } from "react-redux";

function Sidebar({ drag, handleChange, activeMenu, itensMenu, dispatch }) {
  const [newDrag, setnewDrag] = useState(drag);
  const cookies = new Cookies();

  function handlechange(event) {
    handleChange(!newDrag);
  }

  useEffect(() => {
    setnewDrag(drag);
  }, [drag]);
  function toggleMenu(menu) {
    return {
      type: "SET_MENU_ACTIVE",
      menu,
    };
  }

  return (
    <Side drag={newDrag}>
      <div className="logo">
        <b>Karim</b>
      </div>
      <ul>
        {itensMenu.map((item) => (
          <li
            key={item.name}
            className={item.name === activeMenu.name ? "active" : ""}
          >
            <Link
              to={item.path}
              onClick={() => {
                dispatch(toggleMenu(item));
                setnewDrag(!newDrag);
                handlechange();
              }}
            >
              <span className="icon">{item.icon}</span>
              <span className="item">{item.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <a
            onClick={() => {
              
              cookies.remove('token', { path: '/' });

            }}
            href={`/`}
          >
            <span className="icon">
              <FiLogOut />
            </span>
            <span className="item">Logout</span>
          </a>
        </li>
      </ul>
    </Side>
  );
}

export default memo(
  connect((state) => ({
    activeMenu: state.menu.activeMenu,
    itensMenu: state.menu.itens,
  }))(Sidebar)
);
