import { useFormik } from 'formik'
import Image from 'next/image'
import Boy from 'public/assets/boy.png'
import { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { isValidPhoneNumber } from 'react-phone-number-input'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'
import * as Yup from 'yup'
import GradientBtn from '~components/GradientBtn/GradientBtn'

import dropDownIconRed from '../../../public/assets/dropDownIconRed.png'
import FileClaim1 from '../../../public/assets/fileclaim.png'
import formRadioChecked from '../../../public/assets/formRadioChecked.png'
import formRadioUnchecked from '../../../public/assets/formRadioUnchecked.png'
import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import uparrow from '../../../public/assets/uparrow.png'
import DiscountFormInput from '../DiscountFormInput/DiscountFormInput'
import styles from './ContactUsPage.module.scss'

const nameOptions = [{ option: 'Mr.' }, { option: 'Mrs.' }, { option: 'Ms.' }]
const phoneOptions = [{ option: '+92' }, { option: '+923' }, { option: '+924' }]

const UpperDiv = () => (
  <div className={`${styles['wrapper1']}`}>
    <Container className={`${styles['container1']}`}>
      <Col xs={12} sm={8} md={8}>
        <div className={`${styles['textdiv']}`}>
          <p className={`m-0`}>
            <span className={`${styles['heading']}`}>Compare and Get </span>
            <span className={` ${styles['headinginred']}`}>Best Car Takaful Deals in Pakistan</span>
          </p>
          <p className={` ${styles['subheading']}`}>
            Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects
            you{' '}
          </p>
        </div>
      </Col>
      <Col xs={12} sm={4} md={4} className={` ${styles['imagecol']}`}>
        <Image src={Boy} alt="" />
      </Col>
    </Container>
  </div>
)

type AllCardProps = {
  heading: string
  number: string
  email: string
}

const ContactCards = ({ heading, number, email }: AllCardProps) => (
  <Col xs={12} sm={12} md={4} lg={4} xl={4} className={`${styles['cardWrapper']}`}>
    <div className={`${styles['card']}`}>
      <div className={`${styles['body']}`}>
        <p className={`m-0 ${styles['heading2']}`}>{heading}</p>
        <p className={`m-0 ${styles['number']}`}>{number}</p>
        <p className={`m-0 ${styles['email']}`}>{email}</p>
      </div>
    </div>
  </Col>
)
const Cards = () => (
  <div className={`${styles['wrapper2']}`}>
    <Container className={`${styles['container2']}`}>
      <Row className={`d-flex align-items-center justify-content-end${styles['row']}`}>
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="1800-258-5956" email="hello@takafulbazaar.com.pk" />
      </Row>
    </Container>
  </div>
)

const LocateUs = () => (
  <div className={`${styles['wrapper5']}`}>
    <Container className={`${styles['locateuscontainer']}`}>
      <Row className={`${styles['row']}`}>
        <Col sm={5} md={7} lg={7} className={`${styles['locateuscol1']}`}>
          <iframe
            className="gmap_iframe"
            width="100%"
            height="450"
            frameBorder="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=620&amp;height=480&amp;hl=en&amp;q= 15th floor, Emerald Tower, 2 Talwar Clifton, Karachi.&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </Col>
        <Col sm={7} md={5} lg={5} className={`${styles['locateuscol2']}`}>
          <div className={`${styles['locateustxt']}`}>
            <div className={`${styles['firstdiv']}`}>
              <p className={`m-0 ${styles['redtxt']}`}>Email:</p>
              <p className={`${styles['greytxt']}`}>hello@takafulbazaar.com.pk</p>
            </div>
            <div className={`${styles['seconddiv']}`}>
              <div className={`${styles['subdiv']}`}>
                <p className={` ${styles['redtxt']}`}>Call or SMS:</p>
                <p className={`m-0 ${styles['greytxt']}`}>1800-258-5969</p>
                <p className={` ${styles['greytxt']}`}>SMS to 8882</p>
              </div>
              <div className={styles['separator']} />
              <div className={`${styles['subdiv']}`}>
                <p className={` m-0 ${styles['redtxt']}`}>UAN:</p>
                <br />
                <p className={` m-0 ${styles['greytxt']}`}>111- 832 - 682</p>
                <p className={` ${styles['redtxt2']}`}>1 1 1 - T e a m T B </p>
              </div>
            </div>
            <div className={`${styles['firstdiv']}`}>
              <p className={`m-0 ${styles['redtxt']}`}>Address:</p>
              <p className={`${styles['greytxt']}`}>
                Office # 1503, 15th floor, Emerald Tower, 2 Talwar Clifton, Karachi.{' '}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)

const ReachOut = () => {
  const [termChecked, setTermChecked] = useState(false)
  const [showDiv, setShowDiv] = useState('')
  const [termError, setTermError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRadioChange = (e: any) => formik.setFieldValue('type', e.target.value)

  const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const PhoneNumberRegex = /^\d{3}-{0,1}\d{7}$|^\d{10}$|^\d{4}-\d{7}$/

  const initialValues = {
    name: '',
    namePrefix: 'Mr.',
    contact: '',
    contactPrefix: '+92',
    email: '',
    type: 'sales_enquiry',
    description: '',
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Name can only be 50 characters long.').required('Name is required.'),
      namePrefix: Yup.string().required(),
      contact: Yup.string()
        .required('Phone Number is required.')
        .test({
          message: 'Invalid Phone Number.',
          test: function (value) {
            if (value) {
              return isValidPhoneNumber(value)
            }
            return false
          },
        }),
      // matches(PhoneNumberRegex, 'Invalid Phone Number.').

      // contactPrefix: Yup.string().required(),
      email: Yup.string().matches(EmailRegex, 'Invalid Email.').required('Email is required.'),
      type: Yup.string().required('Please select an inquiry type.'),
      description: Yup.string().required('Description is required.'),
    }),
    onSubmit: async values => {
      if (termChecked) {
        setTermError('')
        setIsLoading(true)
        const payload = {
          name: `${values.namePrefix} ${values.name}`,
          contact: values.contact,

          // contact: `${values.contactPrefix}${values.contact}`,
          email: values.email,
          type: values.type,
          description: values.description,
        }

        Api('POST', `reach-out-to-us/register`, payload).then((response: any) => {
          if (response.success) {
            setIsLoading(false)
            formik.setValues(initialValues)
            setTermChecked(false)

            alert('Your request has been logged.')
          } else {
            alert(response.message)
          }
        })
      } else {
        setTermError('Please agree to the terms and conditions')
      }
    },
  })

  return (
    <div className={`${styles['wrapper3']}`}>
      <Container>
        <p className={` ${styles['reachouttxt']}`}>
          Set an appointment with our representative today and get takaful at ease - Please fill the form below and our
          representative will contact you at the earliest.
        </p>

        <Row className={` ${styles['reachoutformdiv']}`}>
          <Col md={5} lg={5} xl={5} className={` ${styles['requestcallback']}`}>
            <p className={` ${styles['requestcallbacktxt']}`}>Request a call back</p>
            <div className={` ${styles['inputfields']}`}>
              <DiscountFormInput
                placeholder="Name*"
                name="name"
                showDiv={showDiv}
                setShowDiv={setShowDiv}
                divStyle={false}
                options={nameOptions}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
                touched={formik.touched.name}
                onBlur={formik.handleBlur}
                prefixValue={formik.values.namePrefix}
                setPrefixValueIn={'namePrefix'}
                formik={formik}
              />
              <DiscountFormInput
                placeholder="Phone Number*"
                name="contact"
                showDiv={showDiv}
                setShowDiv={setShowDiv}
                divStyle={false}
                options={''}
                value={formik.values.contact}
                onBlur={formik.handleBlur}
                error={formik.errors.contact}
                formik={formik}
                onChange={(val: any) => {
                  formik.setFieldValue('contact', val)
                  // console.log('number', val)
                }}
                touched={formik.touched.contact}
              />
              <DiscountFormInput
                placeholder="Email*"
                name="email"
                showDiv={showDiv}
                setShowDiv={setShowDiv}
                divStyle={false}
                options={''}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                touched={formik.touched.email}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
            <div className="d-flex align-items-center mt-2">
              <div
                onClick={() => setTermChecked(!termChecked)}
                className={`d-flex align-items-center justify-content-center ${styles['radioImgContainer']}`}
              >
                <Image alt="" src={termChecked ? formRadioChecked : formRadioUnchecked} />
              </div>
              <p className={` ${styles['iAgreeTxt']}`}>
                I agree to the {''}
                <span className={` ${styles['iAgreeTxtRed']}`}>Terms and Conditions </span>
              </p>
            </div>
            <div className={`${styles['notOTPTxtDiv']} ${styles['marginOnTermError']}`}>
              {termError.length !== 0 && <p className={styles['notOTPTxt']}>{`${termError}`}</p>}
            </div>
          </Col>

          <Col md={6} lg={6} xl={6} className={` ${styles['writetous']}`}>
            <p className={`mb-3 ${styles['requestcallbacktxt']}`}>Write to us:</p>
            <Form className={styles['formstyles']}>
              <Form.Check
                inline
                label="Sales Inquiry"
                className={` ${styles['radiotxt']}`}
                type={'radio'}
                value="sales_enquiry"
                checked={formik.values.type === 'sales_enquiry'}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label="Complaint"
                className={` ${styles['radiotxt']}`}
                type={'radio'}
                value="complaint"
                checked={formik.values.type === 'complaint'}
                onChange={handleRadioChange}
              />
              <Form.Check
                inline
                label="Others"
                className={` ${styles['radiotxt']}`}
                type={'radio'}
                value="others"
                checked={formik.values.type === 'others'}
                onChange={handleRadioChange}
              />
            </Form>
            <textarea
              name="description"
              className={`w-100 ${styles['textarea']}`}
              placeholder="Description*"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            <div className={styles['notOTPTxtDiv']}>
              {formik.touched.description && formik.errors.description && (
                <p className={styles['notOTPTxt']}>{`${formik.errors.description}`}</p>
              )}
            </div>
          </Col>

          <div className={`mt-3 ${styles['submitButton']}`}>
            <GradientBtn
              disabled={isLoading}
              loading={isLoading}
              link={''}
              onClick={formik.handleSubmit}
              label="Send"
            />
          </div>

          {/* <div
            onClick={() => {
              formik.handleSubmit()
            }}
            className={` ${styles['mwrapper']}`}
          >
            <div className={`d-flex align-items-center justify-content-center ${styles['mcontactadvisor']}`}>
              <p className={`m-0 ${styles['madvisorpara']}`}>Send</p>
            </div>
          </div> */}
        </Row>
      </Container>
    </div>
  )
}

