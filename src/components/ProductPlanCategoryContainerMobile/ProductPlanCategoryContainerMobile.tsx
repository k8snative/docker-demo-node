import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { setInsuranceDetails } from 'src/lib/redux/auth/action'
import currencyFormat from 'src/utils/currencyFormat'
import * as Yup from 'yup'
import FormGoBack from '~components/FormGoBack/FormGoBack'
import ProPlanCatDropDown from '~components/ProPlanCatDropDown/ProPlanCatDropDown'
import SignInUpButton from '~components/SignInUpButton/SignInUpButton'

import styles from './ProductPlanCategoryContainerMobile.module.scss'

interface ProductPlanCategoryContainerMobileProps {
  plans: {
    value: object
    setValue: any
  }
  insurancePlansState: {
    insurancePlansForm: any
    setInsurancePlansForm: any
  }
  ppCompareData: any
  setPPCompareData: Function
  showMobileFilter: boolean
  setShowMobileFilter: Function
}

const ProductPlanCategoryContainerMobile = ({
  plans,
  insurancePlansState,
  ppCompareData,
  setPPCompareData,
  showMobileFilter,
  setShowMobileFilter,
}: ProductPlanCategoryContainerMobileProps) => {
  const [make, setMake] = useState([])
  const [models, setModels] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState
  const { buy_now, ...insuranceData } = useSelector(state => state?.auth?.planDetails)
  const dispatch = useDispatch()
  const getSelectedVehicleDetails = (id: any, obj: any) =>
    obj?.find((item: any) => item?.id?.toString() === id?.toString())?.option || 'Select'

  const getOptions = (arr: any) => arr.map(item => ({ option: item.name, id: item.id }))

  const getMake = async () => {
    const res = await Api('GET', `make?status=1`)
    if (res?.data) setMake(getOptions(res.data))
  }

  const getModels = (id: string) => {
    Api('GET', `model_make/${id}?status=1`).then(res => {
      if (res.success) setModels(getOptions(res.data))
    })
  }

  const formik = useFormik({
    initialValues: {
      make_id: '',
      model_id: '',
      year: '',
      value: '',
      company_ids: [],
      policy_type_ids: [],
      addon_ids: [],
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      make_id: Yup.string().required('Make is required'),
      model_id: Yup.string().required('Model is required'),
      year: Yup.string()
        .matches(/^(19|20)\d{2}$/, 'Year must be like 19xx')
        .required('Year is Required')
        .test(
          'Check when entering one year if year is greater than next year',
          `Year cannot be greater than ${new Date().getFullYear() + 1}`,
          (value: any) => (parseInt(value) > new Date().getFullYear() + 1 ? false : true),
        )
        .test(
          'Check when entering one year if first year is less than 1980',
          'First year cannot be less than 1980',
          (value: any) => (parseInt(value) < 1980 ? false : true),
        ),
      value: Yup.number().min(1, 'Positive Value').required('Required'),
    }),
    onSubmit: () => {
      handleSearch()
    },
  })

  useEffect(() => {
    getMake()
    setInsurancePlansForm(insuranceData)
  }, [])

  useEffect(() => {
    getModels(formik?.values.make_id)
  }, [formik?.values.make_id])

  const handleSearch = async () => {
    setInsurancePlansForm({ ...formik.values })
    const payload = { ...formik.values, year: formik.values.year.toString() }
    delete payload['sortOrder']
    setDisableButton(true)
    const res = await Api('POST', 'policy/filters', { ...payload, year: formik.values.year.toString() })
    if (res?.data) {
      plans.setValue({ value: insurancePlansForm.value, data: res.data })
      setModalOpen(false)
      if (ppCompareData.length) {
        const tempData = ppCompareData.map((each: any) => res.data.filter((val: any) => val?.id === each?.id)[0]) || []
        setPPCompareData(tempData.filter((each: any) => each))
      }
    }
    setDisableButton(false)
    dispatch(setInsuranceDetails(formik.values))
  }
  useEffect(() => {
    formik.setValues({ ...insurancePlansForm })
  }, [insurancePlansForm])

  const isDesktopOrMobile = useMediaQuery({
    query: '(max-width: 581px)',
  })

  return (
    <div className={`w-100 ${styles['wrapper']}`}>
      {isDesktopOrMobile && (
        <Modal className="" show={isModalOpen} centered>
          <div
            className={`w-100 d-flex flex-column px-4`}
            // style={{ border: '10px solid black' }}
          >
            <p className={`m-0 my-2 ${styles['editHeading']}`}>Edit Info</p>
            <ProPlanCatDropDown
              dropDownItems={make}
              insurancePlansForm={{
                value: formik.values,
                setValue: (values: any) => {
                  formik.setValues({
                    ...values,
                    model_id: '',
                  })
                },
              }}
              field={'make_id'}
              errTxt={formik.errors.make_id}
              resetModel={true}
            />
            <div>
              <p style={{ color: '#E91431', margin: 0 }}>{formik.errors.make_id}</p>
            </div>
            <ProPlanCatDropDown
              dropDownItems={models}
              insurancePlansForm={{ value: formik.values, setValue: formik.setValues }}
              field={'model_id'}
              errTxt={formik.errors.model_id}
            />
            <div>
              <p style={{ color: '#E91431', margin: 0 }}>{formik.errors.model_id}</p>
            </div>
            <input
              placeholder="Enter Year(2022)"
              type={'number'}
              min={1990}
              style={{
                border: formik.errors.year ? '2px solid #E91431' : '',
              }}
              className={styles['textContainer']}
              onChange={e => formik.setFieldValue('year', e.target.value)}
              value={formik.values.year}
            />
            <div>
              <p style={{ color: '#E91431', margin: 0 }}>{formik.errors.year}</p>
            </div>
            <input
              placeholder="Enter Value"
              type={'text'}
              className={styles['textContainer']}
              style={{
                border: formik.errors.value ? '2px solid #E91431' : '',
              }}
              onChange={e => formik.setFieldValue('value', e.target.value.replace(/[^0-9.-]+/g, ''))}
              value={currencyFormat(Number(String(formik.values.value).replace(/[^0-9.-]+/g, '')))}
              // value={formik.values.value}
            />
            <div>
              <p style={{ color: '#E91431', margin: 0 }}>{formik.errors.value}</p>
            </div>
            {/* <div className={`my-3 border-0 ${styles['btnContainer']}`}> */}
              <SignInUpButton btnTxt="View Quotes" link="" onClick={disableButton ? () => {} : formik.handleSubmit} />
            {/* </div> */}
            <div className="w-100 my-3 d-flex align-items-center justify-content-between">
              {/* <div
                onClick={() => {
                  formik.setValues({ ...insurancePlansForm })
                  setModalOpen(false)
                }}
              >
                Go Back
              </div> */}
              <FormGoBack
                link={''}
                onClick={() => {
                  formik.setValues({ ...insurancePlansForm })
                  setModalOpen(false)
                }}
              />
            </div>
          </div>
        </Modal>
      )}
      <div className={`w-100 d-flex align-items-center justify-content-between ${styles['rowContainer']}`}>
        <div className={`w-50 ${styles['colContainer']}`}>
          <p className={` ${styles['smalTxt']}`}>Car Make</p>
          <p className={` ${styles['bigTxt']}`}>{getSelectedVehicleDetails(insurancePlansForm?.make_id, make)}</p>
        </div>
        <div className={`w-50 ${styles['colContainer']}`}>
          <p className={` ${styles['smalTxt']}`}>Car Model</p>
          <p className={` ${styles['bigTxt']}`}>{getSelectedVehicleDetails(insurancePlansForm?.model_id, models)}</p>
        </div>
        <div className={`w-25 ${styles['colContainer']}`}>
          <div
            onClick={() => setModalOpen(true)}
            className={`d-flex align-items-center justify-content-center ${styles['btnContainer']}`}
          >
            <p className={` ${styles['btnTxt']}`}>Edit Info</p>
          </div>
        </div>
      </div>
      <div className={`w-100 d-flex align-items-center justify-content-between ${styles['rowContainer']}`}>
        <div className={`w-50 ${styles['colContainer']}`}>
          <p className={` ${styles['smalTxt']}`}>Year</p>
          <p className={` ${styles['bigTxt']}`}>{insurancePlansForm?.year}</p>
        </div>
        <div className={`w-50 ${styles['colContainer']}`}>
          <p className={` ${styles['smalTxt']}`}>Value</p>
          <p className={` ${styles['bigTxt']}`}>{currencyFormat(insurancePlansForm?.value)}</p>
        </div>
        <div className={`w-25 ${styles['colContainer']}`}>
          <div
            onClick={() => setShowMobileFilter(true)}
            className={`d-flex align-items-center justify-content-center ${styles['btnContainer']}`}
          >
            <p className={` ${styles['btnTxt']}`}>Filter</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPlanCategoryContainerMobile
