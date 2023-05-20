import styles from "./FormInput.module.scss";
import { Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type FormInputProps = {
  type: string;
  placeHolder: string;
  onChange: any;
  value: string;
  sendOTP?: Function;
  name: string;
  errTxt: string;
  handleOTP?: Function;
  otpSteps?: string[];
  curStep?: any;
  focusOutFunc?: Function;
  isLoading?: boolean;
  backgroundColor: string;
};

const FormInput = ({
  type,
  placeHolder,
  onChange,
  value,
  sendOTP,
  name,
  errTxt,
  handleOTP,
  otpSteps,
  curStep,
  focusOutFunc,
  isLoading,
  backgroundColor,
}: FormInputProps) => (
  <div style={{ marginBottom: 20 }}>
    <div
      className={` px-1 py-2 d-flex align-items-center justify-content-end ${styles["formInputContainer"]}`}
      style={{ backgroundColor: backgroundColor ? backgroundColor : null }}
      // style={{ border: '5px solid purple' }}
    >
      {placeHolder === "Mobile Number*" ? (
        <PhoneInput
          inputStyle={{
            border: "none",
            boxShadow: "none",
          }}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            boxShadow: "none",
          }}
          className={` ${styles["phoneNoInput"]}`}
          placeholder={placeHolder}
          name={name}
          international
          value={value}
          onChange={onChange}
          onBlur={focusOutFunc}
          countryCallingCodeEditable={false}
          defaultCountry="PK"
        />
      ) : (
        // <input
        //   className={` ${styles['formInput']}`}
        //   type={type === 'otp' ? 'number' : type}
        //   name={name}
        //   placeholder={placeHolder}
        //   value={value}
        //   onChange={onChange}
        //   onBlur={focusOutFunc}
        //   onWheel={e => e.target.blur()}
        // />
        <input
          className={` ${styles["formInput"]}`}
          type={type === "otp" ? "number" : type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={focusOutFunc}
          onWheel={(e) => e.target.blur()}
        />
      )}

      {type === "sendOTP" && (
        <div
          onClick={isLoading ? () => {} : () => handleOTP()}
          className={`px-2 py-1 ${styles["sendOTPcon"]}`}
        >
          {isLoading ? (
            <Spinner
              size="sm"
              animation="border"
              style={{ color: "#E11631" }}
            />
          ) : (
            <p
              className={
                styles[curStep === 0 ? "sendOTPTxt" : "sendOTPTxtNext"]
              }
            >
              {otpSteps[curStep]}
            </p>
          )}
        </div>
      )}
    </div>
    <div className={`d-flex align-items-center  ${styles["errorDiv"]}`}>
      {errTxt && <p className={styles["notOTPTxt"]}>{errTxt}</p>}
    </div>
  </div>
);

export default FormInput;
