import { Col, Container, Row } from 'react-bootstrap'

import styles from './ProductPlanTopContainer.module.scss'

const ProductPlanTopContainer = () => (
  <div className={`w-100 py-2 ${styles['wrapper']}`}>
    <Container>
      <p className={styles['heading']}>
        Compare and Get <span className={styles['headingRed']}>Best Auto Takaful Deals in Pakistan</span>
      </p>

      <Row>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <p className={styles['txt']}>
            Auto Takaful, also known as car or motor, is a type of vehicle takaful policy that protects
            you{' '}
          </p>
        </Col>
      </Row>
    </Container>
  </div>
)

export default ProductPlanTopContainer
