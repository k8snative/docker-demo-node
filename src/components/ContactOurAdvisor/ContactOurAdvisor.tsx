import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import ContactAdvisor from '~components/ContactAdvisor/ContactAdvisor'

import WHeadphones from '../../../public/assets/wheadphones.png'
import CategoriesBottons from '../CategoriesBottons/CategoriesBottons'
import styles from './ContactOurAdvisor.module.scss'

const ContactOurAdvisorWeb = () => (
  <div className={styles['wrapper']}>
    <Container className={`  ${styles['container']}`}>
      <Row className="d-flex  justify-content-between align-items-center">
        <Col md={7} sm={6} xs={6}>
          <p className={`${styles['para']}`}>
            Need help? We bring you an easy way to compare and buy takaful online. For best quotes & unbiased advice -
            Get in Touch With Team-Tb Now!
          </p>
        </Col>
        <Col md={5} sm={5} xs={5}>
          <ContactAdvisor />
        </Col>
      </Row>
    </Container>
  </div>
)

const ContactOurAdvisorMob = () => (
  <Link href="/products/contactUs">
    <div className={styles['mwrapper']}>
      <Container>
        <div className={`d-flex  align-items-center justify-content-center ${styles['mcontactadvisor']}`}>
          <div className={`d-flex ${styles['micon']}`}>
            <Image src={WHeadphones} alt="headphones" objectFit="contain" />
          </div>
          <p className={`m-0 ${styles['madvisorpara']}`}>Hello Team - TB</p>
        </div>
      </Container>
    </div>
  </Link>
)

const ContactOurAdvisor = ({
  categoriesVisible,
  contactAvisorMob,
}: {
  categoriesVisible: Boolean
  contactAvisorMob: Boolean
}) => (
  <>
    <MediaQuery minWidth={475}>
      <ContactOurAdvisorWeb />
    </MediaQuery>
    <MediaQuery maxWidth={475}>
      {categoriesVisible ? (
        <div className={` ${styles['CategoriesBottonsMobileContainer']}`}>
          <CategoriesBottons />
        </div>
      ) : null}
      {contactAvisorMob ? <ContactOurAdvisorMob /> : null}
    </MediaQuery>
  </>
)
export default ContactOurAdvisor
