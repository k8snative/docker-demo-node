import bannerImg from "../../../../public/assets/bannerImg.png";
import whatIsTakaful from "../../../../public/assets/whatIsTakaful.png";
import whatIsTakafulMob from "../../../../public/assets/whatIsTakafulMob.png";
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
const HowWeStartedWeb = ({ user }: { user: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const router = useRouter();

  return (
    <div className={styles["wrapper"]} style={{paddingBottom: "50px" }}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeading"]}>
          How We{" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>Started</span>?
        </p>
        <p className={styles["whatIsTakafultxt"]}>
          Takaful Bazaar was envisioned as a first-of-its-kind online platform
          for comparing and purchasing Takaful products. Found in 2022, we are
          revolutionizing the way Muslims protect their assets and in-turn,
          their well-being. The founders of Takaful Bazaar dreamed of
          reimagining Takaful, so they brought an easy and user-friendly
          platform to bring the Takaful process into the digital age.
        </p>
      </Container>
    
    </div>
  );
};

const HowWeStartedMob = ({ user }: { user: any }) => {
  const [divOpen, setDivOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  return (
    <div className={styles["wrapperMobile"]} style={{paddingBottom: "50px" }}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeadingMobile"]}>
          How We{" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>Started</span>
        </p>
        <p className={styles["whatIsTakafultxtMobile"]}>
          Takaful Bazaar was envisioned as a first-of-its-kind online platform
          for comparing and purchasing Takaful products. Found in 2022, we are
          revolutionizing the way Muslims protect their assets and in-turn,
          their well-being. The founders of Takaful Bazaar dreamed of
          reimagining Takaful, so they brought an easy and user-friendly
          platform to bring the Takaful process into the digital age
        </p>
      </Container>
    
    </div>
  );
};

const HowWeStarted = () => {
  const user = useSelector((state: any) => state.auth.data.user);
  return (
    <>
      <MediaQuery minWidth={700}>
        <HowWeStartedWeb user={user} />
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <HowWeStartedMob user={user} />
      </MediaQuery>
    </>
  );
};

export default HowWeStarted;
