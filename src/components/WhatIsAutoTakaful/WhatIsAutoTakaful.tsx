import AutoTakaful from "../../../public/assets/autotakaful.json";
import Banner from "../../../public/assets/mbanner.json";
import BannerForm from "../BannerForm/BannerForm";
import styles from "./WhatIsAutoTakaful.module.scss";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import Lottie from "react-lottie";
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
const WhatIsAutoTakaful = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const router = useRouter();
  return (
    <div className={styles["wrapper"]}>
      {/* <MediaQuery maxWidth={430}>
        <div className={` ${styles['CategoriesBottonsMobileContainer']}`}>
          <BannerForm />
        </div>
      </MediaQuery> */}

      <Container className={styles["whatIsAutoTakaful"]}>
        <p className={styles["heading"]}>
          What is{" "}
          <span className={styles["autoTakafulRedText"]}>Auto Takaful</span>?
        </p>
        <p className={`text-center ${styles["autoTakafulparagraph"]}`}>
        Auto Takaful is a shariah-compliant plan that will protect your vehicle against financial losses, damages, accidents, or thefts. When you get an Auto Takaful Plan from Takaful Bazaar, we ensure that you get honest, unbiased advice and transparent comparisons of the best rates to keep your vehicle protected.
        </p>
        {/* <p
          className={divOpen && isDesktopOrLaptop ? styles['empty'] : styles['whychoosetxtRed']}
          onClick={isDesktopOrLaptop ? () => setDivOpen(true) : () => setModalOpen(true)}
        >
          {divOpen && isDesktopOrLaptop ? '' : 'Read More..'}
        </p> */}
        <CustomModal
          open={modalOpen}
          setOpen={() => setModalOpen(false)}
          renderComponent={
            <div className={styles["modalContainer"]}>
              <p className={styles["modalHeading"]}>What is Auto Takaful?</p>
              <p className={styles["modalsubTxt"]}>
                Auto Takaful is a shariah-compliant plan that will protect your
                vehicle against financial losses, damages, accidents, or thefts.
                When you get an Auto Takaful Plan from Takaful Bazaar, we ensure
                that you get honest, unbiased advice and transparent comparisons
                of the best rates to keep your vehicle protected.
              </p>
              <p
                className={styles["modalsubTxtRed"]}
                onClick={() => router.push("/productPlan")}
              >
                Compare and Get Your AutoTakaful Now
              </p>
            </div>
          }
        />
        {divOpen && isDesktopOrLaptop ? (
          <div className={styles["modalContainer2"]}>
            <p className={styles["autoTakafulparagraph"]}>
              Therefore, no matter if you have got a new car or have been
              running your old auto on the roads for years– one thing that can
              keep your vehicle on track is protection.
              <br />
              Auto Takaful will offer you a shariah-compliant plan that will
              protect your vehicle against financial loss in cases of damage,
              theft, or accidents. Even if you end up damaging or hurting a
              third party in an accident, Auto Takaful plan will take care of
              the losses.
              <br />
              Furthermore, when you get a takaful policy from Takaful Bazaar, we
              make sure that you get unbiased advice & transparent comparisons
              at affordable contributions to ensure both your auto & pocket are
              happy.
            </p>
            <p
              className={styles["modalsubTxtRed"]}
              onClick={() => router.push("/productPlan")}
            >
              Compare and Get Your AutoTakaful Now
            </p>

            <p
              className={styles["whychoosetxtRed"]}
              onClick={() => setDivOpen(false)}
            >
              Show less
            </p>
          </div>
        ) : null}
      </Container>
      <MediaQuery minWidth={700}>
        <div className={styles["imageContainer"]}>
          <Lottie
            // speed={0.6}
            options={{
              loop: true,
              autoplay: true,
              animationData: AutoTakaful,

              rendererSettings: {
                preserveAspectRatio: "xMidYMin overflow",
              },
            }}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <div className={styles["imageContainer"]}>
          <Lottie
            // speed={0.6}
            style={{ alignItems: "center", height: "400px" }}
            options={{
              loop: true,
              autoplay: true,
              animationData: Banner,
              rendererSettings: {
                preserveAspectRatio: "xMinYMin  slice",
              },
            }}
          />
        </div>
      </MediaQuery>
    </div>
  );
};

export default WhatIsAutoTakaful;
