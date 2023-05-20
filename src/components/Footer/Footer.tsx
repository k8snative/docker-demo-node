import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import footerFb from '../../../public/assets/facebook.png'
import footerInsta from '../../../public/assets/footerInsta.png'
import Twitter from '../../../public/assets/twitter.png'
import Whatsapp from '../../../public/assets/whatsapp.png'
import Youtube from '../../../public/assets/youtube.png'
import footerLinkedIn from '../../../public/assets/linkedinFooter.png'
import footerLogo from '../../../public/assets/takafullogofooter.png'
import footerMobLogo from '../../../public/assets/footerMobLogo.png'
import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import NiftePay from '../../../public/assets/niftepay.png'
import Alfalah from '../../../public/assets/bankalfalah.png'
import MasterCard from '../../../public/assets/mastercard.png'
import Visa from '../../../public/assets/visapayment.png'
import Norton from '../../../public/assets/norton.png'
import Secure from '../../../public/assets/secure.png'
import Phone from '../../../public/assets/phoneicon.png'
import styles from './Footer.module.scss'

const dummyData = [
  {
    heading: 'Takaful Bazaar',
    items: [{
      link: '/',
      name: 'Home'
    },
    {
      link: '/faq',
      name: 'FAQs'
    },
    {
      link: '/',
      name: 'Blogs'
    },
    {
      target: '_blank',
      link: 'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/terms-and-conditions+-+Takaful+Bazaar.pdf',
      name: 'Terms and Conditions'
    },
    ],
  },
  {
    heading: '',
    items: [{
      link: '/',
      name: 'About Us'
    },
    {
      link: '/',
      name: 'Site Map'
    },
    {
      target: '_blank',
      link: 'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/privacy-policy-Takaful-Bazaar.pdf',
      name: 'Privacy Policy'
    },
    {
      link: '/contactUs',
      name: 'Contact Us'
    },
    ],
  },
  {
    heading: 'Products',
    items: [{
      link: '/auto',
      name: 'Auto Takaful'
    },
    {
      link: '/travel',
      name: 'Travel Takaful'
    },
    {
      link: '/health',
      name: 'Health Takaful'
    },
    {
      link: '/family',
      name: 'Family Takaful'
    },
    ],
  },
  {
    heading: 'Claims',
    items: [{
      link: '/auto/claims',
      name: 'Auto Takaful Claims'
    },
    {
      link: '/travel',
      name: 'Travel Takaful Claims'
    },
    {
      link: '/health',
      name: 'Health Takaful Claims'
    },
    {
      link: '/family',
      name: 'Family Takaful Claims'
    },

    ],
  },

]
const dummyDataMob = [
  {
    heading: 'Takaful Bazaar',
    items: [{
      link: '/',
      name: 'Home'
    },
    {
      link: '/faq',
      name: 'FAQs'
    },
    {
      link: '/',
      name: 'Blogs'
    },
    {
      target: '_blank',
      link: 'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/terms-and-conditions+-+Takaful+Bazaar.pdf',
      name: 'Terms and Conditions'
    },
    {
      link: '/',
      name: 'About Us'
    },
    {
      link: '/',
      name: 'Site Map'
    },
    {
      target: '_blank',
      link: 'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/privacy-policy-Takaful-Bazaar.pdf',
      name: 'Privacy Policy'
    },
    {
      link: '/contactUs',
      name: 'Contact Us'
    }
    ],
  },



]
const dummyDataMob2 = [
  {
    heading: 'Products',
    items: [{
      link: '/auto',
      name: 'Auto Takaful'
    },
    {
      link: '/travel',
      name: 'Travel Takaful'
    },
    {
      link: '/health',
      name: 'Health Takaful'
    },
    {
      link: '/family',
      name: 'Family Takaful'
    },
    ],
  },
  {
    heading: 'Claims',
    items: [{
      link: '/auto/claims',
      name: 'Auto Takaful Claims'
    },
    {
      link: '/travel',
      name: 'Travel Takaful Claims'
    },
    {
      link: '/health',
      name: 'Health Takaful Claims'
    },
    {
      link: '/family',
      name: 'Family Takaful Claims'
    },

    ],
  },
]

const FooterRightSide = () => (
  <div className={`d-flex justify-content-between ${styles['footerRight']}`}>
    {dummyData.map((each, index) => (
      <div key={index} className={`d-flex flex-column align-items-start`}>

        <div key={index} className={`d-flex flex-column align-items-start`}>
          <p className={styles['eachHeading']}>{each.heading}</p>

          <div key={index} className={`d-flex flex-column align-items-start justify-content-between`}>
            {each.items &&
              each.items.map((words, i) => (
                <a href={words.link} target={words.target ? words.target : '_self'}>

                  <p className={styles['word']} key={i}>
                    {words.name}
                  </p>
                </a>
              ))}
          </div>
        </div>
        {dummyData.length - 1 && index !== 0 && <div style={{ borderRight: '0.4px solid #6E6E6E', margin: '1% 0' }} />}
      </div>
    ))}
  </div>
)


