import Image, { StaticImageData } from 'next/image'
import { Card, Col } from 'react-bootstrap'

import styles from './Cards.module.scss'

type AllCardProps = {
  image: StaticImageData
  title: string
  paragraph: string
}

const AutoTakafulCards = ({ image, title, paragraph }: AllCardProps) => (
  <Col md={6} lg={6} xl={4} className={`${styles['cardWrapper']}`}>
    <Card className={styles['cardContainer']}>
      <Card.Body className={styles['body']}>
        <Image src={image} alt="" width={'180px'} height={'110px'} />
        <Card.Title className={styles['title']}>{title}</Card.Title>
        {/* <Card.Text className={styles['paragraph']}>{paragraph}</Card.Text> */}
        <div className={styles['hoverDiv']}>{paragraph}</div>
      </Card.Body>
    </Card>
  </Col>
)

export default AutoTakafulCards
