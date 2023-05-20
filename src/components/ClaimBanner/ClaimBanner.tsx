import Image from 'next/image'
import { useState } from 'react'
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
import BannerForm from '../BannerForm/BannerForm'
import CategoriesBottons from '../CategoriesBottons/CategoriesBottons'
import styles from './CalimBanner.module.scss'

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
  const [activeSlide, setActiveSlide] = useState(0)
  const userdata = useSelector(state => state?.auth.data?.user)

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
              <Col md={8}>
                <Row>
                  <Col md={10}>
                    <div className={styles['image-wrapper']}>
                      <Image priority={true} src={AutoBannerImage} alt="" objectFit="contain" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="p-0 d-flex flex-column justify-content-center align-items-center">
                <div className={`${styles['raise-claim']}`}>
                  <Image priority={true} src={ClaimIcon} alt="" objectFit="contain" />
                  <div className="w-50 mt-3">
                    <ClaimButton
                      // link={!!userdata ? '/claims/auto-claims' : 'auth/auth'}
                      btnTxt="Raise a Claim"
                      onClick={raisedClaim}
                    />
                  </div>
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
