import Image from 'next/image'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

import Accident from '../../../public/assets/Accident.png'
import Damage from '../../../public/assets/Damage.svg'
import Fire from '../../../public/assets/Fire.png'
import Natural from '../../../public/assets/Natural.png'
import Riots from '../../../public/assets/Riots.png'
import Theft from '../../../public/assets/Theft.png'
import RArrow from '../../../public/assets/rightarrow.png'
import AutoTakafulCards from '../Cards/Cards'
import styles from './AutoTakaful.module.scss'

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

const AutoTakaful = () => {
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
              <span className={styles['headingInRed']}> Auto Takaful?</span>
            </p>
            <Row className={styles['row']}>
              <AutoTakafulCards
                image={Accident}
                title="Accidents"
                paragraph="Losses/Damages as a result of mishaps ,collisions or crashes."
              />

              <AutoTakafulCards
                image={Theft}
                title="Theft"
                paragraph="Coverage for your losses incurred in case your car is snatched or stolen."
              />
              <AutoTakafulCards
                image={Fire}
                title="Fire"
                paragraph="Losses due to  self-ignition,explosion, lightning or frost."
              />
              <AutoTakafulCards
                image={Natural}
                title="Natural Disaster"
                paragraph="Damages due to natural events such as earthquakes, wind,floods and cyclones."
              />
              <AutoTakafulCards
                image={Damage}
                title="Transit Damages"
                paragraph="Accidents or damages sustained during vehicle motion via  road,air, lift. "
              />
              <AutoTakafulCards
                image={Riots}
                title="Averse acts and Riots"
                paragraph="Auto Takaful coverage in case of any tragic event like  riots or strikes. "
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
                          paragraph="Losses/Damages as a result of mishaps ,collisions or crashes."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Theft}
                          title="Theft"
                          paragraph="Coverage for your losses incurred in case your car is snatched or stolen."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Fire}
                          title="Fire"
                          paragraph="Losses due to  self-ignition,explosion, lightning or frost."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Natural}
                          title="Natural Disaster"
                          paragraph="Damages due to natural events such as earthquakes, wind,floods and cyclones."
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Damage}
                          title="Transit Damages"
                          paragraph="Accidents or damages sustained during vehicle motion via road, air, lift. "
                        />
                      </div>
                      <div>
                        <AutoTakafulCards
                          image={Riots}
                          title="Averse acts and Riots"
                          paragraph="Auto Takaful coverage in case of any tragic event like riots or strikes. "
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

export default AutoTakaful
