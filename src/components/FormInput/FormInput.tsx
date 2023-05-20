import { ChangeEvent, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'

import styles from './FormInput.module.scss'

// const [active,setActive] = useState(false)
// const disableOtpButton = ()=>{
//   console.log("asdasdas")
//   setActive(true);
//   handleOTP();
//   // **** here's the timeout ****
//   setTimeout(() => setActive(false), 5000);

// };

type FormInputProps = {
  type: string
  placeHolder: string
  onChange: any
  value: string
  sendOTP?: Function
  name: string
  errTxt: string
  handleOTP?: Function
  otpSteps?: string[]
  curStep?: string
  focusOutFunc?: Function
  isLoading?: boolean
}

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
}: FormInputProps) => (
  <div>
    <div
      className={` px-1 py-2 d-flex align-items-center justify-content-end ${styles['formInputContainer']}`}
      // style={{ border: '5px solid purple' }}
    >
      {placeHolder === 'Mobile Number*' ? (
        <PhoneInput
          placeholder={placeHolder}
          name={name}
          international
          value={value}
          onChange={onChange}
          onBlur={focusOutFunc}
          className={` ${styles['mobileInput']}`}
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
          className={` ${styles['formInput']}`}
          type={type === 'otp' ? 'number' : type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={focusOutFunc}
          onWheel={e => e.target.blur()}
        />
      )}

      {type === 'sendOTP' && (
        <div onClick={isLoading ? () => {} : () => handleOTP()} className={`px-2 py-1 ${styles['sendOTPcon']}`}>
          {isLoading ? (
            <Spinner size="sm" animation="border" style={{ color: '#E11631' }} />
          ) : (
            <p className={styles[curStep === 0 ? 'sendOTPTxt' : 'sendOTPTxtNext']}>{otpSteps[curStep]}</p>
          )}
        </div>
      )}
    </div>
    <div className={`d-flex align-items-center  ${styles['errorDiv']}`}>
      {errTxt && <p className={styles['notOTPTxt']}>{errTxt}</p>}
    </div>
  </div>
)

export default FormInput
