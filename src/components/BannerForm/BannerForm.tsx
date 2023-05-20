import { Formik, useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import Api from 'src/lib/api'
import { clearCompare, renewPolicy as renewPolicyRedux, setInsuranceDetails } from 'src/lib/redux/auth/action'
import currencyFormat from 'src/utils/currencyFormat'
import * as Yup from 'yup'

import calenderLogo from '../../../public/assets/calenderLogo.png'
import dropDownIconRed from '../../../public/assets/dropDownIconRed.png'
import FormBottomContainer from '../FormBottomContainer/FormBottomContainer'
import styles from './BannerForm.module.scss'

type MakeDataProps = { id: number; name: string; status: boolean; deletedAt: null }
type ModelDataProps = {
  id: number
  make_id: number
  name: string
  status: boolean
  created_by: number
  updated_by: null
  deletedAt: null
}

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
  dropDown: Boolean
  value: String
  dropDownData: MakeDataProps[] | undefined
  selectedOpt: MakeDataProps | undefined
  setSelectedOpt: Function
  onChange?: Function
  errTxt?: String
  name?: String
  values: any
  type?: String
  disabled?: Boolean
  handleBlur?: any
}) => {
  const [isOpen, setOpen] = useState(false)
  const getSelectedValue = id => dropDownData?.find(item => item.id === id)?.name || ''
  // const [selectedOpt, setSelectedOpt] = useState(value)
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = event => {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
        handleBlur &&
          handleBlur({
            target: {
              name,
            },
          })
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
  return (
    <>
      <div
        ref={ref}
        name={name}
        onClick={() => !disabled && setOpen(!isOpen)}
        style={{
          background: disabled ? '#ECECEC' : '#fff',
        }}
        className={`d-flex justify-content-between align-items-center ${styles['dropDownContainer']}`}
      >
        {isOpen && dropDown && (
          <div className={`d-flex flex-column align-items-start justify-content-center ${styles['dropContainer']}`}>
            <div className={styles['scrollContainer']}>
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
                    {<p className={styles['dropMenuItems']}>{each?.name}</p>}
                  </div>
                ))}
            </div>
          </div>
        )}
        {dropDown ? (
          <p className={styles['selectedTxt']}>{values[name] ? getSelectedValue(values[name]) : value}</p>
        ) : (
          <input
            name={name}
            className={styles['selectedTxt']}
            type={type || 'text'}
            placeholder={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={handleBlur}
          />
        )}
        {dropDown && (
          <div className={styles['formImageContainer']}>
            <Image src={dropDownIconRed} alt="" />
          </div>
        )}
      </div>
      {errTxt && <p className={styles['notOTPTxt']}>{errTxt}</p>}
    </>
  )
}

const FormCalenderContainer = ({
  calDate,
  setCalDate,
  onChange,
}: {
  calDate: Date
  setCalDate: Function
  onChange: Function
}) => {
  const newDate = new Date(calDate)
  return (
    <div className="position-relative mx-3 d-flex align-items-center">
      <input
        value={calDate ? (newDate?.getDate() < 10 ? `0${newDate?.getDate()}` : newDate.getDate()) : ''}
        className={styles['inputDayMonth']}
        type={'text'}
      />
      <p className={styles['calSerate']}>/</p>
      <input
        value={calDate ? (newDate.getMonth() < 9 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1) : ''}
        className={styles['inputDayMonth']}
        type={'text'}
      />
      <p className={styles['calSerate']}>/</p>
      <input value={calDate ? newDate.getFullYear() : ''} className={styles['inputYear']} type={'text'} />
      <div className={styles['calImageCont']}>
        <Image alt="" src={calenderLogo} />
      </div>
      <input
        className={`position-absolute ${styles['calInput']}`}
        type={'date'}
        onChange={e =>
          onChange({
            target: {
              name: 'date_of_expiry',
              value: e?.target?.value,
            },
          })
        }
      />
    </div>
  )
}

