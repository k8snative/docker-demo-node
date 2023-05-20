import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'
import ClaimButton from '~components/SignInUpButton/SignInUpButton'

import ClaimIcon from '../../../public/assets/IconClaim.svg'
import AutoBannerImage from '../../../public/assets/autoBannerClaim.png'
// import Api from 'src/lib/api'
import SliderImage from '../../../public/assets/person1.png'
import SliderImage2 from '../../../public/assets/person2.png'
import ClaimBanner from '../../../public/assets/claimBanner.png'
import Notes from '../../../public/assets/notes.png'
import BannerForm from '../BannerForm/BannerForm'
import CategoriesBottons from '../CategoriesBottons/CategoriesBottons'
import styles from './CalimBanner.module.scss'
import Api from 'src/lib/api'

export type BannerProps = {
  sampleTextProp: string
}
const Selector = ({ activeSlide, id, onClick }: { activeSlide: number; id: number; onClick: Function }) => (
  <div
    onClick={() => onClick(id)}
    className={activeSlide === id ? `${styles['selector']} ${styles['active']}` : styles['selector']}
  />
)

const CalimBanner: React.FC<BannerProps> = () => {
  const [image, setImage] = useState('')
  const userdata = useSelector(state => state?.auth.data?.user)


  const getImage = async () => {
    const response = await Api('GET', `banner-show-on-page?show_on_page=${encodeURIComponent('/auto/claim')}`)
    if (response?.data?.length) {
      setImage(response?.data[0]?.desktop_image_url);
    }
  }
  useEffect(() => {
    getImage()
  }, [])

  const raisedClaim = () => {
    if (!userdata) {
      window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}auth/auth`)
    } else {
      window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}register-claims/auto`)
    }
  }

  return (
    <>
      <MediaQuery minWidth={1000}>
        <div className={`${styles['wrapper']}`}>
          <div className={styles['background']}></div>
          <Container>
            <Row>
              <Col md={6}>
              {image && <img src={image} alt="" objectFit="contain" />}
                {/* <Row>
                  <Col md={10}>
                    <div className={styles['image-wrapper']}>
                      {image ?  (
                        <Image layout='fill' priority={true} src={image} alt="" objectFit="contain" />
                      ) : null}
                    </div>
                  </Col>
                </Row> */}
              </Col>
              <Col md={6} className="p-0 d-flex flex-column justify-content-center">
                <div className={`${styles['raise-claim']}`}>
                  <p style={{fontSize: 30, margin: 0}}><b>With</b><b style={{marginLeft: 10, color: 'red'}}>Takaful Bazaar</b></p>
                  <p style={{fontSize: 18}}>Claims are always Simple & Easy</p>
                  {/* <Image priority={true} src={Notes} alt="" objectFit="contain" /> */}
                  <button className={`${styles['raise-claim-btn']}`} onClick={raisedClaim}>
                  <Image priority={true} src={Notes} alt="" objectFit="contain" width={20}/> 
                    Raise a Claim
                  </button>
                  {/* <div className="mt-3">
                    <ClaimButton
                      // link={!!userdata ? '/claims/auto-claims' : 'auth/auth'}
                      btnTxt="Raise a Claim"
                      onClick={raisedClaim}
                    />
                  </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={1000}>
        <div className={`${styles['wrapper']}`}>
          <p className={styles['heading']}>Compare and Get</p>
          <p className={styles['headingInRed']}>Best Car Takaful Deals in Pakistan </p>
          <div className={styles['background']}></div>
          <Container>
            <Row>
              <Col md={12}>
                <div className={`${styles['selector-wrapper']}`}></div>

                <div className={styles['image-wrapper']}>
                  <Image priority={true} src={SliderImage2} alt="" objectFit="contain" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>
    </>
  )
}

export default CalimBanner
