// Layout.js

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  return (
    <>
      <Navbar />
    <Outlet />
    </>
  );
};

export default Layout;
