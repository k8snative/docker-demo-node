import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import RegistorClaimTabs from '~components/RegistorClaimTabs/RegistorClaimTabs'

import AutoTakafulBanner from '../../../public/assets/AutoTakafulBanner.svg'
import ClaimImage from '../../../public/assets/claimImage.png'
import CallAget from '../../../public/assets/callAgent.png'
import whatsAppLogo from '../../../public/assets/whatsAppLogo.png'
import envelopLogo from '../../../public/assets/envelop.png'
import styles from './RegistorClaim.module.scss'
import Link from 'next/link'

const RegistorClaim = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex align-items-center flex-column ${styles['container']}`}>
      <p className={styles['heading']}>
        Register a <span className={styles['headingInRed']}> Claim </span>
      </p>
      {/* <p className={styles['paragraph']}>
      Set an appointment with our representative today and get takaful at ease - Please fill the form below and our representative will contact you at the earliest.
      </p> */}
      <MediaQuery minWidth={430}>
        <Row className="justify-content-md-start w-100">
          <Col md={8}>
            <div className="claim-list-item">
              <div>
                <Image src={envelopLogo} alt="ClaimImage" />
                <div className="text-wrapper">
                  <p className="main-heading">General Enquiries</p>
                  <Link href={`mailto:hello@takafulbazaar.pk`}>
                    <p className="bold-text" style={{ cursor: 'pointer' }}>hello@takafulbazaar.pk</p>
                  </Link>
                </div>
              </div>
              <div style={{ margin: '20px 0px'}}>
                <Image src={CallAget} alt="ClaimImage" />
                <div className="text-wrapper">
                  <p className="main-heading">Contact Customer Services</p>
                  <p className="bold-text">UAN: 111-832-682</p>
                </div>
              </div>
              <div
                onClick={async () => {
                  window.open('https://wa.me/+923272055033', '_blank', 'noreferrer');
                }}>
                <Image src={whatsAppLogo} alt="ClaimImage" />
                <div className="text-wrapper">
                  <p className="main-heading">Contact Us on Whatsapp</p>
                  <p className="bold-text">+92 327 2055033</p>
                </div>
              </div>
            </div>
            {/* <RegistorClaimTabs /> */}
          </Col>
          <Col md={4}>
            <div className={styles['imageContainer']}>
              <Image src={ClaimImage} alt="ClaimImage" />
            </div>
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <RegistorClaimTabs />
      </MediaQuery>
    </Container>
  </div>
)

export default RegistorClaim
