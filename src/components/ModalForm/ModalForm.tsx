import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import Api from 'src/lib/api'
import { leadGenRedux, setCurrentUser, leadData, updateAuthPopUp } from 'src/lib/redux/auth/action'
import { validateEmail, validateName, validatePhoneNoPersonalInfo } from 'src/lib/utils'
import DiscountFormInput from "../DiscountFormInput/DiscountFormInput";
import FormBottomContainer from "../FormBottomContainer/FormBottomContainer";
import FormHeading from "../FormHeading/FormHeading";
import FormTopContainer from "../FormTopContainer/FormTopContainer";
import FormTxt from "../FormTxt/FormTxt";
import SignInInputs from "../SignInInputs/SignInInputs";
import styles from "./ModalForm.module.scss";
import FormInput from "../FormInput/FormInput";

const nameOptions = [{ option: "Mr." }, { option: "Mrs." }, { option: "Ms." }];
const phoneOptions = [
  { option: "+92" },
  { option: "+924" },
  { option: "+823" },
];

const ModalForm = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) => {
  const { make_id, model_id, year, value } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const date = useSelector((state) => state?.auth?.planDetails.date_of_expiry);

  const [isSignIn, setSignIn] = useState(false);
  const [showDiv, setShowDiv] = useState("");
  const [fullName, setName] = useState("");
  const [fullNameError, setNameError] = useState("");
  const [emailState, setEmail] = useState("");
  const [emailStateError, setEmailError] = useState("");
  const [otpState, setOtpState] = useState("");
  const [otpStateError, setotpStateError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [termChecked, isTermChecked] = useState(false);
  const [termError, setTermError] = useState("");
  const [error, setError] = useState({});
  const [active, setActive] = useState(true);
  const [signInData, setSignInData] = useState<SignInInputsProps>({
    mobile_no: "+92",
    emailNo: "",
    otpCode: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolena>(false)
  const [isEmail, setIsEmail] = useState(true);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [curStep, setCurStep] = useState(0);
  const dispatch = useDispatch();

  const { leadData: stateLeadData } = useSelector((state) => state.auth);

  useEffect(() => {
    setTermError("");
    setError({});
    setNameError("");
    setEmailError("");
    setNumberError("");
  }, [isSignIn]);

  useEffect(() => {
    if (termChecked) {
      setError({
        ...error,
        termError: "",
      });
    }
  }, [termChecked]);
  const validateSigninData = (): boolean => {
    let isValidated = false;
    let tempError = {};

    if (!signInData.emailNo?.length) {
      tempError = {
        ...tempError,
        emailNo: "Email or Mobile Number cannot be empty",
      };
      isValidated = true;
    }
    if (
      signInData.emailNo?.length > 0 &&
        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
    ) {
      tempError = {
        ...tempError,
        emailNo: "Please enter valid email or number",
      };
      isValidated = true;
    }
    if (!signInData.otpCode?.length) {
      tempError = { ...tempError, otpError: "Enter OTP Code" };
      isValidated = true;
    }
    if (!isSignIn && !termChecked) {
      tempError = {
        ...tempError,
        termError: "Kindly Agree to our Terms & Conditions",
      };
      isValidated = true;
    }
    setError(tempError);
    return isValidated;
  };

  const handleSubmit = async () => {
    setSubmitLoading(true)
    if (!isExistingUser) {
      if (validateSigninData()) return;
    }

    // if (!termChecked) {
    //   return setError({ ...error, termChecked: 'Please accept terms and conditions' })
    // }
    const data = {
      otp_code: isExistingUser ? otpState : signInData.otpCode,
      type: 'customer',
      input: isExistingUser ? (number.includes('+') ? number : `+${number}`) : isEmail ? signInData.emailNo : (signInData.emailNo.includes('+') ? signInData.emailNo : `+${signInData.emailNo}`),
    }

    // if (!termChecked) {
    //   setError({ ...error, otpError: 'Kindly Agree to our Terms & Conditions' })
    //   return
    // }

    const response = await Api("POST", `otp_verify`, data, true);
    if (response.success) {
      dispatch(
        setCurrentUser({ ...response.data.user, ...response.data.codes })
      );

      dispatch(
        leadData({
          number: number,
          emailState: emailState,
          name: fullName,
          isExistingUser: isExistingUser
        })
      );

      dispatch(updateAuthPopUp(true))

      setShowModal(false);
      setSubmitLoading(false)

      //  router.replace('/')
    } else {
      setError({ ...error, otpError: response?.message });
      setSubmitLoading(false)

    }
  };
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | null,
    name?: string,
    value?: string
  ) => {
    if (e?.target?.name === "emailNo") {
      const emailNumValue = e.target.value;
      let tempError = error;
      if (!emailNumValue?.length)
        tempError = {
          ...tempError,
          emailNo: "Email or Mobile Number cannot be empty",
        };
      else if (
        emailNumValue?.length > 0 &&
          isEmail ? !validateEmail(emailNumValue) : !validatePhoneNoPersonalInfo(emailNumValue)
      ) {
        tempError = {
          ...tempError,
          emailNo: "Please enter valid email or number with valid country code",
        };
      } else {
        tempError = {
          ...tempError,
          emailNo: "",
        };
      }
      setError(tempError);
    }
    if (name && value) {
      setSignInData({
        ...signInData,
        [name]: value,
      });
    } else if (e !== null) {
      setSignInData({
        ...signInData,
        [e.target.name]: e.target.value,
      });
    }
    // setSignInData({
    //   ...signInData,
    //   emailNo: e.target.value,
    // })
  };
  const leadGen = async () => {
    const data = {
      name: fullName,
      // contact: `+92${number}`,
      contact: number,

      email: emailState,
      make_id: make_id,
      model_id: model_id,
      year: year,
      value: value,
      ...(date && { previous_policy_expiry_date: date }),
    };
    dispatch(
      leadData({
        number: number,
        emailState: emailState,
        name: fullName,
        isExistingUser: isExistingUser
      })
    );

    if (!data?.name) {
      setNameError("Name is empty");
    } else if (!validateName(data?.name))
      setNameError("Name should contain alphabets only");
    else {
      setNameError("");
    }
    // if (data?.contact === '+92') {
    //   setNumberError('Number is empty')
    // }
    // else if (data?.contact?.length > 10){setNumberError('Too many digits')}
    // else if (!validatePhoneNo(data?.contact)) {
    //   setNumberError('Invalid number')
    // }
    if (!data?.contact?.length) {
      setNumberError("Number is empty");
    } else if (!isValidPhoneNumber(data?.contact)) {
      setNumberError("Invalid Number");
    } else {
      setNumberError("");
    }
    if (!data?.email) {
      setEmailError("Email is empty");
    } else if (!validateEmail(data?.email)) {
      setEmailError("Invalid email");
    } else setEmailError("");
    if (!isSignIn && !termChecked) {
      setTermError("Kindly agree to our Terms & Conditions");
    } else {
      setTermError("");
    }
    // if (!fullNameError && !numberError && !emailStateError)
    if (
      data?.name &&
      data?.contact &&
      isValidPhoneNumber(data?.contact) &&
      data?.email &&
      validateEmail(data?.email) &&
      termChecked
      // data?.contact !== '+92' &&
      // validatePhoneNo(data?.contact) &&
    )
      await Api("POST", `lead_generation/register`, data).then((res) => {
        if (res.success) {
          dispatch(leadGenRedux());
          if (res?.existingUser) {
            setIsExistingUser(true);
            setSeconds(59);
            setCurStep(curStep === 2 ? 1 : curStep + 1);
            setError({
              ...error,
              termError: "You are an existing user. OTP has been sent to your registered Phone/Email, please enter to Sign-In. ",
            });
          } else {
            setShowModal(false);
            setIsExistingUser(false);
            dispatch(updateAuthPopUp(true))
          }
        }
      });
  };
  // ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds >= 1) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setActive(true);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  const otpSteps = [
    "Send OTP",
    `00:${seconds > 9 ? seconds : `0${seconds}`}`,
    "Resend",
  ];
  useEffect(() => {
    if (curStep === 1 && seconds === 0) setCurStep(2)
  }, [curStep, seconds])

  const sendOTP = async () => {
    if (!signInData.emailNo?.length) {
      setError({ ...error, emailNo: "Email or Mobile Number cannot be empty" });
      setActive(true);
      return;
    }

    if (
      signInData.emailNo?.length > 0 &&
        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
    ) {
      setError({ ...error, emailNo: 'Please enter valid email or number with valid country code' })
      setActive(true)
      return
    }
    setError({ ...error, emailNo: '' })
    if (
      signInData.emailNo?.length > 0 &&
        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
    ) {

      setError({
        ...error,
        emailNo: "Please enter valid email or number with valid country code",
      });
      setActive(true);
      return;
    }
    setError({ ...error, emailNo: "" });
    if (
      signInData.emailNo?.length > 0 &&
        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
    ) {
      setError({
        ...error,
        emailNo: "Please enter valid email or number with valid country code",
      });
      setActive(true);
      return;
    }

    const data = {
      input: isExistingUser ? (number.includes('+') ? number : `+${number}`) : isEmail ? signInData.emailNo : (signInData.emailNo.includes('+') ? signInData.emailNo : `+${signInData.emailNo}`),
      type: 'customer',
      mode: 'sign_in',
    }

    setIsLoading(true);
    const res = await Api("POST", `otp_request`, data);
    if (res?.success) {
      setIsLoading(false);
      setSeconds(59);
      setCurStep(curStep === 2 ? 1 : curStep + 1);
    } else {
      setIsLoading(false);
      setActive(true);
      setError({ ...error, otpError: res?.message });
    }
  };

  const handleOTP = () => {
    if (!isExistingUser && !active) return;
    if (sendOTP)
      if (seconds <= 0) {
        setActive(false);
        sendOTP();
        // setSeconds(59)
        // setCurStep(curStep === 2 ? 1 : curStep + 1)
      }
  };

  useEffect(() => {
    isEmail
      ? setSignInData({ ...signInData, emailNo: stateLeadData.emailState })
      : setSignInData({
        ...signInData,
        emailNo: stateLeadData.number || "+92",
      });
  }, [isEmail]);



  return (
    <Modal className={styles['mainModal']} size="sm" show={showModal} centered={true}>
      <div className={` ${styles['modalWrapper']}`}>
        <p className={styles['modalFormTopTxt']}>Continue to see the results</p>
        {/* <p className={styles['modalFormTopTxt']}>Sign up now</p> */}
        <div className={`py-3 ${styles['modalContaienr']}`}>
          <FormTopContainer
            isSignIn={isSignIn}
            setSignIn={setSignIn}
            topRedTxtConditional={false}
            topTxt={"Already an existing user?"}
          />

          <div className="my-3">
            {isSignIn ? (
              <>
                <FormHeading isSignIn={!isSignIn} />
                <FormTxt />
                <SignInInputs
                  {...signInData}
                  handleOnChange={handleOnChange}
                  error={error}
                  sendOTP={sendOTP}
                  handleOTP={handleOTP}
                  otpSteps={otpSteps}
                  isLoading={isLoading}
                  curStep={curStep}
                  focusOutFuncemailNUm={() => {
                    let tempError = error;
                    if (!signInData.emailNo?.length)
                      tempError = {
                        ...tempError,
                        emailNo: "Email or Mobile Number cannot be empty",
                      };
                    else if (
                      signInData.emailNo?.length > 0 &&
                        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
                    )
                      tempError = {
                        ...tempError,
                        emailNo: 'Please enter valid email or number with valid country code',
                      }
                    else tempError = { ...tempError, emailNo: '' }
                    setError(tempError)
                  }}
                  focusOutFuncOTP={() => {
                    let tempError = error;
                    if (!signInData.otpCode?.length)
                      tempError = { ...tempError, otpError: "Enter OTP Code" };
                    else tempError = { ...tempError, otpError: "" };
                    setError(tempError);
                  }}
                  isEmail={isEmail}
                  setIsEmail={setIsEmail}
                />
              </>
            ) : (
              <>
                <DiscountFormInput
                  showDiv={showDiv}
                  setShowDiv={setShowDiv}
                  divStyle={true}
                  options={nameOptions}
                  placeholder="Name*"
                  value={fullName}
                  onChange={setName}
                  error={fullNameError}
                  onfocusout={(e) => {
                    if (!fullName) {
                      setNameError("Name is empty");
                      return false;
                    }
                    if (!validateName(fullName)) {
                      setNameError("Name should contain alphabets only");
                      return false;
                    }
                    setNameError("");
                    return true;
                  }}
                />
                {
                  isExistingUser ? (
                    <>
                      <FormInput
                        type="sendOTP"
                        placeHolder="Mobile Number*"
                        name="emailNo"
                        value={number}
                        onChange={setNumber}
                        sendOTP={sendOTP}
                        handleOTP={handleOTP}
                        otpSteps={otpSteps}
                        isLoading={isLoading}
                        curStep={curStep}
                      />
                    </>
                  ) : (
                    <DiscountFormInput
                      showDiv={showDiv}
                      setShowDiv={setShowDiv}
                      divStyle={true}
                      options={phoneOptions}
                      placeholder="Phone Number*"
                      value={number}
                      onChange={setNumber}
                      error={numberError}
                      onfocusout={() => {
                        if (!number) {
                          setNumberError("Number is empty");
                          return false;
                        }
                        if (!isValidPhoneNumber(number)) {
                          setNumberError("Invalid Number");
                          return false;
                        }
                        setNumberError("");
                        return true;
                      }}
                    />
                  )}
                <DiscountFormInput
                  showDiv={showDiv}
                  setShowDiv={setShowDiv}
                  divStyle={true}
                  options={""}
                  placeholder="Email*"
                  value={emailState}
                  onChange={setEmail}
                  error={emailStateError}
                  onfocusout={() => {
                    if (!emailState) {
                      setEmailError("Email is empty");
                      return false;
                    }
                    if (!validateEmail(emailState)) {
                      setEmailError("Invalid email");
                      return false;
                    }
                    setEmailError("");
                    return true;
                  }}
                />
                {
                  isExistingUser && (
                    <>
                      <FormInput
                        type="otp"
                        placeHolder="Enter OTP"
                        name="otpCode"
                        value={otpState}
                        onChange={(e) => {
                          setOtpState(e.target.value)
                        }}
                        // onChange={handleOnChange}
                        errTxt={otpStateError}
                      // focusOutFunc={focusOutFuncOTP}
                      />
                    </>
                  )
                }
              </>
            )}
          </div>
          <div style={{ marginTop: "-10px" }} />
          {
            isExistingUser && (
              <div className={`d-flex align-items-center  ${styles['errorDiv']}`}>
                {error && <p className={styles['notOTPTxt']}>{error?.otpError}</p>}
              </div>
            )
          }
          <FormBottomContainer
            disable={submitLoading}
            backbtnlink={"/"}
            link=""
            goBack={false}
            btnTxt={!submitLoading ? "Continue" : < Spinner size="sm" animation='border' />}
            /* !!!!!!! WARNING !!!!!! */
            /* Conditions are messy and in reverse do not touch */
            /* !!!!!!! WARNING !!!!!! */
            onClick={() => {
              if (isSignIn) {
                handleSubmit();
              } else {
                isExistingUser ? handleSubmit() : leadGen()
              }
            }}
            termChecked={!isSignIn && termChecked}
            isTermChecked={!isSignIn && isTermChecked}
            error={!isSignIn && error?.termError}
            isSignIn={!isSignIn}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalForm;
