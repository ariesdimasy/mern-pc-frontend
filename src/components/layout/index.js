import React, { useEffect } from "react";
import MyNavbar from "./Navbar";
import Footer from "./Footer";

import styles from "./index.module.css";

import { checkToken } from "../../api/authApi";

export default function Layout(props) {
  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 5 * 60 * 1000);
  }, []);

  return (
    <>
      <MyNavbar {...props}></MyNavbar>
      <div className={styles.container}>{props.children}</div>

      <Footer></Footer>
    </>
  );
}
