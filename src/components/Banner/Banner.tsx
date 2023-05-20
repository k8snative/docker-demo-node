import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

// import Api from 'src/lib/api'
import BannerImage from '../../../public/assets/autobanner.png'
import SliderImage from '../../../public/assets/healthbanner.png'
// import SliderImage from '../../../public/assets/autobanner.png'
import SliderImage1 from '../../../public/assets/person1.png'
import SliderImage2 from '../../../public/assets/person2.png'
import BannerForm from '../BannerForm/BannerForm'
import CategoriesBottons from '../CategoriesBottons/CategoriesBottons'
import styles from './Banner.module.scss'

export type BannerProps = {
  sampleTextProp: string
  // bannerImage: any
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

const Banner = ({ sampleTextProp }: BannerProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  // const [bannerImgData, setBannerImgData] = useState()
  // const getBannerImgs = async () => {
  //   const tempData = await Api('GET', `setting`)
  //   setBannerImgData(tempData?.data)
  // }
  // useEffect(() => {
  //   getBannerImgs()
  //   // console.log('bannerImgData')
  //   // console.log(bannerImgData)
  // }, [])
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
                        <Image priority={true} src={BannerImage} alt="" objectFit="contain" />
                      </div>
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage1} alt="" objectFit="contain" />
                      </div>
                      <div className={styles['image-wrapper']}>
                        <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                      </div>
                      {/* {bannerImgData&&bannerImgData?.map((each: {}[], index: number) => {
                        const img = each?.value[0]?.image_url
                        console.log(img)

                        return (
                          <div key={index} className={styles['image-wrapper']}>
                            <Image priority={true} src={SliderImage} alt="" objectFit="contain" />
                          </div>
                        )
                      })} */}
                    </Carousel>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="p-0 d-flex flex-column justify-content-center align-items-center">
                <CategoriesBottons />
                <div className={`${styles['formdiv']}`}>
                  <BannerForm />
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

export default Banner
