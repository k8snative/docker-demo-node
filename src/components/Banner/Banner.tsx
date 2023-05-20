import HomeBanner from "../../../public/assets/auto-banner.png";
import BannerForm from "../BannerForm/BannerForm";
import CategoryTabs from "../auto/CategoryTabs";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import MediaQuery from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import Api from "src/lib/api";

export type BannerProps = {
  path: string;
  hideForm?: boolean;
  showBanner?: boolean;
  bannerSecondText: string;
  bannerHeadingText: String;
  bannerSubText: String;
};
const Selector = ({
  activeSlide,
  id,
  onClick,
}: {
  activeSlide: number;
  id: number;
  onClick: Function;
}) => (
  <div
    onClick={() => onClick(id)}
    className={
      activeSlide === id
        ? `${styles["selector"]} ${styles["active"]}`
        : styles["selector"]
    }
  />
);

const Selectors = ({
  slidesCount,
  activeSlide,
  onClick,
  hideForm,
}: {
  slidesCount: number;
  activeSlide: number;
  onClick: Function;
  hideForm: any;
}) => {
  const selectors = [];
  for (let i = 0; i < slidesCount; i += 1) {
    selectors.push(
      <Selector
        key={i}
        activeSlide={activeSlide}
        id={i}
        onClick={(id: number) => onClick(id)}
      />
    );
  }
  return (
    <div className={`${styles["selectors"]} d-flex align-items-center`}>
      {selectors}
    </div>
  );
};

const Banner = ({
  path,
  hideForm,
  showBanner = true,
  bannerSecondText = "",
  bannerHeadingText = "",
  bannerSubText = "",
}: BannerProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [bannerImgData, setBannerImgData] = useState([]);
  const getBannerImgs = async () => {
    const response = await Api(
      "GET",
      `banner-show-on-page?show_on_page=${encodeURIComponent(`/${path}`)}`
    );
    if (response?.data?.length > 0) {
      setBannerImgData(response?.data);
    } else {
      setBannerImgData([]);
    }
  };
  useEffect(() => {
    getBannerImgs();
  }, []);

  return (
    <>
      <MediaQuery minWidth={1024}>
        <div className={`${styles["wrapper"]}`}>
          <div className={styles["background"]}></div>
          <Container>
            <Row>
              <Col md={7}>
                <Row>
                  <Col className={`${styles["selector-wrapper"]}`} md={1}>
                    <Selectors
                      slidesCount={bannerImgData?.length}
                      activeSlide={activeSlide}
                      onClick={(id: number) => setActiveSlide(id)}
                    />
                  </Col>
                  <Col md={11}>
                    {bannerImgData?.length ? (
                      <Carousel
                        infiniteLoop={true}
                        autoPlay={true}
                        selectedItem={activeSlide}
                        swipeable={true}
                        axis="vertical"
                        dynamicHeight={true}
                        showThumbs={false}
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        onChange={(index) => setActiveSlide(index)}
                      >
                        
                        {bannerImgData.map((item) => (
                          <div
                            key={item.desktop_image_url}
                            className={styles["image-wrapper"]}
                          >
                            <Image
                              src={item.desktop_image_url}
                              alt=""
                              // hei
                              // sizes="100vw"
                              // layout=""
                              // style={{height: "100%", width:"100%"}}
                              width={"410"}
                              height={410}

                            />
                          </div>
                        ))}
                      </Carousel>
                    ) : null}
                  </Col>
                </Row>
              </Col>
              <Col md={5} className="p-0 d-flex flex-column align-items-center">
                {hideForm && <CategoryTabs />}
                <div className={`${styles["formdiv"]}`}>
                  {!hideForm && <BannerForm />}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={1024}>
        <div className={`${styles["wrapper"]}`}>
          {bannerHeadingText !== "" && (
            <div className="bannerIntialContainerAuto">
              <p style={{ margin: 0 }}>
                <b>{bannerHeadingText}</b>
                <b style={{ color: "red", marginLeft: 5 }}>
                  {bannerSecondText}
                </b>
              </p>
              <p style={{ margin: 0, fontSize: 14, marginBottom: 0 }}>
                {bannerSubText}
              </p>
            </div>
          )}
          {/* <div className={styles["background"]}></div> */}
          {hideForm && (
            <Container>
              <Row>
                {bannerImgData?.length ? (
                  <Col md={12}>
                    <div className={`${styles["selector-wrapper"]}`}>
                      <Selectors
                        slidesCount={bannerImgData.length}
                        activeSlide={activeSlide}
                        onClick={(id: number) => setActiveSlide(id)}
                      />
                    </div>
                    <Carousel
                      infiniteLoop={true}
                      selectedItem={activeSlide}
                      swipeable={true}
                      axis="horizontal"
                      width={"100%"}
                      autoPlay={true}
                      showThumbs={false}
                      showArrows={false}
                      showStatus={false}
                      showIndicators={false}
                      onChange={(index) => setActiveSlide(index)}
                    >
                      {bannerImgData.map((item) => (
                         <div
                         key={item.desktop_image_url}
                         className={styles["image-wrapper"]}
                       >
                         <Image
                           src={item.desktop_image_url}
                           alt=""
                           // hei
                           // sizes="100vw"
                           // layout=""
                           // style={{height: "100%", width:"100%"}}
                           width={"410"}
                           height={410}

                         />
                       </div>
                      ))}
                    </Carousel>
                  </Col>
                ) : null}
              </Row>
            </Container>
          )}
        </div>
        <Container>
          <Row>
            <Col
              md={12}
              className={`d-flex flex-column justify-content-center align-items-center ${styles["form-icon-bg"]}`}
              // className={}
            >
              {hideForm && <CategoryTabs />}
              {showBanner && (
                <div className={`${styles["formdiv"]}`}>
                  <BannerForm />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </MediaQuery>
    </>
  );
};

export default Banner;
