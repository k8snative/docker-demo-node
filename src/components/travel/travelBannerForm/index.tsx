import calenderLogo from "../../../../public/assets/calenderLogo.png";
import dropDownIconRed from "../../../../public/assets/dropDownIconRed.png";
import FormBottomContainer from "../../FormBottomContainer/FormBottomContainer";
import styles from "./travelBannerForm.module.scss";
import { Formik, useFormik } from "formik";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { Calendar } from "primereact/calendar";
import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Api from "src/lib/api";
import * as Yup from "yup";

type MakeDataProps = {
  id: number;
  name: string;
  status: boolean;
  deletedAt: null;
};
type ModelDataProps = {
  id: number;
  make_id: number;
  name: string;
  status: boolean;
  created_by: number;
  updated_by: null;
  deletedAt: null;
};

const BannerDropDown = ({
  dropDown,
  value,
  dropDownData,
  values,
  onChange,
  name,
  errTxt,
  type,
  disabled,
  handleBlur,
}: {
  dropDown: Boolean;
  value: String;
  dropDownData: MakeDataProps[] | undefined;
  selectedOpt: MakeDataProps | undefined;
  setSelectedOpt: Function;
  onChange?: Function;
  errTxt?: String;
  name?: String;
  values: any;
  type?: String;
  disabled?: Boolean;
  handleBlur?: any;
}) => {
  const [isOpen, setOpen] = useState(false);
  const getSelectedValue = (id) =>
    dropDownData?.find((item) => item.id === id)?.name || "";
  // const [selectedOpt, setSelectedOpt] = useState(value)
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        handleBlur &&
          handleBlur({
            target: {
              name,
            },
          });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div
        ref={ref}
        name={name}
        onClick={() => !disabled && setOpen(!isOpen)}
        style={{
          background: disabled ? "#ECECEC" : "#fff",
        }}
        className={`d-flex justify-content-between align-items-center ${styles["dropDownContainer"]}`}
      >
        {isOpen && dropDown && (
          <div
            className={`d-flex flex-column align-items-start justify-content-center ${styles["dropContainer"]}`}
          >
            <div className={styles["scrollContainer"]}>
              {dropDownData &&
                dropDownData.map((each, index) => (
                  <div
                    onClick={() =>
                      onChange({
                        target: {
                          name: name,
                          value: each.id,
                        },
                      })
                    }
                    key={index}
                    className="w-100"
                  >
                    {<p className={styles["dropMenuItems"]}>{each?.name}</p>}
                  </div>
                ))}
            </div>
          </div>
        )}
        {dropDown ? (
          <p className={styles["selectedTxt"]}>
            {values[name] ? getSelectedValue(values[name]) : value}
          </p>
        ) : (
          <input
            name={name}
            className={styles["selectedTxt"]}
            type={type || "text"}
            placeholder={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={handleBlur}
          />
        )}
        {dropDown && (
          <div className={styles["formImageContainer"]}>
            <Image src={dropDownIconRed} alt="" />
          </div>
        )}
      </div>
      {errTxt && <p className={styles["notOTPTxt"]}>{errTxt}</p>}
    </>
  );
};

const RangePicker = ({
  date,
  onChangeDate,
  errTxt,
}: {
  date: Date;
  onChangeDate: Function;
  errTxt: string;
}) => {
  return (
    <>
      <Calendar
        className={`w-100 ${styles["custom-data-range-picker"]}`}
        placeholder="Select Date Range"
        id="range"
        value={date}
        onChange={(e) => onChangeDate(e.value)}
        selectionMode="range"
        readOnlyInput
      />
      {errTxt && <p className={styles["notOTPTxtDateRange"]}>{errTxt}</p>}
    </>
  );
};

const FormCalenderContainer = ({
  calDate,
  setCalDate,
  onChange,
}: {
  calDate: Date;
  setCalDate: Function;
  onChange: Function;
}) => {
  const newDate = new Date(calDate);
  return (
    <div className="position-relative mx-3 d-flex align-items-center">
      <input
        value={
          calDate
            ? newDate?.getDate() < 10
              ? `0${newDate?.getDate()}`
              : newDate.getDate()
            : ""
        }
        className={styles["inputDayMonth"]}
        type={"text"}
      />
      <p className={styles["calSerate"]}>/</p>
      <input
        value={
          calDate
            ? newDate.getMonth() < 10
              ? `0${newDate.getMonth() + 1}`
              : newDate.getMonth()
            : ""
        }
        className={styles["inputDayMonth"]}
        type={"text"}
      />
      <p className={styles["calSerate"]}>/</p>
      <input
        value={calDate ? newDate.getFullYear() : ""}
        className={styles["inputYear"]}
        type={"text"}
      />
      <div className={styles["calImageCont"]}>
        <Image alt="" src={calenderLogo} />
      </div>
      <input
        className={`position-absolute ${styles["calInput"]}`}
        type={"date"}
        onChange={(e) =>
          onChange({
            target: {
              name: "date_of_expiry",
              value: e?.target?.value,
            },
          })
        }
      />
    </div>
  );
};

