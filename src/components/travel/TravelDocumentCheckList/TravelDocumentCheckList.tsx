import AutoTakafulBanner2 from "../../../public/assets/AutoTakafulBanner2.png";
import AutoTakafulBanner from "../../../public/assets/AutoTakafulBanner.svg";
import TravelDocumentListTabs from "../TravelDocumentListTabs/TravelDocumentListTabs";
import styles from "./TravelDocumentCheckList.module.scss";
import Image from "next/image";
import { Container } from "react-bootstrap";
import MediaQuery from "react-responsive";
import DocumentListTabs from "~components/DocumentListTabs/DocumentListTabs";

const TravelDocumentCheckList = () => (
  <>
    <MediaQuery minWidth={450}>
      <div className={styles["wrapper"]}>
        <Container
          className={`d-flex align-items-center flex-column ${styles["container"]}`}
        >
          <p className={styles["heading"]}>
            Documents{" "}
            <span className={styles["headingInRed"]}> Checklist </span>
          </p>
          <p className={styles["paragraph"]}>
            Don’t know what documents you need to file a claim after theft and
            damage? Scroll down the list and gather your documents to file a
            claim:
          </p>

          <div className={`w-50 ${styles["tabsStyle"]}`}>
            <TravelDocumentListTabs />
          </div>
        </Container>
      </div>
    </MediaQuery>
    <MediaQuery maxWidth={450}>
      <div className={styles["wrapper"]}>
        <Container
          className={`d-flex align-items-center flex-column ${styles["container"]}`}
        >
          <p className={styles["heading"]}>
            Documents{" "}
            <span className={styles["headingInRed"]}> Checklist </span>
          </p>
          <p className={styles["paragraph"]}>
            Here’s an exhaustive list of document you may need to submit to make
            a claim,you may need only a few or all of them based on your
            situation.{" "}
          </p>
          <div className={`align-self-center d-flex mt-4 `}>
            <TravelDocumentCheckList />
          </div>
        </Container>
      </div>
    </MediaQuery>
  </>
);

export default TravelDocumentCheckList;
