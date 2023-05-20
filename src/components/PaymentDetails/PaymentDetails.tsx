import styles from "./PaymentDetails.module.scss";
import payWithAlfalah from "./payment-alfalah";
import payWithNift from "./payment-nift";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import {
  clearBuyNow,
  clearFilters,
  clearPurchaseInfo,
  paymentId,
  renewPolicy as renewPolicyRedux,
} from "src/lib/redux/auth/action";
import {
  calculateAmountAfterPromotion,
  calculateDiscountAmount,
} from "src/lib/utils";
import currencyFormat from "src/utils/currencyFormat";
import * as Yup from "yup";
import Dropdown from "~components/Dropdown/Dropdown";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import RadioButton2 from "~components/RadioButton2/RadioButton2";
import RadioButton from "~components/RadioButton/RadioButton";
import AutoCompleteDropdown from "~components/ReusuableComponent/AutoCompleteDropdown";
import Tick from "~public/assets/tickDropDown.png";

const paymentMode = [
  {
    tabName: "Cheque Pickup",
    tabValue: "cash",
  },
  {
    tabName: "Credit/Debit Card",
    tabValue: "online",
  },
  {
    tabName: "Bank Fund Transfer",
    tabValue: "ibft",
  },
];

const PaymentDetailsSection = ({
  hasVoucher,
  setHasVoucher,
  formik,
  couponFormik,
  couponInitialValues,
  couponValidated,
  setCouponValidated,
  couponAmount,
  setCouponAmount,
  couponType,
  setCouponType,
  discountedValue,
  setDiscountedValue,
  setCouponInfo,
  setUpdatedAnnualContribution,
  couponHelper,
  setCouponHelper,
}: {
  hasVoucher: boolean;
  setHasVoucher: Function;
  formik: any;
  couponFormik: any;
  couponInitialValues: any;
  couponValidated: boolean;
  setCouponValidated: Function;
  couponAmount: number;
  setCouponAmount: Function;
  couponType: string;
  setCouponType: Function;
  discountedValue: number;
  setDiscountedValue: Function;
  setCouponInfo: Function;
  setUpdatedAnnualContribution: Function;
  couponHelper?: string;
  setCouponHelper?: Function;
}) => (
  <div id="VoucherContainer" className={`${styles["voucherwrapper"]}`}>
    <p className={`${styles["paymentheading"]}`}>Payment Details</p>
    <div className={`${styles["paymentdetailswrapper"]}`}>
      <Row className={`${styles["txtFieldsRow"]}`}>
        <Col
          xl={4}
          lg={5}
          md={4}
          className={`d-flex align-items-center  mt-3 `}
        >
          <label className="switch" style={{ width: "2rem" }}>
            <input
              type="checkbox"
              id="custom-switch"
              onClick={() => {
                if (hasVoucher) {
                  couponFormik.setFieldError("coupon_code", undefined);
                  // couponFormik.setFieldTouched('coupon_code', undefined)
                  couponFormik.setValues(couponInitialValues);
                  setCouponValidated(false);
                  setCouponType("");
                  setCouponAmount(0);
                  setDiscountedValue(0);
                  setCouponInfo(null);
                  setUpdatedAnnualContribution(0);
                }
                setHasVoucher(!hasVoucher);
              }}
            />
            <span className="slider round"></span>
          </label>
          <p className={`m-0 ${styles["iAgreeTxt"]}`}>I have a voucher</p>
        </Col>
      </Row>
      <Row
        className={`gy-2 ${styles["txtFieldsRow"]}`}
        style={{ display: "flex", alignItems: "baseline" }}
      >
        <Col lg={5}>
          <div
            className={` d-flex align-items-center justify-content-end position-relative  ${styles["inputBorder"]}`}
          >
            <input
              className={` ${styles["input"]}`}
              placeholder="Enter Voucher Code"
              name="coupon_code"
              disabled={!hasVoucher}
              value={couponFormik.values.coupon_code}
              onChange={(e: any) => {
                setCouponHelper("");
                setCouponValidated(false);
                setCouponType("");
                setCouponAmount(0);
                setDiscountedValue(0);
                setCouponInfo(null);
                couponFormik.handleChange(e);
              }}
              // onBlur={couponFormik.handleSubmit}
            />
            {couponValidated && (
              <div className={`${styles["imgcontainer"]}`}>
                <Image src={Tick} alt="tick" />
              </div>
            )}
          </div>

          {couponHelper}
          {couponFormik.errors.coupon_code && (
            <p className={` ${styles["error"]}`}>
              {couponFormik.errors.coupon_code}
            </p>
          )}
        </Col>
        <Col lg={2} style={{marginLeft:'-10px'}}>
          {hasVoucher && (
            <GradientBtn
              disabled={!hasVoucher}
              // loading={isLoading}
              link=""
              label="Apply"
              onClick={couponFormik.handleSubmit}
            />
          )}
        </Col>
      </Row>

      {hasVoucher && couponValidated && (
        <Row>
          <Col lg={6}>
            <p className={`m-0 ${styles["iAgreeTxt"]}`}>
              Voucher code applied -{" "}
              {couponType === "percentage"
                ? `${couponAmount}%`
                : `PKR ${couponAmount}`}
            </p>
          </Col>
          <Col lg={6}>
            <div className={` ${styles["pricedivRight"]}`}>
              <p className={`m-0 ${styles["pricetext"]}`}>
                PKR {currencyFormat(discountedValue?.toFixed(2))}
              </p>
              <p
                onClick={() => {
                  couponFormik.setValues(couponInitialValues);
                  setCouponValidated(false);
                  setCouponType("");
                  setCouponAmount(0);
                  setDiscountedValue(0);
                  setCouponInfo(null);
                  setUpdatedAnnualContribution(0);
                }}
                className={` ${styles["removetxt"]}`}
              >
                Remove
              </p>
            </div>
          </Col>
        </Row>
      )}
    </div>
  </div>
);

