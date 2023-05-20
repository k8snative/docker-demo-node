import whyChoose1c from "../../../../public/assets/WhyChoose1c.png";
import whyChoose2c from "../../../../public/assets/WhyChoose2c.png";
import whyChoose3c from "../../../../public/assets/WhyChoose3c.png";
import whyChoose4c from "../../../../public/assets/WhyChoose4c.png";
import whyChoose5c from "../../../../public/assets/WhyChoose5c.png";
import whyChoose6c from "../../../../public/assets/WhyChoose6c.png";
import Cross from "../../../../public/assets/cardcross.png";
import whyChoose1 from "../../../../public/assets/whyChoose1.png";
import whyChoose2 from "../../../../public/assets/whyChoose2.png";
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
      className={`d-flex flex-column align-items-center justify-content-evenly ${styles["col"]}`}
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
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

const VissionMission = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
  const ColumnData = [
    {
      heading: "Vision",
      paraTxt:
        "To transform the insurance industry and extend the safety net to the masses by offering a fully digital and Shariah-compliant takaful ecosystem",
      img: isDesktopOrLaptop ? whyChoose1c : whyChoose1,
      image:"WhyChoose1c.png",
    },
    {
      heading: "Mission",
      paraTxt:
        "To Develop a digital marketplace that provides a wide range of takaful products to as many people in Pakistan as possible",
      img: isDesktopOrLaptop ? whyChoose2c : whyChoose2,
      image: "WhyChoose2c.png",
    },
  ];

  return (
    <div className={styles["wrapper"]} style={{ backgroundColor: "#F5F5F5", paddingBottom: "50px" }}>
      <Container >
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

export default VissionMission;