type FooterInfoItemProps = {
  heading: string
  items: string[]
}

const PaymentInfo = () => {
  return (

    <div className={styles['wrapperPayment']}>
      <Container className={`p-0 d-flex align-items-center justify-content-between`}>
        <div className={'d-flex flex-column justify-content-between'}>
          <p className={styles['footerTxt']}>Payment Method</p>

          <div className={'d-flex flex-row justify-content-between'}>
            <Image priority={true} className={'px-1'} src={NiftePay} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={Alfalah} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={Visa} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={MasterCard} width={'100px'} height={'30px'} alt="" />
          </div>

        </div>
        <div className={'d-flex flex-column justify-content-between'}>
          <p className={`text-end ${styles['footerTxt']}`}>Secured By</p>

          <div className={'d-flex flex-row justify-content-between'}>
            <Image priority={true} className={'px-1'} src={Secure} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={Norton} width={'100px'} height={'30px'} alt="" />

          </div>

        </div>

      </Container>
    </div>

  )
}

const PaymentInfoMobile = () => {
  return (

    <div className={styles['wrapperPayment']}>
      <Container className={`p-0 d-flex flex-column align-items-start justify-content-between`}>
        <div className={'d-flex flex-column justify-content-between'}>
          <p className={styles['footerTxt']}>Payment Method</p>

          <div className={'d-flex flex-row justify-content-between'}>
            <Image priority={true} className={'px-1'} src={NiftePay} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={Alfalah} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={Visa} width={'100px'} height={'30px'} alt="" />
            <Image priority={true} className={'px-1'} src={MasterCard} width={'100px'} height={'30px'} alt="" />
          </div>

        </div>
        {/* //line break */}



        <div className={'d-flex flex-column justify-content-between'}>
          <p className={`${styles['footerTxt']}`}>Secured By</p>

          <div className={'d-flex flex-row justify-content-between'}>
            <Image priority={true} className={'px-1'} src={Secure} width={'100px'} height={'20px'} alt="" />
            <Image priority={true} className={'px-1'} src={Norton} width={'100px'} height={'20px'} alt="" />

          </div>

        </div>


      </Container>
    </div>

  )
}



const FooterInfoRow = ({ data, index }: { data: FooterInfoItemProps; index: number }) => {
  const [isOpen, setOpen] = useState(false)
  return data.heading ? (
    <div
      onClick={() => setOpen(!isOpen)}
      className={`d-flex flex-column w-95%  ${styles[index === 0 ? 'separatorBoth' : 'separatorBottom']}`}
    >
      <div className="d-flex align-items-center">
        <Image priority={true} src={isOpen ? minus : plus} width={'15px'} height={isOpen ? '5px' : '15px'} alt="" />
        <p className={styles['footerMobEachHeading']}>{data.heading}</p>
      </div>
      <Row className="d-flex m-0 pb-1">
        {isOpen &&
          data?.items?.map((eachItem, i) => (
            <Col className="p-0" xs={6} sm={5} md={5} key={i}>
              <p className={styles['footerMobEachTxt']}>{eachItem}</p>
            </Col>
          ))}
      </Row>
    </div>
  ) : (
    <></>
  )
}
const FooterWeb = () => (
  <div className={styles['wrapper']}>
    <Container className={`p-0 d-flex align-items-center justify-content-between`}>
      <div className={`d-flex flex-column justify-content-center ${styles['footerLeft']}`}>
        <div className={styles['footerLogo']}>
          <Link href="/">
            <Image priority={true} src={footerLogo} alt="" />
          </Link>
        </div>
        <div className={styles['footerLogo2']}>
          <a href='https://www.facebook.com/takafulbazaarpk/?mibextid=LQQJ4d' target="_blank" rel="noopener noreferrer">

            <Image priority={true} src={footerFb} width={'21px'} height={'21px'} alt="" className={styles['iconhover']} />
          </a>
          <a href='https://www.instagram.com/takafulbazaar.pk/?igshid=NTdlMDg3MTY%3D' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={footerInsta}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://pk.linkedin.com/company/takafulbazaar' target="_blank" rel="noopener noreferrer">


            <Image
              priority={true}
              src={footerLinkedIn}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://twitter.com/takafulbazaar?s=21&t=4wWU-oMX97FcwO5-0Kn4SA' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Twitter}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='/' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Whatsapp}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://www.youtube.com/channel/UChgsZk_nvaP2AGcB0n79QUg' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Youtube}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>



        </div>
        <div className='d-flex'>
          <div className="d-flex align-items-center w-100">
          <span>
            <Image
              priority={true}
              src={Phone}
              width={14}
              height={12}
              alt=""
              className={styles['iconhover']}
            />
          </span>
          <p className={styles['footerTxt']}> UAN: (021) 111-832-682</p></div>
          <div className="d-flex align-items-center w-100">
          <span>
            <Image
              priority={true}
              src={Phone}
              width={14}
              height={12}
              alt=""
              className={styles['iconhover']}
            />
          </span>
          <p className={styles['footerTxt']}> PTCL: (021) 388-922-30</p></div>
        </div>
      </div>
      <FooterRightSide />
    </Container>
    <PaymentInfo />
    <Container className={`p-0 d-flex align-items-center justify-content-between`}>
      <p className={`${styles['footerAddress']}`}>
        Office No. 1401, 14th Floor, Emerald Tower, Plot No. G-19, Block 5, Clifton, Karachi, south Sindh 75600 NTN: (4575246-2)
      </p>
      <p className={styles['footerTxt']}>© Copyright 2022-{new Date().getFullYear()} takafulbazaar.pk. All Rights Reserved.</p>
    </Container>

  </div>
)

