import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import {
  clearBuyNow,
  clearFilters,
  clearPurchaseInfo,
  renewPolicy as renewPolicyRedux,
  setAllowedTab,
  setPaymentDetails,
} from 'src/lib/redux/auth/action'
import { calculateAmountAfterPromotion, calculateDiscountAmount } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'
import * as Yup from 'yup'
import Dropdown from '~components/Dropdown/Dropdown'
import GradientBtn from '~components/GradientBtn/GradientBtn'
import PersonalDetails from '~components/PersonalDetails/PersonalDetails'
import RadioButton2 from '~components/RadioButton2/RadioButton2'
import Tick from '~public/assets/tickDropDown.png'

import styles from './PaymentDetails.module.scss'

const paymentMode = [
  {
    tabName: 'Cash / Cheque',
    tabValue: 'cash',
  },
  {
    tabName: 'Online payment',
    tabValue: 'online',
  },
  {
    tabName: 'IBFT',
    tabValue: 'ibft',
  },
]

const PaymentDetailsSection = ({
  hasVoucher,
  setHasVoucher,
  formik,
  couponFormik,
  couponInitialValues,
  couponValidated,
  setCouponValidated,
  couponAmount,
  setCouponAmount,
  couponType,
  setCouponType,
  discountedValue,
  setDiscountedValue,
  setCouponInfo,
  setUpdatedAnnualContribution,
}: {
  hasVoucher: boolean
  setHasVoucher: Function
  formik: any
  couponFormik: any
  couponInitialValues: any
  couponValidated: boolean
  setCouponValidated: Function
  couponAmount: number
  setCouponAmount: Function
  couponType: string
  setCouponType: Function
  discountedValue: number
  setDiscountedValue: Function
  setCouponInfo: Function
  setUpdatedAnnualContribution: Function
}) => (
  <div id="VoucherContainer" className={`${styles['voucherwrapper']}`}>
    <p className={`${styles['paymentheading']}`}>Payment Details</p>
    <div className={`${styles['paymentdetailswrapper']}`}>
      <Row className={`${styles['txtFieldsRow']}`}>
        <Col xl={4} lg={5} md={4} className={`d-flex align-items-center  mt-3 `}>
          <Form className={styles['formstyles']}>
            <Form.Check
              onClick={() => {
                if (hasVoucher) {
                  couponFormik.setFieldError('coupon_code', undefined)
                  couponFormik.setValues(couponInitialValues)
                  setCouponValidated(false)
                  setCouponType('')
                  setCouponAmount(0)
                  setDiscountedValue(0)
                  setCouponInfo(null)
                  setUpdatedAnnualContribution(0)
                }
                setHasVoucher(!hasVoucher)
              }}
              type="switch"
              id="custom-switch"
              required
            />
          </Form>
          <p className={`m-0 ${styles['iAgreeTxt']}`}>I have a voucher</p>
        </Col>
      </Row>
      <Row className={`gy-2 ${styles['txtFieldsRow']}`}>
        <Col lg={6}>
          <div className={` d-flex align-items-center justify-content-end position-relative  ${styles['inputBorder']}`}>
            <input
              className={` ${styles['input']}`}
              placeholder="Enter Voucher Code"
              name="coupon_code"
              disabled={!hasVoucher}
              value={couponFormik.values.coupon_code}
              onChange={(e: any) => {
                setCouponValidated(false)
                setCouponType('')
                setCouponAmount(0)
                setDiscountedValue(0)
                setCouponInfo(null)
                couponFormik.handleChange(e)
              }}
              onBlur={couponFormik.handleSubmit}
            />
            {couponValidated && (
              <div className={`${styles['imgcontainer']}`}>
                <Image src={Tick} alt="tick" />
              </div>
            )}
          </div>
          {couponFormik.errors.coupon_code && (
            <p className={` ${styles['error']}`}>{couponFormik.errors.coupon_code}</p>
          )}
        </Col>
      </Row>

      {hasVoucher && couponValidated && (
        <Row>
          <Col lg={6}>
            <p className={`m-0 ${styles['iAgreeTxt']}`}>
              Voucher code applied - {couponType === 'percentage' ? `${couponAmount}%` : `PKR ${couponAmount}`}
            </p>
          </Col>
          <Col lg={6}>
            <div className={` ${styles['pricedivRight']}`}>
              <p className={`m-0 ${styles['pricetext']}`}>PKR {currencyFormat(discountedValue?.toFixed(2))}</p>
              <p
                onClick={() => {
                  couponFormik.setValues(couponInitialValues)
                  setCouponValidated(false)
                  setCouponType('')
                  setCouponAmount(0)
                  setDiscountedValue(0)
                  setCouponInfo(null)
                  setUpdatedAnnualContribution(0)
                }}
                className={` ${styles['removetxt']}`}
              >
                Remove
              </p>
            </div>
          </Col>
        </Row>
      )}
    </div>
  </div>
)

