/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Api from 'src/lib/api'
import { setInsuranceDetails, updateLoader } from 'src/lib/redux/auth/action'
import * as Yup from 'yup'
import AutoCompleteDropdown from '~components/ReusuableComponent/AutoCompleteDropdown'
import SignInUpButton from '../SignInUpButton/SignInUpButton'
import styles from './ProductPlanCategoryContainer.module.scss'

const dropDownDataSort = [
  // { id: '', name: 'None', value: '' },
  { id: 'sortby=value&orderby=desc', name: 'Lowest to Highest', value: 'sortby=value&orderby=asc' },
  { id: 'sortby=value&orderby=asc', name: 'Highest to Lowest', value: 'sortby=value&orderby=desc' },
  { id: 'sortby=name&orderby=asc', name: 'A-Z', value: 'sortby=name&orderby=asc' },
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

type YearOption = {
  id: number;
  name: string;
};

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
  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState;
  const [make, setMake] = useState<MakeDataProps[]>();
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]);
  const dispatch = useDispatch()

  const handleSearch = async () => {
    dispatch(updateLoader(true));
    const sortOrdertemp = formik.values?.sortOrder ? `?${formik.values?.sortOrder}` : 'sortby=value&orderby=asc'
    const { sortOrder, ...restData } = formik.values
    setDisableButton(true)
    const res = await Api('POST', `policy/filters${sortOrdertemp}`, {
      ...restData,
      year: formik.values.year.toString(),
    })
    if (res?.data) {
      plans.setValue({ value: formik.values.value, data: res.data })
      if (ppCompareData.length) {
        const tempData = ppCompareData.map((each: any) => res.data.filter((val: any) => val?.id === each?.id)[0]) || []
        setPPCompareData(tempData.filter((each: any) => each))
      }
    }
    dispatch(updateLoader(false));
    setDisableButton(false)
    dispatch(setInsuranceDetails(formik.values))
  }

  const getYearOptions = () => {
    const startYear = new Date().getFullYear() - 15;
    const endYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = endYear; i >= startYear; i--) {
      yearOptions.push({ id: i, name: i.toString() });
    }
    setYearOptions(yearOptions);
  };

  const formik = useFormik({
    initialValues: insurancePlansForm,
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

  const getVehicles = async () => {
    const res = await Api('GET', `make?status=1`)
    if (res?.data) setVehicles(res.data)
    if (res?.data) setMake(res.data)
  }

  const getModels = () => {
    Api('GET', `model_make/${formik.values.make_id}?status=1`).then(res => {
      if (res.success) setModels(res.data)
    })
  }
  //

  useEffect(() => {
    getModels()
  }, [formik.values.make_id])

  const onLoad = () => {
    getVehicles()
  }

  useEffect(() => {
    onLoad()
    getYearOptions()
    // setInsurancePlansForm(insuranceData)
  }, [])

  useEffect(() => {
    setInsurancePlansForm(
      formik.values
    )
  }, [formik.values])

  useEffect(() => {
    // setValidateForm(formik)
  }, [formik.errors])

  return (
    <Container>
      <div className={` ${styles['wrapper']}`} style={{ borderColor: 'green' }}>
        <div className='planPage' style={{ flexDirection: 'column', width: '15%', position: 'relative' }}>
          <AutoCompleteDropdown 
            label={`Select Make`} 
            option={make}
            formikKey='make_id'
            formik={formik}
            customHeight={`10px`}
          />
        </div>
        <div className='planPage' style={{ flexDirection: 'column', width: '15%' }}>
          <AutoCompleteDropdown 
            label={`Model`} 
            option={models}
            formikKey='model_id'
            formik={formik}
            customHeight={`10px`}
          />
        </div>
        <div className='planPage' style={{ flexDirection: 'column', width: '15%' }}>
          <AutoCompleteDropdown 
            label={`Year`} 
            option={yearOptions}
            formikKey='year'
            formik={formik}
            customHeight={`10px`}
          />
        </div>
          <div style={{ flexDirection: 'column', width: '15%' }}>
              <div className={styles['form__input-group']}>
                <input
                  className={`${styles['form__input']}`}
                  name={`value`}
                  type={`text`}
                  required={true}
                  onChange={(val: any) => {
                    formik.setFieldValue('value', val.target.value)
                  }}
                  value={formik.values.value}
                  onBlur={formik.handleBlur}
                />
                <label className={styles['form__input-label']}>Value</label>
              </div>
          </div>

        <div className={styles['btnContainer']}>
          <SignInUpButton btnTxt="Search" link="" onClick={disableButton ? () => {} : formik.handleSubmit} />
        </div>
        <div className='planPage' style={{ flexDirection: 'column', width: '15%' }}>
          <AutoCompleteDropdown 
            label={`Sort order`} 
            option={dropDownDataSort}
            formikKey='sortOrder'
            formik={formik}
            extraFunc={handleSearch}
            customHeight={`10px`}
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPlanCategoryContainer
