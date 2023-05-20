import { Col, Container, Row } from 'react-bootstrap';

import styles from './travel-top-banner.module.scss'

const TravelTopBanner = () => (
  <div className={`w-100 py-2 ${styles['wrapper']}`}>
    <Container>
      <p className={styles['heading']}>
        Compare and Get <span className={styles['headingRed']}>Best Car Takaful Deals in Pakistan</span>
      </p>

      <Row>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <p className={styles['txt']}>
            Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects
            you{' '}
          </p>
        </Col>
      </Row>
    </Container>
  </div>
)

export default TravelTopBanner
