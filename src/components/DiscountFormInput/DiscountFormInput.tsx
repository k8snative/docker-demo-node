import Image from 'next/image'
import { useEffect, useState } from 'react'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'

import dropDownSmall from '../../../public/assets/dropDownSmall.png'
import pakistan from '../../../public/assets/pakistan.png'
import tickDropDown from '../../../public/assets/tickDropDown.png'
import styles from './DiscountFormInput.module.scss'

const DiscountFormInput = ({
  name,
  options,
  placeholder,
  divStyle,
  showDiv,
  setShowDiv,
  value,
  onChange,
  error,
  onfocusout,
  touched,
  onBlur,
  prefixValue,
  setPrefixValueIn,
  formik,
}: {
  name?: any
  options: any
  placeholder: string
  divStyle: Boolean
  showDiv: string
  setShowDiv: Function
  value: string
  onChange: any
  error: string | undefined
  onfocusout?: Function
  touched?: any
  onBlur?: any
  prefixValue?: string
  setPrefixValueIn?: string
  formik?: any
}) => {
  // const options = [{ option: 'Mr.' }, { option: 'Mrs.' }, { option: 'Ms.' }]
  const [selectedOption, setSelectedOption] = useState(options[0]?.option)
  const [showTickImg, setShowTickImg] = useState(false)

  useEffect(() => {
    if (prefixValue) {
      setSelectedOption(prefixValue)
    }
  }, [prefixValue])

  const setPrefixValue = (option: string) => {
    setSelectedOption(option)
    {
      formik && formik.setFieldValue(setPrefixValueIn, option)
    }
  }

  return (
    <div
    // style={{ border: '5px solid red' }}
    >
      <div
        className={`w-100 d-flex align-items-center justify-content-end position-relative  ${
          divStyle === true ? styles['inputBorder'] : styles['Border']
        }`}
        // style={{ border: '5px solid' }}
      >
        <div className={`w-100 d-flex align-items-center ${styles['wrapper']}`}>
          {placeholder !== 'Email*' && placeholder !== 'Phone Number*' && (
            <div
              onClick={() => {
                if (showDiv === options[0]?.option) setShowDiv('')
                else setShowDiv(options[0]?.option)
              }}
              className={`d-flex align-items-center justify-content-around ${
                divStyle === true ? styles['dropCont'] : styles['dropCont2']
              }`}
              style={{ width: '65px' }}
            >
              {/* {placeholder === 'Phone Number*' && (
                <div className={styles['pakImgWrap']}>
                  <Image alt="" src={pakistan} />
                </div>
              )} */}

              {showDiv === options[0]?.option && (
                <>
                  <div
                    className={`d-flex flex-column align-items-center justify-content-around ${
                      divStyle === true ? styles['absolute'] : styles['absolute2']
                    }`}
                    style={{ width: placeholder === 'Phone Number*' ? '85px' : '65px' }}
                  >
                    {options.map((otp: { option: string }, index: number) => (
                      <div
                        onClick={() => {
                          setPrefixValue(otp.option)
                        }}
                        className={`d-flex ${styles['optionContainer']}`}
                        key={index}
                      >
                        {/* {placeholder === 'Phone Number*' && (
                          <div className={styles['pakImgWrap']}>
                            <Image alt="" src={pakistan} />
                          </div>
                        )} */}
                        <p className={styles['optionTxt']}>{otp?.option}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <p className={` ${styles['dropSelectedTxt']}`}>{selectedOption}</p>
              <div
                className={`d-flex align-items-center justify-content-between ${styles['dropDownSmall']}`}
                style={{}}
              >
                <Image alt="" src={dropDownSmall} />
              </div>
            </div>
          )}
          {placeholder !== 'Phone Number*' ? (
            formik ? (
              <input
                onChange={onChange}
                name={name}
                value={value}
                className={` ${styles['input']}`}
                type={'text'}
                placeholder={placeholder}
                onBlur={(e: any) => {
                  if (onfocusout) {
                    setShowTickImg(onfocusout)
                    onfocusout()
                  } else if (onBlur) {
                    setShowTickImg(onfocusout)
                    onBlur(e)
                  }
                }}
                // onf
                // onKeyDown={event => /[a-z]/i.test(event.key)}
              />
            ) : (
              <input
                onChange={e => {
                  onChange(e.target.value)
                }}
                name={name}
                value={value}
                className={` ${styles['input']}`}
                type={'text'}
                placeholder={placeholder}
                onBlur={(e: any) => {
                  if (onfocusout) {
                    setShowTickImg(onfocusout)
                    onfocusout()
                  } else if (onBlur) {
                    setShowTickImg(onfocusout)
                    onBlur(e)
                  }
                }}
                // onf
                // onKeyDown={event => /[a-z]/i.test(event.key)}
              />
            )
          ) : (
            <PhoneInput
              placeholder={placeholder}
              international
              value={value}
              name={name}
              countryCallingCodeEditable={false}
              defaultCountry="PK"
              onChange={onChange}
              onBlur={(e: any) => {
                if (onfocusout) {
                  setShowTickImg(onfocusout)
                  onfocusout()
                } else if (onBlur) {
                  setShowTickImg(onfocusout)
                  onBlur(e)
                }
              }}
            />
          )}
        </div>
        {showTickImg && (
          <div className={styles['tickImgWrap']}>
            <Image alt="" src={tickDropDown} />
          </div>
        )}
      </div>
      {onBlur ? (
        <div
          className={styles['notOTPTxtDiv']}
          // style={{ border: '1px solid blue' }}
        >
          {touched && error && <p className={styles['notOTPTxt']}>{`${error}`}</p>}
        </div>
      ) : (
        <div
          className={styles['notOTPTxtDiv']}
          // style={{ border: '1px solid blue' }}
        >
          {error && <p className={styles['notOTPTxt']}>{`${error}`}</p>}
        </div>
      )}
    </div>
  )
}
export default DiscountFormInput
