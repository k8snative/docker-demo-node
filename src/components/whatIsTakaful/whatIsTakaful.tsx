import BannerForm from "../BannerForm/BannerForm";
import styles from "./whatIsTakaful.module.scss";
import { Container } from "react-bootstrap";
import Lottie from "react-lottie";
import MediaQuery from "react-responsive";

const WhatIsTakaful = ({
  headingOne,
  hedingTwo,
  parargaph,
  banner,
  mobileBanner,
}: {
  headingOne: string; 
  hedingTwo:string,
  parargaph: string;
  banner: string;
  mobileBanner: string;
}) => (
  <div className={styles["wrapper"]}>
    <MediaQuery maxWidth={430}>
      <div className={` ${styles["CategoriesBottonsMobileContainer"]}`}>
        <BannerForm />
      </div>
    </MediaQuery>

    <Container className={styles["whatIsAutoTakaful"]}>
      <p className={styles["heading"]}>
      {headingOne}{" "}
        <span className={styles["autoTakafulRedText"]}>{hedingTwo}</span>?
      </p>
      <p className={` ${styles["autoTakafulparagraph"]}`}>{parargaph}</p>
    </Container>
    <MediaQuery minWidth={700}>
      <div className={styles["imageContainer"]}>
        <Lottie
          // speed={0.6}
          options={{
            loop: true,
            autoplay: true,
            animationData: banner,
            rendererSettings: {
              preserveAspectRatio: "xMidYMin slice",
            },
          }}
        />
      </div>
    </MediaQuery>
    <MediaQuery maxWidth={700}>
      <div className={styles["imageContainer"]}>
        <Lottie
          // speed={0.6}
          options={{
            loop: true,
            autoplay: true,
            animationData: mobileBanner,
            rendererSettings: {
              preserveAspectRatio: "xMinYMin  slice",
            },
          }}
        />
      </div>
    </MediaQuery>
  </div>
);

export default WhatIsTakaful;