const FooterMob = () => (
  <div className={`d-flex ${styles['wrapper']}`}>
    <div className={`d-flex flex-column ${styles['containerMob']}`}>
      <div className={` ${styles['mobFooterTopRow2']}`}>
        <div className={styles['footerMobLogo']}>
          <Link href="/">
            <Image priority={true} src={footerMobLogo} alt="" />
          </Link>
        </div>
        <div className={`${styles['footerMobSocailContainer']}`}>
        <div className='d-flex' 
        >
          <a href='https://www.instagram.com/takafulbazaar.pk/?igshid=NTdlMDg3MTY%3D' className='m-1' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={footerInsta}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://pk.linkedin.com/company/takafulbazaar' className='m-1' target="_blank" rel="noopener noreferrer">


            <Image
              priority={true}
              src={footerLinkedIn}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://twitter.com/takafulbazaar?s=21&t=4wWU-oMX97FcwO5-0Kn4SA' className='m-1' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Twitter}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='/' className='m-1' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Whatsapp}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
          <a href='https://www.youtube.com/channel/UChgsZk_nvaP2AGcB0n79QUg' className='m-1' target="_blank" rel="noopener noreferrer">
            <Image
              priority={true}
              src={Youtube}
              width={'21px'}
              height={'21px'}
              alt=""
              className={styles['iconhover']}
            />
          </a>
        </div>
          <div className={`${styles['footerTxt']}`}> UAN: (021) 111-832-682</div>
          <div className={`${styles['footerTxt']}`}> PTCL: (021) 38892230</div>
      </div>       
      </div>

      <div >
      </div>

      <div className={`d-flex flex-row align-items-start justify-content-between ${styles['mobileContainer']} `}>
        {dummyDataMob.map((each, index) => (
          <div key={index} className={`d-flex align-items-start`}>

            <div key={index} className={`d-flex flex-column align-items-start`}>
              <p className={styles['eachHeadingMob']}>{each.heading}</p>

              <div key={index} className={`d-flex flex-column align-items-start justify-content-between`}>
                {each.items &&
                  each.items.map((words, i) => (
                    <a href={words.link} target={words.target ? words.target : '_self'}>

                      <p className={styles['word']} key={i}>
                        {words.name}
                      </p>
                    </a>
                  ))}
              </div>
            </div>
            {/* {dummyData.length - 1 && index !== 0 && <div style={{ borderRight: '0.4px solid #6E6E6E', margin: '1% 0' }} />} */}
          </div>
        ))}
        <div className={`d-flex flex-column align-items-start`}>
          {dummyDataMob2.map((each, index) => (
            <div key={index} className={`d-flex flex-column  align-items-start`}>

              <p className={styles['eachHeadingMob']}>{each.heading}</p>

              <div key={index} className={`d-flex flex-column align-items-start justify-content-between`}>
                {each.items &&
                  each.items.map((words, i) => (
                    <a href={words.link} target={words.target ? words.target : '_self'}>
                      <p className={styles['word']} key={i}>
                        {words.name}
                      </p>
                    </a>
                  ))}

              </div>
            </div>

          ))}
        </div>

      </div>

      <p className={`${styles['footerAddress']} align-items-center justify-content-between`}>
        Office No. 1401, 14th Floor, Emerald Tower, Plot No. G-19, Block 5, Clifton, Karachi, south Sindh 75600 NTN: (4575246-2)
      </p>
      <PaymentInfoMobile />
      <Container className={`p-0 d-flex align-items-center justify-content-between`}>
        <p className={styles['footerTxt']}>© Copyright 2022-{new Date().getFullYear()} takafulbazaar.pk. All Rights Reserved.</p>
      </Container>
    </div>
  </div>
)

const Footer = () => (
  <>
    <MediaQuery minWidth={700}>
      <FooterWeb />
    </MediaQuery>
    <MediaQuery maxWidth={430}>
      <FooterMob />
    </MediaQuery>
  </>
)

export default Footer
