import { ChangeEvent } from 'react'
import { useMediaQuery } from 'react-responsive'

import FormInput from '../FormInput/FormInput'

type SignInInputsProps = {
  mobile_no: string
  emailNo: string
  otpCode: string
  error: {}
  handleOTP: Function
  otpSteps: string[]
  curStep: string
  focusOutFuncemailNUm?: Function
  focusOutFuncOTP?: Function
  isLoading?: boolean
}
type SignInFunctionsProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  sendOTP: Function
  isLoading?: boolean
}
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
}: SignInInputsProps & SignInFunctionsProps) => {
  const isDesktopOrMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })
  return (
    <div className="my-2">
      <FormInput
        type="sendOTP"
        placeHolder={isDesktopOrMobile ? 'Mobile / Email*' : '(+92) Mobile / Email address*'}
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
  )
}

export default SignInInputs
