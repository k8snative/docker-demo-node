import Image from 'next/image'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

import Accident from '../../../../public/assets/Accident.png'
import Damage from '../../../../public/assets/Damage.svg'
import Fire from '../../../../public/assets/Fire.png'
import Natural from '../../../../public/assets/Natural.png'
import Riots from '../../../../public/assets/Riots.png'
import Theft from '../../../../public/assets/Theft.png'
import RArrow from '../../../../public/assets/rightarrow.png'
import AutoTakafulCards from '../../Cards/Cards'
import styles from './travelTakaful.module.scss'

const Selectors = ({ onChangeSlide }: { activeSlide: number; onChangeSlide: Function }) => (
  <div
    onClick={() => {
      onChangeSlide()
    }}
    className={` d-flex justify-content-center align-items-center ${styles['selectors']}`}
  >
    <div className={`d-flex align-items-center ${styles['rightarrow']} `}>
      <Image src={RArrow} alt="" />
    </div>
  </div>
)

const TravelTakaful = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  // const [check, setCheck] = useState(true)
  const onChangeSlide = () => {
    if (activeSlide <= 5) {
      setActiveSlide(activeSlide + 1)
    } else {
      setActiveSlide(activeSlide)
    }
  }
  return (
    <>
      <div className={styles['wrapper']}>
        <MediaQuery minWidth={430}>
          <Container className={styles['container']}>
            <p className={styles['heading']}>
              What is covered and not covered in
              <span className={styles['headingInRed']}> Travel Takaful?</span>
            </p>
            <Row className={styles['row']}>
              <AutoTakafulCards
                image={Accident}
                title="Medical Emergency Assistance"
                paragraph="Damages and losses as a result of accidents and collisions."
              />

              <AutoTakafulCards
                image={Theft}
                title="Baggage Loss"
                paragraph="Covers for the losses incurred in case your car is snatched or stolen."
              />
              <AutoTakafulCards
                image={Fire}
                title="Dekay & Cancellation"
                paragraph="Includes losses due to external explosion, self-ignition, lightning, or frost."
              />
              <AutoTakafulCards
                image={Natural}
                title="Dental Care"
                paragraph="Damages to your car in an event of disasters such as floods, cyclones, wind, Earthquakes or other convulsions of nature."
              />
              <AutoTakafulCards
                image={Damage}
                title="Passport Loss"
                paragraph="Accidents, Losses sustained during the transit of vehicle via air, road, rail, inland waterway lift or elevators. "
              />

              <AutoTakafulCards
                image={Riots}
                title="Covid Coverage"
                paragraph="Damages to your car in an event of disasters such as floods, cyclones, wind, Earthquakes or other convulsions of nature."
              />
              <AutoTakafulCards
                image={Riots}
                title="Personal Assistance Service"
                paragraph="Damages to your car in an event of disasters such as floods, cyclones, wind, Earthquakes or other convulsions of nature."
              />
              <AutoTakafulCards
                image={Natural}
                title="Personal Accident"
                paragraph="Accidents, Losses sustained during the transit of vehicle via air, road, rail, inland waterway lift or elevators. "
              />
              <AutoTakafulCards
                image={Theft}
                title="Adventure"
                paragraph="Your car will be covered in case of any unfortunate event, strike, riots. "
              />
            </Row>
          </Container>
        </MediaQuery>
        <MediaQuery maxWidth={430}>
          <Container className={styles['mcontainer']}>
            <p className={styles['mheading']}>What is covered in Auto Takaful?</p>
            <p className={styles['mpara']}>
              {' '}
              Takaful Bazaar’s digital platform and telesales consultants will be available round the clock to assist
              you in all the claim processes.
            </p>
            <div>
              <Container fluid>
                <Row>
                  <div className={`${styles['selector-wrapper']}`}>
                    <Selectors activeSlide={activeSlide} onChangeSlide={onChangeSlide} />
                  </div>
                  <Col className={`${styles['col']}`}>
                    <Carousel
                      infiniteLoop={true}
                      autoPlay={false}
                      selectedItem={activeSlide}
                      swipeable={true}
                      axis="horizontal"
                      dynamicHeight={false}
                      showThumbs={false}
                      showArrows={false}
                      showStatus={false}
                      showIndicators={false}
                      onChange={index => setActiveSlide(index)}
                    >
                      <div>
                        <AutoTakafulCards
                          image={Accident}
                          title="Accidents"
                          paragraph="Damages and losses as a result of accidents and collisions."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Theft}
                          title="Theft"
                          paragraph="Covers for the losses incurred in case your car is snatched or stolen."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Fire}
                          title="Fire"
                          paragraph="Includes losses due to external explosion, self-ignition, lightning, or frost."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Natural}
                          title="Natural Calamities"
                          paragraph="Damages to your car in an event of disasters such as floods, cyclones, wind, Earthquakes or other convulsions of nature."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Damage}
                          title="Damages during transit"
                          paragraph="Accidents, Losses sustained during the transit of vehicle via air, road, rail, inland waterway lift or elevators. "
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Riots}
                          title="Malicious acts and Riots"
                          paragraph="Your car will be covered in case of any unfortunate event, strike, riots. "
                        />
                      </div>
                    </Carousel>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </MediaQuery>
      </div>
    </>
  )
}

export default TravelTakaful
