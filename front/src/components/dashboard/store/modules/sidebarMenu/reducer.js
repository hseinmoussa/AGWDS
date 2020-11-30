// Icons
import React from "react";
import { FiHome, FiBookmark, FiPhoneForwarded } from "react-icons/fi";

const INITIAL_STATE = {
  activeMenu: {
    name: "Dashboard",
    icon: <FiHome />,
    path: "/",
  },
  itens: [
    {
      name: "Manage Cards",
      icon: <FiHome />,
      path: "/dashboard",
    },

    {
      name: "New Admin",
      icon: <FiBookmark />,
      path: "/AddAdmin",
    },
    {
      name: "Edit Contact",
      icon: <FiPhoneForwarded />,
      path: "/EditContact",
    },
    {
      name: "Change Password",
      icon: <FiPhoneForwarded />,
      path: "/Change",
    },
    {
      name: "About Me",
      icon: <FiBookmark />,
      path: "/About",
    },
    {
      name: "All Admins",
      icon: <FiHome />,
      path: "/AllAdmins",
    },
  ],
};

export default function sidebarMenu(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_MENU_ACTIVE":
      return { ...state, activeMenu: action.menu };
      break;
    default:
      return state;
      break;
  }
}
