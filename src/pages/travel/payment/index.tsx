import styles from "./paymentPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import { clearPurchaseInfo } from "src/lib/redux/auth/action";
import currencyFormat from "src/utils/currencyFormat";
import DocumentsUpload from "~components/DocumentsUpload/DocumentsUpload";
import Footer from "~components/Footer/Footer";
import GetOurApp from "~components/GetOurApp/GetOurApp";
import Header from "~components/Header";
import MultiStepForm from "~components/MultiStepForm/MultiStepForm";
import MultiStepFormMob from "~components/MultiStepFormMob/MultiStepFormMob";
import PaymentDetails from "~components/PaymentDetails/PaymentDetails";
import PersonalDetails from "~components/PersonalDetails/PersonalDetails";
import ReviewDetails from "~components/ReviewDetails/ReviewDetails";
import SeoHead from "~components/SeoHead";
import VehicleDetails from "~components/VehicleDetails/VehicleDetails";
import TravelDocumentsUpload from "~components/travel/travelDocumentUpload/travelDocumentsUpload";
import TravelPersonalDetails from "~components/travel/travelPersonalDetails/travelPersonalDetails";
import TravelReviewDetails from "~components/travel/travelReviewDetails/travelReviewDetails";
import GoBack from "~public/assets/arrowBack.png";
import GoBackRed from "~public/assets/arrowBackred.png";
import Gradient from "~public/assets/gradient.png";
import UBL from "~public/assets/ubl.png";
import UBLInsurer from "~public/assets/ublInsurer.png";
import TravelPaymentDetails from "~components/travel/travelPaymentDetails/travelPaymentDetails";

