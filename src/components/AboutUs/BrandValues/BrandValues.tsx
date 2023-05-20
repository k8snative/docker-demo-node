import whyChoose1c from "../../../../public/assets/WhyChoose1c.png";
import whyChoose2c from "../../../../public/assets/ClaimSupport.png";
import whyChoose3c from "../../../../public/assets/WhyChoose3c.png";
import whyChoose4c from "../../../../public/assets/WhyChoose4c.png";
import whyChoose5c from "../../../../public/assets/WhyChoose5c.png";
import whyChoose6c from "../../../../public/assets/WhyChoose6c.png";
import Cross from "../../../../public/assets/cardcross.png";
import whyChoose1 from "../../../../public/assets/whyChoose1.png";
import whyChoose2 from "../../../../public/assets/ClaimSupport.png";
import whyChoose3 from "../../../../public/assets/whyChoose3.png";
import whyChoose4 from "../../../../public/assets/whyChoose4.png";
import whyChoose5 from "../../../../public/assets/whyChoose5.png";
import whyChoose6 from "../../../../public/assets/whyChoose6.png";
import styles from "../../../styles/WhyChooseUs.module.scss";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

type CustomModalProps = {
  open: boolean;
  renderComponent: ReactNode;
  setOpen: Function;
};


const HoverableImage = ({
  defaultImage,
  hoverImage,
  altText = "image",
  ...props
}: {
  defaultImage: string;
  hoverImage: string;
  altText: string;
}) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Image
        priority={true}
        src={isHovering ? hoverImage : defaultImage}
        alt={altText}
        {...props}
      />
    </div>
  );
};

const EachColumn = ({
  img,
  image,
  heading,
  paraTxt,
  modalText,
  modalHeading,
}: {
  img: StaticImageData;
  image: string;
  heading: string;
  paraTxt: string;
  modalText: string;
  modalHeading: string;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  return (
    <Col
      className={`d-flex flex-column align-items-center justify-content-between ${styles["col"]}`}
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={4}
    >
      <div className={styles["imagecontainer"]}>
        <HoverableImage
          width={150}
          height={150}
          defaultImage={img}
          hoverImage={`/assets/${image}`}
          alt={"abc"}
        />
      </div>
      <p className={styles["whychooseHeadingtxt"]}>{heading}</p>
      <div className="h-25 w-100 d-flex flex-column align-items-center justify-content-between">
        <p className={`${styles["whychoosetxt"]}`}>{paraTxt}</p>
      </div>
    </Col>
  );
};

const BrandValues = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const ColumnData = [
    {
      heading: "Transparency and Realiablity",
      paraTxt:
        "We make sure you know everything you need to make an informed decision",
      img: whyChoose2,
      image: "ClaimSupport.png",
    },
    {
      heading: "Accuracy",
      paraTxt:
        "We collect all data directly from our Takaful partners to ensure you have the correct information",
      img: isDesktopOrLaptop ? whyChoose4c : whyChoose4,
      image: "WhyChoose4c.png",
    },
    {
      heading: "One Stop Solution",
      paraTxt:
        "We have designed our platform so that you have a one-window solution for Takaful information, comparisons and purchasing",
      img: isDesktopOrLaptop ? whyChoose1c : whyChoose1,
      image: "WhyChoose1c.png",
    },
  ];

  return (
    <div className={styles["wrapper"]}>
      <Container className={styles["container"]}>
        <p className={styles["whyChooseHeading"]}>
          Brand <span className={styles["TakafulRedText"]}>values</span>
        </p>
        {/* <p className={styles['factsText']}>Fast Facts About Takaful Bazaar</p> */}
        <Row className={styles["row"]}>
          {ColumnData.map((data, index) => (
            <EachColumn
              heading={data.heading}
              paraTxt={data.paraTxt}
              img={data.img}
              image={data.image}
              modalHeading={data.modalHeading}
              modalText={data.modalText}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BrandValues;
