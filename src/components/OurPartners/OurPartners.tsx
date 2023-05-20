import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import Slider from 'react-slick'
import Api from 'src/lib/api'
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
    query: '(min-width: 750px)',
  })
  const [company, setCompany] = useState([])
  useEffect(() => {
    const fetchCitiesData = async () => {
      const fetchedCities = await Api('GET', '/partner').then((res) => {
        if(res.data.length > 0) {
          setCompany(res.data)
        } else {
          setCompany([])
        }
      }).catch((e) => {
        setCompany([])
      })
    }
    fetchCitiesData()
    }, [])
  const settings = {
    infinite: true,
    slidesToShow: isDesktopOrLaptop ? 4 : 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 500,
    cssEase: "linear",
    pauseOnHover: true,
    lazyLoad: true,
    variableWidth: isDesktopOrLaptop ? true : false
  }
  return (
    <Container className={styles['background']}>
      <div>
        <Slider {...settings} arrows={false}>
          {
            company.map((v) => (
              <div className={styles['partnersDiv']}>
                <img src={v.image} alt={v.name} />
              </div>
            )
            )
          }
        </Slider>
      </div>
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