const Cash = ({ formik }: { formik: any }) => {
  const [cities, setCities] = useState()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 430px)',
  })

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
    <div className={`${styles['cashwrapper']}`}>
      <div>
        <p>Pick Up</p>
      </div>
      {isDesktopOrLaptop ? (
        <>
          <div className={`d-flex align-items-center ${styles['inputBorder2']}`}>
            <input
              name="pickup"
              className={` ${styles['input']}`}
              placeholder="Same as Billing Address"
              value={formik.values.pickup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.pickup && formik.errors.pickup && (
            <p className={`${styles['inputError']}`}>{formik.errors.pickup}</p>
          )}
        </>
      ) : (
        <>
          <textarea
            name="pickup"
            className={`${styles['cashtextarea']}`}
            placeholder="Same as Billing Address"
            value={formik.values.pickup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pickup && formik.errors.pickup && (
            <p className={`${styles['inputError']}`}>{formik.errors.pickup}</p>
          )}
        </>
      )}

      <div className={`mt-3 mb-4 ${styles['dropdowndiv']}`}>
        <Dropdown
          name="city_id"
          label="City"
          options={cities}
          error={formik.touched.city_id && formik.errors.city_id}
          value={formik.values.city_id}
          onBlur={formik.handleBlur}
          formik={formik}
          type={'object'}
        />
      </div>
    </div>
  )
}

const OnlinePayment = () => (
  <div className={`${styles['cashwrapper']}`}>
    <h5>OnlinePayment</h5>
  </div>
)

