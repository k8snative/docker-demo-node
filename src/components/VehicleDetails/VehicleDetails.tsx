import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'
import { setAllowedTab, setLockedTab, setPurchaseDetails, setVehicleDetails } from 'src/lib/redux/auth/action'
import { getFormattedDateForInput } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'
import * as Yup from 'yup'
import Dropdown from '~components/Dropdown/Dropdown'
import GradientBtn from '~components/GradientBtn/GradientBtn'
import PersonalDetailsDDInput from '~components/PersonalDetailsDDInput/PersonalDetailsDDInput'
import formRadioChecked from '~public/assets/formRadioChecked.png'
import formRadioUnchecked from '~public/assets/formRadioUnchecked.png'

import iGrey from '../../../public/assets/iGrey.png'
import styles from './VehicleDetails.module.scss'

const Label = ({ txt, disabled }: { txt: String; disabled?: boolean }) => (
  <div
    className={` d-flex align-items-center justify-content-end position-relative  ${
      disabled ? styles['inputBorderDisabled'] : styles['inputBorder']
    }`}
  >
    <p className={`m-0 ${styles['input']}`}>{txt}</p>
  </div>
)

const VehicleDetailsRight = ({ formik, renewPolicyData }: { formik: any; renewPolicyData: any }) => {
  const [showPolicyInfo, setShowPolicyInfo] = useState(false)
  const { make_id, model_id, year, value } = useSelector(state => state?.auth?.planDetails)
  const [makeModel, setMakeModel] = useState('')
  const [Model, setModel] = useState('')
  const getMake = () => {
    if (!!make_id) {
      Api('GET', `model_make/${make_id}`).then(res => {
        if (res.data) {
          setMakeModel(res.data?.[0].Make?.name)
        }
      })
    }
  }
  const getModel = () => {
    if (!!model_id) {
      Api('GET', `model/${model_id}`).then(res => {
        if (res.model) {
          setModel(res.model?.name)
        }
      })
    }
  }
  useEffect(() => {
    getMake()
    getModel()
  }, [make_id, model_id])

  return (
    <div>
      <p className={`${styles['VehicleDetailsRightheading']}`}>Vehicle Details</p>
      <MediaQuery minWidth={430}>
        <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
          <Col lg={6}>
            <Label txt={makeModel} disabled={renewPolicyData?.customer_name && true} />
          </Col>
          <Col lg={6}>
            <Label txt={Model} disabled={renewPolicyData?.customer_name && true} />
          </Col>
        </Row>
        <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
          <Col lg={6}>
            <Label txt={year} disabled={renewPolicyData?.customer_name && true} />
          </Col>
          <Col lg={6}>
            <Label txt={currencyFormat(value)} disabled={renewPolicyData?.customer_name && true} />
          </Col>
        </Row>
        <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="color"
              placeholder="Color*"
              type="text"
              options={''}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.color && formik.errors.color}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <div className={` ${styles['polictTypeContainer']}`}>
              <div
                className={` d-flex align-items-center justify-content-end position-relative
                 ${renewPolicyData?.customer_name ? styles['inputBorderDisabled'] : styles['inputBorder']}
                 `}
              >
                <input
                  name="engine_number"
                  className={styles['input']}
                  // className={` ${renewPolicyData?.customer_name ? styles['disabledInput'] : styles['input']}`}
                  type="text"
                  placeholder={'Engine Number*'}
                  required={true}
                  value={formik.values.engine_number}
                  onChange={e => {
                    if (!renewPolicyData?.customer_name) formik.handleChange(e)
                  }}
                  onBlur={formik.handleBlur}
                  disabled={renewPolicyData?.customer_name && true}
                />
                <div
                  onMouseEnter={() => setShowPolicyInfo(true)}
                  onMouseLeave={() => setShowPolicyInfo(false)}
                  onClick={() => setShowPolicyInfo(!showPolicyInfo)}
                  className={styles['iImgCont']}
                >
                  <Image alt="" src={iGrey} className={styles['greyImg']} />
                  {showPolicyInfo && (
                    <div className={styles['infoWrapper']}>
                      <div className={styles['infoContainer']}>
                        <p className={styles['infoTxt']}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                          nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                          accumsan et iusto{' '}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {formik.touched.engine_number && formik.errors.engine_number && (
              <p className={`${styles['inputError']}`}>{formik.errors.engine_number}</p>
            )}
          </Col>
        </Row>
        <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="chassis_number"
              placeholder="Chassis Number*"
              type="text"
              options={''}
              required={false}
              setShowDiv={() => {}}
              error={formik.touched.chassis_number && formik.errors.chassis_number}
              value={formik.values.chassis_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="registration_number"
              placeholder="Registration Number*"
              type="text"
              options={''}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.registration_number && formik.errors.registration_number}
              value={formik.values.registration_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={renewPolicyData?.customer_name && true}
            />
          </Col>
        </Row>
        <Row className={` ${styles['txtFieldsRow']}`}>
          <div className="d-flex align-items-center mt-3">
            <div
              onClick={() => {
                formik.setFieldValue('is_brand_new', !formik.values.is_brand_new)
              }}
              className={`d-flex align-items-center justify-content-center ${styles['radioImgContainer']}`}
            >
              <Image alt="" src={formik.values.is_brand_new ? formRadioChecked : formRadioUnchecked} />
            </div>
            <p className={`${styles['iAgreeTxt']}`}>My car is brand new and at 3s dealership.*</p>
          </div>
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <Row className={`gy-2 ${styles['txtFieldsRow']}`}>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="registration_number"
              placeholder="Registration Number*"
              type="text"
              options={''}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.registration_number && formik.errors.registration_number}
              value={formik.values.registration_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={6}>
            <div className={` ${styles['polictTypeContainer']}`}>
              <div
                className={` d-flex align-items-center justify-content-end position-relative  ${styles['inputBorder']}`}
              >
                <input
                  name="engine_number"
                  className={` ${styles['input']}`}
                  type="text"
                  placeholder={'Engine Number*'}
                  required={true}
                  value={formik.values.engine_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.touched.engine_number && formik.errors.engine_number && (
              <p className={`${styles['inputError']}`}>{formik.errors.engine_number}</p>
            )}
          </Col>
          <Col lg={6}>
            <Label txt={'Corolla'} />
          </Col>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="color"
              placeholder="Color*"
              type="text"
              options={''}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.color && formik.errors.color}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>

          <Col lg={6}>
            <Label txt={'Model'} />
          </Col>
          <Col lg={6}>
            <PersonalDetailsDDInput
              name="chassis_number"
              placeholder="Chassis Number*"
              type="text"
              options={''}
              required={false}
              setShowDiv={() => {}}
              error={formik.touched.chassis_number && formik.errors.chassis_number}
              value={formik.values.chassis_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={6}>
            <Label txt={'2018'} />
          </Col>
        </Row>

        <Row className={` ${styles['txtFieldsRow']}`}>
          <div className="d-flex align-items-center mt-3">
            <div
              onClick={() => {
                formik.setFieldValue('is_brand_new', !formik.values.is_brand_new)
              }}
              className={`d-flex align-items-center justify--center ${styles['radioImgContainer']}`}
            >
              <Image alt="" src={formik.values.is_brand_new ? formRadioChecked : formRadioUnchecked} />
            </div>
            <p className={`${styles['iAgreeTxt']}`}>My car is brand new and at 3s dealership.*</p>
          </div>
        </Row>
      </MediaQuery>
      <Row>
        <Col lg={4} className={`d-flex align-items-center  mt-3 `}>
          <p className={`m-0 ${styles['iAgreeTxt']}`}>Any modifications?*</p>
        </Col>
        <Col lg={4} className={`d-flex align-items-center  mt-3 `}>
          <Form className={styles['formstyles']}>
            <p className={` mr-2 ${styles['iAgreeTxt']}`}>No</p>
            <Form.Check
              onClick={() => {
                formik.setFieldValue('modification', !formik.values.modification)
              }}
              type="switch"
              id="custom-switch"
              required
              className={`${styles['switch']}`}
            />
            <p className={` ${styles['iAgreeTxt']}`}>Yes</p>
          </Form>
        </Col>
      </Row>
      <Row className={` ${styles['txtFieldsRow']}`}>
        <Col className={` ${!formik.values.modification ? styles['txtareadisabled'] : styles['txtareaenabled']}`}>
          <textarea
            name="description"
            maxLength={160}
            className={`w-100 ${styles['textareawordlimit']}`}
            placeholder="Description (required)"
            required={true}
            disabled={!formik.values.modification}
            onChange={e => {
              formik.handleChange(e)
            }}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          <p className={`m-0 ${styles['textareacount']}`}>{formik.values?.description?.length || 0}/160</p>
        </Col>
      </Row>
      {formik.touched.description && formik.errors.description && (
        <p className={`${styles['inputError']}`}>{formik.errors.description}</p>
      )}
    </div>
  )
}

const Survey = ({ formik }: { formik: any }) => {
  const [cities, setCities] = useState()

  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api('GET', '/city')
      setCities(
        fetchedCities.data.map((item: any) => {
          return { id: item.id, option: item.city }
        }),
      )
    }
    fetchCitiesData()
  }, [])

  return (
    <div className={`${styles['surveyContainer']}`}>
      <p className={`${styles['VehicleDetailsRightheading']}`}>Schedule a Survey</p>
      <div className={`${styles['txtFieldsRow']}`}>
        <PersonalDetailsDDInput
          name="survey_request_date"
          placeholder="Request Survey Date*"
          type="date"
          calendar={true}
          options={''}
          required={true}
          setShowDiv={() => {}}
          error={formik.touched.survey_request_date && formik.errors.survey_request_date}
          value={formik.values.survey_request_date}
          onBlur={formik.handleBlur}
          disabled={
            !(
              (formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
            )
          }
          formik={formik}
        />
      </div>
      <div className={`${styles['txtFieldsRow']}`}>
        <PersonalDetailsDDInput
          name="survey_request_time"
          placeholder="Request Survey Time*"
          type="text"
          timePicker={true}
          options={''}
          required={true}
          setShowDiv={() => {}}
          error={formik.touched.survey_request_time && formik.errors.survey_request_time}
          value={formik.values.survey_request_time}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? false
              : true
          }
        />
      </div>
      <div className={` p-0 ${styles['txtFieldsRow']}`}>
        <Dropdown
          name="city_id"
          label="City"
          options={cities}
          error={formik.touched.city_id && formik.errors.city_id}
          value={formik.values.city_id}
          onBlur={formik.handleBlur}
          formik={formik}
          type={'object'}
          disabled={
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? false
              : true
          }
        />
      </div>
      <div>
        <textarea
          name="survey_address"
          className={`w-100 ${styles['textarea2']} ${
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? ''
              : styles['disabled']
          }`}
          placeholder="Survey Address*"
          required={true}
          onChange={formik.handleChange}
          value={formik.values.survey_address}
          onBlur={formik.handleBlur}
          disabled={
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? false
              : true
          }
        />
        {formik.touched.survey_address && formik.errors.survey_address && (
          <p className={`${styles['inputError']}`}>{formik.errors.survey_address}</p>
        )}
      </div>
      <div>
        <textarea
          name="survey_instructions"
          className={`w-100 ${styles['textarea']} ${
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? ''
              : styles['disabled']
          }`}
          placeholder="Special Instructions"
          onChange={formik.handleChange}
          value={formik.values.survey_instructions}
          onBlur={formik.handleBlur}
          disabled={
            (formik.values.is_brand_new === true && formik.values.modification === true) ||
            formik.values.is_brand_new === false
              ? false
              : true
          }
        />
        {formik.touched.survey_instructions && formik.errors.survey_instructions && (
          <p className={`${styles['inputError']}`}>{formik.errors.survey_instructions}</p>
        )}
      </div>
    </div>
  )
}

