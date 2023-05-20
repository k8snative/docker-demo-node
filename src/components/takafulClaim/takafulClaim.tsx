import AutoTakafulBanner2 from "../../../public/assets/AutoTakafulBanner2.png";
import AutoTakafulBanner from "../../../public/assets/AutoTakafulBanner.svg";
import styles from "./takafulClaim.module.scss";
import Image from "next/image";
import { Container } from "react-bootstrap";
import MediaQuery from "react-responsive";

const TakafulClaim = ({
  headingOne,
  headingTwo,
  paragraph,
  asset,
}: {
  headingOne: string;
  headingTwo: string;
  paragraph: string;
  asset: string;
}) => (
  <div className={styles["wrapper"]}>
    <Container
      className={`d-flex align-items-center flex-column ${styles["container"]}`}
    >
      <p className={styles["heading"]}>
        {headingOne}{" "}
        <span className={styles["headingInRed"]}> {headingTwo} </span>
      </p>
      <p className={styles["paragraph"]}>
        {paragraph}
      </p>
      <MediaQuery minWidth={430}>
        <div className={styles["imageContainer"]}>
          <Image src={AutoTakafulBanner} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <div className={styles["mimageContainer"]}>
          <Image src={AutoTakafulBanner2} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
    </Container>
  </div>
);

export default TakafulClaim;
