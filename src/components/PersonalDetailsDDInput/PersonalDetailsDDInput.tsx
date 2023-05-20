import { format } from 'date-fns'
import moment from 'moment'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useMediaQuery } from 'react-responsive'
import { formatTime } from 'src/lib/utils'
import calendar2 from '~public/assets/formcalendar.png'

import dropDownSmall from '../../../public/assets/dropDownIcon.png'
import pakistan from '../../../public/assets/pakistan.png'
import phoneDD from '../../../public/assets/phoneinputdd.png'
import styles from './PersonalDetailsDDInput.module.scss'

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
}: {
  placeholder: string
  type: string
  calendar?: boolean
  timePicker?: boolean
  customDropDown?: boolean
  options: any
  showDiv?: string
  setShowDiv: Function
  required: boolean
  onChange?: any
  error?: string
  value?: any
  name: string
  onBlur: any
  formik?: any
  initialDropdownValue?: string
  setDropdownValueIn?: string
  setTimeValueIn?: string
  disabled?: boolean
  minDate?: any
}) => {
  const isSmallerThan360 = useMediaQuery({
    query: '(max-width: 360px)',
  })
  const handleDropdownValueSelect = (selectedOption: string) => {
    formik?.setFieldValue(setDropdownValueIn, selectedOption)
  }
  return (
    <>
      <div className={` d-flex align-items-center justify-content-end position-relative  ${styles['inputBorder']}`}>
        <div className={`w-100 d-flex align-items-center ${styles['wrapper']} ${disabled && styles['disabled']}`}>
          {customDropDown && (
            <div
              onMouseLeave={() => {
                setShowDiv('')
              }}
              onClick={() => {
                if (showDiv === options[0]?.option) setShowDiv('')
                else setShowDiv(options[0]?.option)
              }}
              className={`d-flex align-items-center justify-content-between ${styles['dropCont']}`}
            >
              {/* {placeholder === 'Phone Number*' && (
                <div className={styles['pakImgWrap']}>
                  <Image alt="" src={pakistan} />
                </div>
              )} */}

              {showDiv === options[0]?.option && (
                <>
                  <div className={`d-flex flex-column ${styles['absolute']}`}>
                    {options.map((otp: { option: string }, index: number) => (
                      <div
                        onClick={() => handleDropdownValueSelect(otp.option)}
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
              <p className={` ${styles['dropSelectedTxt']}`}>{initialDropdownValue}</p>
              {/* {placeholder === 'Phone Number*' && (
                <div className={`d-flex ${styles['phonedd']}`}>
                  <Image alt="" src={phoneDD} />
                </div>
              )} */}
              {placeholder !== 'Phone Number*' && (
                <div className={`d-flex ${styles['dropDownSmall']}`}>
                  <Image alt="" src={dropDownSmall} />
                </div>
              )}
            </div>
          )}
          {
            calendar ? (
              <>
                {isSmallerThan360 ? (
                  <div className={`d-flex w-100 position-relative ${styles['calenderInputContainer']}`}>
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      name={name}
                      selected={value && moment(value).toDate()}
                      placeholderText={placeholder}
                      value={value}
                      onChange={async (date: any, event: any) => {
                        await formik.setFieldValue(name, date)
                        formik.setFieldTouched(name, true)
                      }}
                      onBlur={(event: any) => {
                        onBlur(event)
                      }}
                      dateFormat={'dd/MM/yyyy'}
                      className={`${styles['calenderInput']} ${disabled && styles['disabled']}`}
                      disabled={disabled}
                    />
                    <span className={styles['calenderlogo']}>
                      <Image src={calendar2} alt="calendar" height={'20px'} width={'20px'} />
                    </span>
                  </div>
                ) : (
                  <div className={`d-flex w-100 position-relative ${styles['calenderInputContainer']}`}>
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      name={name}
                      selected={value && moment(value).toDate()}
                      placeholderText={placeholder}
                      value={value}
                      // value={value && new Date(value).toLocaleDateString('en-GB')}
                      onChange={async (date: any, event: any) => {
                        await formik.setFieldValue(name, date)
                        formik.setFieldTouched(name, true)
                      }}
                      onBlur={(event: any) => {
                        onBlur(event)
                      }}
                      dateFormat={'dd/MM/yyyy'}
                      className={`${styles['calenderInput']} ${disabled && styles['disabled']}`}
                      disabled={disabled}
                    />
                    <span className={styles['calenderlogo']}>
                      <Image src={calendar2} alt="calendar" height={'80px'} width={'80px'} />
                    </span>
                  </div>
                )}
              </>
            ) : timePicker ? (
              <div className={`d-flex w-100 position-relative ${styles['calenderInputContainer']}`}>
                <label className={`${value ? styles['timeLabel'] : styles['timePlaceHolder']}`} for={name}>
                  {value ? formatTime(value) : placeholder}
                </label>
                <input
                  id={name}
                  name={name}
                  type="time"
                  value={value}
                  tabIndex={0}
                  onChange={onChange}
                  required={required}
                  className={`${styles['calenderInput']} ${styles['clearOpacity']} ${disabled && styles['disabled']}`}
                  disabled={disabled}
                />
              </div>
            ) : (
              placeholder !== 'Phone Number*' && (
                <input
                  className={`${styles['input']} ${disabled && styles['disabled']}`}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  disabled={disabled}
                />
              )
            )

            // : (
            //   <input
            //     className={`${styles['input']} ${disabled && styles['disabled']}`}
            //     name={name}
            //     type={type}
            //     placeholder={placeholder}
            //     required={required}
            //     onChange={onChange}
            //     value={value}
            //     onBlur={onBlur}
            //     disabled={disabled}
            //   />
            // )
          }
          {placeholder === 'Phone Number*' && (
            <PhoneInput
              placeholder={placeholder}
              name={name}
              international
              // type={type}
              required={required}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              countryCallingCodeEditable={false}
              // style={{border:'0',outline:'none'}}
              defaultCountry="PK"

              // countryCodeEditable={false}
              // country="PK"
              // error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
              // countrySelectProps={{ unicodeFlags: true }}
            />
          )}
        </div>
      </div>
      {error && <p className={`${styles['inputError']}`}>{error}</p>}
    </>
  )
}
export default PersonalDetailsDDInput
