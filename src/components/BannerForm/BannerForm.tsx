import calenderLogo from "../../../public/assets/calenderLogo.png";
import dropDownIconRed from "../../../public/assets/dropDownIconRed.png";
import FormBottomContainer from "../FormBottomContainer/FormBottomContainer";
import styles from "./BannerForm.module.scss";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import numberToWords from "src/lib/numberToWords";
import {
  clearCompare,
  renewPolicy as renewPolicyRedux,
  setInsuranceDetails,
} from "src/lib/redux/auth/action";
import currencyFormat from "src/utils/currencyFormat";
import * as Yup from "yup";
import PersonalDetailsDDInput from "~components/PersonalDetailsDDInput/PersonalDetailsDDInput";
import AutoCompleteDropdown from "~components/ReusuableComponent/AutoCompleteDropdown";

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
type YearOption = {
  id: number;
  name: string;
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
  const getSelectedValue = (id) => dropDownData?.find((item) => item.id === id)?.name || "";
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
                dropDownData?.map((each, index) => (
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
            ? newDate.getMonth() < 9
              ? `0${newDate.getMonth() + 1}`
              : newDate.getMonth() + 1
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
        //policy should expire in 12 months
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split("T")[0]
        }
      />
    </div>
  );
};

const BannerForm = () => {
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [termError, setTermError] = useState("");
  const [calDate, setCalDate] = useState();
  const dispatch = useDispatch();
  const [valueInWords, setValueInWords] = useState();
  const maxYear = new Date().getFullYear();
  const formik = useFormik({
    initialValues: {
      make_id: "",
      model_id: "",
      year: new Date().getFullYear(),
      value: "",
      sortOrder: null,
      insurance_toggle: false,
      date_of_expiry: "",
    },
    validationSchema: Yup.object({
      make_id: Yup.string().required("Required"),
      model_id: Yup.string().required("Required"),
      year: Yup.number()
        .required("Year is Required")
        .min(1980, "min 1980")
        .max(maxYear, `max ${maxYear}`),
      value: Yup.number()
        .min(1, "Positive Value")
        .typeError("Value can only be number")
        .test("is-decimal", "Decimal value is not allowed", (value: any) =>
          /^[^.]*$/.test(value)
        )
        .required("Value is Required"),
      insurance_toggle: Yup.boolean(),
      date_of_expiry: Yup.string().when("insurance_toggle", {
        is: true,
        then: Yup.string().required("Date is Required"),
        otherwise: Yup.string(),
      }),
      // checked: Yup.boolean().required('Kindly agree to our Term & Conditions'),
    }),
    onSubmit: (values) => {
      // if (!check) {
      //   setTermError('Kindly agree to our Term & Conditions')
      //   return
      // }
      const { insurance_toggle, ...restValues } = values;
      dispatch(
        setInsuranceDetails({
          ...restValues,
          company_ids: [],
          policy_type_ids: [],
          addon_ids: [],
        })
      );
      dispatch(clearCompare());
      dispatch(renewPolicyRedux({}));
      router.push({ pathname: "/productPlan" });
    },
  });

  const [showCalender, setShowCalender] = useState(true);
  const [make, setMake] = useState<MakeDataProps[]>();
  const [model, setModel] = useState<ModelDataProps[]>();
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]);

  const getModel = async (id: number) => {
    const tempData = await Api("GET", `model_make/${id}?status=1`);
    setModel(tempData?.data);
  };

  const getMake = async () => {
    const tempData = await Api("GET", `make?status=1`);
    setMake(tempData?.data);
  };
  const getYearOptions = () => {
    //set start year 15 years before current year
    const startYear = new Date().getFullYear() - 15;
    const endYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = endYear; i >= startYear; i--) {
      yearOptions.push({ id: i, name: i.toString() });
    }
    setYearOptions(yearOptions);
  };

  useEffect(() => {
    getMake();
    getYearOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMobile = useMediaQuery({
    query: "(max-width: 450px)",
  });

  useEffect(() => {
    formik.setFieldValue("model_id", "");
    getModel(formik.values.make_id);
  }, [formik.values.make_id]);

  return (
    <div className={`w-100 ${styles["wrapper"]}`}>
      <div className={`${styles['dropDownContainerAuto']}`}>
        <AutoCompleteDropdown 
          label={`Select Make`} 
          option={make}
          formikKey='make_id'
          formik={formik}
        />
      </div>
      <div className={`${styles['dropDownContainerAuto']}`}>
        <AutoCompleteDropdown 
          label={`Select Model`} 
          option={model}
          formikKey='model_id'
          formik={formik}
        />
      </div>
      <div className={`${styles['dropDownContainerAuto']}`}>
        <AutoCompleteDropdown 
          label={`Select Year`} 
          option={yearOptions}
          formikKey='year'
          formik={formik}
        />
      </div>
      <>
        <div
          style={{
            background: "#fff",
          }}
          className={`d-flex justify-content-between align-items-center ${styles["dropDownContainer"]}`}
        >
          <input
            name="value"
            className={styles["selectedTxt"]}
            type={"text"}
            maxLength={12}
            placeholder={"Enter Value"}
            onChange={(e) => {
              let cleanValue = Number(
                String(e.target.value).replace(/[^0-9.-]+/g, "")
              );
              formik.setFieldValue("value", cleanValue);
              setValueInWords(numberToWords(cleanValue));
            }}
            value={
              formik.values.value &&
              currencyFormat(
                Number(String(formik.values.value).replace(/[^0-9.-]+/g, ""))
              )
            }
            onBlur={formik.handleBlur}
          />
        </div>
        {valueInWords && (
          <p className={styles["notOTPTxt"]}>{`${valueInWords} Rupees`}</p>
        )}
        {formik.touched.value && formik.errors.value && (
          <p className={styles["notOTPTxt"]}>{formik.errors.value}</p>
        )}
      </>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label className="switch" style={isMobile ? { width: "2.5rem" } : {}}>
          <input
            type="checkbox"
            checked={formik.values.insurance_toggle}
            onClick={() => {
              formik.setFieldValue(
                "insurance_toggle",
                !formik.values.insurance_toggle
              );
            }}
          />
          <span className="slider round"></span>
        </label>
        <p className={`my-2 ${styles["bannerTxt"]}`}>
          I already have an existing Takaful / Insurance cover
        </p>
      </div>
      {formik.values.insurance_toggle ? (
        <>
          <div
            style={{}}
            className={`my-3 w-100 align-items-center ${styles["webCalender"]}`}
          >
            {/* <p className={styles['calenderTxt']}>Date of Expiry?</p> */}
            <PersonalDetailsDDInput
              name="date_of_expiry"
              placeholder="Insurance Expiry Date"
              type="date"
              calendar={true}
              onChange={formik.handleChange}
              options={""}
              required={true}
              setShowDiv={() => {}}
              //error={formik.touched.date_of_expiry && formik.errors.date_of_expiry}
              value={formik.values.date_of_expiry}
              onBlur={formik.handleBlur}
              formik={formik}
            />
            {/* <FormCalenderContainer
              calDate={formik.values.date_of_expiry}
              setCalDate={setCalDate}
              onChange={formik.handleChange}
            /> */}
          </div>
          <div
            style={{}}
            className={`my-3 w-100 flex-column ${styles["mobCalender"]}`}
          >
            {/* <p className={styles['calenderTxt']}>Date of Expiry?</p> */}
              <PersonalDetailsDDInput
                name="date_of_expiry"
                placeholder="Insurance Expiry Date"
                type="date"
                calendar={true}
                onChange={formik.handleChange}
                options={""}
                required={true}
                setShowDiv={() => {}}
                //error={formik.touched.date_of_expiry && formik.errors.date_of_expiry}
                value={formik.values.date_of_expiry}
                onBlur={formik.handleBlur}
                formik={formik}
              />
              {/* <input
                onChange={e =>
                  formik.handleChange({
                    target: {
                      name: 'date_of_expiry',
                      value: e?.target?.value,
                    },
                  })
                }
                type="date"
                placeholder="Insurance Expiry Date"
                className={styles['calenderInput']}
              /> */}
          </div>
          {formik.touched.date_of_expiry && formik.errors.date_of_expiry && (
            <p style={{ marginBottom: 20 }} className={styles["notOTPTxt"]}>
              {formik.touched.date_of_expiry && formik.errors.date_of_expiry}
            </p>
          )}
        </>
      ) : (
        <div style={{}} className="m-2 w-100 d-flex align-items-center" />
      )}
      <FormBottomContainer
        isTermChecked={setCheck}
        termChecked={check}
        link={"#"}
        goBack={false}
        btnTxt="View Quotes"
        onClick={formik.handleSubmit}
        error={termError}
        setTermError={setTermError}
      />
    </div>
  );
};

const mapStateToProps = () => {};

const mapDispatchProps = { renewPolicy: renewPolicyRedux };

export default connect(mapStateToProps, mapDispatchProps)(BannerForm);
