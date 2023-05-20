import Image from 'next/image'
import { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

// import Api from 'src/lib/api'
import SliderImage from '../../../../public/assets/person1.png'
import SliderImage2 from '../../../../public/assets/person2.png'
import TravelBannerForm from '../travelBannerForm'
import CategoriesBottons from '../../CategoriesBottons/CategoriesBottons'
import styles from './travelBanner.module.scss'

export type BannerProps = {
  sampleTextProp: string
}
const Selector = ({ activeSlide, id, onClick }: { activeSlide: number; id: number; onClick: Function }) => (
  <div
    onClick={() => onClick(id)}
    className={activeSlide === id ? `${styles['selector']} ${styles['active']}` : styles['selector']}
  />
)

const Selectors = ({
  slidesCount,
  activeSlide,
  onClick,
}: {
  slidesCount: number
  activeSlide: number
  onClick: Function
}) => {
  const selectors = []
  for (let i = 0; i < slidesCount; i += 1) {
    selectors.push(<Selector key={i} activeSlide={activeSlide} id={i} onClick={(id: number) => onClick(id)} />)
  }
  return <div className={`${styles['selectors']} d-flex align-items-center`}>{selectors}</div>
}

const TravelBanner: React.FC<BannerProps> = () => {
    
  const [activeSlide, setActiveSlide] = useState<number>(0)

  return (
    <>
      <MediaQuery minWidth={1000}>
        <div className={`${styles['wrapper']}`}>
          <div className={styles['background']}></div>
          <Container>
            <Row>
              <Col md={8}>
                <Row>
                  <Col className={`${styles['selector-wrapper']}`} md={2}>
                    <Selectors slidesCount={4} activeSlide={activeSlide} onClick={(id: number) => setActiveSlide(id)} />
                  </Col>
                  <Col md={10}>
                    <Carousel
                      infiniteLoop={true}
                      autoPlay={true}
                      selectedItem={activeSlide}
                      swipeable={true}
                      axis="vertical"
                      dynamicHeight={true}
                      showThumbs={false}
                      showArrows={false}
                      showStatus={false}
                      showIndicators={false}
                      onChange={index => setActiveSlide(index)}
                    >
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                      </div>
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                      </div>
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                      </div>
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                      </div>
                    </Carousel>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="p-0 d-flex flex-column justify-content-center align-items-center">
                <div className={`${styles['formdiv']}`}>
                  <TravelBannerForm />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={1000}>
        <div className={`${styles['wrapper']}`}>
          <div className={styles['background']}></div>
          <Container>
            <Row>
              <Col md={12}>
                <div className={`${styles['selector-wrapper']}`}>
                  <Selectors slidesCount={4} activeSlide={activeSlide} onClick={(id: number) => setActiveSlide(id)} />
                </div>
                <Carousel
                  infiniteLoop={true}
                  selectedItem={activeSlide}
                  swipeable={true}
                  axis="horizontal"
                  width={'100%'}
                  autoPlay={true}
                  showThumbs={false}
                  showArrows={false}
                  showStatus={false}
                  showIndicators={false}
                  onChange={index => setActiveSlide(index)}
                >
                  <div className={styles['image-wrapper']}>
                    <Image priority={true} src={SliderImage2} alt="" objectFit="contain" />
                  </div>
                  <div className={styles['image-wrapper']}>
                    <Image priority={true} src={SliderImage2} alt="" objectFit="contain" />
                  </div>
                  <div className={styles['image-wrapper']}>
                    <Image priority={true} src={SliderImage2} alt="" objectFit="contain" />
                  </div>
                  <div className={styles['image-wrapper']}>
                    <Image priority={true} src={SliderImage2} alt="" objectFit="contain" />
                  </div>
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>
    </>
  )
}

export default TravelBanner
