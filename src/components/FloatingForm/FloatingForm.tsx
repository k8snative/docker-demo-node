import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
// import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect, useSelector } from 'react-redux'
import Api from 'src/lib/api'
import { setCurrentUser as setCurrentUserRedux } from 'src/lib/redux/auth/action'
import { validateEmail, validateName, validateOTP, validatePhoneNo, validatePhoneNoPersonalInfo } from 'src/lib/utils'

import arrowBack from '../../../public/assets/arrowBack.png'
import FormBottomContainer from '../FormBottomContainer/FormBottomContainer'
import FormHeading from '../FormHeading/FormHeading'
import FormInput from '../FormInput/FormInput'
import FormTopContainer from '../FormTopContainer/FormTopContainer'
import FormTxt from '../FormTxt/FormTxt'
import SignInInputs from '../SignInInputs/SignInInputs'
import styles from './FloatingForm.module.scss'


type SignUpInputsProps = {
  mobile_no: string
  emailNo: string
  email: string
  first_name: string
  last_name: string
  otpCode: string
  isLoading?: boolean
}
type SignInInputsProps = {
  mobile_no: string
  emailNo: string
  otpCode: string
}
type SignUpFunctionsProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement> | null, name: string, value: string) => void
  sendOTP: Function
  error: {}
  handleOTP: Function
  otpSteps: string[]
  curStep: string
  setError: Function
  isLoading?: boolean
}

const SignUpInputs = ({
  mobile_no,
  email,
  first_name,
  last_name,
  otpCode,
  handleOnChange,
  sendOTP,
  error,
  handleOTP,
  otpSteps,
  curStep,
  setError,
  isLoading,
}: SignUpInputsProps & SignUpFunctionsProps) => (
  <div className="my-2">
    <FormInput
      type="text"
      placeHolder="First Name*"
      name="first_name"
      value={first_name}
      onChange={handleOnChange}
      errTxt={error?.first_name}
      focusOutFunc={() => {
        let errMes = ''
        if (!first_name) errMes = 'First name is empty'
        else if (!validateName(first_name)) errMes = 'First name should contain alphabets only'
        else errMes = ''
        const tempData = { ...error, first_name: errMes }
        setError(tempData)
      }}
    />
    <FormInput
      type="text"
      placeHolder="Last Name*"
      name="last_name"
      value={last_name}
      onChange={handleOnChange}
      errTxt={error?.last_name}
      focusOutFunc={() => {
        let errMes = ''
        if (!last_name) errMes = 'Last name is empty'
        else if (!validateName(last_name)) errMes = 'Last name should contain alphabets only'
        else errMes = ''
        const tempData = { ...error, last_name: errMes }
        setError(tempData)
      }}
    />
    <FormInput
      type="email"
      placeHolder="Email Address*"
      name="email"
      value={email}
      onChange={handleOnChange}
      errTxt={error?.email}
      focusOutFunc={() => {
        let errMes = ''
        if (!email) errMes = 'Email is empty'
        else if (!validateEmail(email)) errMes = 'Invalid email'
        else errMes = ''
        const tempData = { ...error, email: errMes }
        setError(tempData)
      }}
    />
    <FormInput
      type="sendOTP"
      placeHolder="Mobile Number*"
      name="mobile_no"
      value={mobile_no}
      onChange={(value: any) => {
        handleOnChange(null, 'mobile_no', value)
      }}
      sendOTP={sendOTP}
      errTxt={error?.mobile_no}
      handleOTP={handleOTP}
      otpSteps={otpSteps}
      isLoading={isLoading}
      
      curStep={curStep}
      focusOutFunc={() => {
        let errMes = ''
        if (!mobile_no) errMes = 'Number is empty'
        // else if (!validatePhoneNoPersonalInfo(mobile_no)) errMes = 'Invalid Number'
        else errMes = ''
        const tempData = { ...error, mobile_no: errMes }
        setError(tempData)
      }}
    />
    <FormInput
      type="otp"
      placeHolder="Enter OTP"
      name="otpCode"
      value={otpCode}
      onChange={handleOnChange}
      errTxt={error?.otpError}
      focusOutFunc={() => {
        let errMes = ''
        if (!otpCode) errMes = 'Enter Otp Code'
        else if (!validateOTP(otpCode)) errMes = 'Invalid Number'
        else errMes = ''
        const tempData = { ...error, otpError: errMes }
        setError(tempData)
      }}
    />
  </div>
)

