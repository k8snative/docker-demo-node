import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import currencyFormat from 'src/utils/currencyFormat'
import DocumentsUpload from '~components/DocumentsUpload/DocumentsUpload'
import MultiStepForm from '~components/MultiStepForm/MultiStepForm'
import MultiStepFormMob from '~components/MultiStepFormMob/MultiStepFormMob'
import PaymentDetails from '~components/PaymentDetails/PaymentDetails'
import PersonalDetails from '~components/PersonalDetails/PersonalDetails'
import ReviewDetails from '~components/ReviewDetails/ReviewDetails'
import VehicleDetails from '~components/VehicleDetails/VehicleDetails'
import GoBack from '~public/assets/arrowBack.png'
import GoBackRed from '~public/assets/arrowBackred.png'
import Gradient from '~public/assets/gradient.png'
import UBL from '~public/assets/ubl.png'
import { setEditOrderInfo } from 'src/lib/redux/auth/action'
import styles from './PaymentPage.module.scss'
import { calculateAmountAfterPromotion } from 'src/lib/utils'
import UploadDocumentsMini from '~components/UploadDocumentsMini/UploadDocumentsMini'

const GoBackSection = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 430px)',
  })
  const { make_id, model_id, year, value } = useSelector(state => state?.auth?.planDetails)
  const [makeModel, setMakeModel] = useState('')
  const getModel = () => {
    if (!!model_id) {
      Api('GET', `model/${model_id}`).then(res => {
        if (res.model) {
          setMakeModel(res.model?.name)
        }
      })
    }
  }

  useEffect(() => {
    getModel()
  }, [make_id])

  useEffect(() => {
    const { order_id } = router.query
    if (order_id) {
      Api('GET', `order/${order_id}`).then(res => {
        dispatch(setEditOrderInfo(res))
        // if (res) {
        //   setMakeModel(res.model?.name)
        // }
      })
    }
  }, [])

  return (
    <div className={`${styles['goBackWrapper']} `}>
      <Container>
        <Row>
          <Col xl={4} lg={6} md={6} sm={6} xs={12} className={styles['gobackcol']}>
            <div onClick={() => router.back()}>
              {/* <Link href={{ pathname: '/productPlan' }}> */}
              <div className={styles['gobackdiv']}>
                {isDesktopOrLaptop ? (
                  <>
                    <div className={styles['gobackarrow']}>
                      <Image src={GoBack} alt="backarrow" />
                    </div>
                    <p className={`mt-3 ${styles['gobacktxt']}`}>Back to Search</p>
                  </>
                ) : (
                  <>
                    <div className={styles['gobackarrowmob']}>
                      <Image src={GoBackRed} alt="backarrow" />
                    </div>
                    <p className={`mt-3 ${styles['gobacktxt']}`}>Back to Search</p>
                  </>
                )}
              </div>
              {/* </Link> */}
            </div>
            <div className={styles['pricediv']}>
              <p className={`${styles['pricedivtxt']}`}>{makeModel} </p>
              <p className={`${styles['pricedivtxtred']}`}> | </p>
              <p className={`${styles['pricedivtxt']}`}>{year} </p>
              <p className={`${styles['pricedivtxtred']}`}> | </p>
              <p className={`${styles['pricedivtxt']}`}>PKR {currencyFormat(value)}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const HorizontalCard = ({ updatedAnnualContribution }: { updatedAnnualContribution: number }) => {
  const { annual_contribution, insurance_rate, company_logo_url,
    promotion_discount_value,
    promotion_discount_type, } = useSelector(
      state => state?.auth?.planDetails.buy_now,
    )
  const temp = useSelector(
    state => state?.auth,
  )

  const annualContribution = calculateAmountAfterPromotion(
    annual_contribution,
    promotion_discount_value,
    promotion_discount_type,
  );

  const apiOrigin = process.env['NEXT_PUBLIC_IMAGE_ORIGIN']
  return (
    <div className={`${styles['horizontalCardWrapper']} `}>
      {/* <Container className={`${styles['horizontalcardcontainer']} `} > */}
      <div className={`${styles['horizontalCard']} `}>
        <div className={`${styles['icondiv']} `}>
          <Image
            alt=""
            src={company_logo_url ? company_logo_url : UBL}
            width={'200px'}
            height={'125px'}
            objectFit={'contain'}
          />
        </div>
        <div className={`${styles['icondiv2']} `}>
          <Image src={Gradient} alt="" objectFit="contain" />
        </div>
        <div className={`${styles['backgroundimg']} `}>
          <div style={{ marginLeft: '15px' }}>
            <p className={`m-0 ${styles['cardinnertext']}`}>Contribution Rate</p>
            <p className={`m-0 ${styles['cardinnertext2']}`}>{insurance_rate}%</p>
          </div>
          {/* <div>
            <p className={`m-0 ${styles['cardinnertext']}`}>Tracker Price (PKR)</p>
            <p className={`m-0 ${styles['cardinnertext']}`}>Not requested</p>
          </div> */}
          <div>
            <p className={`m-0 ${styles['cardinnertext']}`}>Annual Contribution (PKR)</p>
            <p className={`m-0 ${styles['cardinnertext2']}`}>
              {
                (parseFloat(updatedAnnualContribution ? updatedAnnualContribution : annualContribution)) > -1
                  ? currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annualContribution)
                  : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const MobileCard = ({ updatedAnnualContribution }: { updatedAnnualContribution: number }) => {

  const { annual_contribution, insurance_rate, company_logo_url, policy_name
    , promotion_discount_value, promotion_discount_type
  } = useSelector(
    state => state?.auth?.planDetails.buy_now
  )

  const annualContribution = calculateAmountAfterPromotion(
    annual_contribution,
    promotion_discount_value,
    promotion_discount_type,
  );

  const apiOrigin = process.env['NEXT_PUBLIC_IMAGE_ORIGIN']
  return (
    <>
      <div className={` ${styles['cardWrapper']}`}>
        <div className={` ${styles['cardUpperDiv']}`}>
          <div className={` ${styles['mobcardImg']}`}>
            <Image
              alt=""
              src={company_logo_url ? company_logo_url : UBL}
              width={'100%'}
              height={'100%'}
              objectFit={'contain'}
            />
          </div>
          <p className={`m-0 ${styles['mobcardpricetxt']}`}>
            PKR {
              parseFloat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution) > -1
                ? currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution)
                : 0
            }
          </p>
        </div>
        <div className={` ${styles['cardLowerDiv']}`}>
          <p className={`m-0 ${styles['lowerdivheading']}`}>{policy_name}</p>
          <div className={`d-flex flex-row align-items-center justify-content-between`}>
            <p className={`m-0 mb-1 ${styles['mobcardtxt']}`}>Rate</p>
            <p className={`m-0  mb-1 ${styles['mobcardtxt']}`}>{insurance_rate}%</p>
          </div>
          <div className={`d-flex flex-row justify-content-between`}>
            <p className={`m-0 ${styles['mobcardtxt']}`}>Installment Plan</p>
            <p className={`m-0 ${styles['mobcardtxt']}`}>
              {
                parseFloat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution) > -1
                  ? currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution)
                  : 0
              } / month
            </p>
          </div>
        </div>
      </div>
      <div className={` ${styles['redDiv']}`} />
    </>
  )
}

