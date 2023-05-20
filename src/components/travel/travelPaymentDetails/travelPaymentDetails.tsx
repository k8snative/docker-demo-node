import styles from "./travelPaymentDetails.module.scss";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import {
  clearBuyNow,
  clearFilters,
  clearPurchaseInfo,
  setAllowedTab,
  setPaymentDetails,
} from "src/lib/redux/auth/action";
import * as Yup from "yup";
import Dropdown from "~components/Dropdown/Dropdown";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import RadioButton2 from "~components/RadioButton2/RadioButton2";
import Tick from "~public/assets/tickDropDown.png";

const paymentMode = [
  {
    tabName: "Cash / Cheque",
    tabValue: "cash",
  },
  {
    tabName: "Online payment",
    tabValue: "online",
  },
  {
    tabName: "IBFT",
    tabValue: "ibft",
  },
];

const PaymentDetailsSection = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={`${styles["voucherwrapper"]}`}>
      <p className={`${styles["paymentheading"]}`}>Payment Details</p>
      <div className={`${styles["paymentdetailswrapper"]}`}>
        <Row className={`${styles["txtFieldsRow"]}`}>
          <Col
            xl={4}
            lg={5}
            md={4}
            className={`d-flex align-items-center  mt-3 `}
          >
            <Form className={styles["formstyles"]}>
              <Form.Check
                onClick={() => {
                  setDisabled(!disabled);
                }}
                type="switch"
                id="custom-switch"
                required
              />
            </Form>
            <p className={`m-0 ${styles["iAgreeTxt"]}`}>I have a voucher</p>
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <div
              className={` d-flex align-items-center justify-content-end position-relative  ${styles["inputBorder"]}`}
            >
              <input
                className={` ${styles["input"]}`}
                placeholder="Enter Voucher Code"
                disabled={disabled}
              />
            </div>
            {!disabled && (
              <p className={` ${styles["error"]}`}>
                *The voucher code is invalid
              </p>
            )}
          </Col>
          <Col lg={6}>
            <div
              className={` d-flex align-items-center justify-content-end position-relative  ${styles["inputBorder"]}`}
            >
              <input
                className={` ${styles["input"]}`}
                placeholder="Enter Voucher Code"
                disabled={disabled}
              />
              <div className={`${styles["imgcontainer"]}`}>
                <Image src={Tick} alt="tick" />
              </div>
            </div>
          </Col>
        </Row>

        {!disabled && (
          <Row>
            <Col lg={6}>
              <p className={`m-0 ${styles["iAgreeTxt"]}`}>
                Voucher code applied - PKR 123
              </p>
            </Col>
            <Col lg={6}>
              <div className={` ${styles["pricedivRight"]}`}>
                <p className={`m-0 ${styles["pricetext"]}`}> PKR 45000</p>
                <p className={` ${styles["removetxt"]}`}>Remove</p>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const Cash = ({ formik }: { formik: any }) => {
  const [cities, setCities] = useState();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });

  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api("GET", "/city");
      setCities(
        fetchedCities.data.map((item: any) => {
          return { id: item.id, option: item.city };
        })
      );
    };
    fetchCitiesData();
  }, []);

  return (
    <div className={`${styles["cashwrapper"]}`}>
      <div>
        <p>Pick Up</p>
      </div>
      {isDesktopOrLaptop ? (
        <>
          <div
            className={`d-flex align-items-center ${styles["inputBorder2"]}`}
          >
            <input
              name="pickup"
              className={` ${styles["input"]}`}
              placeholder="Same as Billing Address"
              value={formik.values.pickup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.pickup && formik.errors.pickup && (
            <p className={`${styles["inputError"]}`}>{formik.errors.pickup}</p>
          )}
        </>
      ) : (
        <>
          <textarea
            name="pickup"
            className={`${styles["cashtextarea"]}`}
            placeholder="Same as Billing Address"
            value={formik.values.pickup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pickup && formik.errors.pickup && (
            <p className={`${styles["inputError"]}`}>{formik.errors.pickup}</p>
          )}
        </>
      )}

      <div className={`mt-3 mb-4 ${styles["dropdowndiv"]} paymentPage`}>
        <Dropdown
          name="city_id"
          label="City"
          options={cities}
          error={formik.touched.city_id && formik.errors.city_id}
          value={formik.values.city_id}
          onBlur={formik.handleBlur}
          formik={formik}
          type={"object"}
        />
      </div>
    </div>
  );
};

const OnlinePayment = () => (
  <div className={`${styles["cashwrapper"]}`}>
    <h5>OnlinePayment</h5>
  </div>
);

const IBFT = () => (
  <div className={`${styles["ibftwrapper"]}`}>
    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles["ibftxt"]}`}>Account title:</p>
          <p className={`m-0 ${styles["ibftxt"]}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles["ibftxt"]}`}>IBAN No.:</p>
          <p className={`m-0 ${styles["ibftxt"]}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles["ibftxt"]}`}>Account No:</p>
          <p className={`m-0 ${styles["ibftxt"]}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles["ibftxt"]}`}>Account title:</p>
          <p className={`m-0 ${styles["ibftxt"]}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles["ibftxt"]}`}>IBAN No.:</p>
          <p className={`m-0 ${styles["ibftxt"]}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
    </Row>
  </div>
);

