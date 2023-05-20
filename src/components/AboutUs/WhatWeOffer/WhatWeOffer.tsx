import styles from "../../../styles/WhatIsTakaful.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";

type CustomModalProps = {
  open: boolean;
  renderComponent: ReactNode;
  setOpen: Function;
};

const CustomModal = ({ open, renderComponent, setOpen }: CustomModalProps) => (
  <Modal
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={setOpen}
    show={open}
  >
    {renderComponent}
  </Modal>
);
const WhatWeOfferWeb = ({ user }: { user: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const router = useRouter();

  return (
    <div
      className={styles["wrapper"]}
      style={{ backgroundColor: "#F5F5F5", paddingBottom: "50px" }}
    >
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeading"]}>
          What {" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>We Offer</span>
        </p>
        <p className={styles["whatIsTakafultxt"]}>
          Takaful Bazaar is a one-stop shop for fulfilling all your Takaful
          needs. We offer exclusive auto, health, travel and life Takaful
          products at affordable prices. With attractive features for our
          Takaful plans, including 24/7 customer service, extensive claims
          support, add-on covers, a user-friendly app interface, tailored policy
          recommendation, and affordable prices, customers can compare and
          purchase a variety of takaful products based on their needs.
        </p>
      </Container>
    </div>
  );
};

const WhatWeOfferMob = ({ user }: { user: any }) => {
  const [divOpen, setDivOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  return (
    <div className={styles["wrapperMobile"]} style={{ backgroundColor: "#F5F5F5", paddingBottom: "50px" }}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeadingMobile"]}>
          What We{" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>Offer</span>
        </p>
        <p className={styles["whatIsTakafultxtMobile"]}>
          Takaful Bazaar is a one-stop shop for fulfilling all your Takaful
          needs. We offer exclusive auto, health, travel and life Takaful
          products at affordable prices. With attractive features for our
          Takaful plans, including 24/7 customer service, extensive claims
          support, add-on covers, a user-friendly app interface, tailored policy
          recommendation, and affordable prices, customers can compare and
          purchase a variety of takaful products based on their needs.
        </p>
      </Container>
    </div>
  );
};

const WhatWeOffer = () => {
  const user = useSelector((state: any) => state.auth.data.user);
  return (
    <>
      <MediaQuery minWidth={700}>
        <WhatWeOfferWeb user={user} />
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <WhatWeOfferMob user={user} />
      </MediaQuery>
    </>
  );
};

export default WhatWeOffer;
