import BannerImage from "../../../public/assets/best-price.png";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import MediaQuery from "react-responsive";

export type BannerProps = {
  path: string;
  hideForm?: boolean;
  showBanner?: boolean;
  bannerSecondText: string;
  bannerHeadingText: String;
  bannerSubText: String;
  isImage: Boolean;
  fromCreateRequest: Boolean;
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

const SimpleBanner = ({ isImage, fromCreateRequest }: BannerProps) => {
  return (
    <>
      <MediaQuery minWidth={1000}>
        <div className={`${styles["wrapper"]}`} >
          <div className={styles["background"]}></div>
          <Container>
            <Row>
              <Col md={7}>
                {isImage && (
                  <Row>
                    <Col md={{ size: 10, offset: 2 }}>
                      <div>
                        <Image
                          priority={true}
                          src={BannerImage}
                          alt=""
                          objectFit="contain"
                        />
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
              {!fromCreateRequest ? (
                <Col
                  md={5}
                  className="p-0 d-flex flex-column align-items-center"
                  
                >
                  <div className={styles["best-gurantee"]}>
                    {/* <span>Let's find the</span> */}
                    <p style={{ margin: 0, fontSize: 35 }}>
                      <b>Best</b>
                      <b style={{ color: "#E91734", marginLeft: 10 }}>Price</b>
                    </p>
                    <b>
                      <p style={{ margin: 0, fontSize: 35, color: "#E91734" }}>
                        {" "}
                        Guarantee
                      </p>
                    </b>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                      FOUND A LOWER PRICE ELSEWHERE?
                    </p>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                      NO PROBLEM!
                    </p>
                  </div>
                </Col>
              ) : null}
            </Row>
          </Container>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={1000}>
        <div className={`${styles["wrapper"]}`}>
          <div className={styles["background"]}></div>
          <Container>
            <Row>
            {isImage && (
                  <Row>
                    <Col md={{ size: 10, offset: 2 }}>
                      <div>
                        <Image
                          priority={true}
                          src={BannerImage}
                          alt=""
                          objectFit="contain"
                        />
                      </div>
                    </Col>
                  </Row>
                )}
             {!fromCreateRequest ? (
                <Col
                  md={5}
                  className="p-0 d-flex flex-column align-items-center"
                >
                  <div className={styles["best-gurantee"]}>
                    {/* <span>Let's find the</span> */}
                    <p style={{ margin: 0, fontSize: 35 }}>
                      <b>Best</b>
                      <b style={{ color: "#E91734", marginLeft: 10 }}>Price</b>
                    </p>
                    <b>
                      <p style={{ margin: 0, fontSize: 35, color: "#E91734" }}>
                        {" "}
                        Guarantee
                      </p>
                    </b>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                      FOUND A LOWER PRICE ELSEWHERE?
                    </p>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                      NO PROBLEM!
                    </p>
                  </div>
                </Col>
              ) : null}
            </Row>
          </Container>
        </div>
      </MediaQuery>
    </>
  );
};

export default SimpleBanner;
