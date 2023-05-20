import Image, { StaticImageData } from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import step1 from '../../../public/assets/step1.png'
import step2 from '../../../public/assets/step2.png'
import step3 from '../../../public/assets/step3.png'
import stepHeading from '../../../public/assets/stepHeading.png'
import styles from './TakafulBazaarPlans.module.scss'

const TriStepsMob = ({
  img,
  headingNo,
  heading,
  txt,
}: {
  img: StaticImageData
  headingNo: Number
  heading: String
  txt: String
}) => (
  <div className={`d-flex justify-content-around align-items-center ${styles['triStepMob']}`}>
    {headingNo !== 2 ? (
      <>
        <div className={styles['triStepMobImgContainer']}>
          <Image priority={true} src={img} alt="" />
        </div>
        <div className={styles['triStepMobRightContainer']}>
          <div className={`d-flex align-items-center`}>
            <div className={styles['stepRowMob']}>
              <Image priority={true} width={'100%'} height={'100%'} src={stepHeading} alt="" />
            </div>
            <p className={styles['stepHeadingMob']}>{heading}</p>
          </div>
          <p className={styles['stepTxtMob']}>{txt}</p>
        </div>
      </>
    ) : (
      <>
        <div className={styles['triStepMobRightContainerSecond']}>
          <div className={`d-flex align-items-center`}>
            <div className={styles['stepRowMob']}>
              <Image priority={true} width={'100%'} height={'100%'} src={stepHeading} alt="" />
            </div>
            <p className={styles['stepHeadingMob']}>{heading}</p>
          </div>
          <p className={styles['stepTxtMob']}>{txt}</p>
        </div>
        <div className={styles['triStepMobImgContainer']}>
          <Image priority={true} src={img} alt="" />
        </div>
      </>
    )}
  </div>
)

const TriSteps = ({ img, heading, txt }: { img: StaticImageData; heading: string; txt: String }) => (
  <Col xs={3} sm={3} md={3} lg={3} xl={3} className={`d-flex align-items-center flex-column ${styles['col']}`}>
    <div className={styles['colImgCont']}>
      <Image priority={true} src={img} alt="" />
    </div>
    <div className={styles['col2ndRow']}>
      <div className={`d-flex align-items-center`}>
        <div className={styles['stepRow']}>
          <Image priority={true} width={'100%'} height={'100%'} src={stepHeading} alt="" />
        </div>
        <p className={styles['stepHeading']}>{heading}</p>
      </div>
      <p className={styles['stepTxt']}>{txt}</p>
    </div>
  </Col>
)

const TakafulBazaarPlansWeb = () => (
  <div className={styles['wrapper']}>
    <Container className={styles['container']}>
      <Row className={` ${styles['row']}`}>
        <Col className={`d-flex flex-column align-items-center ${styles['col']}`}>
          <p className={` ${styles['colHeading']}`}>
            Three Steps To Buying
            <span className={` ${styles['redTxt']}`}> the Right Takaful Plan</span>
          </p>
          {/* <p className={` ${styles['subTxt']}`}>Get covered in 3 simple steps</p> */}
        </Col>
      </Row>
      <Row className={`d-flex ${styles['row']}`}>
        <TriSteps img={step1} heading="Click" txt="Just fill in a few simple details to get started" />
        <TriSteps img={step2} heading="Compare" txt="Find the best products and prices from Pakistan’s leading Takaful Companies" />
        <TriSteps img={step3} heading="Cover" txt="Get covered from your choice of Takaful provider" />
      </Row>
    </Container>
  </div>
)
const TakafulBazaarPlansMob = () => (
  <div className={`d-flex flex-column align-items-center align-items-center ${styles['mobContain']}`}>
    {/* <p className={styles['mobHeading']}>Three Steps To Buying The Right Coverage</p> */}
    {/* <p className={styles['mobtxt']}>Get covered in 3 simple steps</p> */}
    <TriStepsMob img={step1} headingNo={1} heading="Click" txt="Just fill in a few simple details" />
    <TriStepsMob img={step2} headingNo={2} heading="Compare" txt="Find the best products and prices from Pakistan’s leading Takaful Companies" />
    <TriStepsMob img={step3} headingNo={3} heading="Cover" txt="Get covered from your choice of Takaful provider" />
  </div>
)

const TakafulBazaarPlans = () => (
  <>
    <MediaQuery minWidth={540}>
      <TakafulBazaarPlansWeb />
    </MediaQuery>
    <MediaQuery maxWidth={540}>
      <TakafulBazaarPlansMob />
    </MediaQuery>
  </>
)

export default TakafulBazaarPlans
