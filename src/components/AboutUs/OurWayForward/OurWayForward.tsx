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
const OurWayForwardWeb = ({ user }: { user: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const router = useRouter();

  return (
    <div className={styles["wrapper"]}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeading"]}>
          Our 
          <span className={styles["whatIsTakafulHeadingRed"]}> Way Forward</span>
        </p>
        <p className={styles["whatIsTakafultxt"]}>
          We at Takaful Bazaar want our customers to have a broad choice of
          Takaful options. Although we are happy with the change we are bringing
          to Insurtech in Pakistan, there are still many opportunities to
          explore. Therefore, we are constantly working to introduce new
          technology and improvements to the Takaful ecosystem so that we can
          facilitate more households & businesses in Pakistan.
        </p>
      </Container>
    </div>
  );
};

const OurWayForwardMob = ({ user }: { user: any }) => {
  const [divOpen, setDivOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  return (
    <div className={styles["wrapperMobile"]}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeadingMobile"]}>
          Our Way
          <span className={styles["whatIsTakafulHeadingRed"]}>Forward</span>
        </p>
        <p className={styles["whatIsTakafultxtMobile"]}>
          We at Takaful Bazaar want our customers to have a broad choice of
          Takaful options. Although we are happy with the change we are bringing
          to Insurtech in Pakistan, there are still many opportunities to
          explore. Therefore, we are constantly working to introduce new
          technology and improvements to the Takaful ecosystem so that we can
          facilitate more households & businesses in Pakistan.
        </p>
      </Container>
    </div>
  );
};

const OurWayForward = () => {
  const user = useSelector((state: any) => state.auth.data.user);
  return (
    <>
      <MediaQuery minWidth={700}>
        <OurWayForwardWeb user={user} />
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <OurWayForwardMob user={user} />
      </MediaQuery>
    </>
  );
};

export default OurWayForward;