const BannerForm = () => {
  const router = useRouter()
  const [check, setCheck] = useState(false)
  const [termError, setTermError] = useState('')
  const [calDate, setCalDate] = useState()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      make_id: '',
      model_id: '',
      year: '',
      value: '',
      sortOrder: null,
      insurance_toggle: false,
      date_of_expiry: '',
    },
    validationSchema: Yup.object({
      make_id: Yup.string().required('Required'),
      model_id: Yup.string().required('Required'),
      year: Yup.number().required('Year is Required').min(1980, 'min 1980').max(2023, 'max 2023'),
      value: Yup.number()
        .min(1, 'Positive Value')
        .typeError('Value can only be number')
        .test('is-decimal', 'Decimal value is not allowed', (value: any) => /^[^.]*$/.test(value))
        .required('Value is Required'),
      insurance_toggle: Yup.boolean(),
      date_of_expiry: Yup.string().when('insurance_toggle', {
        is: true,
        then: Yup.string().required('Date is Required'),
        otherwise: Yup.string(),
      }),
      // checked: Yup.boolean().required('Kindly agree to our Term & Conditions'),
    }),
    onSubmit: values => {
      if (!check) {
        setTermError('Kindly agree to our Term & Conditions')
        return
      }
      const { insurance_toggle, ...restValues } = values
      dispatch(setInsuranceDetails({ ...restValues, company_ids: [], policy_type_ids: [], addon_ids: [] }))
      dispatch(clearCompare())
      dispatch(renewPolicyRedux({}))
      router.push({ pathname: '/productPlan' })
    },
  })

  const [showCalender, setShowCalender] = useState(true)
  const [make, setMake] = useState<MakeDataProps[]>()
  const [model, setModel] = useState<ModelDataProps[]>()

  const getModel = async (id: number) => {
    const tempData = await Api('GET', `model_make/${id}?status=1`)
    setModel(tempData?.data)
  }

  const getMake = async () => {
    const tempData = await Api('GET', `make?status=1`)
    // console.log('tempData',tempData)
    setMake(tempData?.data)
    // getModel(tempData?.data[0]?.id)
  }

  useEffect(() => {
    getMake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    formik.setFieldValue('model_id', '')
    getModel(formik.values.make_id)
  }, [formik.values.make_id])

  return (
    <div className={`w-100 ${styles['wrapper']}`}>
      <BannerDropDown
        dropDown={true}
        value="Select Make"
        dropDownData={make}
        values={formik.values}
        name="make_id"
        onChange={formik.handleChange}
        errTxt={formik.touched.make_id && formik.errors.make_id}
        handleBlur={formik.handleBlur}
      />
      <BannerDropDown
        dropDown={true}
        value="Select Model"
        dropDownData={model}
        values={formik.values}
        onChange={formik.handleChange}
        errTxt={formik.touched.model_id && formik.errors.model_id}
        name="model_id"
        disabled={!formik.values.make_id ? true : false}
        handleBlur={formik.handleBlur}
      />
      <BannerDropDown
        dropDown={false}
        value="Enter Year"
        name="year"
        onChange={formik.handleChange}
        errTxt={formik.touched.year && formik.errors.year}
        type={'number'}
        handleBlur={formik.handleBlur}
      />
      <>
        <div
          style={{
            background: '#fff',
          }}
          className={`d-flex justify-content-between align-items-center ${styles['dropDownContainer']}`}
        >
          <input
            name="value"
            className={styles['selectedTxt']}
            type={'text'}
            placeholder={'Enter Value'}
            onChange={e => {
              formik.setFieldValue('value', e.target.value.replace(/[^0-9.-]+/g, ''))
            }}
            value={formik.values.value && currencyFormat(Number(String(formik.values.value).replace(/[^0-9.-]+/g, '')))}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.value && formik.errors.value && <p className={styles['notOTPTxt']}>{formik.errors.value}</p>}
      </>
      {/* <p className={styles['notOTPTxt']}>dfdsfsd</p> */}
      <p className={`my-2 ${styles['bannerTxt']}`}>Do you have an existing Auto Insurance policy?</p>
      <div className="w-100 d-flex align-items-center justify-content-start">
        <p className={styles['bannerTxt']}>No</p>
        <Form className={styles['formstyles']}>
          <Form.Check
            onClick={() => {
              formik.setFieldValue('insurance_toggle', !formik.values.insurance_toggle)
              console.log('formik.values.insurance_toggle', formik.values.insurance_toggle)
            }}
            type="switch"
            id="custom-switch"
          />
        </Form>
        <p className={styles['bannerTxt']}>Yes</p>
      </div>
      {formik.values.insurance_toggle ? (
        <>
          <div style={{}} className={`my-3 w-100 align-items-center ${styles['webCalender']}`}>
            <p className={styles['calenderTxt']}>Date of Expiry?</p>
            <FormCalenderContainer
              calDate={formik.values.date_of_expiry}
              setCalDate={setCalDate}
              onChange={formik.handleChange}
            />
          </div>
          <div style={{}} className={`my-3 w-100 flex-column ${styles['mobCalender']}`}>
            <p className={styles['calenderTxt']}>Date of Expiry?</p>
            <div className={`d-flex w-100 position-relative ${styles['calenderInputContainer']}`}>
              <input
                onChange={e =>
                  formik.handleChange({
                    target: {
                      name: 'date_of_expiry',
                      value: e?.target?.value,
                    },
                  })
                }
                type="date"
                placeholder="DD / MM / YYYY"
                className={styles['calenderInput']}
              />
            </div>
          </div>
          {formik.touched.date_of_expiry && formik.errors.date_of_expiry && (
            <p className={styles['notOTPTxt']}>{formik.touched.date_of_expiry && formik.errors.date_of_expiry}</p>
          )}
        </>
      ) : (
        <div style={{}} className="m-2 w-100 d-flex align-items-center" />
      )}
      <FormBottomContainer
        isTermChecked={setCheck}
        termChecked={check}
        link={'#'}
        goBack={false}
        btnTxt="View Quotes"
        onClick={formik.handleSubmit}
        error={termError}
        setTermError={setTermError}
      />
    </div>
  )
}

const mapStateToProps = () => {}

const mapDispatchProps = { renewPolicy: renewPolicyRedux }

export default connect(mapStateToProps, mapDispatchProps)(BannerForm)