const TabData = ({
  selectedTab,
  updateState,
  updatedAnnualContribution,
  setUpdatedAnnualContribution,
  cnicData
}: {
  selectedTab: number
  updateState: Function
  updatedAnnualContribution: number
  setUpdatedAnnualContribution: Function;
  cnicData:Object
}) => {
  // if (selectedTab === 0) return <DocumentsUpload currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 0) return <UploadDocumentsMini currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 1) return <PersonalDetails currentStep={selectedTab} updateState={updateState}  cnicData={cnicData}/>
  if (selectedTab === 2) return <VehicleDetails currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 3) return <ReviewDetails currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 4)
    return (
      <PaymentDetails
        link="payment/invoice"
        currentStep={selectedTab}
        updateState={updateState}
        updatedAnnualContribution={updatedAnnualContribution}
        setUpdatedAnnualContribution={setUpdatedAnnualContribution}
      />
    )

  return <></>
}

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [updatedAnnualContribution, setUpdatedAnnualContribution] = useState(0)
  const allowedTabIndex = useSelector(state => state?.auth.allowedTabIndex)
  const lockedTabIndex = useSelector(state => state?.auth.lockedTabIndex)
  const { policy_id } = useSelector(state => state?.auth?.planDetails.buy_now)
  const test = useSelector(state => state?.auth?.planDetails)
  const router = useRouter()
  const [cnicData,setCnicData]=useState({})

  useEffect(() => {
    if (policy_id === 0) {
      router.replace('/')
    }
  }, [])

  const updateState = (step: number,data:Object) => {
    console.log('OBJECT_DATA===>',data)
    setCurrentStep(step + 1)
    if(data?.values){

      setCnicData(data?.values)
    }
  }


  const mobileTabData = [
    {
      name: 'Documents Upload',
      component: <DocumentsUpload currentStep={currentStep} updateState={updateState}  />,
    },
    {
      name: 'Personal Details',
      // CanSwitch
      component: <PersonalDetails currentStep={currentStep} updateState={updateState}  cnicData={cnicData}/>,
    },
    {
      name: 'Vehicle Details',
      component: <VehicleDetails currentStep={currentStep} updateState={updateState} />,
    },
    {
      name: 'Review Details',
      component: <ReviewDetails currentStep={currentStep} updateState={updateState} />,
    },
    {
      name: 'Payment Details',
      component: (
        <PaymentDetails
          link="payment/invoice"
          currentStep={currentStep}
          updateState={updateState}
          updatedAnnualContribution={updatedAnnualContribution}
          setUpdatedAnnualContribution={setUpdatedAnnualContribution}
        />
      ),
    },
  ]
  return (
    <>
      <GoBackSection />
      <MediaQuery minWidth={500}>
        <Container>
          <HorizontalCard updatedAnnualContribution={updatedAnnualContribution} />
          <MultiStepForm
            data={mobileTabData}
            currentStep={currentStep}
            updateState={updateState}
            allowedTabIndex={allowedTabIndex}
            lockedTabIndex={lockedTabIndex}
          />
        </Container>
        <div className={` ${styles['tabDataContainer']}`}>
          <Container className={`${styles['Container']}`}>
            <TabData
              selectedTab={currentStep}
              updateState={updateState}
              updatedAnnualContribution={updatedAnnualContribution}
              setUpdatedAnnualContribution={setUpdatedAnnualContribution}
              cnicData={cnicData}
            />
          </Container>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={500}>
        <Container className={` ${styles['mobileContainer']}`}>
          <MobileCard updatedAnnualContribution={updatedAnnualContribution} />
          <MultiStepFormMob
            data={mobileTabData}
            selectedTab={currentStep}
            updateState={updateState}
            allowedTabIndex={allowedTabIndex}
            lockedTabIndex={lockedTabIndex}
          />
        </Container>
      </MediaQuery>
    </>
  )
}

export default PaymentPage
