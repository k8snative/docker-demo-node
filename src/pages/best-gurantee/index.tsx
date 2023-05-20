import BannerImage from "../../../public/assets/best-grantee-banner.png";
import BetterPrice from "../../../public/assets/better-price.png";
import ProcessRefund from "../../../public/assets/process-refund.png";
import SubmitForm from "../../../public/assets/submit-form.png";
// import Banner from "../../components/Banner/Banner";
import styles from "../../components/Banner/Banner.module.scss";
import Header from "../../components/Header";
// import { Row, Col } from "react-bootstrap";
import SeoHead from "../../components/SeoHead";
import EachColumn from "../../components/paragrahUnderImages/";
import s from "../../styles/WhatIsTakaful.module.scss";
import style from "./best-gurantee.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import SimpleBanner from "~components/Banner/simpleBanner";
import SignInUpButton from "~components/SignInUpButton/SignInUpButton";

// import SimpleBanner from "~components/Banner/simpleBanner";

export default function BestGurantee() {
  const ColumnData = [
    {
      heading: "Compare Rates",
      paraTxt:
        "Look for a lower coverage rate than the one being offered at Takaful Bazaar",
      image: "WhyChoose1c.png",
      img: BetterPrice,
    },
    {
      heading: "Submit a Form",
      paraTxt:
        "Upload a screenshot as a clear proof of lower rate being offered from elsewhere and share with us within 24 hours of your booking at Takaful Bazaar",
      image: "WhyChoose1c.png",
      img: SubmitForm,
    },
    {
      heading: "Process Refund & Additional Discount",
      paraTxt:
        "We will check your shared details and process your refund amount along with the additional 5% off discount payment.",
      image: "WhyChoose1c.png",
      img: ProcessRefund,
    },
  ];
  const history = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1177px)",
  });
  console.log("mediaQurey==>", isDesktopOrLaptop);
  return (
    <div>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: "icon",
            href: "/favIcon.png",
          },
        ]}
      />
      <Header />
      <SimpleBanner isImage={true} />

      <Container className={s["whatIsTakaful"]} style={{marginTop:'25px'}}>
        <Row style={{ margin: 0 }}>
          <Col lg={12} className="d-flex justify-content-center ">
            <b>
              <h2 className="font-weight-bold">Best Price Guarantee</h2>
            </b>
          </Col>
          <Col lg={12} style={{marginTop:'15px'}}>
            <p
              className={`${s["whatIsTakafultxt"]} ${style["font-size-price-gurantee"]}`}
            >
              Our Best Price Match Guarantee means that you can be absolutely
              sure you are getting the best coverage rate!
            </p>
            <Row className="d-flex justify-content-center ">
              <Col lg={9}>
                {" "}
                <p
                  className={`${s["whatIsTakafultxt"]} mt-3 ${style["font-size-price-gurantee"]}`}
                >
                  If you find a lower rate elsewhere within 24 hours of booking
                  at Takaful Bazaar, we will not only match the rate you are
                  being offered but will also promise to give you an additional
                  5% off over and above that rate!
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div style={{ background: "#F5F5F5" }}>
        <Container>
          <p className={style["whyChooseHeading"]}>
            How does it <span className={style["TakafulRedText"]}>work?</span>{" "}
          </p>

          <Row className={styles["row"]}>
            {!isDesktopOrLaptop && (
              <>
                <Col lg={4} className="d-flex justify-content-center">
                  <h4
                    style={{
                      // borderBottom: "solid 1px",
                      width: "100%",
                      textAlign: "center",
                      marginLeft:'5rem'
                    }}
                    className={style["TakafulRedText"]}
                  >
                    Step 1
                  </h4>
                  <span className={`${style["border-line"]}`}></span>
                </Col>
                <Col lg={4} className="d-flex justify-content-center">
                  <h4
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginLeft:'5rem'
                    }}
                    className={style["TakafulRedText"]}
                  >
                    Step 2
                  </h4>
                  <span className={`${style["border-line"]}`}></span>
                </Col>
                <Col lg={4} className={`d-flex justify-content-center `}>
                  <h4 className={style["TakafulRedText"]}> Step 3</h4>
                </Col>
              </>
            )}

            {ColumnData.map((data, index) => (
              <EachColumn
                heading={data.heading}
                paraTxt={data.paraTxt}
                img={data.img}
                index={index}

                // stepImage={data.StepImage}
              />
            ))}
          </Row>

          <SignInUpButton
            // link={"/auth"}
            btnTxt="Submit a request"
            onClick={() => {
              history.push("/best-gurantee-add-request");
            }}
          />
        </Container>
      </div>
    </div>
  );
}
