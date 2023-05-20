import bannerImg from "../../public/assets/bannerImg.png";
import whatIsTakaful from "../../public/assets/whatIsTakaful.png";
import whatIsTakafulMob from "../../public/assets/whatIsTakafulMob.png";
import styles from "../styles/WhatIsTakaful.module.scss";
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
const WhatIsTakafulWeb = ({ user }: { user: any }) => {
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
          The Concept of{" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>Takaful</span>
        </p>
        <p className={styles["whatIsTakafultxt"]}>
          The word Takaful originates from the Arabic language and means “joint
          or mutual guarantee.” The concept of Takaful is based on the
          principles of brotherhood and mutual responsibility, where
          participants pool their resources in order to help each other in their
          time of need. Risks or unforeseen events are undeniable facts; no
          matter how much you want to avoid them, they are always an unfortunate
          possibility. Therefore, to get through these risks, one needs a
          shariah-compliant solution like Takaful.
        </p>
        {/* <p
          className={divOpen && isDesktopOrLaptop ? styles['empty'] : styles['whychoosetxtRed']}
          onClick={
            isDesktopOrLaptop
              ? () => {
                  setDivOpen(true)
                }
              : () => setModalOpen(true)
          }
        >
          {divOpen && isDesktopOrLaptop ? '' : 'Read More..'}
        </p> */}
        <CustomModal
          open={modalOpen}
          setOpen={() => setModalOpen(false)}
          renderComponent={
            <div className={styles["modalContainer"]}>
              <p className={styles["modalHeading"]}>The Concept Of Takaful!</p>
              <p className={styles["modalsubTxt"]}>
                The word Takaful originates from the Arabic language and means
                “joint or mutual guarantee”. The concept of Takaful is based on
                the principles of brotherhood and mutual responsibility, where
                participants pool their resources in order to help each other in
                their time of need. Risks or unforeseen events are undeniable
                facts; no matter how much you want to avoid them, they are
                always an unfortunate possibility. Therefore, to get through
                these risks, one needs a shariah-compliant solution like
                Takaful.
              </p>
              {user ? (
                ""
              ) : (
                <p
                  className={styles["signUpText"]}
                  onClick={() => router.push("/auth")}
                >
                  Sign Up Now!
                </p>
              )}
            </div>
          }
        />
      </Container>
      <div style={{ position: "relative" }}>
        <div className={styles["imgContainer"]}>
          <Image priority={true} src={bannerImg} alt="" />
        </div>
        <div
          style={{
            width: "100%",
            height: 166,
            background: "#f5f5f5",
            position: "absolute",
            bottom: -30,
            zIndex: 1,
          }}
        ></div>
      </div>
    </div>
  );
};

const WhatIsTakafulMob = ({ user }: { user: any }) => {
  const [divOpen, setDivOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  return (
    <div className={styles["wrapperMobile"]}>
      <Container className={styles["whatIsTakaful"]}>
        <p className={styles["whatIsTakafulHeadingMobile"]}>
          The Concept of{" "}
          <span className={styles["whatIsTakafulHeadingRed"]}>Takaful</span>!
        </p>
        <p className={styles["whatIsTakafultxtMobile"]}>
          The word Takaful originates from the Arabic language and means “joint
          or mutual guarantee.” The concept of Takaful is based on the
          principles of brotherhood and mutual responsibility, where
          participants pool their resources in order to help each other in their
          time of need. Risks or unforeseen events are undeniable facts; no
          matter how much you want to avoid them, they are always an unfortunate
          possibility. Therefore, to get through these risks, one needs a
          shariah-compliant solution like Takaful.
        </p>
        {/* <p
          className={divOpen && isDesktopOrLaptop ? styles['empty'] : styles['whychoosetxtRed']}
          onClick={
            isDesktopOrLaptop
              ? () => {
                  setDivOpen(true)
                }
              : () => setModalOpen(true)
          }
        >
          {divOpen && isDesktopOrLaptop ? '' : 'Read More..'}
        </p> */}
        {divOpen && isDesktopOrLaptop ? (
          <div className={styles["modalContainer2"]}>
            <p className={styles["whatIsTakafultxtMobile"]}>
              Takaful, an Arabic word meaning “guaranteeing each other," is the
              same as insurance but approved under the principles of Sharia
              guidelines. It’s an Islamic insurance concept based on brotherhood
              and mutual welfare in which partners pay contributions to support
              and cover each other in case of an accident or damage to one’s
              life or property.
              <br /> The concept of protection is deeply rooted in Islamic
              history, encouraged by the Holy Prophet (SAWS), and practiced by
              Muslims all over the world, which validates the basis of takaful
              or mutual protection or Sharia-complaint insurance.
              <br /> Together with the committee of prominent Sharia scholars
              under Mr. Taqi Usmani, we ensure that the existence of Takaful
              Bazaar is based on the principles of Islam, brotherhood,
              protection, and mutual responsibility, which completely avoids
              acts of interest (riba), gambling (al-Maisir) and uncertainty
              (al-Gharar).
            </p>
            {user ? (
              ""
            ) : (
              <p
                className={styles["signUpText"]}
                onClick={() => router.push("/auth")}
              >
                Sign Up Now!
              </p>
            )}
            <p
              className={styles["whychoosetxtRed"]}
              onClick={() => setDivOpen(false)}
            >
              Show less
            </p>
          </div>
        ) : null}
      </Container>
      <div className={styles["imgContainerMobile"]}>
        <Image
          priority={true}
          style={{ zIndex: 1 }}
          src={whatIsTakafulMob}
          alt=""
        />
        <div className={styles["imgContainerMobileBottom"]}></div>
      </div>
    </div>
  );
};

const WhatIsTakaful = () => {
  const user = useSelector((state: any) => state.auth.data.user);
  return (
    <>
      <MediaQuery minWidth={700}>
        <WhatIsTakafulWeb user={user} />
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <WhatIsTakafulMob user={user} />
      </MediaQuery>
    </>
  );
};

export default WhatIsTakaful;