const Cash = ({ formik }: { formik: any }) => {
  const [cities, setCities] = useState();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [city, setCity] = useState<string>("");

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });

  const personalData = useSelector(
    (state) => state.auth.purchaseDetails.details
  );
  const data = useSelector((state) => state?.auth?.data);
  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);

  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api("GET", "/city");
      setCities(
        fetchedCities.data.map((item: any) => {
          return { id: item.id, name: item.city, value: item.city };
        })
      );
    };
    const getAllData = () => {
      if (data?.user?.id) {
        Api("GET", `order/${purchaseDetails.order_id}`)
          .then((res) => {
            if (res?.success) {
              setCustomerInfo(res.data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getAllData();
    fetchCitiesData();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (customerInfo?.OrderDetailAuto?.city_id !== null) {
        const fetchedCity = await Api(
          "GET",
          `/city/${customerInfo?.OrderDetailAuto?.city_id}`
        );
        setCity(fetchedCity.data?.city);
      }
    };
    fetchCity();
  }, [customerInfo]);
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
              className={` ${styles["input"]} disableAddress  ${
                formik.values.same_as_permanent_address
                  ? styles["disableAddress"]
                  : ""
              }`}
              // style={{disableAddress}}
              // style={{color: formik.values.same_as_permanent_address ? '#6c757d' : 'transparent'}}
              placeholder="Enter Billing Address"
              // value={formik.values.pickup}
              value={
                formik.values.same_as_permanent_address
                  ? personalData.current_address
                  : formik.values.pickup
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.same_as_permanent_address}
            />
          </div>
          <Form>
            <div key={`default-checkbox`} className="mt-2 d-flex">
              <Form.Check
                name="same_as_permanent_address"
                value={formik.values.same_as_permanent_address}
                type={"checkbox"}
                id={`default-checkbox`}
                label={"Same as Current Address: "}
                className={`${styles["same-as-text-color"]} pt-1`}
                onChange={formik.handleChange}
              />
              <span className="p-1">{personalData.current_address}</span>
            </div>
          </Form>
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
        <AutoCompleteDropdown
          label={`City`}
          option={cities}
          formikKey="city_id"
          formik={formik}
          value={
            city && {
              id: customerInfo?.OrderDetailAuto?.city_id,
              name: city,
              value: city,
            }
          }
        />
      </div>
    </div>
  );
};

const OnlinePayment = ({ payable_amount }) => (
  <div className={`${styles["cashwrapper"]}`}>
    <p className={`${styles["paymentTotal"]}`} style={{ marginBottom: 10 }}>
      Payment Total:
    </p>
    <h4>Rs {payable_amount} /=</h4>
    <div className={`${styles["paymentNote"]}`}>
      You can use Credit/Debit card to complete the payment.
    </div>
  </div>
);

const IBFT = ({ payable_amount }) => (
  <div className={`${styles["ibftwrapper"]}`}>
    <p className={`${styles["paymentTotal"]}`} style={{ marginBottom: 10 }}>
      Payment Total:
    </p>
    <h4>Rs {payable_amount} /=</h4>
    <div className={`${styles["paymentNote"]}`}>
      Pay via NiFTePay(Bank Transfer/Wallet)
    </div>
  </div>
);

const HowToPay = ({
  formik,
  order_id,
  payable_amount,
}: {
  formik: any;
  order_id: any;
  payable_amount: any;
}) => {
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
      {formik.values.selectedPaymentMode === "online" && (
        <OnlinePayment payable_amount={payable_amount} order_id={order_id} />
      )}
      {formik.values.selectedPaymentMode === "ibft" && (
        <IBFT payable_amount={payable_amount} order_id={order_id} />
      )}
    </div>
  );
};

const LoremText = () => (
  <div className={`d-flex flex-column mt-3`}>
    {/* <p className={`m-0 ${styles['loremtxt']}`}>*You have 7 days to make payment after buying a policy</p>
    <p className={`mt-2 ${styles['loremtxt']}`}>* You can drop your payment at XYZ </p> */}
  </div>
);

const HowToPayMob = ({
  formik,
  order_id,
  payable_amount,
}: {
  formik: any;
  order_id: any;
  payable_amount: any;
}) => (
  <div className={`mt-3 ${styles["radiobtns"]}`}>
    <p className={`${styles["paymentheading"]}`}>How would you like to pay?</p>
    <RadioButton
      isChecked={formik.values.selectedPaymentMode === "cash"}
      handleChange={() => {
        formik.setFieldValue("selectedPaymentMode", "cash");
      }}
      label="Cash/Cheque"
    />
    {formik.values.selectedPaymentMode === "cash" && <Cash formik={formik} />}
    <RadioButton
      isChecked={formik.values.selectedPaymentMode === "online"}
      handleChange={() => {
        formik.setFieldValue("selectedPaymentMode", "online");
      }}
      label="Online Payment"
    />
    {formik.values.selectedPaymentMode === "online" && (
      <OnlinePayment payable_amount={payable_amount} order_id={order_id} />
    )}
    <RadioButton
      isChecked={formik.values.selectedPaymentMode === "ibft"}
      handleChange={() => {
        formik.setFieldValue("selectedPaymentMode", "ibft");
      }}
      label="IBFT"
    />
    {formik.values.selectedPaymentMode === "ibft" && (
      <IBFT payable_amount={payable_amount} order_id={order_id} />
    )}
  </div>
);

