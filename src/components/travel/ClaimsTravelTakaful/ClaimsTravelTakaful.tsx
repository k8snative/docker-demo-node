import Image from 'next/image'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

import Accident from '~public/assets/Accident.png'
import Damage from '~public/assets/Damage.svg'
import Fire from '~public/assets/Fire.png'
import Natural from '~public/assets/Natural.png'
import Riots from '~public/assets/Riots.png'
import Theft from '~public/assets/Theft.png'
import RArrow from '~public/assets/rightarrow.png'
import AutoTakafulCards from '../Cards/Cards'
import styles from './ClaimsTravelTakaful.module.scss'

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

const ClaimsTravelTakaful = () => {
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
              How We are Doing 
              <span className={styles['headingInRed']}> Better Than Others?</span>
            </p>
            <p className={` ${styles['autoTakafulparagraph']}`}>
              Pakistan's traditional insurance claims have various characteristics that are contrary to some of the
              fundamental values of Islamic financial claims. Traditional insurance operates on the practice and
              philosophy of charging interest, and the risk is simply transferred from the insured to the insurer.
            </p>
            <p className={` ${styles['autoTakafulparagraph']}`}>
              On the other hand, Takaful is based on cooperation, protection, and connection. It’s an agreement between
              groups of people who decide to jointly repay damage or loss from a fund they contribute to collectively.
            </p>
            <p className={` ${styles['autoTakafulparagraph']}`}>
              Takaful Bazaar’s claim is a legal request by a takaful participant /policyholder to the takaful operator
              describing the accident/misfortune that has affected him/her & request for compensation as agreed in the
              takaful policy.
            </p>
          </Container>
        </MediaQuery>
      </div>
    </>
  )
}

export default ClaimsTravelTakaful
