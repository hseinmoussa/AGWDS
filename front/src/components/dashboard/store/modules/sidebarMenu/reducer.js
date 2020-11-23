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
      name: "Dashboard",
      icon: <FiHome />,
      path: "/",
    },

    {
      name: "New Admin",
      icon: <FiBookmark />,
      path: "/cards",
    },
    {
      name: "Forms",
      icon: <FiPhoneForwarded />,
      path: "/forms",
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
