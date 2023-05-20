/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Api from 'src/lib/api'
import { setInsuranceDetails } from 'src/lib/redux/auth/action'
import currencyFormat from 'src/utils/currencyFormat'
import * as Yup from 'yup'
import ProPlanCatDropDown from '~components/ProPlanCatDropDown/ProPlanCatDropDown'

import productPlanFilterImage from '../../../public/assets/productPlanFilterImage.png'
import SignInUpButton from '../SignInUpButton/SignInUpButton'
import styles from './ProductPlanCategoryContainer.module.scss'

const dropDownDataSort = [
  { option: 'None', value: '' },
  { option: 'Name Asc', value: 'sortby=name&orderby=asc' },
  { option: 'Name Desc', value: 'sortby=name&orderby=desc' },
  { option: 'Value Asc', value: 'sortby=value&orderby=asc' },
  { option: 'Value Desc', value: 'sortby=value&orderby=desc' },
]

interface ProductPlanCategoryContainerProps {
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
  setValidateForm: Function
}

const ProductPlanCategoryContainer = ({
  plans,
  insurancePlansState,
  ppCompareData,
  setPPCompareData,
  setValidateForm,
}: ProductPlanCategoryContainerProps) => {
  const [vehicles, setVehicles] = useState([])
  const [models, setModels] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const { buy_now, ...insuranceData } = useSelector(state => state?.auth?.planDetails)
  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState
  const dispatch = useDispatch()

  const handleSearch = async () => {
    const sortOrdertemp = insurancePlansForm?.sortOrder ? `?${insurancePlansForm?.sortOrder}` : ''
    const { sortOrder, ...restData } = insurancePlansForm
    setDisableButton(true)
    const res = await Api('POST', `policy/filters${sortOrdertemp}`, {
      ...restData,
      year: insurancePlansForm.year.toString(),
    })
    if (res?.data) {
      plans.setValue({ value: insurancePlansForm.value, data: res.data })
      if (ppCompareData.length) {
        const tempData = ppCompareData.map((each: any) => res.data.filter((val: any) => val?.id === each?.id)[0]) || []
        setPPCompareData(tempData.filter((each: any) => each))
      }
    }
    setDisableButton(false)
    dispatch(setInsuranceDetails(insurancePlansForm))
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
      sortOrder: '',
    },
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
      value: Yup.number()
        .min(1, 'Positive Value')
        .typeError('Value can only be number')
        .test('is-decimal', 'Decimal value is not allowed', (value: any) => /^[^.]*$/.test(value))
        .required('Required'),
    }),
    onSubmit: values => {
      handleSearch()
    },
  })

  useEffect(() => {
    formik.setValues({ ...insurancePlansForm })
  }, [insurancePlansForm])

  const getOptions = arr => arr.map(item => ({ option: item.name, id: item.id }))

  const getVehicles = async () => {
    const res = await Api('GET', `make?status=1`)
    if (res?.data) setVehicles(getOptions(res.data))
  }

  const getModels = () => {
    Api('GET', `model_make/${insurancePlansForm.make_id}?status=1`).then(res => {
      if (res.success) setModels(getOptions(res.data))
    })
  }
  //

  useEffect(() => {
    getModels()
  }, [insurancePlansForm.make_id])

  const onLoad = () => {
    getVehicles()
  }

  useEffect(() => {
    onLoad()
    setInsurancePlansForm(insuranceData)
  }, [])

  useEffect(() => {
    setValidateForm(formik)
  }, [formik.errors])

  return (
    <Container>
      <div className={` ${styles['wrapper']}`} style={{ borderColor: 'green' }}>
        <div style={{ flexDirection: 'column', width: '15%', position: 'relative' }}>
          <ProPlanCatDropDown
            dropDownItems={vehicles}
            insurancePlansForm={{ value: insurancePlansForm, setValue: setInsurancePlansForm }}
            field={'make_id'}
            errTxt={formik.errors.make_id}
            resetModel={true}
          />

          {formik.errors.make_id && (
            <p style={{ color: '#E91431', position: 'absolute', bottom: -13, zIndex: -2 }}>{formik.errors.make_id}</p>
          )}
        </div>
        <div style={{ flexDirection: 'column', width: '15%' }}>
          <ProPlanCatDropDown
            dropDownItems={models}
            insurancePlansForm={{ value: insurancePlansForm, setValue: setInsurancePlansForm }}
            field={'model_id'}
            errTxt={formik.errors.model_id}
          />
          {formik.errors.model_id && (
            <p style={{ color: '#E91431', position: 'absolute', bottom: -13, zIndex: -2 }}>{formik.errors.model_id}</p>
          )}
        </div>

        <div style={{ flexDirection: 'column', width: '15%' }}>
          <input
            placeholder="Enter Year(2022)"
            type={'number'}
            min={1990}
            style={{
              border: formik.errors.year ? '2px solid #E91431' : '',
            }}
            className={styles['textContainer']}
            onChange={e => setInsurancePlansForm({ ...insurancePlansForm, year: e.target.value })}
            value={insurancePlansForm.year}
          />
          {formik.errors.year && (
            <p style={{ color: '#E91431', position: 'absolute', bottom: -13 }}>{formik.errors.year}</p>
          )}
        </div>

        <div style={{ flexDirection: 'column', width: '15%' }}>
          <input
            placeholder="Enter Value"
            type={'text'}
            className={styles['textContainer']}
            style={{
              border: formik.errors.value ? '2px solid #E91431' : '',
            }}
            onChange={e =>
              setInsurancePlansForm({ ...insurancePlansForm, value: e.target.value.replace(/[^0-9.-]+/g, '') })
            }
            value={currencyFormat(Number(String(insurancePlansForm.value).replace(/[^0-9.-]+/g, '')))}
          />
          {formik.errors.value && (
            <p style={{ color: '#E91431', position: 'absolute', bottom: -13 }}>{formik.errors.value}</p>
          )}
        </div>

        <div className={styles['btnContainer']}>
          <SignInUpButton btnTxt="Search" link="" onClick={disableButton ? () => {} : formik.handleSubmit} />
        </div>
        <div className={styles['filterImgContainer']}>
          <Image alt="" src={productPlanFilterImage} />
        </div>
        <div style={{ flexDirection: 'column', width: '15%' }}>
          <ProPlanCatDropDown
            dropDownItems={dropDownDataSort}
            insurancePlansForm={{ value: insurancePlansForm, setValue: setInsurancePlansForm }}
            field={'sortOrder'}
            sort={true}
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPlanCategoryContainer
