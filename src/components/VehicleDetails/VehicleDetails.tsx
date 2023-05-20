import styles from "./VehicleDetails.module.scss";
import { setHours, setMinutes } from "date-fns";
import { useFormik } from "formik";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import Api from "src/lib/api";
import {
  setAllowedTab,
  setLockedTab,
  setVehicleDetails,
} from "src/lib/redux/auth/action";
import { validatePhoneNo } from "src/lib/utils";
import currencyFormat from "src/utils/currencyFormat";
import * as Yup from "yup";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import PersonalDetailsDDInput from "~components/PersonalDetailsDDInput/PersonalDetailsDDInput";
import AutoCompleteDropdown from "~components/ReusuableComponent/AutoCompleteDropdown";
import formRadioChecked from "~public/assets/formRadioChecked.png";
import formRadioUnchecked from "~public/assets/formRadioUnchecked.png";

const Label = ({ txt, disabled }: { txt: String; disabled?: boolean }) => (
  <div
    className={` d-flex align-items-center justify-content-end position-relative  ${
      disabled ? styles["inputBorderDisabled"] : styles["inputBorder"]
    }`}
  >
    <p className={`m-0 ${styles["input"]}`}>{txt}</p>
  </div>
);

const VehicleDetailsRight = ({
  formik,
  renewPolicyData,
}: {
  formik: any;
  renewPolicyData: any;
}) => {
  const router = useRouter();
  const [serviceNetwork, setServiceNetwork] = useState([]);
  const { make_id, model_id, year, value } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const [makeModel, setMakeModel] = useState("");
  const [Model, setModel] = useState("");
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api("GET", "/city");
      setCitiesList(
        fetchedCities?.data?.map((item: any) => {
          return { id: item.city, name: item.city, value: item.city };
        })
      );
    };

    const fetchServiceNetwork = async () => {
      const fetchServiceNetworkList = await Api(
        "GET",
        `make_service_network/${make_id}`
      );
      let arr = [];
      (arr = fetchServiceNetworkList?.data?.map((item: any) => {
        return { id: item?.id, name: item?.name, value: item?.name };
      })),
        arr?.push({ id: 0, name: "Other", value: "Other" });
      setServiceNetwork(arr);
    };

    fetchServiceNetwork();
    fetchCitiesData();
    formik.setFieldValue("modification", false);
  }, []);

  const getMake = () => {
    if (!!make_id) {
      Api("GET", `model_make/${make_id}`).then((res) => {
        if (res.data) {
          setMakeModel(res.data?.[0].Make?.name);
        }
      });
    }
  };
  const getModel = () => {
    if (!!model_id) {
      Api("GET", `model/${model_id}`).then((res) => {
        if (res.model) {
          setModel(res.model?.name);
        }
      });
    }
  };
  useEffect(() => {
    getMake();
    getModel();
  }, [make_id, model_id]);

  const getRegisterDealerName = () => {
    let result;
    if (formik.values.service_network_id === "") {
      result = "";
    } else if (
      !formik.values.service_network_id &&
      formik.values.service_network_id !== 0
    ) {
      result = formik.values.service_network_id;
    } else if (formik.values.service_network_id !== 0) {
      if (typeof formik.values.service_network_id === "number") {
        result = serviceNetwork
          ?.filter((item) => item?.id == formik.values.service_network_id)
          .map((item) => item?.option)[0];
      } else {
        result = formik.values.service_network_id;
      }
    } else if (formik.values.service_network_id === 0) {
      result = formik.values.service_network_id;
    } else if (formik.values.service_network_id !== 0) {
      result = serviceNetwork
        ?.filter((item) => item?.id == formik.values.service_network_id)
        .map((item) => item?.option)[0];
    } else {
      result = "";
    }
    return result;
  };

  return (
    <div>
      <p className={`${styles["VehicleDetailsRightheading"]}`}>
        Vehicle Details
      </p>
      <MediaQuery minWidth={430}>
        <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <Label
              txt={makeModel}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <Label
              txt={Model}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
        </Row>
        <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <Label
              txt={year}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <Label
              txt={currencyFormat(value)}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
        </Row>
        <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="color"
              placeholder="Color (optional)"
              type="text"
              options={""}
              setShowDiv={() => {}}
              error={formik.touched.color && formik.errors.color}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <div>
              <div
                className={` 
                 ${
                   renewPolicyData?.customer_name
                     ? styles["inputBorderDisabled"]
                     : styles["form__input-group"]
                 }
                 `}
                style={
                  (renewPolicyData?.customer_name
                    ? { backgroundColor: "#DCDCDC" }
                    : { background: "transparent" },
                  { margin: 0, width: "100%" })
                }
              >
                <input
                  name="engine_number"
                  className={styles["form__input"]}
                  type="text"
                  value={formik.values.engine_number}
                  onChange={(e) => {
                    if (!renewPolicyData?.customer_name) formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  disabled={renewPolicyData?.customer_name && true}
                  // #DCDCDC !important
                  style={
                    renewPolicyData?.customer_name && {
                      backgroundColor: "#DCDCDC",
                    }
                  }
                  // style={{ backgroundColor: '#DCDCDC'}}
                />
                <label className={styles["form__input-label"]}>
                  Engine Number (optional)
                </label>
              </div>
            </div>
            {formik.touched.engine_number && formik.errors.engine_number && (
              <p className={`${styles["inputError"]}`}>
                {formik.errors.engine_number}
              </p>
            )}
          </Col>
        </Row>
        <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="chassis_number"
              placeholder="Chassis Number (optional)"
              type="text"
              options={""}
              setShowDiv={() => {}}
              error={
                formik.touched.chassis_number && formik.errors.chassis_number
              }
              value={formik.values.chassis_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="registration_number"
              placeholder="Registration Number (optional)"
              type="text"
              options={""}
              setShowDiv={() => {}}
              error={
                formik.touched.registration_number &&
                formik.errors.registration_number
              }
              value={formik.values.registration_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
        </Row>
        {!renewPolicyData?.previous_policy_id && (
          <Row className={` ${styles["txtFieldsRow"]}`}>
            <div className="d-flex align-items-center mt-3">
              <div
                onClick={() => {
                  formik.setFieldValue(
                    "is_brand_new",
                    !formik.values.is_brand_new
                  );
                  //formik.setFieldError()
                  // formik.setFieldError('city', '')
                  // formik.setFieldError('contact', '')
                  // formik.setFieldError('name', '')
                }}
                className={`d-flex align-items-center justify-content-center ${styles["radioImgContainer"]}`}
              >
                <Image
                  alt=""
                  src={
                    formik.values.is_brand_new
                      ? formRadioChecked
                      : formRadioUnchecked
                  }
                />
              </div>
              <p className={`${styles["iAgreeTxt"]}`}>
                My car is brand new and at 3s dealership.*
              </p>
            </div>
          </Row>
        )}
        
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
          <Col lg={6}>
            <Label
              txt={makeModel}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <Label
              txt={Model}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          {/* </Row> */}
          {/* <Row className={`gy-3 ${styles['txtFieldsRow']}`}> */}
          <Col lg={6}>
            <Label
              txt={year}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <Label
              txt={currencyFormat(value)}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          {/* </Row> */}

          <Col lg={6}>
            <PersonalDetailsDDInput
              name="color"
              placeholder="Color"
              type="text"
              options={""}
              setShowDiv={() => {}}
              error={formik.touched.color && formik.errors.color}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={6}>
            <div>
              <div
                className={` 
                 ${
                   renewPolicyData?.customer_name
                     ? styles["inputBorderDisabled"]
                     : styles["form__input-group"]
                 }
                 `}
                style={
                  (renewPolicyData?.customer_name
                    ? { backgroundColor: "#DCDCDC" }
                    : { background: "transparent" },
                  { margin: 0, width: "100%" })
                }
              >
                <input
                  name="engine_number"
                  className={styles["form__input"]}
                  type="text"
                  value={formik.values.engine_number}
                  onChange={(e) => {
                    if (!renewPolicyData?.customer_name) formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  disabled={renewPolicyData?.customer_name && true}
                  // #DCDCDC !important
                  style={
                    renewPolicyData?.customer_name && {
                      backgroundColor: "#DCDCDC",
                    }
                  }
                  // style={{ backgroundColor: '#DCDCDC'}}
                />
                <label className={styles["form__input-label"]}>
                  Engine Number
                </label>
              </div>
            </div>
            {formik.touched.engine_number && formik.errors.engine_number && (
              <p className={`${styles["inputError"]}`}>
                {formik.errors.engine_number}
              </p>
            )}
          </Col>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="registration_number"
              placeholder="Registration Number"
              type="text"
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.registration_number &&
                formik.errors.registration_number
              }
              value={formik.values.registration_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>

          <Col lg={6}>
            <PersonalDetailsDDInput
              name="chassis_number"
              placeholder="Chassis Number"
              type="text"
              options={""}
              required={false}
              setShowDiv={() => {}}
              error={
                formik.touched.chassis_number && formik.errors.chassis_number
              }
              value={formik.values.chassis_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
        </Row>

        <Row className={` ${styles["txtFieldsRow"]}`}>
          <div className="d-flex align-items-center mt-3">
            <div
              onClick={() => {
                formik.setFieldValue(
                  "is_brand_new",
                  !formik.values.is_brand_new
                );
              }}
              className={`d-flex align-items-center justify--center ${styles["radioImgContainer"]}`}
            >
              <Image
                alt=""
                src={
                  formik.values.is_brand_new
                    ? formRadioChecked
                    : formRadioUnchecked
                }
              />
            </div>
            <p className={`${styles["iAgreeTxt"]}`}>
              My car is brand new and at 3s dealership.*
            </p>
          </div>
        </Row>
      </MediaQuery>
      {formik.values.is_brand_new ? (
        <Row>
          <Col lg={12} className="paymentPage">
            <AutoCompleteDropdown
              label={`Name of Registered Dealer`}
              option={serviceNetwork}
              formikKey="service_network_id"
              formik={formik}
            />
          </Col>
          
          {formik.values.service_network_id === 0 && (
            <>
              <Col lg={6} style={{ marginTop: 35 }}>
                <PersonalDetailsDDInput
                  name="three_s_dealer_name"
                  placeholder="Name of Dealer*"
                  type="text"
                  options={""}
                  required={true}
                  setShowDiv={() => {}}
                  error={
                    formik.touched.three_s_dealer_name &&
                    formik.errors.three_s_dealer_name
                  }
                  value={formik.values.three_s_dealer_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col lg={6} style={{ marginTop: 35 }}>
                <PersonalDetailsDDInput
                  name="three_s_dealer_contact"
                  placeholder="Phone Number*"
                  required={true}
                  error={
                    formik.touched.three_s_dealer_contact &&
                    formik.errors.three_s_dealer_contact
                  }
                  value={formik.values.three_s_dealer_contact}
                  onChange={(val: any) => {
                    formik.setFieldValue("three_s_dealer_contact", val);
                  }}
                  onBlur={formik.handleBlur}
                  formik={formik}
                />
              </Col>
              <Col lg={12} style={{ marginTop: 20 }} className="paymentPage">
                <AutoCompleteDropdown
                  label={`City*`}
                  option={citiesList}
                  formikKey="three_s_dealer_city"
                  formik={formik}
                />
              </Col>
              <Col lg={12} style={{ marginTop: 20 }}>
                <PersonalDetailsDDInput
                  name="three_s_dealer_address"
                  placeholder="Garage Address*"
                  type="text"
                  options={""}
                  required={true}
                  setShowDiv={() => {}}
                  error={
                    formik.touched.three_s_dealer_address &&
                    formik.errors.three_s_dealer_address
                  }
                  value={formik.values.three_s_dealer_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
            </>
          )}
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
};

const Survey = ({
  formik,
  renewPolicyData,
}: {
  formik: any;
  renewPolicyData: any;
}) => {
  const [cities, setCities] = useState();

  const { make_id, model_id, year, value } = useSelector(
    (state) => state?.auth?.planDetails
  );

  const { policy_id } = useSelector(
    (state) => state?.auth?.planDetails.buy_now
  );

  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api("GET", "/city");
      setCities(
        fetchedCities?.data?.map((item: any) => {
          return { id: item.id, name: item.city, value: item.city };
        })
      );
    };
    fetchCitiesData();
  }, []);
  var today = new Date();
  const filterTime = (date) => {
    let dt = new Date();
    dt.setHours(dt.getHours() + 2)
    const isPastTime = dt > date.getTime();
    return !isPastTime;
    };

  return (
    <div className={`${styles["surveyContainer"]}`}>
      <p className={`${styles["VehicleDetailsRightheading"]}`}>
        Schedule a Survey
      </p>
      <div className={`${styles["txtFieldsRow"]}`}>
        <PersonalDetailsDDInput
          name="survey_request_date"
          placeholder="Request Survey Date*"
          type="date"
          calendar={true}
          options={""}
          required={true}
          setShowDiv={() => {}}
          error={
            formik.touched.survey_request_date &&
            formik.errors.survey_request_date
          }
          value={formik.values.survey_request_date}
          onBlur={formik.handleBlur}
          disabled={
            formik.values.modification
              ? false
              : Number(policy_id) === renewPolicyData?.previous_policy_id
              ? true
              : formik.values.is_brand_new
              ? true
              : false
          }
          formik={formik}
          minDate={today.getHours() + 2>=17? moment().add(1,'day').toDate():moment().toDate()}
        />
      </div>
      <div className={`${styles["txtFieldsRow"]}`}>
        <PersonalDetailsDDInput
          name="survey_request_time"
          placeholder="Request Survey Time*"
          // type="text"
          timePicker={true}
          options={""}
          required={true}
          setShowDiv={() => {}}
          error={
            formik.touched.survey_request_time &&
            formik.errors.survey_request_time
          }
          value={formik.values.survey_request_time}
          onBlur={formik.handleBlur}
          disabled={
            formik.values.modification
              ? false
              : Number(policy_id) === renewPolicyData?.previous_policy_id
              ? true
              : formik.values.is_brand_new
              ? true
              : false
            // Number(policy_id) === renewPolicyData?.previous_policy_id ? true :
            // (formik.values.is_brand_new && formik.values.modification) ||
            // formik.values.is_brand_new === false
            //   ? false
            //   : true
          }
          formik={formik}
          includeTimes={[
            setHours(setMinutes(new Date(), 0), 9),
            setHours(setMinutes(new Date(), 0), 10),
            setHours(setMinutes(new Date(), 0), 11),
            setHours(setMinutes(new Date(), 0), 12),
            setHours(setMinutes(new Date(), 0), 13),
            setHours(setMinutes(new Date(), 0), 14),
            setHours(setMinutes(new Date(), 0), 15),
            setHours(setMinutes(new Date(), 0), 16),
            setHours(setMinutes(new Date(), 0), 17),
          ]}
          filterTime={today.getHours() + 2>=17?null: filterTime}
          // minTime={now.hours(now.hour()).minutes(now.minutes())}
        />
      </div>
      <div
        className={` p-0 ${styles["txtFieldsRow"]} paymentPage`}
        style={{
          marginBottom:
            formik.touched?.city_id && formik.errors?.city_id ? 25 : 0,
        }}
      >
        <AutoCompleteDropdown
          label={`City *`}
          option={cities}
          formikKey="city_id"
          formik={formik}
          disabled={
            formik.values.modification
              ? false
              : Number(policy_id) === renewPolicyData?.previous_policy_id
              ? true
              : formik.values.is_brand_new
              ? true
              : false
          }
        />
      </div>
      <div>
        <textarea
          name="survey_address"
          className={`w-100 ${styles["textarea2"]} ${
            (formik.values.is_brand_new && formik.values.modification) ||
            formik.values.is_brand_new === false
              ? ""
              : styles["disabled"]
          }`}
          placeholder="Survey Address*"
          required={true}
          onChange={formik.handleChange}
          value={formik.values.survey_address}
          onBlur={formik.handleBlur}
          disabled={
            formik.values.modification
              ? false
              : Number(policy_id) === renewPolicyData?.previous_policy_id
              ? true
              : formik.values.is_brand_new
              ? true
              : false
          }
        />
        {formik.touched.survey_address && formik.errors.survey_address && (
          <p className={`${styles["inputError"]}`}>
            {formik.errors.survey_address}
          </p>
        )}
      </div>
      <div>
        <textarea
          name="survey_instructions"
          className={`w-100 ${styles["textarea"]} ${
            (formik.values.is_brand_new && formik.values.modification) ||
            formik.values.is_brand_new === false
              ? ""
              : styles["disabled"]
          }`}
          placeholder="Special Instructions"
          onChange={formik.handleChange}
          value={formik.values.survey_instructions}
          onBlur={formik.handleBlur}
          disabled={
            formik.values.modification
              ? false
              : Number(policy_id) === renewPolicyData?.previous_policy_id
              ? true
              : formik.values.is_brand_new
              ? true
              : false
            // Number(policy_id) === renewPolicyData?.previous_policy_id ? true :
            // (formik.values.is_brand_new && formik.values.modification) ||
            // formik.values.is_brand_new === false
            //   ? false
            //   : true
          }
        />
        {formik.touched.survey_instructions &&
          formik.errors.survey_instructions && (
            <p className={`${styles["inputError"]}`}>
              {formik.errors.survey_instructions}
            </p>
          )}
      </div>
    </div>
  );
};

const VehicleDetails = ({
  currentStep,
  updateState,
  renewPolicyData,
}: {
  renewPolicyData: any;
  currentStep: number;
  updateState: Function;
}) => {
  const router = useRouter();
  const { order_id } = router.query;
  const data = useSelector((state) => state?.auth?.data);
  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);
  const allowedTabIndex = useSelector((state) => state?.auth?.allowedTabIndex);
  const { make_id, model_id, year, value } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [serviceNetworkListing, setServiceNetworkListing] = useState([]);

  const [cityList, setCitiesList] = useState([]);

  const { policy_id } = useSelector(
    (state) => state?.auth?.planDetails.buy_now
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServiceNetwork = async () => {
      const fetchServiceNetworkList = await Api(
        "GET",
        `make_service_network/${make_id}`
      );
      setServiceNetworkListing(
        fetchServiceNetworkList?.data?.map((item: any) => {
          return { id: item?.id, name: item?.name, value: item?.name };
        })
      );
    };

    const fetchCitiesList = async () => {
      const fetchServiceNetworkList = await Api("GET", `city`);
      setCitiesList(
        fetchServiceNetworkList?.data?.map((item: any) => {
          return { id: item?.id, option: item?.city };
        })
      );
    };

    fetchServiceNetwork();
    fetchCitiesList();
  }, []);
  // useEffect(()=>{
  //   formik.setFieldValue('survey_request_date', '22/12/2023')
  // }),[]
  var today = new Date();
  let addHour=today.getHours() + 2
let hour= today.setHours(addHour)
if(addHour>=17){
  // console.log('todayyy==>',today.getHours()+15)
  today.setDate(today.getDate() + 1)
  today.setHours(9);
  today.setMinutes(0);
  today.setMilliseconds(0)


}




  const initialValues = {
    is_brand_new: false,
    modification: false,
    color: "",
    engine_number: "",
    chassis_number: "",
    registration_number: "",
    survey_request_date:today,
    survey_request_time:today,
    city_id: "",
    survey_address: "",
    survey_instructions: "",
    description: "",
    service_network_id: "",
    three_s_dealer_is_other: false,
    three_s_dealer_name: "",
    three_s_dealer_contact: "+92",
    three_s_dealer_city: "",
    three_s_dealer_address: "",
  };

  const surveyRequestDate = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.modification) {
      if (schemaContext.parent.survey_request_date) {
        return (
          new Date() < new Date(schemaContext.parent.survey_request_date) ||
          new Date()?.getDate() ===
            new Date(schemaContext.parent.survey_request_date)?.getDate()
        );
      } else {
        return false;
      }
    } else if (Number(policy_id) === renewPolicyData?.previous_policy_id) {
      return true;
    } else if (schemaContext.parent.is_brand_new) {
      return true;
    } else {
      return (
        new Date() < new Date(schemaContext.parent.survey_request_date) ||
        new Date()?.getDate() ===
          new Date(schemaContext.parent.survey_request_date)?.getDate()
      );
    }
  };

  const surveyRequestTime = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.modification) {
      if (
        schemaContext.parent.survey_request_time &&
        schemaContext.parent.survey_request_time !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else if (Number(policy_id) === renewPolicyData?.previous_policy_id) {
      return true;
    } else if (schemaContext.parent.is_brand_new) {
      return true;
    } else {
      if (
        schemaContext.parent.survey_request_time &&
        schemaContext.parent.survey_request_time !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const surveyCity = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.modification) {
      if (schemaContext.parent.city_id && schemaContext.parent.city_id !== "") {
        return true;
      } else {
        return false;
      }
    } else if (Number(policy_id) === renewPolicyData?.previous_policy_id) {
      return true;
    } else if (schemaContext.parent.is_brand_new) {
      return true;
    } else {
      if (schemaContext.parent.city_id && schemaContext.parent.city_id !== "") {
        return true;
      } else {
        return false;
      }
    }
  };

  const surveyAddress = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.modification) {
      if (
        schemaContext.parent.survey_address &&
        schemaContext.parent.survey_address !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else if (Number(policy_id) === renewPolicyData?.previous_policy_id) {
      return true;
    } else if (schemaContext.parent.is_brand_new) {
      return true;
    } else {
      if (
        schemaContext.parent.survey_address &&
        schemaContext.parent.survey_address !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      is_brand_new: Yup.boolean(),
      service_network_id: Yup.string().when(
        "is_brand_new",
        (is_brand_new, schema) => {
          if (is_brand_new) {
            return Yup.string().required("Register dealer name is required");
          } else {
            return schema;
          }
        }
      ),
      three_s_dealer_name: Yup.string().when(
        ["is_brand_new", "service_network_id"],
        {
          is: (is_brand_new: any, service_network_id: any) =>
            is_brand_new && service_network_id === 0,
          then: Yup.string().required("Dealer name is required"),
          otherwise: Yup.string(),
        }
      ),
      three_s_dealer_contact: Yup.string().when(
        ["is_brand_new", "service_network_id"],
        {
          is: (is_brand_new: any, service_network_id: any) =>
            is_brand_new && service_network_id === 0,
          then: Yup.string()
            .required("Contact number is required.")
            .test({
              message: "Invalid phone number",
              test: (value) => {
                if (value) {
                  return validatePhoneNo(value);
                }
                return false;
              },
            }),
          otherwise: Yup.string(),
        }
      ),
      three_s_dealer_city: Yup.string().when(
        ["is_brand_new", "service_network_id"],
        {
          is: (is_brand_new: any, service_network_id: any) =>
            is_brand_new && service_network_id === 0,
          then: Yup.string().required("City is required"),
          otherwise: Yup.string(),
        }
      ),
      three_s_dealer_address: Yup.string().when(
        ["is_brand_new", "service_network_id"],
        {
          is: (is_brand_new: any, service_network_id: any) =>
            is_brand_new && service_network_id === 0,
          then: Yup.string().required("Address is required."),
          otherwise: Yup.string(),
        }
      ),
      modification: Yup.boolean(),
      color: Yup.string().optional(),
      // engine_number: Yup.string().required('Engine Number is required.'),
      // chassis_number: Yup.string().required('Chassis Number is required.'),
      // registration_number: Yup.string().required('Registration Number is required.'),
      survey_request_time: Yup.string().test(
        "survey_request_time",
        "Please Select a valid time for Survey",
        surveyRequestTime
      ),
      survey_request_date: Yup.string().test(
        "survey_request_date",
        "Please Select a valid date for Survey",
        surveyRequestDate
      ),
      city_id: Yup.string().test(
        "city_id",
        "Please Select a valid City for Survey",
        surveyCity
      ),
      survey_address: Yup.string().test(
        "survey_address",
        "Please Select a valid Address for Survey",
        surveyAddress
      ),
      survey_instructions: Yup.string().optional(),
      description: Yup.string().when("modification", {
        is: true,
        then: Yup.string().required("Description is required."),
      }),
    }),

    onSubmit: async (values) => {
      let apiPayload = {
        order_detail_id: purchaseDetails.details.order_detail_id,
        make_id: make_id,
        model_id: model_id,
        year: year,
        value: value,
        is_brand_new: values.is_brand_new,
        modification: values.is_brand_new ? false : values.modification,
        color: values.color ?? null,
        engine_number: values.engine_number,
        chassis_number: values.chassis_number,
        registration_number: values.registration_number,
        service_network_id: values.service_network_id,
        three_s_dealer_is_other: values.service_network_id === 0 ? true : false,
        three_s_dealer_name: values.three_s_dealer_name,
        three_s_dealer_contact: values.three_s_dealer_contact,
        three_s_dealer_address: values.three_s_dealer_address,
        three_s_dealer_city: values?.three_s_dealer_city,
        ...(formik.values.modification
          ? {
              survey_request_date: values.survey_request_date,
            }
          : Number(policy_id) === renewPolicyData?.previous_policy_id
          ? {
              survey_request_date: null,
            }
          : formik.values.is_brand_new
          ? {
              survey_request_date: null,
            }
          : {
              survey_request_date: values.survey_request_date,
            }),
        ...(formik.values.modification
          ? {
              survey_request_time: moment(values.survey_request_time).format(
                "HH:mm"
              ),
            }
          : Number(policy_id) === renewPolicyData?.previous_policy_id
          ? {
              survey_request_time: null,
            }
          : formik.values.is_brand_new
          ? {
              survey_request_time: null,
            }
          : {
              survey_request_time: moment(values.survey_request_time).format(
                "HH:mm"
              ),
            }),
        ...(formik.values.modification
          ? {
              city_id: values.city_id,
            }
          : Number(policy_id) === renewPolicyData?.previous_policy_id
          ? {
              city_id: null,
            }
          : formik.values.is_brand_new
          ? {
              city_id: null,
            }
          : {
              city_id: values.city_id,
            }),
        ...(formik.values.modification
          ? {
              survey_address: values.survey_address,
            }
          : Number(policy_id) === renewPolicyData?.previous_policy_id
          ? {
              survey_address: null,
            }
          : formik.values.is_brand_new
          ? {
              survey_address: null,
            }
          : {
              survey_address: values.survey_address,
            }),
        ...(formik.values.modification
          ? {
              survey_instructions: values.survey_instructions,
            }
          : Number(policy_id) === renewPolicyData?.previous_policy_id
          ? {
              survey_instructions: null,
            }
          : formik.values.is_brand_new
          ? {
              survey_instructions: null,
            }
          : {
              survey_instructions: values.survey_instructions,
            }),
        ...(values.modification && { description: values.description }),
      };

      if (!values?.is_brand_new) {
        //const {service_network_id, service_network_payload, ...rest} = apiPayload
        apiPayload = {
          ...apiPayload,
          service_network_id: 0,
          three_s_dealer_is_other: false,
          three_s_dealer_name: "",
          three_s_dealer_contact: "",
          three_s_dealer_address: "",
          three_s_dealer_city: "",
        };
      }

      if (values?.is_brand_new && values.service_network_id !== 0) {
        apiPayload = {
          ...apiPayload,
          service_network_id: values.service_network_id,
          three_s_dealer_is_other: false,
          three_s_dealer_name: "",
          three_s_dealer_contact: "",
          three_s_dealer_address: "",
          three_s_dealer_city: "",
        };
      }

      if (values?.is_brand_new && values.service_network_id === 0) {
        apiPayload = {
          ...apiPayload,
          service_network_id: values.service_network_id,
        };
      }

      setIsLoading(true);
      Api("PUT", `order/update/vehicle_details`, apiPayload)
        .then((res) => {
          if (res?.success) {
            setIsLoading(false);
            const reduxPayload = {
              make_id: make_id,
              model_id: model_id,
              year: year,
              value: value,
              is_brand_new: values.is_brand_new,
              modification: values.modification,
              color: values.color,
              engine_number: values.engine_number,
              chassis_number: values.chassis_number,
              registration_number: values.registration_number,
              service_network_id: values.service_network_id,
              three_s_dealer_is_other:
                values.service_network_id === 0 ? true : false,
              three_s_dealer_name: values.three_s_dealer_name,
              three_s_dealer_contact: values.three_s_dealer_contact,
              three_s_dealer_address: values.three_s_dealer_address,
              three_s_dealer_city: values?.three_s_dealer_city,
              ...((formik.values.is_brand_new && formik.values.modification) ||
              formik.values.is_brand_new === false
                ? { survey_request_date: values.survey_request_date }
                : {}),
              ...((formik.values.is_brand_new && formik.values.modification) ||
              formik.values.is_brand_new === false
                ? { survey_request_time: values.survey_request_time }
                : {}),
              ...((formik.values.is_brand_new && formik.values.modification) ||
              formik.values.is_brand_new === false
                ? { city_id: values.city_id }
                : {}),
              ...((formik.values.is_brand_new && formik.values.modification) ||
              formik.values.is_brand_new === false
                ? { survey_address: values.survey_address }
                : {}),
              ...((formik.values.is_brand_new && formik.values.modification) ||
              formik.values.is_brand_new === false
                ? { survey_instructions: values.survey_instructions }
                : {}),
              ...(values.modification && { description: values.description }),
            };
            dispatch(setVehicleDetails(reduxPayload));
            if (allowedTabIndex <= 3) {
              dispatch(setAllowedTab(3));
              dispatch(setLockedTab(-1));
            }
            updateState(currentStep);
            return;
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    },
  });
  useEffect(() => {
    const { make_id, model_id, year, value, ...restData } =
      purchaseDetails.vehicleDetails;
    const reduxUpdatedData = {
      ...restData,
      service_network_id:
        restData?.service_network_id === 0 ? 0 : restData?.service_network_id,
    };
    if (purchaseDetails?.vehicleDetails?.registration_number?.length !== 0)
      formik.setValues({ ...reduxUpdatedData });
    else if (renewPolicyData?.customer_name) {
      formik.setValues({
        ...formik?.values,
        ...reduxUpdatedData,
        ...renewPolicyData,
      });
    }
  }, [purchaseDetails]);

  useEffect(() => {
    if (purchaseDetails.vehicleDetails.registration_number?.length !== 0) {
      const formikData = JSON.stringify(formik.values);
      const { make_id, model_id, year, value, ...restData } =
        purchaseDetails.vehicleDetails;
      // const reduxUpdatedData = {...restData, service_network_id: 'Other',}
      const reduxData = JSON.stringify(restData);

      if (formikData !== reduxData) {
        // Lock current tab if changes are made
        dispatch(setLockedTab(2));
        return;
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1));
    }
  }, [formik.values]);

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <Row>
        <Col lg={7}>
          <VehicleDetailsRight
            formik={formik}
            renewPolicyData={renewPolicyData}
          />
        </Col>
        <Col lg={5}>
          <Survey formik={formik} renewPolicyData={renewPolicyData} />
        </Col>
      </Row>
      <Row className={`d-flex align-items-center`}>
        <p className={` ${styles["loremtxt"]}`}>
          <i>*If your is at 3s dealership then survey is not applicable</i>
        </p>
      </Row>
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          disabled={isLoading}
          loading={isLoading}
          onClick={formik.handleSubmit}
          label="Save and continue"
        />
      </div>
    </Container>
  );
};
const mapStateToProps = (state: any) => ({
  renewPolicyData: state.auth.renewPolicyData,
});

const mapDispatchProps = {};

export default connect(mapStateToProps, mapDispatchProps)(VehicleDetails);
