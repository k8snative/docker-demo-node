import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import RegistorClaimTabs from '~components/RegistorClaimTabs/RegistorClaimTabs'

import AutoTakafulBanner from '../../../public/assets/AutoTakafulBanner.svg'
import ClaimImage from '../../../public/assets/claimImage.png'
import styles from './RegistorClaim.module.scss'

const RegistorClaim = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex align-items-center flex-column ${styles['container']}`}>
      <p className={styles['heading']}>
        Register a <span className={styles['headingInRed']}> Claim </span>
      </p>
      <p className={styles['paragraph']}>
        Set an appointment with our representative today and get takaful at ease - Please fill the form below and our
        representative will contact you at the earliest.{' '}
      </p>
      <MediaQuery minWidth={430}>
        <Row className="justify-content-md-start w-100">
          <Col md={8}>
            <RegistorClaimTabs />
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
