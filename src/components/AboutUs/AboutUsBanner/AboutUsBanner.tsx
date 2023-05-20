import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

// import Api from 'src/lib/api'
import BannerImage from '../../../../public/assets/aboutUsBanner.png'
import SliderImage from '../../../../public/assets/healthbanner.png'
// import SliderImage from '../../../public/assets/autobanner.png'
import SliderImage1 from '../../../../public/assets/person1.png'
import SliderImage2 from '../../../public/assets/person2.png'
import BannerForm from '../../BannerForm/BannerForm'
import CategoryTabs from '../../auto/CategoryTabs'
import styles from './AboutUsBanner.module.scss'
import Api from 'src/lib/api'

export type BannerProps = {
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
  hideForm
}: {
  slidesCount: number
  activeSlide: number
  onClick: Function
  hideForm: any
}) => {
  const selectors = []
  for (let i = 0; i < slidesCount; i += 1) {
    selectors.push(<Selector key={i} activeSlide={activeSlide} id={i} onClick={(id: number) => onClick(id)} />)
  }
  return <div className={`${styles['selectors']} d-flex align-items-center`}>{selectors}</div>
}

const Banner = ({hideForm }: BannerProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [bannerImgData, setBannerImgData] = useState([])
  const getBannerImgs = async () => {
    const response = await Api('GET', `banner-show-on-page?show_on_page=${encodeURIComponent('/main')}`)
    if(response?.data.length > 0) {
      setBannerImgData(response?.data);
    } else {
      setBannerImgData([]);
    }
  }
  useEffect(() => {
    getBannerImgs()
  }, [])



  return (
    <>
      <MediaQuery minWidth={1000}>
        <div className={`${styles['wrapper']}`} style={{ paddingTop: '30px' }}>
          <div className={styles['background']}></div>
          <Container>
            <Row>
              <Col md={7}>
                <Row>
                  <Col md={{size:10,offset:2}}>
                  <div className={styles['image-wrapper']}>
                        <Image priority={true} src={BannerImage} alt="" objectFit="contain" />
                      </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5} className="p-0 d-flex flex-column align-items-center">
              <div className={styles['aboutUsBannerContainer']}>
              <span>Let's find the</span>
               <p style={{margin: 0}}><b>best</b><b style={{color: 'red', marginLeft: 10}}>Takaful Plan</b></p>
                <p style={{margin: 0, fontSize: 18, marginBottom: 30}}>Pakistan's only Digital Takaful Solution for All</p>
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
            <Col md={{size:8,offset:2}}>
             <div className={styles['image-wrapper']}>
               <Image priority={true} src={BannerImage} alt="" objectFit="contain" />
             </div>
            </Col>
            <Col md={12}
            className={`p-0 d-flex flex-column justify-content-center align-items-center ${styles['form-icon-bg']}`}>
            <div className={styles['aboutUsBannerContainerSm']}>
              <span>Let's find the</span>
               <p style={{margin: 0}}><b>best</b><b style={{color: 'red', marginLeft: 10}}>Takaful Plan</b></p>
                <p style={{margin: 0, fontSize: 18, marginBottom: 30}}>Pakistan's only Digital Takaful Solution for All</p>
              </div>
            </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>
    </>
  )
}

export default Banner
