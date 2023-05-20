import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import footerFb from '../../../public/assets/footerFb.png'
import footerInsta from '../../../public/assets/footerInsta.png'
import footerLinkedIn from '../../../public/assets/footerLinkedIn.png'
import footerLogo from '../../../public/assets/footerLogo.png'
import footerMobLogo from '../../../public/assets/footerMobLogo.png'
import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import styles from './Footer.module.scss'

const dummyData = [
  {
    heading: 'Products',
    items: [
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
    ],
  },
  {
    heading: '',
    items: [
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
    ],
  },
  {
    heading: 'Services',
    items: [
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
    ],
  },
  {
    heading: 'Renewls',
    items: [
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
    ],
  },
  {
    heading: 'About Us',
    items: [
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
      'Auto Insurance',
      'Health Insurance',
      'Life Insurance',
      'Travel Insurance',
    ],
  },
]

const FooterRightSide = () => (
  <div className={`d-flex justify-content-between ${styles['footerRight']}`}>
    {dummyData.map((each, index) => (
      <>
        <div key={index} className={`d-flex flex-column align-items-start justify-content-between`}>
          <p className={styles['eachHeading']}>{each.heading}</p>
          <div key={index}>
            {each.items &&
              each.items.map((words, i) => (
                <p className={styles['word']} key={i}>
                  {words}
                </p>
              ))}
          </div>
        </div>
        {dummyData.length - 1 && index !== 0 && <div style={{ borderRight: '0.4px solid #6E6E6E', margin: '1% 0' }} />}
      </>
    ))}
  </div>
)

const FooterWeb = () => (
  <div className={styles['wrapper']}>
    <Container className={`p-0 d-flex align-items-center justify-content-between`}>
      <div className={`d-flex flex-column justify-content-center ${styles['footerLeft']}`}>
        <div className={styles['footerLogo']}>
          <Link href="/products/health">
            <Image priority={true} src={footerLogo} alt="" />
          </Link>
        </div>
        <div className="d-flex">
          <p className={styles['footerTxt']}>About</p>
          <p className={styles['footerTxt']}>|</p>
          <Link href={'/products/contactUs'}>
            <p className={styles['footerTxt']}>Contact</p>
          </Link>
          <p className={styles['footerTxt']}>|</p>
          <p className={styles['footerTxt']}>Career</p>
        </div>
        <div className={styles['footerLogo2']}>
          <Image priority={true} src={footerFb} width={'21px'} height={'21px'} alt="" className={styles['iconhover']} />
          <Image
            priority={true}
            src={footerInsta}
            width={'21px'}
            height={'21px'}
            alt=""
            className={styles['iconhover']}
          />
          <Image
            priority={true}
            src={footerLinkedIn}
            width={'21px'}
            height={'21px'}
            alt=""
            className={styles['iconhover']}
          />
        </div>
      </div>
      <FooterRightSide />
    </Container>
  </div>
)

type FooterInfoItemProps = {
  heading: string
  items: string[]
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

const FooterMob = () => (
  <div className={`d-flex ${styles['wrapper']}`}>
    <div className={`d-flex flex-column ${styles['containerMob']}`}>
      <div className={` ${styles['mobFooterTopRow2']}`}>
        <div className={styles['footerMobLogo']}>
          <Link href="/products/health">
            <Image priority={true} src={footerMobLogo} alt="" />
          </Link>
        </div>
        <div className={`d-flex   ${styles['footerMobSocailContainer']}`}>
          <Image priority={true} src={footerFb} width={'30%'} height={'100%'} alt="" className={styles['iconhover']} />
          <Image
            priority={true}
            src={footerInsta}
            width={'30%'}
            height={'100%'}
            alt=""
            className={styles['iconhover']}
          />
          <Image
            priority={true}
            src={footerLinkedIn}
            width={'30%'}
            height={'100%'}
            alt=""
            className={styles['iconhover']}
          />
        </div>
      </div>
      <div className={`d-flex align-items-center justify-content-center ${styles['mobFooterTopRow']}`}>
        <p className={styles['footerTxtMob']}>About</p>
        <p className={styles['footerTxtMob']}>|</p>
        <Link href={'/products/contactUs'}>
          <p className={styles['footerTxtMob']}>Contact</p>
        </Link>
        <p className={styles['footerTxtMob']}>|</p>
        <p className={styles['footerTxtMob']}>Career</p>
      </div>
      <div className={`d-flex flex-column ${styles['mobFooterTopRow']}`}>
        {dummyData.map((data, index) => (
          <FooterInfoRow data={data} key={index} index={index} />
        ))}
      </div>
      <div className={`d-flex align-items-center justify-content-center ${styles['mobFooterTopRow']}`}>
        <p className={styles['footerTxtMobLowest']}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea com
        </p>
      </div>
    </div>
  </div>
)

const Footer = () => (
  <>
    <MediaQuery minWidth={500}>
      <FooterWeb />
    </MediaQuery>
    <MediaQuery maxWidth={500}>
      <FooterMob />
    </MediaQuery>
  </>
)

export default Footer
