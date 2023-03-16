import { Button, Card, Container } from "react-bootstrap";
import styles from "./index.module.css";

const ServiceSection = () => {
  return (
    <section className={styles.service}>
      <Container>
        <h1 className={styles.heading}> Service </h1>
        <div className={styles["service-cards"]}>
          <Card className={styles["service-item"]}>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200"
              height={200}
            ></Card.Img>
            <Card.Body>
              <Card.Title> PC Reparation </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary"> Read More </Button>
            </Card.Body>
          </Card>
          <Card className={styles["service-item"]}>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200"
              height={200}
            ></Card.Img>
            <Card.Body>
              <Card.Title> Cheap Sparepart Good Quality </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary"> Read More </Button>
            </Card.Body>
          </Card>
          <Card className={styles["service-item"]}>
            <Card.Img
              variant="top"
              src="https://picsum.photos/200"
              height={200}
            ></Card.Img>
            <Card.Body>
              <Card.Title> Become Reseller </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary"> Read More </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default ServiceSection;