const PaymentDetails = ({
  currentStep,
  updateState,
  link,
  updatedAnnualContribution,
  setUpdatedAnnualContribution,
}: {
  currentStep: number;
  updateState: Function;
  link: string;
  updatedAnnualContribution: number;
  setUpdatedAnnualContribution: Function;
}) => {
  const [paymentData, setPaymentData] = useState({});
  const data = useSelector((state) => state?.auth?.data);
  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);
  const order_id = useSelector(
    (state) => state?.auth?.purchaseDetails.order_id
  );
  const buyNow = useSelector((state) => state?.auth?.planDetails.buy_now);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasVoucher, setHasVoucher] = useState(false);
  const [couponValidated, setCouponValidated] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponType, setCouponType] = useState("");
  const [discountedValue, setDiscountedValue] = useState(0);
  const [couponInfo, setCouponInfo] = useState<{
    coupon_id: number;
    coupon_discount_type: string;
    coupon_discount_value: number;
    total_discount_value: number;
  } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const personalData = useSelector(
    (state) => state.auth.purchaseDetails.details
  );

  const couponInitialValues = {
    coupon_code: "",
  };

  const systemCoupon = useSelector(
    (state) => state?.auth?.planDetails?.buy_now
  );
  const [SystemCouponHandler, setSystemCouponHandler] = useState(0);
  const [CustomCouponHandler, setCustomCouponHandler] = useState(0);
  const [couponHelper, setCouponHelper] = useState("");

  const systemDiscount = calculateDiscountAmount(
    buyNow.annual_contribution,
    systemCoupon.promotion_discount_value,
    systemCoupon.promotion_discount_type
  );

  useEffect(() => {
    setSystemCouponHandler(
      calculateDiscountAmount(
        buyNow.annual_contribution + systemDiscount,
        systemCoupon.promotion_discount_value,
        systemCoupon.promotion_discount_type
      )
    );
  }, []);

  const couponFormik = useFormik({
    initialValues: couponInitialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      coupon_code: Yup.string().when("hasVoucher", {
        is: true,
        then: Yup.string().required(),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: async (values) => {
      if (values.coupon_code.length > 0) {
        const payload = {
          customer_id: data.user.id,
          coupon_code: values.coupon_code,
          policy_id: purchaseDetails.details.policy_id,
          make_id: purchaseDetails.vehicleDetails.make_id,
          model_id: purchaseDetails.vehicleDetails.model_id,
          year: purchaseDetails.vehicleDetails.year,
          annual_contribution: buyNow.annual_contribution + systemDiscount,
        };

        Api("POST", "verify-coupon", payload).then((response: any) => {
          if (response.success) {
            setCouponValidated(true);
            if (response.data.coupon_discount_type === "percentage") {
              setCustomCouponHandler(
                (response.data.coupon_discount_value / 100) *
                  (buyNow.annual_contribution + systemDiscount)
              );
            } else {
              setCustomCouponHandler(response.data.coupon_discount_value);
            }
            setCouponInfo({
              coupon_id: response.data.coupon_id,
              coupon_discount_type: response.data.coupon_discount_type,
              coupon_discount_value: response.data.coupon_discount_value,
              total_discount_value:
                CustomCouponHandler > SystemCouponHandler
                  ? calculateDiscountAmount(
                      buyNow.annual_contribution + systemDiscount,
                      response.data.coupon_discount_value,
                      response.data.coupon_discount_type
                    )
                  : calculateDiscountAmount(
                      buyNow.annual_contribution + systemDiscount,
                      systemCoupon.promotion_discount_value,
                      systemCoupon.promotion_discount_type
                    ),
            });
            if (CustomCouponHandler > SystemCouponHandler) {
              setCouponHelper("");
              setCouponType(response.data.coupon_discount_type);
              setCouponAmount(response.data.coupon_discount_value);
              setDiscountedValue(
                calculateAmountAfterPromotion(
                  buyNow.annual_contribution + systemDiscount,
                  response.data.coupon_discount_value,
                  response.data.coupon_discount_type
                )
              );
              setUpdatedAnnualContribution(
                calculateAmountAfterPromotion(
                  buyNow.annual_contribution + systemDiscount,
                  response.data.coupon_discount_value,
                  response.data.coupon_discount_type
                )
              );
            } else {
              setCouponHelper(
                "System Coupon is applied because it's provide more discount"
              );
            }
          } else {
            couponFormik.setFieldError("coupon_code", response.message);
          }
        });
      }
    },
  });

  const initialValues = {
    pickup: "",
    city_id: "",
    selectedPaymentMode: "cash",
    same_as_permanent_address: true,
  };
  const pickUpHandler = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.selectedPaymentMode === "cash") {
      if (schemaContext.parent.same_as_permanent_address) {
        return true;
      } else {
        if (schemaContext.parent.pickup) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  };
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      selectedPaymentMode: Yup.string(),
      pickup: Yup.string().test(
        "same_as_permanent_address",
        "Current address is required.",
        pickUpHandler
      ),
      city_id: Yup.number().when("selectedPaymentMode", {
        is: (selectedPaymentMode: any) => selectedPaymentMode === "cash",
        then: Yup.number().required("City is required."),
        otherwise: Yup.number(),
      }),
    }),
    onSubmit: async (values) => {
      if (hasVoucher && couponFormik.values.coupon_code.length === 0) {
        // couponFormik.setFieldTouched('coupon_code', 'Coupon Is Required')
      } else if (
        couponFormik.errors.coupon_code?.length === 0 ||
        couponFormik.errors.coupon_code === undefined
      ) {
        const apiPayload = {
          order_id: order_id,
          payment_mode: values.selectedPaymentMode,
          payment_status: "pending",
          ...(hasVoucher &&
            couponInfo !== null && { coupon_id: couponInfo.coupon_id }),
          ...(hasVoucher &&
            couponInfo !== null && {
              coupon_discount_type: couponInfo.coupon_discount_type,
            }),
          ...(hasVoucher &&
            couponInfo !== null && {
              coupon_discount_value: couponInfo.coupon_discount_value,
            }),
          ...(hasVoucher &&
            couponInfo !== null && {
              total_discount_value: couponInfo.total_discount_value,
            }),
          ...(hasVoucher &&
            couponInfo !== null && {
              details: {
                id: purchaseDetails.details.order_detail_id,
                total_price: discountedValue,
              },
            }),
          payment: {
            order_id: order_id,
            ...(values.selectedPaymentMode === "cash" && {
              pickup: values.same_as_permanent_address
                ? personalData.current_address
                : values.pickup,
            }),
            ...(values.selectedPaymentMode === "cash" && {
              city_id: values.city_id,
            }),
          },
        };

        setIsLoading(true);
        Api("PUT", "order/update/payment", apiPayload)
          .then((res) => {
            if (!res?.success)
              throw new Error("Failed to process payment request");
            if (!res?.payment_id)
              throw new Error("No payment_id generated by backend.");

            if (values.selectedPaymentMode === "cash") {
              // clear redux if payment is cash
              dispatch(clearFilters());
              dispatch(clearBuyNow());
              dispatch(clearPurchaseInfo());

              //
              dispatch(renewPolicyRedux({}));
              setIsLoading(false);
              router.replace({ pathname: "/payment/invoice/" + order_id });
            } else if (values.selectedPaymentMode === "online") {
              dispatch(paymentId(res.payment_id));
              payWithAlfalah(
                res.payment_id,
                discountedValue || buyNow.annual_contribution
              );
            } else if (values.selectedPaymentMode === "ibft") {
              dispatch(paymentId(res.payment_id));
              payWithNift(
                res.payment_id,
                discountedValue || buyNow.annual_contribution,
                order_id,
                "policy_purchase"
              );
            }
          })
          .catch((e) => {
            setIsLoading(false);
            console.log("Error: ", e);
          });
      }
    },
  });

  const annualContribution = calculateAmountAfterPromotion(
    buyNow.annual_contribution,
    buyNow.promotion_discount_value,
    buyNow.promotion_discount_type
  );

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <MediaQuery minWidth={430}>
        <PaymentDetailsSection
          hasVoucher={hasVoucher}
          setHasVoucher={setHasVoucher}
          formik={formik}
          couponFormik={couponFormik}
          couponInitialValues={couponInitialValues}
          couponValidated={couponValidated}
          setCouponValidated={setCouponValidated}
          couponAmount={couponAmount}
          setCouponAmount={setCouponAmount}
          couponType={couponType}
          setCouponType={setCouponType}
          discountedValue={discountedValue}
          setDiscountedValue={setDiscountedValue}
          setCouponInfo={setCouponInfo}
          setUpdatedAnnualContribution={setUpdatedAnnualContribution}
          couponHelper={couponHelper}
          setCouponHelper={setCouponHelper}
        />
        <HowToPay
          formik={formik}
          payable_amount={Math.ceil(discountedValue || annualContribution)}
          order_id={order_id}
        />
        <LoremText />
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <PaymentDetailsSection
          hasVoucher={hasVoucher}
          setHasVoucher={setHasVoucher}
          formik={formik}
          couponFormik={couponFormik}
          couponInitialValues={couponInitialValues}
          couponValidated={couponValidated}
          setCouponValidated={setCouponValidated}
          couponAmount={couponAmount}
          setCouponAmount={setCouponAmount}
          couponType={couponType}
          setCouponType={setCouponType}
          discountedValue={discountedValue}
          setDiscountedValue={setDiscountedValue}
          setCouponInfo={setCouponInfo}
          setUpdatedAnnualContribution={setUpdatedAnnualContribution}
          couponHelper={couponHelper}
          setCouponHelper={setCouponHelper}
        />
        <HowToPayMob formik={formik}     payable_amount={Math.ceil(discountedValue || annualContribution)}
          order_id={order_id}/>
      </MediaQuery>
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          disabled={isLoading}
          loading={isLoading}
          link=""
          onClick={formik.handleSubmit}
          label="Save and continue"
        />
      </div>
    </Container>
  );
};

const mapStateToProps = () => {};

const mapDispatchProps = { renewPolicy: renewPolicyRedux };

export default connect(mapStateToProps, mapDispatchProps)(PaymentDetails);