const TravelBannerForm = () => {
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [date, setDate] = useState<Date>(null);
  const [termError, setTermError] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [calDate, setCalDate] = useState();
  const dispatch = useDispatch();

  const tripPurpose = [
    { id: 11, name: "BMW", status: true },
    { id: 12, name: "Indus", status: true },
    { id: 13, name: "Honda", status: true },
    { id: 14, name: "KIA", status: true },
    { id: 15, name: "Suzuki", status: true },
  ];
  const tripType = [
    { id: 11, name: "Local", status: true },
    { id: 12, name: "International", status: true },
  ];
  const policyType = [
    { id: 11, name: "Family", status: true },
    { id: 12, name: "One Person", status: true },
  ];
  const planType = [
    { id: 11, name: "Umrah", status: true },
    { id: 12, name: "Ziarat", status: true },
  ];

  const formik = useFormik({
    initialValues: {
      trip_purpose: "",
      trip_type: "",
      policy_type: "",
      country: "",
    },
    validationSchema: Yup.object({
      trip_purpose: Yup.string().required("Trip Purpose is Required"),
      trip_type: Yup.string().required("Trip Type is Required"),
      policy_type: Yup.string().required("Policy Type is Required"),
      country: Yup.string().required("Plan Type is Required"),
    }),
    onSubmit: (values) => {
      if (!check) {
        setTermError("Kindly agree to our Term & Conditions");
      }
      if (!check || !date) {
        return;
      }
      router.push({ pathname: "/travel-results" });
      // const { insurance_toggle, ...restValues } = values
      // dispatch(setInsuranceDetails({ ...restValues, company_ids: [], policy_type_ids: [], addon_ids: [] }))
      // dispatch(clearCompare())
    },
  });

  const [formBanner, setFormBanner] = useState<Object>({
    date: Date,
    tripPurpose: String,
    tripType: String,
    countries: String,
    conditions: String,
    duration: Number,
  });

  const onChangeDate = (value: any) => {
    setRangeError(false);
    let tempDate = {
      startDate: value[0],
      endDate: value[1],
    };
    if (tempDate?.endDate) {
      let now = moment(tempDate.startDate).format("MM DD YYYY");
      let then = moment(tempDate.endDate).format("MM DD YYYY");
      setFormBanner({
        ...formBanner,
        duration: moment(then).diff(moment(now), "days"),
      });
    }
    setDate(value);
  };
  return (
    <div className={`w-100 ${styles["wrapper"]}`}>
      <Row>
        <Col md={9}>
          <RangePicker
            errTxt={rangeError}
            date={date}
            onChangeDate={onChangeDate}
          />
        </Col>
        <Col md={3} className="duration-column">
          <input
            disabled
            placeholder="Duration"
            value={formBanner.duration}
            className={`w-100 ${styles["duration"]}`}
          />
        </Col>
      </Row>

      <BannerDropDown
        dropDown={true}
        value="Select Trip Purpose"
        dropDownData={tripPurpose}
        values={formik.values}
        name="trip_purpose"
        onChange={formik.handleChange}
        errTxt={formik.touched.trip_purpose && formik.errors.trip_purpose}
        handleBlur={formik.handleBlur}
      />
      <BannerDropDown
        dropDown={true}
        value="Select Trip Type"
        dropDownData={tripType}
        values={formik.values}
        name="trip_type"
        onChange={formik.handleChange}
        errTxt={formik.touched.trip_type && formik.errors.trip_type}
        handleBlur={formik.handleBlur}
      />

      <BannerDropDown
        dropDown={true}
        value="Policy Type"
        dropDownData={policyType}
        values={formik.values}
        name="policy_type"
        onChange={formik.handleChange}
        errTxt={formik.touched.policy_type && formik.errors.policy_type}
        handleBlur={formik.handleBlur}
      />

      <BannerDropDown
        dropDown={true}
        value="Plan Types/ Select Contries"
        dropDownData={planType}
        values={formik.values}
        name="country"
        onChange={formik.handleChange}
        errTxt={formik.touched.country && formik.errors.country}
        handleBlur={formik.handleBlur}
      />

      <FormBottomContainer
        isTermChecked={setCheck}
        termChecked={check}
        link={"#"}
        goBack={false}
        btnTxt="View Qoutes"
        onClick={(e: any) => {
          if (!date) {
            setRangeError("Date Range is Required");
          }
          formik.handleSubmit(e);
        }}
        error={termError}
        setTermError={setTermError}
        isSignIn={true}
      />
    </div>
  );
};

export default TravelBannerForm;
