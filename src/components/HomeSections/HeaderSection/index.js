import { Container } from "react-bootstrap";
import styles from "./index.module.css";

import { TypeAnimation } from "react-type-animation";

const HeaderSection = () => {
  return (
    <header className={styles["header-section"]}>
      <Container>
        <div className={styles["text-container"]}>
          <h1> MERN PC Hardware </h1>

          <TypeAnimation
            sequence={[
              "Build your rig with good parts", // Types 'One'
              1000, // Waits 1s
              "Mern PC always provide best quality",
              2000,
            ]}
            wrapper="h3"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "2em" }}
          />
        </div>
      </Container>
    </header>
  );
};

export default HeaderSection;
