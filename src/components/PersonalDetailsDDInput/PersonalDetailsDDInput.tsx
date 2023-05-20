import dropDownSmall from "../../../public/assets/dropDownIcon.png";
import styles from "./PersonalDetailsDDInput.module.scss";
import moment from "moment";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMediaQuery } from "react-responsive";
// import calendar2 from '~public/assets/.png'
import clockIcon from "~public/assets/clockIcon.png";
import calendar2 from "~public/assets/formcalendar.png";

const PersonalDetailsDDInput = ({
  placeholder,
  type,
  calendar,
  timePicker,
  customDropDown,
  options,
  showDiv,
  setShowDiv,
  required,
  onChange,
  error,
  value,
  name,
  onBlur,
  formik,
  initialDropdownValue,
  setDropdownValueIn,
  setTimeValueIn,
  disabled,
  minDate,
  maxDate,
  bestPriceGurantee,
  includeTimes,
  filterTime
}: {
  placeholder: string;
  type: string;
  calendar?: boolean;
  timePicker?: boolean;
  customDropDown?: boolean;
  options: any;
  showDiv?: string;
  setShowDiv: Function;
  required: boolean;
  onChange?: any;
  error?: string;
  value?: any;
  name: string;
  onBlur: any;
  formik?: any;
  initialDropdownValue?: string;
  setDropdownValueIn?: string;
  setTimeValueIn?: string;
  disabled?: boolean;
  minDate?: any;
  maxDate?: any;
  bestPriceGurantee?: boolean;
  includeTimes?:any
  filterTime?:any
}) => {
  const isSmallerThan360 = useMediaQuery({
    query: "(max-width: 360px)",
  });
  const handleDropdownValueSelect = (selectedOption: string) => {
    formik?.setFieldValue(setDropdownValueIn, selectedOption);
  };


  return (
    <>
      <div
        className={` d-flex align-items-center justify-content-end position-relative  ${styles["inputBorder"]}`}
      >
        <div
          className={`w-100 d-flex align-items-center ${styles["wrapper"]} ${
            disabled && styles["disabled"]
          }`}
        >
          {customDropDown && (
            <div
              onMouseLeave={() => {
                setShowDiv("");
              }}
              onClick={() => {
                if (showDiv === options[0]?.option) setShowDiv("");
                else setShowDiv(options[0]?.option);
              }}
              className={`d-flex align-items-center justify-content-between ${styles["dropCont"]}`}
            >
              {/* {placeholder === 'Phone Number*' && (
                <div className={styles['pakImgWrap']}>
                  <Image alt="" src={pakistan} />
                </div>
              )} */}

              {showDiv === options[0]?.option && (
                <>
                  <div className={`d-flex flex-column ${styles["absolute"]}`}>
                    {options.map((otp: { option: string }, index: number) => (
                      <div
                        onClick={() => handleDropdownValueSelect(otp.option)}
                        className={`d-flex ${styles["optionContainer"]}`}
                        key={index}
                      >
                        {/* {placeholder === 'Phone Number*' && (
                          <div className={styles['pakImgWrap']}>
                            <Image alt="" src={pakistan} />
                          </div>
                        )} */}
                        <p className={styles["optionTxt"]}>{otp?.option}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <p className={` ${styles["dropSelectedTxt"]}`}>
                {initialDropdownValue}
              </p>
              {/* {placeholder === 'Phone Number*' && (
                <div className={`d-flex ${styles['phonedd']}`}>
                  <Image alt="" src={phoneDD} />
                </div>
              )} */}
              {placeholder !== "Phone Number*" && (
                <div className={`d-flex ${styles["dropDownSmall"]}`}>
                  <Image alt="" src={dropDownSmall} />
                </div>
              )}
            </div>
          )}
          {calendar ? (
            <>
              {isSmallerThan360 ? (
                <div className={styles["form__input-group"]}>
                  <DatePicker
                
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    name={name}
                    selected={value && moment(value).toDate()}
                    value={value}
                    onChange={async (date: any, event: any) => {
                      if (bestPriceGurantee) {
                        onChange({ name, date });
                      } else {
                        await formik.setFieldValue(name, date);
                        formik.setFieldTouched(name, true);
                      }
                    }}
                    onBlur={(event: any) => {
                      onBlur(event);
                    }}
                    dateFormat={"dd/MM/yyyy"}
                    className={`${styles["form__input"]} ${
                      disabled && styles["disabled"]
                    }`}
                    disabled={disabled}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    style={{ height: "100%" }}
                  />
                  <span className={styles["calenderlogo"]}>
                    <Image
                      src={calendar2}
                      alt="calendar"
                      height={"18px"}
                      width={"18px"}
                    />
                  </span>
                  <label className={styles["form__input-label"]}>
                    {placeholder}
                  </label>
                </div>
              ) : (
                <div className={styles["form__input-group"]}>
                  <DatePicker
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    name={name}
                    selected={value && moment(value).toDate()}
                    value={value}
                    onChange={async (date: any, event: any) => {
                      if (bestPriceGurantee) {
                        onChange({ name, date });
                      } else {
                        await formik.setFieldValue(name, date);
                        formik.setFieldTouched(name, true);
                      }
                    }}
                    onBlur={(event: any) => {
                      onBlur(event);
                    }}
                    dateFormat={"dd/MM/yyyy"}
                    className={`${styles["form__input"]} ${
                      disabled && styles["disabled"]
                    }`}
                    disabled={disabled}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    minDate={minDate && new Date(minDate)}
                    maxDate={maxDate && new Date(maxDate)}
                    style={{ height: "100%" }}
                  />
                  <span className={styles["calenderlogo"]}>
                    <Image
                      src={calendar2}
                      alt="Clock"
                      height={"80px"}
                      width={"80px"}
                    />
                  </span>
                  <label className={styles["form__input-label"]}>
                    {placeholder}
                  </label>
                </div>
              )}
            </>
          ) : timePicker ? (
            <div className={styles["form__input-group"]}>
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                timeFormat="HH:mm"
                timeIntervals={60}
                dropdownMode="select"
                dateFormat="p"
                name={name}
                selected={value && moment(value).toDate()}
                value={value}
                onChange={async (date: any, event: any) => {
                  await formik.setFieldValue(name, date);
                  formik.setFieldTouched(name, true);
                }}
                onBlur={(event: any) => {
                  onBlur(event);
                }}
                className={`${styles["form__input"]} ${
                  disabled && styles["disabled"]
                }`}
                disabled={disabled}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ height: "100%" }}
                includeTimes={includeTimes}
                filterTime={filterTime}
              />
              <span className={styles["calenderlogo"]}>
                <Image
                  src={clockIcon}
                  alt="calendar"
                  height={"80px"}
                  width={"80px"}
                />
              </span>
              <label className={styles["form__input-label"]}>
                {placeholder}
              </label>
            </div>
          ) : (
            // <div className={styles['form__input-group']}>
            // {/* <input
            //   id={name}
            //   name={name}
            //   type="time"
            //   min="00:00" max="23:59"
            //   timeFormat="HH:mm"
            //   // pattern="[0-9]{2}:[0-9]{2}"
            //   // pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
            //   // min="23:00"
            //   // format={24}
            //   value={value}
            //   tabIndex={0}
            //   onChange={onChange}
            //   required={required}
            //   className={`${styles['form__input']} ${disabled && styles['disabled']}`}
            //   disabled={disabled}
            // /> */}
            //   <label className={styles['form__input-label']}>{placeholder}</label>
            // </div>
            placeholder !== "Phone Number*" && (
              <div className={styles["form__input-group"]}>
                <input
                  className={`${styles["form__input"]} ${
                    disabled && styles["disabled"]
                  }`}
                  name={name}
                  type={type}
                  required={required}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={disabled}
                />
                <label className={styles["form__input-label"]}>
                  {placeholder}
                </label>
              </div>
            )
          )}
          {placeholder === "Phone Number*" && (
            <div
              className={`d-flex ${styles["form__input-group"]}`}
              style={{ placeItems: "center" }}
            >
              <PhoneInput
                inputStyle={{ border: 0, width: "100%", paddingTop: "7%" }}
                name={name}
                enableAreaCodes={true}
                enableSearch={true}
                required={required}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                countryCallingCodeEditable={false}
                defaultCountry="PK"
                className={`p-0 ${styles["form__input"]} ${
                  disabled && styles["disabled"]
                }`}
              />
              <label className={styles['form__input-label']}>{required === false ? placeholder.replace('*', '') : placeholder}</label>
            </div>
          )}
        </div>
      </div>
      {error && <p className={`${styles["inputError"]}`}>{error}</p>}
    </>
  );
};
export default PersonalDetailsDDInput;