const VehicleDetails = ({
  currentStep,
  updateState,
  renewPolicyData,
}: {
  renewPolicyData: any
  currentStep: number
  updateState: Function
}) => {
  const data = useSelector(state => state?.auth?.data)
  const purchaseDetails = useSelector(state => state?.auth?.purchaseDetails)
  const allowedTabIndex = useSelector(state => state?.auth?.allowedTabIndex)
  const { make_id, model_id, year, value } = useSelector(state => state?.auth?.planDetails)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const initialValues = {
    is_brand_new: false,
    modification: false,
    color: '',
    engine_number: '',
    chassis_number: '',
    registration_number: '',
    survey_request_date: '',
    survey_request_time: '',
    city_id: '',
    survey_address: '',
    survey_instructions: '',
    description: '',
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      is_brand_new: Yup.boolean(),
      modification: Yup.boolean(),
      color: Yup.string().required('Color is required.'),
      engine_number: Yup.string().required('Engine Number is required.'),
      chassis_number: Yup.string().required('Chassis Number is required.'),
      registration_number: Yup.string().required('Registration Number is required.'),
      survey_request_date: Yup.string().when(['is_brand_new', 'modification'], {
        is: (is_brand_new: any, modification: any) =>
          (is_brand_new === true && modification === true) || is_brand_new === false,
        then: Yup.string()
          .typeError('Survey date is required.')
          // .test({
          //   name: 'isIssueDateBeforeTodayDate',
          //   exclusive: false,
          //   params: {},
          //   message: 'Past date is not allowed as Survey Date',
          //   test(date: any) {
          //     if (date) return new Date() < new Date(date) || new Date()?.getDate() === new Date(date)?.getDate()
          //     return false
          //   },
          // })
          .required('Survey date is required.')
          .test({
            name: 'isIssueDateBeforeTodayDate',
            exclusive: false,
            params: {},
            message: 'Survey date cannot be smaller than todays date',
            test(value2: any) {
              return new Date() < new Date(value2)
            },
          }),
        otherwise: Yup.string().typeError('Please enter valid date'),
      }),
      survey_request_time: Yup.string().when(['is_brand_new', 'modification'], {
        is: (is_brand_new: any, modification: any) =>
          (is_brand_new === true && modification === true) || is_brand_new === false,
        then: Yup.string().required('Survey Time is required.'),
        otherwise: Yup.string(),
      }),
      city_id: Yup.number().when(['is_brand_new', 'modification'], {
        is: (is_brand_new: any, modification: any) =>
          (is_brand_new === true && modification === true) || is_brand_new === false,
        then: Yup.number().required('City is required.'),
        otherwise: Yup.number(),
      }),
      survey_address: Yup.string().when(['is_brand_new', 'modification'], {
        is: (is_brand_new: any, modification: any) =>
          (is_brand_new === true && modification === true) || is_brand_new === false,
        then: Yup.string().required('Survey Address is required.'),
        otherwise: Yup.string(),
      }),
      survey_instructions: Yup.string(),
      description: Yup.string().when('modification', {
        is: true,
        then: Yup.string().required('Description is required.'),
      }),
    }),
    onSubmit: async values => {
      const apiPayload = {
        order_detail_id: purchaseDetails.details.order_detail_id,
        make_id: make_id,
        model_id: model_id,
        year: year,
        value: value,
        is_brand_new: values.is_brand_new,
        modification: values.modification,
        color: values.color,
        engine_number: values.engine_number,
        chassis_number: values.chassis_number,
        registration_number: values.registration_number,
        ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
        formik.values.is_brand_new === false
          ? { survey_request_date: values.survey_request_date }
          : { survey_request_date: null }),
        ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
        formik.values.is_brand_new === false
          ? { survey_request_time: values.survey_request_time }
          : { survey_request_time: null }),
        ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
        formik.values.is_brand_new === false
          ? { city_id: values.city_id }
          : { city_id: null }),
        ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
        formik.values.is_brand_new === false
          ? { survey_address: values.survey_address }
          : { survey_address: null }),
        ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
        (formik.values.is_brand_new === false && values.survey_instructions?.length !== 0)
          ? { survey_instructions: values.survey_instructions }
          : { survey_instructions: null }),
        ...(values.modification && { description: values.description }),
      }

      setIsLoading(true)
      Api('PUT', `order/update/vehicle_details`, apiPayload)
        .then(res => {
          if (res?.success) {
            setIsLoading(false)
            const reduxPayload = {
              make_id: make_id,
              model_id: model_id,
              year: year,
              value: value,
              is_brand_new: values.is_brand_new,
              modification: values.modification,
              color: values.color,
              engine_number: values.engine_number,
              chassis_number: values.chassis_number,
              registration_number: values.registration_number,
              ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
                ? { survey_request_date: values.survey_request_date }
                : {}),
              ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
                ? { survey_request_time: values.survey_request_time }
                : {}),
              ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
                ? { city_id: values.city_id }
                : {}),
              ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
                ? { survey_address: values.survey_address }
                : {}),
              ...((formik.values.is_brand_new === true && formik.values.modification === true) ||
              formik.values.is_brand_new === false
                ? { survey_instructions: values.survey_instructions }
                : {}),
              ...(values.modification && { description: values.description }),
            }
            dispatch(setVehicleDetails(reduxPayload))
            if (allowedTabIndex <= 2) {
              dispatch(setAllowedTab(2))
              dispatch(setLockedTab(-1))
            }
            updateState(currentStep)
            return
          }
          setIsLoading(false)
        })
        .catch(e => {
          setIsLoading(false)
          console.log(e)
        })
    },
  })

  useEffect(() => {
    const { make_id, model_id, year, value, ...restData } = purchaseDetails.vehicleDetails
    if (purchaseDetails.vehicleDetails.registration_number.length !== 0) formik.setValues({ ...restData })
    else if (renewPolicyData?.customer_name) {
      formik.setValues({
        ...formik?.values,
        ...restData,
        ...renewPolicyData,
      })
    }
  }, [purchaseDetails])

  useEffect(() => {
    if (purchaseDetails.vehicleDetails.registration_number.length !== 0) {
      const formikData = JSON.stringify(formik.values)
      const { make_id, model_id, year, value, ...restData } = purchaseDetails.vehicleDetails
      const reduxData = JSON.stringify(restData)

      if (formikData !== reduxData) {
        // Lock current tab if changes are made
        dispatch(setLockedTab(1))
        return
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1))
    }
  }, [formik.values])

  return (
    <Container className={`${styles['maincontainer']}`}>
      <Row>
        <Col lg={7}>
          <VehicleDetailsRight formik={formik} renewPolicyData={renewPolicyData} />
        </Col>
        <Col lg={5}>
          <Survey formik={formik} />
        </Col>
      </Row>
      <Row className={`d-flex align-items-center`}>
        <p className={` ${styles['loremtxt']}`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet{' '}
        </p>
      </Row>
      <div className={`mt-3 ${styles['submitButton']}`}>
        <GradientBtn disabled={isLoading} loading={isLoading} onClick={formik.handleSubmit} label="Save and continue" />
      </div>
    </Container>
  )
}
const mapStateToProps = (state: any) => ({ renewPolicyData: state.auth.renewPolicyData })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(VehicleDetails)
