import Step from "../../../public/assets/steps.PNG";
import styles from "./paragraphUnderImages.module.scss";
import Image, { StaticImageData } from "next/image";
import { Col } from "react-bootstrap";

const EachColumn = ({
  heading,
  paraTxt,
  img,
  index,
  
}: {
  img: StaticImageData;
  image: string;
  heading: string;
  paraTxt: string;
  modalText: string;
  modalHeading: string;
  index: number;
  stepImage:StaticImageData;
}) => {
  return (
    <Col
      className={`d-flex flex-column align-items-center justify-content-between ${styles["col"]}`}
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={4}
    //   style={{ border: "solid black" }}
      // xs (for phones - screens less than 768px wide)
      // sm (for tablets - screens equal to or greater than 768px wide)
      // md (for small laptops - screens equal to or greater than 992px wide)
      // lg (for laptops and desktops - screens equal to or greater than 1200px wide)
    >

      {/* <div >
        <h3 className={styles["TakafulRedText"]} style={{ display: "inline" }}>
          Step {index + 1}
        </h3>
      </div> */}
      <div className={styles["imagecontainer"]}>
        <Image priority={true} src={img} />
      </div>
      <p className={styles["whychooseHeadingtxt"]}>{heading}</p>
      <div className="h-25 w-100 d-flex flex-column align-items-center justify-content-between">
        <p className={`${styles["whychoosetxt"]}`}>{paraTxt}</p>
      </div>
    </Col>
  );
};

export default EachColumn;