const FloatingForm = ({ setCurrentUser }: { setCurrentUser: Function }) => {
  const router = useRouter();
  const [error, setError] = useState({})
  const [isSignIn, setSignIn] = useState(false)

  const [activeSignIn, setActiveSignIn] = useState(true)
  const [activeSignUp, setActiveSignUp] = useState(true)

  const [termChecked, isTermChecked] = useState(false)
  const {leadData} = useSelector(state => state.auth)
  const [signUpData, setSignupData] = useState<SignUpInputsProps>({
    mobile_no: leadData?.number || '+92',
    emailNo: leadData?.emailState,
    email: leadData?.emailState,
    otpCode: '',
    last_name: '',
    first_name: leadData?.name,
  })
  const [signInData, setSignInData] = useState<SignInInputsProps>({
    mobile_no: leadData?.number,
    emailNo: leadData?.emailState,
    otpCode: '',
  })
  const [isEmail, setIsEmail] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false)

  const redirectOnGoBack = (): string => {
    if ((router.query['redirect'] as string) === '/payment') {
      return '/productPlan'
    }
    return '/'
  }

  useEffect(() => {
    if ((router.query['redirect'] as string) === '/payment') {
      setSignIn(true);
    }
  }, [])

  const [secondsSignIn, setSecondsSignIn] = useState(0)
  const [secondsSignUp, setSecondsSignUp] = useState(0)
  const setActive = (isActive: boolean) => {
    if (isSignIn) {
      setActiveSignUp(isActive)
    } else if (!isSignIn) {
      setActiveSignIn(isActive)
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsSignIn >= 1) {
        setSecondsSignIn(secondsSignIn - 1)
      }
      if (secondsSignIn === 0) {
        setActiveSignIn(true)
        clearInterval(intervalId)
      }
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [secondsSignIn])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsSignUp >= 1) {
        setSecondsSignUp(secondsSignUp - 1)
      }
      if (secondsSignUp === 0) {
        setActiveSignUp(true)
        clearInterval(intervalId)
      }
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [secondsSignUp])

  const otpStepsSignIn = ['Send OTP', `00:${secondsSignIn > 9 ? secondsSignIn : `0${secondsSignIn}`}`, 'Resend']
  const otpStepsSignUp = ['Send OTP', `00:${secondsSignUp > 9 ? secondsSignUp : `0${secondsSignUp}`}`, 'Resend']
  const [curStepSignIn, setCurStepSignIn] = useState(0)
  const [curStepSignUp, setCurStepSignUp] = useState(0)

  useEffect(() => {
    if (curStepSignIn === 1 && secondsSignIn === 0) setCurStepSignIn(2)
  }, [curStepSignIn, secondsSignIn])

  useEffect(() => {
    if (curStepSignUp === 1 && secondsSignUp === 0) setCurStepSignUp(2)
  }, [curStepSignUp, secondsSignUp])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | null, name?: string, value?: string) => {
    if (e?.target?.name === 'emailNo') {
      const emailNumValue = e.target.value;
      let tempError = error
      if (!emailNumValue?.length)
        tempError = { ...tempError, emailNo: 'Email or Mobile Number cannot be empty' }
      else if (
        emailNumValue?.length > 0 &&
        isEmail ? !validateEmail(emailNumValue) : !validatePhoneNoPersonalInfo(emailNumValue)
      ) {
        tempError = { 
          ...tempError, 
          emailNo: 'Please enter valid email or number with valid country code' 
        }
      }
      else {
        tempError = { 
          ...tempError, 
          emailNo: ''
        }
      }
      setError(tempError)
    }
    if (isSignIn) {
      if (name && value) {
        setSignupData({
          ...signUpData,
          [name]: value,
        })
      } else if (e !== null) {
        setSignupData({
          ...signUpData,
          [e.target.name]: e.target.value,
        })
      }
    } else if (name && value) {
      setSignInData({
        ...signInData,
        [name]: value,
      })
    } else if (e !== null) {
      setSignInData({
        ...signInData,
        [e.target.name]: e.target.value,
      })
    }
  }
  const validateSignupData = (): boolean => {
    let isValidated = false
    let tempError = {}

    // if (!validatePhoneNoPersonalInfo(signUpData?.mobile_no)) {
    //   tempError = { ...tempError, mobile_no: 'Invalid Number' }
    //   isValidated = true
    // }
    if (!signUpData?.mobile_no?.length) {
      tempError = { ...tempError, mobile_no: 'Mobile is empty' }
      isValidated = true
    }
    if (!signUpData?.first_name) {
      tempError = { ...tempError, first_name: 'First name is empty' }
      isValidated = true
    } else if (!validateName(signUpData?.first_name)) {
      tempError = { ...tempError, first_name: 'First name should contain alphabets only' }
      isValidated = true
    }
    if (!signUpData?.last_name) {
      tempError = { ...tempError, last_name: 'Last name is empty' }
      isValidated = true
    } else if (!validateName(signUpData?.last_name)) {
      tempError = { ...tempError, last_name: 'Last name should contain alphabets only' }
      isValidated = true
    }
    if (!validateEmail(signUpData?.email)) {
      tempError = { ...tempError, email: 'Email is invalid' }
      isValidated = true
    }
    if (!signUpData?.email?.length) {
      tempError = { ...tempError, email: 'Email is Empty' }
      isValidated = true
    }
    if (!signUpData.otpCode?.length) {
      tempError = { ...tempError, otpError: 'Enter OTP Code' }
      isValidated = true
    }
    if (!termChecked) {
      tempError = { ...tempError, termError: 'Kindly Agree to our Terms & Conditions' }
      isValidated = true
    }
    setError(tempError)
    return isValidated
  }
  const validateSignupDataForOTP = (): boolean => {
    let isValidated = false
    let tempError = {}

    // if (!validatePhoneNoPersonalInfo(signUpData?.mobile_no)) {
    //   tempError = { ...tempError, mobile_no: 'Mobile Number is Invalid' }
    //   isValidated = true
    // }
    if (!signUpData?.mobile_no?.length) {
      tempError = { ...tempError, mobile_no: 'Mobile is Empty' }
      isValidated = true
    }
    if (!signUpData?.first_name) {
      tempError = { ...tempError, first_name: 'First Name is Empty' }
      isValidated = true
    } else if (!validateName(signUpData?.first_name)) {
      tempError = { ...tempError, first_name: 'First name should contain alphabets only' }
      isValidated = true
    }
    if (!signUpData?.last_name) {
      tempError = { ...tempError, last_name: 'Last Name is Empty' }
      isValidated = true
    } else if (!validateName(signUpData?.last_name)) {
      tempError = { ...tempError, last_name: 'Last name should contain alphabets only' }
      isValidated = true
    }
    if (!validateEmail(signUpData?.email)) {
      tempError = { ...tempError, email: 'Email is invalid' }
      isValidated = true
    }
    if (!signUpData?.email?.length) {
      tempError = { ...tempError, email: 'Email is Empty' }
      isValidated = true
    }
    setError(tempError)
    return isValidated
  }
  const validateSigninData = (): boolean => {
    let isValidated = false
    let tempError = {}

    if (!signInData.emailNo?.length) {
      tempError = { ...tempError, emailNo: 'Email or Mobile Number cannot be empty' }
      isValidated = true
    }
    if (
      signInData.emailNo?.length > 0 &&
      isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
    ) {
      tempError = { ...tempError, emailNo: 'Please enter valid email or number with valid country code' }
      isValidated = true
    }
    if (!signInData.otpCode?.length) {
      tempError = { ...tempError, otpError: 'Enter OTP Code' }
      isValidated = true
    }
    //validate otp code
    if (signInData.otpCode?.length > 0 && signInData.otpCode?.length < 6) {
      tempError = { ...tempError, otpError: 'Enter Valid OTP Code' }
      isValidated = true
    }
    
    if (!termChecked && isSignIn) {
      tempError = { ...tempError, termError: 'Kindly Agree to our Terms & Conditions' }
      isValidated = true
    }
    setError(tempError)
    return isValidated
  }
  const sendOTP = async (): boolean => {
    if (!isSignIn) {
      if (!signInData.emailNo?.length) {
        setError({ ...error, emailNo: 'Email or Mobile Number cannot be empty' })
        setActive(true)
        return false
      } else setError({ ...error, emailNo: '' })
      if (
        signInData.emailNo?.length > 0 &&
        isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
      ) {
        setError({
          ...error,
          emailNo: 'Please enter valid email or number with valid country code',
        })
        setActive(true)
        return false
      }
    } else if (isSignIn) {
      validateSignupDataForOTP()
      if (validateSignupDataForOTP()) {
        setActive(true)
        return false
      }
    }

    const data = {
      input: 
        isEmail 
          ? 
            signInData.email?.length > 0 
              ? signInData.mobile_no 
              : signInData.emailNo
          : signInData.email?.length > 0 
            ? signInData.mobile_no 
            : (signInData.emailNo.includes('+') ? signInData.emailNo : `+${signInData.emailNo}`),
      type: 'customer',
      mode: 'sign_in',
    }
    
    const dataSignUp = {
      input: signUpData.email?.length > 0 ? (signUpData.mobile_no.includes('+') ? signUpData.mobile_no : `+${signUpData.mobile_no}`) : signUpData.emailNo,
      email: signUpData.email,
      type: 'customer',
      mode: 'sign_up',
    }
    isSignIn ? setIsSignupLoading(true) : setIsLoading(true)
    const res = await Api('POST', `otp_request`, isSignIn ? dataSignUp : data)
    if (res?.success) {
      isSignIn ? setIsSignupLoading(false) : setIsLoading(false)
      if (isSignIn) {
        setSecondsSignUp(59)
        setCurStepSignUp(curStepSignUp === 2 ? 1 : curStepSignUp + 1)
      } else {
        setSecondsSignIn(59)
        setCurStepSignIn(curStepSignIn === 2 ? 1 : curStepSignIn + 1)
      }
    } else {
      isSignIn ? setIsSignupLoading(false) : setIsLoading(false)
      setActive(true)
      setError({ error, otpError: res?.message })
    }
    return true
  }

  const handleOTP = () => {
    if (isSignIn) {
      if (!activeSignUp) return
    } else if (!isSignIn) {
      if (!activeSignIn) return
    }

    // **** here's the timeout ****
    if (secondsSignIn <= 0 || secondsSignUp <= 0) {
      setActive(false)
      sendOTP()
    }
  }

  useEffect(() => {
    // if (isSignIn) {
    //   setSignInData({
    //     ...signInData,
    //     emailNo: '',
    //   })
    // } else {
    //   setSignupData({
    //     ...signUpData,
    //     emailNo: '',
    //   })
    // }
    // setSeconds(0)
    // setCurStepSignIn(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn])

  const handleSubmit = async () => {
    if (isSignIn && validateSignupData()) return
    if (!isSignIn && validateSigninData()) return

    const data = {
      otp_code: signInData.otpCode,
      type: 'customer',
      // input: isEmail ? signInData.emailNo,
      input: isEmail 
              ? signInData.emailNo
              : signInData.emailNo.includes('+') ? signInData.emailNo : `+${signInData.emailNo}`,
    }

    // TODO: set user in redux setCurrentUser

    const dataSignUp = {
      input: signUpData.mobile_no.includes('+') ? signUpData.mobile_no : `+${signUpData.mobile_no}`,
      contact: signUpData.mobile_no.includes('+') ? signUpData.mobile_no : `+${signUpData.mobile_no}`,
      otp_code: signUpData.otpCode,
      email: signUpData.email,
      last_name: signUpData.last_name,
      first_name: signUpData.first_name,
      type: 'customer',
    }

    // setCurrentUser('user')

    if (!termChecked && isSignIn) {
      setError({ ...error, termError: 'Kindly Agree to our Terms & Conditions' })
      return
    }

    const response = await Api('POST', `otp_verify`, isSignIn ? dataSignUp : data, true)
    if (response.success) {
      setCurrentUser({ ...response.data.user, ...response.data.codes })

      if (router.query['redirect']) {
        router.replace(router.query['redirect'] as string)
      } else {
        router.replace('/auto')
      }
    } else {
      let tempData = { ...error, otpError: response?.message }
      setError(tempData)
    }
  }

  useEffect(() => {
    if (termChecked) {
      const tempData = { ...error, termError: '' }
      setError(tempData)
    }
  }, [termChecked])

  useEffect(() => {
    isEmail ? setSignInData({ ...signInData, emailNo: leadData?.emailState || '' }) : setSignInData({ ...signInData, emailNo: leadData?.number || '+92' })
  }, [isEmail])

  return (
    <div className={`w-100 d-flex align-items-center justify-content-center`}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // opacity: 0.5,
          zIndex: -1,
        }}
        className={` ${styles['floatingFormlWrapper']}`}
      ></div>
      <div className={`p-3 my-5 d-flex flex-column justify-content-center ${styles['floatingFormlContainer']}`}>
        {isSignIn ? (
          <FormTopContainer
            isSignIn={isSignIn}
            setSignIn={setSignIn}
            topRedTxtConditional={true}
            topTxt={'if you are an existing user, '}
            setError={setError}
            isTermChecked={isTermChecked}
          />
        ) : (
          <FormTopContainer
            isSignIn={isSignIn}
            setSignIn={setSignIn}
            topRedTxtConditional={false}
            topTxt={'Not an existing user? '}
            setError={setError}
            isTermChecked={isTermChecked}
          />
        )}

        <FormHeading isSignIn={isSignIn} />
        <FormTxt />
        {isSignIn ? (
          <SignUpInputs
            {...signUpData}
            handleOnChange={handleOnChange}
            sendOTP={sendOTP}
            error={error}
            handleOTP={handleOTP}
            otpSteps={otpStepsSignUp}
            isLoading={isSignupLoading}
            curStep={curStepSignUp}
            setError={setError}
          />
        ) : (
          <SignInInputs
            {...signInData}
            handleOnChange={handleOnChange}
            sendOTP={sendOTP}
            error={error}
            handleOTP={handleOTP}
            otpSteps={otpStepsSignIn}
            isLoading={isLoading}
            curStep={curStepSignIn}
            focusOutFuncemailNUm={() => {
              let tempError = error
              if (!signInData.emailNo?.length)
                tempError = { ...tempError, emailNo: 'Email or Mobile Number cannot be empty' }
              else if (
                signInData.emailNo?.length > 0 &&
                isEmail ? !validateEmail(signInData.emailNo) : !validatePhoneNoPersonalInfo(signInData.emailNo)
              )
                tempError = { ...tempError, emailNo: 'Please enter valid email or number with valid country code' }
              else tempError = { ...tempError, emailNo: '' }
              setError(tempError)
            }}
            focusOutFuncOTP={() => {
              let tempError = error
              if (!signInData.otpCode?.length) tempError = { ...tempError, otpError: 'Enter OTP Code' }
              else tempError = { ...tempError, otpError: '' }
              setError(tempError)
            }}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
          />
        )}
        <div style={{ marginTop: '-7px' }} />
        <FormBottomContainer
          backbtnlink={redirectOnGoBack()}
          link=""
          goBack={false}
          btnTxt="Continue"
          onClick={() => handleSubmit()}
          termChecked={isSignIn && termChecked}
          isTermChecked={isSignIn && isTermChecked}
          error={isSignIn && error?.termError}
          isSignIn={isSignIn ? true : false}
          // setTermErrorObj={() => {
          //   let tempData = { ...error, termError: '' }
          //   setError(tempData)
          // }}
        />
        {/* <div onClick={() => router.back()}>go back</div> */}
        <div onClick={() => router.back()} className={styles['cursorPointer']}>
          <div className={`d-flex align-items-center justify-content-center ${styles['goBackImgContainer']}`}>
            <Image alt="" src={arrowBack} />
          </div>
          <p className={`${styles['goBackTxt']}`}>Go Back</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ user: state.auth.data.user })

const mapDispatchProps = {
  setCurrentUser: setCurrentUserRedux,
}

export default connect(mapStateToProps, mapDispatchProps)(FloatingForm)
