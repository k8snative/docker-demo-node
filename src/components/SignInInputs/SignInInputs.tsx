import FormInput from "../FormInput/FormInput";
import styles from "./SignInInputs.module.scss";
import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { validatePhoneNoPersonalInfo } from "src/lib/utils";

type SignInInputsProps = {
  mobile_no: string;
  emailNo: string;
  otpCode: string;
  error: {};
  handleOTP: Function;
  otpSteps: string[];
  curStep: string;
  focusOutFuncemailNUm?: Function;
  focusOutFuncOTP?: Function;
  isLoading?: boolean;
  isEmail?: boolean;
  setIsEmail?: Function;
};
type SignInFunctionsProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sendOTP: Function;
  isLoading?: boolean;
};

const isValidPhoneNumber = (inputNumber: string): boolean => {
  if (inputNumber.length !== 13) return false;
  if (!inputNumber.startsWith("+923")) return false;
  return true;
};

const SignInInputs = ({
  emailNo,
  otpCode,
  handleOnChange,
  sendOTP,
  error,
  handleOTP,
  otpSteps,
  curStep,
  focusOutFuncemailNUm,
  focusOutFuncOTP,
  isLoading,
  isEmail,
  setIsEmail,
}: SignInInputsProps & SignInFunctionsProps) => {
  const isDesktopOrMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div className="my-2">
      <div className="w-100 d-flex align-items-center justify-content-start">
        <Form className={styles["formstyles"]}>
          <Form.Check
            value={isEmail}
            onClick={() => setIsEmail(true)}
            inline
            label={<p className={styles["formLabel"]}>Email</p>}
            name="group1"
            type={"radio"}
            id={`inline-radio-1`}
            defaultChecked={true}
          />
          <Form.Check
            value={isEmail}
            onClick={() => setIsEmail(false)}
            inline
            label={<p className={styles["formLabel"]}>Phone</p>}
            name="group1"
            type={"radio"}
            id={`inline-radio-2`}
          />
        </Form>
      </div>
      {isEmail ? (
        <FormInput
          type="sendOTP"
          placeHolder={isDesktopOrMobile ? "Email*" : "Email address*"}
          name="emailNo"
          value={emailNo}
          onChange={handleOnChange}
          sendOTP={sendOTP}
          errTxt={error?.emailNo}
          handleOTP={handleOTP}
          otpSteps={otpSteps}
          isLoading={isLoading}
          curStep={curStep}
          focusOutFunc={focusOutFuncemailNUm}
        />
      ) : (
        <FormInput
          type="sendOTP"
          placeHolder="Mobile Number*"
          name="emailNo"
          value={emailNo}
          onChange={(value: any) => {
            handleOnChange(null, "emailNo", value);
            let errMes = "";
            if (!value) errMes = "Number is empty";
            else if (!validatePhoneNoPersonalInfo(value))
              errMes = "Invalid Number";
            else errMes = "";
            const tempData = { ...error, value: errMes };
          }}
          sendOTP={sendOTP}
          errTxt={error?.emailNo}
          handleOTP={handleOTP}
          otpSteps={otpSteps}
          isLoading={isLoading}
          curStep={curStep}
        />
      )}
      <FormInput
        type="otp"
        placeHolder="Enter OTP"
        name="otpCode"
        value={otpCode}
        onChange={handleOnChange}
        errTxt={error?.otpError}
        focusOutFunc={focusOutFuncOTP}
      />
    </div>
  );
};

export default SignInInputs;