const Accordion = ({
  showDiv,
  setShowDiv,
  div,
}: {
  showDiv: string
  setShowDiv: Function
  div: { heading: string; answer: Array<string> }
}) => (
  <div className={`${styles['wrapper4']}`}>
    <Container>
      <div className={`d-flex flex-column  ${styles['accordiondiv']}`}>
        <div
          className={`d-flex align-items-center justify-content-between ${styles['eachWrapper']}`}
          onClick={() => {
            if (showDiv === div?.heading) setShowDiv('')
            else setShowDiv(div?.heading)
          }}
        >
          <div className={`d-flex align-items-center ${styles['headingrow']}`}>
            <p className={styles['eachheading']}>{div?.heading}</p>
          </div>
          <div className={`d-flex ${styles['eachImgContainerAbsolute']}`}>
            <Image
              priority={true}
              width={'100%'}
              height={showDiv === div?.heading ? '30%' : '100%'}
              src={showDiv === div?.heading ? minus : plus}
              alt=""
            />
          </div>
        </div>
        {showDiv === div?.heading && (
          <div>
            {div.answer.map((ans, index) => (
              <p key={index} className={styles['eachAnswer']}>
                {ans}
              </p>
            ))}
          </div>
        )}
      </div>
    </Container>
  </div>
)

