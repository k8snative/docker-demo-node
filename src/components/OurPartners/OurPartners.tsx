import Image from 'next/image'
import { Container } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
// import Slider from 'react-slick'
import Slider from 'react-slick'
import GetOurApp from '~components/GetOurApp/GetOurApp'

import alfalahInsurance from '../../../public/assets/alfalahInsurance.png'
import igiLife from '../../../public/assets/igiLife.png'
import stateLife from '../../../public/assets/stateLife.png'
import tplInsurance from '../../../public/assets/tplInsurance.png'
import styles from './OurPartners.module.scss'

const sliderArray = [
  alfalahInsurance,
  igiLife,
  tplInsurance,
  stateLife,
  alfalahInsurance,
  igiLife,
  tplInsurance,
  stateLife,
]

const SliderComponent = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 426px)',
  })
  const settings = {
    arrows: false,
    speed: 500,
    slidesToShow: isDesktopOrLaptop ? 4 : 3,
    slidesToScroll: 2,
    // centerMode: true
  }
  return (
    <Container className={styles['background']}>
      <Slider {...settings}>
        {sliderArray.map((img, index) => (
          <div key={index}>
            <div className={styles['abc']} key={index}>
              <Image height={isDesktopOrLaptop ? 140 : 180} priority={true} src={img} alt="" objectFit="contain" />
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  )
}

const OurPartners = () => (
  <div className={`d-flex flex-column justify-content-center align-items-center ${styles['wrapper']}`}>
    <div className={`d-flex align-items-center justify-content-center ${styles['headingWrapper']}`}>
      <p className={styles['headingTxt']}>Our Partners</p>
    </div>
    <SliderComponent />
    <GetOurApp />
  </div>
)

export default OurPartners
