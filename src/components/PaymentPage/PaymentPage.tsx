import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { clearPurchaseInfo } from 'src/lib/redux/auth/action'
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
import UBLInsurer from '~public/assets/ublInsurer.png'

import styles from './PaymentPage.module.scss'

const GoBackSection = () => {
  const router = useRouter()
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
                    <p className={`mt-3 ${styles['gobacktxt']}`}>Go Back</p>
                  </>
                ) : (
                  <>
                    <div className={styles['gobackarrowmob']}>
                      <Image src={GoBackRed} alt="backarrow" />
                    </div>
                    <p className={`mt-3 ${styles['gobacktxt']}`}>Back to Policy</p>
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
  const { annual_contribution, insurance_rate, company_logo_url } = useSelector(
    state => state?.auth?.planDetails.buy_now,
  )

  const apiOrigin = process.env['NEXT_PUBLIC_IMAGE_ORIGIN']
  return (
    <div className={`${styles['horizontalCardWrapper']} `}>
      {/* <Container className={`${styles['horizontalcardcontainer']} `} > */}
      <div className={`${styles['horizontalCard']} `}>
        <div className={`${styles['icondiv']} `}>
          <Image
            alt=""
            src={company_logo_url ? apiOrigin + company_logo_url : UBL}
            width={'100%'}
            height={'100%'}
            objectFit={'contain'}
          />
        </div>
        <div className={`${styles['icondiv2']} `}>
          <Image src={Gradient} alt="" objectFit="contain" />
        </div>
        <div className={`${styles['backgroundimg']} `}>
          <div style={{ marginLeft: '15px' }}>
            <p className={`m-0 ${styles['cardinnertext']}`}>Premium Rate</p>
            <p className={`m-0 ${styles['cardinnertext']}`}>{insurance_rate}%</p>
          </div>
          <div>
            <p className={`m-0 ${styles['cardinnertext']}`}>Tracker Price (PKR)</p>
            <p className={`m-0 ${styles['cardinnertext']}`}>Not requested</p>
          </div>
          <div>
            <p className={`m-0 ${styles['cardinnertext']}`}>Annual Premium (PKR)</p>
            <p className={`m-0 ${styles['cardinnertext2']}`}>
              {currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const MobileCard = ({ updatedAnnualContribution }: { updatedAnnualContribution: number }) => {
  const { annual_contribution, insurance_rate, company_logo_url, policy_name } = useSelector(
    state => state?.auth?.planDetails.buy_now,
  )
  const apiOrigin = process.env['NEXT_PUBLIC_IMAGE_ORIGIN']
  return (
    <>
      <div className={` ${styles['cardWrapper']}`}>
        <div className={` ${styles['cardUpperDiv']}`}>
          <div className={` ${styles['mobcardImg']}`}>
            <Image
              alt=""
              src={company_logo_url ? apiOrigin + company_logo_url : UBL}
              width={'100%'}
              height={'100%'}
              objectFit={'contain'}
            />
          </div>
          <p className={`m-0 ${styles['mobcardpricetxt']}`}>
            PKR{currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution)}
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
              {currencyFormat(updatedAnnualContribution ? updatedAnnualContribution : annual_contribution)} / month
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
}: {
  selectedTab: number
  updateState: Function
  updatedAnnualContribution: number
  setUpdatedAnnualContribution: Function
}) => {
  if (selectedTab === 0) return <PersonalDetails currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 1) return <VehicleDetails currentStep={selectedTab} updateState={updateState} />
  if (selectedTab === 2) return <DocumentsUpload currentStep={selectedTab} updateState={updateState} />
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
  const router = useRouter()

  useEffect(() => {
    if (policy_id === 0) {
      router.replace('products/health')
    }
  }, [])

  const updateState = (step: number) => {
    setCurrentStep(step + 1)
  }

  const mobileTabData = [
    {
      name: 'Personal Details',
      // CanSwitch
      component: <PersonalDetails currentStep={currentStep} updateState={updateState} />,
    },
    {
      name: 'Vehicle Details',
      component: <VehicleDetails currentStep={currentStep} updateState={updateState} />,
    },
    {
      name: 'Documents Upload',
      component: <DocumentsUpload currentStep={currentStep} updateState={updateState} />,
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
