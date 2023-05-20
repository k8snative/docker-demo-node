import { useFormik } from 'formik'
import Image from 'next/image'
import Support from 'public/assets/support.png'

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
import Swal from 'sweetalert2'

const nameOptions = [{ option: 'Mr.' }, { option: 'Mrs.' }, { option: 'Ms.' }]
const phoneOptions = [{ option: '+92' }, { option: '+923' }, { option: '+924' }]

const UpperDiv = () => (
  <div className={`${styles['wrapper1']}`}>
    <Container className={`${styles['container1']}`}>
    <Col xs={12} sm={4} md={4} className={` ${styles['imagecol']}`}>
        <Image src={Support} alt="" />
      </Col>
      <Col xs={12} sm={8} md={8}>
        <div className={`${styles['textdiv']}`}>
          <p className={`mx-4 my-0`}>
            <span className={`${styles['heading']}`}>Contact Us</span>
            {/* <span className={` ${styles['headinginred']}`}> Takaful Plans In Pakistan</span> */}
          </p>
          <p className={`mx-4 ${styles['subheading']}`}>
          At Takaful Bazaar, it is our constant endeavor to provide a great customer experience. In case you require assistance, please call us.
          </p>
          <div className='UANBtn'>
          <a href="/contactUs" className={` ${styles['UANtxt']}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15.353" height="14.43" viewBox="0 0 15.353 14.43">
            <g id="Group_31898" data-name="Group 31898" transform="translate(-855.2 -718.198)">
              <path id="Path_1085" data-name="Path 1085" d="M863.032,730.771c.239,0,.479.009.718,0a.907.907,0,0,1,.888.51.152.152,0,0,0,.158.092c.334,0,.669.016,1-.005a1.873,1.873,0,0,0,1.729-1.022,4.265,4.265,0,0,0,.223-.782c.005-.02-.029-.063-.055-.077a.952.952,0,0,1-.542-.919c.005-1.516,0-3.032,0-4.547a.855.855,0,0,1,.441-.78c.1-.06.122-.1.105-.223a4.581,4.581,0,0,0-.546-1.628,5.194,5.194,0,0,0-.7-.974,4.657,4.657,0,0,0-1.347-1.029,4.9,4.9,0,0,0-4.276-.083,4.924,4.924,0,0,0-2.714,3.326,4.131,4.131,0,0,0-.085.459.158.158,0,0,0,.073.121.912.912,0,0,1,.491.858c0,1.531,0,3.061,0,4.592a.9.9,0,0,1-.8.889.923.923,0,0,1-1-.564.168.168,0,0,0-.1-.068,2.055,2.055,0,0,1-1.226-1.208,3.514,3.514,0,0,1-.252-1.778,2.8,2.8,0,0,1,.612-1.588,1.5,1.5,0,0,1,.771-.543.411.411,0,0,0,.261-.231.628.628,0,0,1,.26-.292c.234-.085.279-.251.306-.459a5.076,5.076,0,0,1,.4-1.354,5.236,5.236,0,0,1,1.132-1.65,5.568,5.568,0,0,1,4.266-1.6,5.538,5.538,0,0,1,3.824,1.886,5.08,5.08,0,0,1,1.055,1.843c.11.352.163.721.251,1.08a.271.271,0,0,0,.121.164.9.9,0,0,1,.458.459.228.228,0,0,0,.12.117,2.046,2.046,0,0,1,1.307,1.4,3.511,3.511,0,0,1,.169,1.56,2.628,2.628,0,0,1-.851,1.832,2.259,2.259,0,0,1-.523.314.435.435,0,0,0-.256.2.9.9,0,0,1-.439.419.173.173,0,0,0-.076.119,2.48,2.48,0,0,1-1.041,1.92,2.338,2.338,0,0,1-1.166.435c-.459.036-.92.048-1.38.06a.193.193,0,0,0-.191.121.869.869,0,0,1-.776.478c-.519.011-1.038,0-1.557,0a.956.956,0,0,1-.935-.788.926.926,0,0,1,.914-1.071C862.512,730.784,862.772,730.771,863.032,730.771Zm-5.666-4.458v.986c0,.424,0,.847,0,1.27a.359.359,0,0,0,.216.337.251.251,0,0,0,.308-.117.565.565,0,0,0,.071-.275q.006-2.182,0-4.363a.7.7,0,0,0,0-.09c-.032-.245-.223-.38-.417-.287a.33.33,0,0,0-.181.328Q857.367,725.207,857.366,726.313Zm11.018.032v-.867c0-.463,0-.927,0-1.389a.306.306,0,0,0-.431-.31.38.38,0,0,0-.17.369q0,2.181,0,4.363a.639.639,0,0,0,0,.09.341.341,0,0,0,.232.309.25.25,0,0,0,.293-.123.5.5,0,0,0,.069-.246C868.386,727.809,868.384,727.077,868.384,726.345Zm-11.65-1.9a.71.71,0,0,0-.1.044,1.466,1.466,0,0,0-.493.558,2.776,2.776,0,0,0-.282,1.623,2.483,2.483,0,0,0,.4,1.134,1.014,1.014,0,0,0,.475.419Zm12.283,3.79a1.365,1.365,0,0,0,.562-.564,2.791,2.791,0,0,0,.307-1.69,2.416,2.416,0,0,0-.431-1.165,3.049,3.049,0,0,0-.406-.39l-.032.031Zm-5.987,3.169c-.254,0-.508,0-.762,0a.305.305,0,0,0-.291.26.262.262,0,0,0,.18.29.629.629,0,0,0,.228.046q.643.006,1.286,0a.664.664,0,0,0,.255-.052.28.28,0,0,0,.143-.335.289.289,0,0,0-.29-.207C863.529,731.394,863.28,731.4,863.031,731.4Z" transform="translate(0 0)" fill="#fff"/>
            </g>
          </svg>
          <span>

          UAN: 111-832-682 / PTCL: (021) 388-922-30
          </span>
        </a>
          </div>
        </div>
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
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
        <ContactCards heading="For Auto Takaful" number="(021) 111-832-682" email="hello@takafulbazaar.com.pk" />
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
                <p className={` ${styles['redtxt']}`}>Call:</p>
                <div className='d-flex'>
                  <p className={`m-0 ${styles['greytxt']}`}>(021) 111-832-682</p>
                  <p className={`m-0 ${styles['greytxt']}`}>PTCL: (021) 38892230</p>
                </div>
                {/* <p className={` ${styles['greytxt']}`}>SMS to 8882</p> */}
          
            <div className={`${styles['firstdiv']}`}>
              <p className={`m-0 ${styles['redtxt']}`}>Address:</p>
              <p className={`${styles['greytxt']}`}>
                Office No. 1401, 14th Floor, Emerald Tower, Plot No. G-19, Block 5, Clifton, Karachi, south Sindh 75600
              </p>
              <p className={`${styles['redtxt']}`}>
              NTN: 
              </p>
              <p className={`${styles['greytxt']}`}>
              (4575246-2)
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
          email: values.email,
          type: values.type,
          description: values.description,
        }

        Api('POST', `reach-out-to-us/register`, payload).then((response: any) => {
          if (response.success) {
            setIsLoading(false)
            formik.setValues(initialValues)
            setTermChecked(false)

            Swal.fire({
              icon: 'success',
              text: 'Your request has been logged',
              confirmButtonColor: '#df0025',
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: response.message,
              confirmButtonColor: '#df0025',
            });
            setIsLoading(false)
            formik.setValues(initialValues)
            setTermChecked(false)
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
          Please fill the form below and our
          representative will contact you at the earliest.
        </p>

        <Row className={` ${styles['reachoutformdiv']}`}>
          <Col md={5} lg={5} xl={5} className={` ${styles['requestcallback']}`}>
            <div className={` ${styles['inputfields']}`}>
              <p className={` ${styles['requestcallbacktxt']}`}>Request a call back</p>
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
                <a className={` ${styles['iAgreeTxtRed']}`} href={'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/terms-and-conditions+-+Takaful+Bazaar.pdf'} target='_blank'>Terms and Conditions </a>
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

        {/* <div
          className={`d-flex align-items-center justify-content-center ${
            styles[activeTab === 'Fileclaim' ? 'activeTab' : 'inActiveTab']
          }`}
          onClick={() => setActiveTab('Fileclaim')}
        >
          <p className={`${styles[activeTab === 'Fileclaim' ? 'tabTxtActive' : 'tabTxtInactive']}`}>File a claim</p>
        </div> */}
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
        {/* <div
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
        </div> */}
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
      {/* <Cards /> */}
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