const IBFT = () => (
  <div className={`${styles['ibftwrapper']}`}>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles['ibftxt']}`}>Account title:</p>
          <p className={`m-0 ${styles['ibftxt']}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles['ibftxt']}`}>IBAN No.:</p>
          <p className={`m-0 ${styles['ibftxt']}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles['ibftxt']}`}>Account No:</p>
          <p className={`m-0 ${styles['ibftxt']}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles['ibftxt']}`}>Account title:</p>
          <p className={`m-0 ${styles['ibftxt']}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-row`}>
          <p className={`m-0 ${styles['ibftxt']}`}>IBAN No.:</p>
          <p className={`m-0 ${styles['ibftxt']}`}>Lopremisklnajkcb</p>
        </div>
      </Col>
    </Row>
  </div>
)

const HowToPay = ({ formik }: { formik: any }) => {
  // const [activeTab, setActiveTab] = useState(0)
  return (
    <div className={`${styles['HowtoPayWrapper']}`}>
      <p className={`${styles['paymentheading']}`}>How would you like to pay?</p>
      <div className={`w-50 pb-1 d-flex flex-row justify-content-between`}>
        {paymentMode?.map((tab, index) => (
          <div
            key={index}
            className={`${styles['tabs']}`}
            onClick={() => formik.setFieldValue('selectedPaymentMode', tab.tabValue)}
          >
            <p
              className={`${
                styles[formik.values.selectedPaymentMode === tab.tabValue ? 'tabTxtActive' : 'tabTxtInactive']
              }`}
            >
              {tab.tabName}
            </p>
          </div>
        ))}
      </div>
      {formik.values.selectedPaymentMode === 'cash' && <Cash formik={formik} />}
      {formik.values.selectedPaymentMode === 'online' && <OnlinePayment />}
      {formik.values.selectedPaymentMode === 'ibft' && <IBFT />}
    </div>
  )
}

const LoremText = () => (
  <div className={`d-flex flex-column mt-3`}>
    <p className={`m-0 ${styles['loremtxt']}`}>*You have 7 days to make payment after buying a policy</p>
    <p className={`mt-2 ${styles['loremtxt']}`}>* You can drop your payment at XYZ </p>
  </div>
)

const HowToPayMob = ({ formik }: { formik: any }) => (
  <div className={`m-0 ${styles['radiobtns']}`}>
    <RadioButton2
      isChecked={formik.values.selectedPaymentMode === 'cash'}
      handleChange={() => {
        formik.setFieldValue('selectedPaymentMode', 'cash')
      }}
      label="Cash/Cheque"
    />
    {formik.values.selectedPaymentMode === 'cash' && <Cash formik={formik} />}
    <RadioButton2
      isChecked={formik.values.selectedPaymentMode === 'online'}
      handleChange={() => {
        formik.setFieldValue('selectedPaymentMode', 'online')
      }}
      label="Online Payment"
    />
    {formik.values.selectedPaymentMode === 'online' && <OnlinePayment />}
    <RadioButton2
      isChecked={formik.values.selectedPaymentMode === 'ibft'}
      handleChange={() => {
        formik.setFieldValue('selectedPaymentMode', 'ibft')
      }}
      label="IBFT"
    />
    {formik.values.selectedPaymentMode === 'ibft' && <IBFT />}
  </div>
)

const PaymentDetails = ({
  currentStep,
  updateState,
  link,
  updatedAnnualContribution,
  setUpdatedAnnualContribution,
}: {
  currentStep: number
  updateState: Function
  link: string
  updatedAnnualContribution: number
  setUpdatedAnnualContribution: Function
}) => {
  const [paymentData, setPaymentData] = useState({})
  const data = useSelector(state => state?.auth?.data)
  const purchaseDetails = useSelector(state => state?.auth?.purchaseDetails)
  const order_id = useSelector(state => state?.auth?.purchaseDetails.order_id)
  const buyNow = useSelector(state => state?.auth?.planDetails.buy_now)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasVoucher, setHasVoucher] = useState(false)
  const [couponValidated, setCouponValidated] = useState(false)
  const [couponAmount, setCouponAmount] = useState(0)
  const [couponType, setCouponType] = useState('')
  const [discountedValue, setDiscountedValue] = useState(0)
  const [couponInfo, setCouponInfo] = useState<{
    coupon_id: number
    coupon_discount_type: string
    coupon_discount_value: number
    total_discount_value: number
  } | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()

  const couponInitialValues = {
    coupon_code: '',
  }

  const couponFormik = useFormik({
    initialValues: couponInitialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      coupon_code: Yup.string().when('hasVoucher', {
        is: true,
        then: Yup.string().required(),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: async values => {
      if (values.coupon_code.length > 0) {
        const payload = {
          customer_id: data.user.id,
          coupon_code: values.coupon_code,
          policy_id: purchaseDetails.details.policy_id,
          make_id: purchaseDetails.vehicleDetails.make_id,
          model_id: purchaseDetails.vehicleDetails.model_id,
          year: purchaseDetails.vehicleDetails.year,
          annual_contribution: buyNow.annual_contribution,
        }

        Api('POST', 'verify-coupon', payload).then((response: any) => {
          if (response.success) {
            setCouponValidated(true)
            setCouponInfo({
              coupon_id: response.data.coupon_id,
              coupon_discount_type: response.data.coupon_discount_type,
              coupon_discount_value: response.data.coupon_discount_value,
              total_discount_value:
                (purchaseDetails.total_discount_value ? purchaseDetails.total_discount_value : 0) +
                calculateDiscountAmount(
                  buyNow.annual_contribution,
                  response.data.coupon_discount_value,
                  response.data.coupon_discount_type,
                ),
            })
            setCouponType(response.data.coupon_discount_type)
            setCouponAmount(response.data.coupon_discount_value)
            setDiscountedValue(
              calculateAmountAfterPromotion(
                buyNow.annual_contribution,
                response.data.coupon_discount_value,
                response.data.coupon_discount_type,
              ),
            )
            setUpdatedAnnualContribution(
              calculateAmountAfterPromotion(
                buyNow.annual_contribution,
                response.data.coupon_discount_value,
                response.data.coupon_discount_type,
              ),
            )
          } else {
            couponFormik.setFieldError('coupon_code', response.message)
          }
        })
      }
    },
  })

  const initialValues = {
    pickup: '',
    city_id: '',
    selectedPaymentMode: 'cash',
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      selectedPaymentMode: Yup.string(),
      pickup: Yup.string().when('selectedPaymentMode', {
        is: (selectedPaymentMode: any) => selectedPaymentMode === 'cash',
        then: Yup.string().required('Pickup is required.'),
        otherwise: Yup.string(),
      }),
      city_id: Yup.number().when('selectedPaymentMode', {
        is: (selectedPaymentMode: any) => selectedPaymentMode === 'cash',
        then: Yup.number().required('City is required.'),
        otherwise: Yup.number(),
      }),
    }),
    onSubmit: async values => {
      if (hasVoucher && couponFormik.values.coupon_code.length === 0) {
        couponFormik.setFieldError('coupon_code', 'Coupon Is Required')
      } else if (couponFormik.errors.coupon_code?.length === 0 || couponFormik.errors.coupon_code === undefined) {
        const apiPayload = {
          order_id: order_id,
          payment_mode: values.selectedPaymentMode,
          payment_status: 'pending',
          ...(hasVoucher && couponInfo !== null && { coupon_id: couponInfo.coupon_id }),
          ...(hasVoucher && couponInfo !== null && { coupon_discount_type: couponInfo.coupon_discount_type }),
          ...(hasVoucher && couponInfo !== null && { coupon_discount_value: couponInfo.coupon_discount_value }),
          ...(hasVoucher && couponInfo !== null && { total_discount_value: couponInfo.total_discount_value }),
          ...(hasVoucher &&
            couponInfo !== null && {
              details: {
                id: purchaseDetails.details.order_detail_id,
                total_price: discountedValue,
              },
            }),
          payment: {
            order_id: order_id,
            ...(values.selectedPaymentMode === 'cash' && { pickup: values.pickup }),
            ...(values.selectedPaymentMode === 'cash' && { city_id: values.city_id }),
          },
        }

        setIsLoading(true)
        Api('PUT', 'order/update/payment', apiPayload)
          .then(res => {
            if (res?.success) {
              setIsLoading(false)
              dispatch(clearFilters())
              dispatch(clearBuyNow())
              dispatch(clearPurchaseInfo())
              router.replace({
                pathname: '/payment/invoice/' + order_id,
              })
              dispatch(renewPolicyRedux({}))
              return
            }
            setIsLoading(false)
          })
          .catch(e => {
            setIsLoading(false)
            console.log('Error: ', e)
          })
      }
    },
  })

  return (
    <Container className={`${styles['maincontainer']}`}>
      <MediaQuery minWidth={320}>
        <PaymentDetailsSection
          hasVoucher={hasVoucher}
          setHasVoucher={setHasVoucher}
          formik={formik}
          couponFormik={couponFormik}
          couponInitialValues={couponInitialValues}
          couponValidated={couponValidated}
          setCouponValidated={setCouponValidated}
          couponAmount={couponAmount}
          setCouponAmount={setCouponAmount}
          couponType={couponType}
          setCouponType={setCouponType}
          discountedValue={discountedValue}
          setDiscountedValue={setDiscountedValue}
          setCouponInfo={setCouponInfo}
          setUpdatedAnnualContribution={setUpdatedAnnualContribution}
        />
        <HowToPay formik={formik} />
        <LoremText />
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <HowToPayMob formik={formik} />
      </MediaQuery>
      <div className={`mt-3 ${styles['submitButton']}`}>
        <GradientBtn
          disabled={isLoading}
          loading={isLoading}
          link=""
          onClick={formik.handleSubmit}
          label="Save and continue"
        />
      </div>
    </Container>
  )
}

const mapStateToProps = () => {}

const mapDispatchProps = { renewPolicy: renewPolicyRedux }

export default connect(mapStateToProps, mapDispatchProps)(PaymentDetails)
