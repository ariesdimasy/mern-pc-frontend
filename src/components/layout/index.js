import MyNavbar from "./Navbar";
import Footer from "./Footer";

import styles from "./index.module.css";

export default function Layout(props) {
  return (
    <>
      <MyNavbar {...props}></MyNavbar>
      <div className={styles.container}>{props.children}</div>

      <Footer></Footer>
    </>
  );
}