const HowToPay = ({ formik }: { formik: any }) => {
  // const [activeTab, setActiveTab] = useState(0)
  return (
    <div className={`${styles["HowtoPayWrapper"]}`}>
      <p className={`${styles["paymentheading"]}`}>
        How would you like to pay?
      </p>
      <div className={`w-50 pb-1 d-flex flex-row justify-content-between`}>
        {paymentMode?.map((tab, index) => (
          <div
            key={index}
            className={`${styles["tabs"]}`}
            onClick={() =>
              formik.setFieldValue("selectedPaymentMode", tab.tabValue)
            }
          >
            <p
              className={`${
                styles[
                  formik.values.selectedPaymentMode === tab.tabValue
                    ? "tabTxtActive"
                    : "tabTxtInactive"
                ]
              }`}
            >
              {tab.tabName}
            </p>
          </div>
        ))}
      </div>
      {formik.values.selectedPaymentMode === "cash" && <Cash formik={formik} />}
      {formik.values.selectedPaymentMode === "online" && <OnlinePayment />}
      {formik.values.selectedPaymentMode === "ibft" && <IBFT />}
    </div>
  );
};

const LoremText = () => (
  <div className={`d-flex flex-column mt-3`}>
    <p className={`m-0 ${styles["loremtxt"]}`}>
      *You have 7 days to make payment after buying a policy
    </p>
    <p className={`mt-2 ${styles["loremtxt"]}`}>
      * You can drop your payment at XYZ{" "}
    </p>
  </div>
);

const HowToPayMob = ({ formik }: { formik: any }) => {
  return (
    <div className={`m-0 ${styles["radiobtns"]}`}>
      <RadioButton2
        isChecked={formik.values.selectedPaymentMode === "cash"}
        handleChange={() => {
          formik.setFieldValue("selectedPaymentMode", "cash");
        }}
        label="Cash/Cheque"
      />
      {formik.values.selectedPaymentMode === "cash" && <Cash formik={formik} />}
      <RadioButton2
        isChecked={formik.values.selectedPaymentMode === "online"}
        handleChange={() => {
          formik.setFieldValue("selectedPaymentMode", "online");
        }}
        label="Online Payment"
      />
      {formik.values.selectedPaymentMode === "online" && <OnlinePayment />}
      <RadioButton2
        isChecked={formik.values.selectedPaymentMode === "ibft"}
        handleChange={() => {
          formik.setFieldValue("selectedPaymentMode", "ibft");
        }}
        label="IBFT"
      />
      {formik.values.selectedPaymentMode === "ibft" && <IBFT />}
    </div>
  );
};

const TravelPaymentDetails = ({
  currentStep,
  updateState,
  link,
}: {
  currentStep: number;
  updateState: Function;
  link: string;
}) => {
  const [paymentData, setPaymentData] = useState({});
  const data = useSelector((state) => state?.auth?.data);
  const order_id = useSelector(
    (state) => state?.auth?.purchaseDetails.order_id
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    pickup: "",
    city_id: "",
    selectedPaymentMode: "cash",
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      selectedPaymentMode: Yup.string(),
      pickup: Yup.string().when("selectedPaymentMode", {
        is: (selectedPaymentMode: any) => selectedPaymentMode === "cash",
        then: Yup.string().required("Pickup is required."),
        otherwise: Yup.string(),
      }),
      city_id: Yup.number().when("selectedPaymentMode", {
        is: (selectedPaymentMode: any) => selectedPaymentMode === "cash",
        then: Yup.number().required("City is required."),
        otherwise: Yup.number(),
      }),
    }),
    onSubmit: async (values) => {
      router.push({
        pathname: "/travel/Covered  ",
      });
      const apiPayload = {
        order_id: order_id,
        payment_mode: values.selectedPaymentMode,
        payment_status: "pending",
        order_status: "In Process TB",
        payment: {
          order_id: order_id,
          pickup: values.pickup,
          city_id: values.city_id,
        },
        created_by: data.user.id,
        updated_by: data.user.id,
      };

      Api("PUT", "order/update/payment", apiPayload)
        .then((res) => {
          if (res?.success) {
            dispatch(clearFilters());
            dispatch(clearBuyNow());
            dispatch(clearPurchaseInfo());
            router.push({
              pathname: "/payment/invoice/" + order_id,
            });
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    },
  });

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <MediaQuery minWidth={430}>
        <PaymentDetailsSection />
        <HowToPay formik={formik} />
        <LoremText />
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <HowToPayMob formik={formik} />
      </MediaQuery>
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          link=""
          onClick={formik.handleSubmit}
          label="Save and continue"
        />
      </div>
    </Container>
  );
};

export default TravelPaymentDetails;