const GoBackSection = () => {
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });
  const { make_id, model_id, year, value } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const [makeModel, setMakeModel] = useState("");
  const getModel = () => {
    if (!!model_id) {
      Api("GET", `model/${model_id}`).then((res) => {
        if (res.model) {
          setMakeModel(res.model?.name);
        }
      });
    }
  };

  return (
    <div className={`${styles["goBackWrapper"]} `}>
      <Container>
        <Row>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={styles["gobackcol"]}
          >
            <div onClick={() => router.back()}>
              {/* <Link href={{ pathname: '/productPlan' }}> */}
              <div className={styles["gobackdiv"]}>
                {isDesktopOrLaptop ? (
                  <>
                    <div className={styles["gobackarrow"]}>
                      <Image src={GoBack} alt="backarrow" />
                    </div>
                    <p className={`mt-3 ${styles["gobacktxt"]}`}>Go Back</p>
                  </>
                ) : (
                  <>
                    <div className={styles["gobackarrowmob"]}>
                      <Image src={GoBackRed} alt="backarrow" />
                    </div>
                    <p className={`mt-3 ${styles["gobacktxt"]}`}>
                      Back to Policy
                    </p>
                  </>
                )}
              </div>
              {/* </Link> */}
            </div>
            <div className={styles["pricediv"]}>
              <p className={`${styles["pricedivtxt"]}`}>Schengen Countries</p>
              <p className={`${styles["pricedivtxtred"]}`}> | </p>
              <p className={`${styles["pricedivtxt"]}`}>Single Trip</p>
              <p className={`${styles["pricedivtxtred"]}`}> | </p>
              <p className={`${styles["pricedivtxt"]}`}>Family</p>
              <p className={`${styles["pricedivtxtred"]}`}> | </p>
              <p className={`${styles["pricedivtxt"]}`}>30 july 2020</p>
              <p className={`${styles["pricedivtxtred"]}`}> - </p>
              <p className={`${styles["pricedivtxt"]}`}>01 July 2020</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const HorizontalCard = () => {
  const apiOrigin = process.env["NEXT_PUBLIC_IMAGE_ORIGIN"];
  return (
    <div className={`${styles["horizontalCardWrapper"]} `}>
      <div className={`${styles["horizontalCard"]} `}>
        <div className={`${styles["icondiv"]} `}>
          <Image
            alt=""
            src={UBL}
            width={"100%"}
            height={"100%"}
            objectFit={"contain"}
          />
        </div>
        <div className={`${styles["icondiv2"]} `}>
          <Image src={Gradient} alt="" objectFit="contain" />
        </div>
        <div className={`${styles["backgroundimg"]} `}>
          <div>
            <p className={`m-0 ${styles["cardinnertext"]}`}>Coverage Up to</p>
            <p className={`m-0 ${styles["cardinnertext"]}`}>25 Days</p>
          </div>
          <div>
            <p className={`m-0 ${styles["cardinnertext"]}`}>Plan Type</p>
            <p className={`m-0 ${styles["cardinnertext"]}`}>Standard Plan</p>
          </div>
          <div>
            <p className={`m-0 ${styles["cardinnertext"]}`}>
              Annual Premium (PKR)
            </p>
            <p className={`m-0 ${styles["cardinnertext2"]}`}>3,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileCard = () => {
  const { annual_contribution, insurance_rate, company_logo_url, policy_name } =
    useSelector((state) => state?.auth?.planDetails.buy_now);
  const apiOrigin = process.env["NEXT_PUBLIC_IMAGE_ORIGIN"];
  return (
    <>
      <div className={` ${styles["cardWrapper"]}`}>
        <div className={` ${styles["cardUpperDiv"]}`}>
          <div className={` ${styles["mobcardImg"]}`}>
            <Image
              alt=""
              src={company_logo_url ? apiOrigin + company_logo_url : UBL}
              width={"100%"}
              height={"100%"}
              objectFit={"contain"}
            />
          </div>
          <p className={`m-0 ${styles["mobcardpricetxt"]}`}>
            PKR{currencyFormat(annual_contribution)}
          </p>
        </div>
        <div className={` ${styles["cardLowerDiv"]}`}>
          <p className={`m-0 ${styles["lowerdivheading"]}`}>{policy_name}</p>
          <div
            className={`d-flex flex-row align-items-center justify-content-between`}
          >
            <p className={`m-0 mb-1 ${styles["mobcardtxt"]}`}>Rate</p>
            <p className={`m-0  mb-1 ${styles["mobcardtxt"]}`}>
              {insurance_rate}%
            </p>
          </div>
          <div className={`d-flex flex-row justify-content-between`}>
            <p className={`m-0 ${styles["mobcardtxt"]}`}>Installment Plan</p>
            <p className={`m-0 ${styles["mobcardtxt"]}`}>
              {currencyFormat(annual_contribution)} / month
            </p>
          </div>
        </div>
      </div>
      <div className={` ${styles["redDiv"]}`} />
    </>
  );
};

const TabData = ({
  selectedTab,
  updateState,
}: {
  selectedTab: number;
  updateState: Function;
}) => {
  if (selectedTab === 0)
    return (
      <TravelDocumentsUpload
        currentStep={selectedTab}
        updateState={updateState}
      />
    );
  if (selectedTab === 1)
    return (
      <TravelPersonalDetails
        currentStep={selectedTab}
        updateState={updateState}
      />
    );
  if (selectedTab === 2)
    return (
      <TravelReviewDetails
        currentStep={selectedTab}
        updateState={updateState}
      />
    );
    if (selectedTab === 3)
    return (
      <TravelPaymentDetails
        currentStep={selectedTab}
        updateState={updateState}
      />
    );

  return <></>;
};

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const allowedTabIndex = useSelector((state) => state?.auth.allowedTabIndex);
  const lockedTabIndex = useSelector((state) => state?.auth.lockedTabIndex);
  const { policy_id } = useSelector(
    (state) => state?.auth?.planDetails.buy_now
  );
  const router = useRouter();

  const updateState = (step: number) => {
    setCurrentStep(step + 1);
  };

  const mobileTabData = [
    {
      name: "Documents Upload",
      component: (
        <TravelDocumentsUpload
          currentStep={currentStep}
          updateState={updateState}
        />
      ),
    },
    {
      name: "Personal Details",
      component: (
        <TravelPersonalDetails
          currentStep={currentStep}
          updateState={updateState}
        />
      ),
    },
    {
      name: "Review Details",
      component: (
        <TravelReviewDetails
          //   link="payment/invoice"
          currentStep={currentStep}
          updateState={updateState}
        />
      ),
    },
    {
      name: "Payment Details",
      component: (
        <TravelPaymentDetails
          //   link="payment/invoice"
          currentStep={currentStep}
          updateState={updateState}
        />
      ),
    },
  ];
  return (
    <>
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
      <GoBackSection />
      <MediaQuery minWidth={500}>
        <Container>
          <HorizontalCard />
          <MultiStepForm
            data={mobileTabData}
            currentStep={currentStep}
            updateState={updateState}
            allowedTabIndex={allowedTabIndex}
            lockedTabIndex={lockedTabIndex}
          />
        </Container>
        <div className={` ${styles["tabDataContainer"]}`}>
          <Container className={`${styles["Container"]}`}>
            <TabData selectedTab={currentStep} updateState={updateState} />
          </Container>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={500}>
        <Container className={` ${styles["mobileContainer"]}`}>
          <MobileCard />
          <MultiStepFormMob
            data={mobileTabData}
            selectedTab={currentStep}
            updateState={updateState}
            allowedTabIndex={allowedTabIndex}
            lockedTabIndex={lockedTabIndex}
          />
        </Container>
      </MediaQuery>
      <GetOurApp />
      <Footer />
    </>
  );
};

export default PaymentPage;