const FileClaim = () => {
  const [showDiv, setShowDiv] = useState('')
  return (
    <div className={`${styles['wrapper4']}`}>
      <Container>
        <p className={` ${styles['reachouttxt']}`}>
          Set an appointment with our representative today and get takaful at ease - Please fill the form below and our
          representative will contact you at the earliest.
        </p>
        <Row>
          <Col sm={5} md={6} lg={6}>
            <Accordion
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              div={{ heading: 'Online', answer: ['Auto Takaful', 'Health Takaful', 'Travel Takaful', 'Life Takaful'] }}
            />
            <Accordion
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              div={{
                heading: 'Call Center',
                answer: ['Auto Takaful', 'Health Takaful', 'Travel Takaful', 'Life Takaful'],
              }}
            />
            <Accordion
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              div={{ heading: 'SMS', answer: ['Auto Takaful', 'Health Takaful', 'Travel Takaful', 'Life Takaful'] }}
            />
            <Accordion
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              div={{ heading: 'Email', answer: ['Auto Takaful', 'Health Takaful', 'Travel Takaful', 'Life Takaful'] }}
            />
          </Col>
          <Col sm={5} md={6} lg={6} className={` ${styles['reachoutimg']}`}>
            <Image src={FileClaim1} alt="" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const WebTabs = () => {
  const [activeTab, setActiveTab] = useState('Locateus')
  return (
    <div className="w-100 ml-1 pb-4">
      <Container className={`d-flex  p-0 align-items-center justify-content-center ${styles['tabs']}`}>
        <div
          className={`d-flex align-items-center justify-content-center  ${
            styles[activeTab === 'Locateus' ? 'activeTab' : 'inActiveTab']
          }`}
          onClick={() => setActiveTab('Locateus')}
        >
          <p className={`${styles[activeTab === 'Locateus' ? 'tabTxtActive' : 'tabTxtInactive']}`}>Locate us</p>
        </div>
        <div>
          <div
            className={`d-flex align-items-center justify-content-center ${
              styles[activeTab === 'Reachout' ? 'activeTab' : 'inActiveTab']
            }`}
            onClick={() => setActiveTab('Reachout')}
          >
            <p className={`${styles[activeTab === 'Reachout' ? 'tabTxtActive' : 'tabTxtInactive']}`}>Reach out to us</p>
          </div>
        </div>

        <div
          className={`d-flex align-items-center justify-content-center ${
            styles[activeTab === 'Fileclaim' ? 'activeTab' : 'inActiveTab']
          }`}
          onClick={() => setActiveTab('Fileclaim')}
        >
          <p className={`${styles[activeTab === 'Fileclaim' ? 'tabTxtActive' : 'tabTxtInactive']}`}>File a claim</p>
        </div>
      </Container>
      <Container className={styles['borderBottomTab']} />
      {activeTab === 'Locateus' && <LocateUs />}
      {activeTab === 'Reachout' && <ReachOut />}
      {activeTab === 'Fileclaim' && <FileClaim />}
    </div>
  )
}

const MobTabs = () => {
  const [mobileSelectedTab, setMobileSelectedTab] = useState('')
  return (
    <>
      <Container className={`${styles['mobilecontainer']}`}>
        <div
          onClick={() => {
            if (mobileSelectedTab === 'Locateus') setMobileSelectedTab('')
            else setMobileSelectedTab('Locateus')
          }}
          className={` ${styles['mobileTab']}`}
        >
          <p className={`m-0 ${styles['mobileTabTxt']}`}>Locate us</p>
          <div className={`${styles['mobTabImg']}`}>
            <Image priority={true} src={mobileSelectedTab === 'Locateus' ? uparrow : dropDownIconRed} alt="" />
          </div>
        </div>
        {mobileSelectedTab === 'Locateus' && <LocateUs />}
        <div
          onClick={() => {
            if (mobileSelectedTab === 'Reachout') setMobileSelectedTab('')
            else setMobileSelectedTab('Reachout')
          }}
          className={` ${styles['mobileTab']}`}
        >
          <p className={`m-0 ${styles['mobileTabTxt']}`}>Reach out us</p>
          <div className={` ${styles['mobTabImg']}`}>
            <Image priority={true} src={mobileSelectedTab === 'Reachout' ? uparrow : dropDownIconRed} alt="" />
          </div>
        </div>
        {mobileSelectedTab === 'Reachout' && <ReachOut />}
        <div
          onClick={() => {
            if (mobileSelectedTab === 'Fileclaim') setMobileSelectedTab('')
            else setMobileSelectedTab('Fileclaim')
          }}
          className={` ${styles['mobileTab']}`}
        >
          <p className={`m-0 ${styles['mobileTabTxt']}`}>File a Claim</p>
          <div className={` ${styles['mobTabImg']}`}>
            <Image priority={true} src={mobileSelectedTab === 'Fileclaim' ? uparrow : dropDownIconRed} alt="" />
          </div>
        </div>
        {mobileSelectedTab === 'Fileclaim' && <FileClaim />}
        <div className={styles['separator2']} />
      </Container>
    </>
  )
}

const ContactUsPage = () => (
  <>
    <div className={styles['wrapper']}>
      <UpperDiv />
      <Cards />
      <MediaQuery minWidth={450}>
        <WebTabs />
      </MediaQuery>
      <MediaQuery maxWidth={450}>
        <MobTabs />
      </MediaQuery>
    </div>
  </>
)

export default ContactUsPage
