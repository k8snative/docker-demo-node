import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import Lottie from 'react-lottie'
import MediaQuery, { useMediaQuery } from 'react-responsive'

import whyChoose1c from '../../../public/assets/WhyChoose1c.png'
import whyChoose2c from '../../../public/assets/WhyChoose2c.png'
import whyChoose3c from '../../../public/assets/WhyChoose3c.png'
import Available from '../../../public/assets/available.png'
import Paperless from '../../../public/assets/paperless.png'
import SuperSimple from '../../../public/assets/superSimple.png'
import whyChoose1 from '../../../public/assets/whyChoose1.png'
import whyChoose2 from '../../../public/assets/whyChoose2.png'
import whyChoose3 from '../../../public/assets/whyChoose3.png'
import BannerForm from '../BannerForm/BannerForm'
import Columns from '../Columns/Columns'
import styles from './CalimFeatures.module.scss'

type CustomModalProps = {
  open: boolean
  renderComponent: ReactNode
  setOpen: Function
}

const CustomModal = ({ open, renderComponent, setOpen }: CustomModalProps) => (
  <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={setOpen} show={open}>
    {renderComponent}
  </Modal>
)
const HoverableImage = ({
  defaultImage,
  hoverImage,
  altText = 'image',
  ...props
}: {
  defaultImage: string
  hoverImage: string
  altText: string
}) => {
  const [isHovering, setIsHovered] = useState(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Image priority={true} src={isHovering ? hoverImage : defaultImage} alt={altText} {...props} />
    </div>
  )
}
const EachColumn = ({
  img,
  image,
  heading,
  paraTxt,
  modalTxt,
  modalRedTxt,
  onClick,
}: {
  img: StaticImageData
  image: string
  heading: string
  paraTxt: string
  modalTxt: string
  modalRedTxt: string
  onClick: () => void
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [divOpen, setDivOpen] = useState(false)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })

  return (
    <Col
      className={`d-flex flex-column align-items-center justify-content-between ${styles['col']}`}
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={4}
      // xs (for phones - screens less than 768px wide)
      // sm (for tablets - screens equal to or greater than 768px wide)
      // md (for small laptops - screens equal to or greater than 992px wide)
      // lg (for laptops and desktops - screens equal to or greater than 1200px wide)
    >
      <div className={styles['imagecontainer']}>
        <HoverableImage width={150} height={150} defaultImage={img} hoverImage={`/assets/${image}`} alt={'abc'} />
      </div>
      <p className={styles['whychooseHeadingtxt']}>{heading}</p>
      <div className="h-25 w-100 d-flex flex-column align-items-center justify-content-between">
        <p className={`${styles['whychoosetxt']}`}>{paraTxt}</p>
        <p
          className={divOpen && isDesktopOrLaptop ? styles['empty'] : styles['whychoosetxtRed']}
          onClick={
            isDesktopOrLaptop
              ? () => {
                  setDivOpen(true)
                }
              : () => setModalOpen(true)
          }
        >
          {divOpen && isDesktopOrLaptop ? '' : 'Read More..'}
        </p>
      </div>
      {divOpen && isDesktopOrLaptop ? (
        <div className={styles['modalContainer']}>
          <span className={styles['cross']} onClick={() => setModalOpen(false)}>
            X
          </span>
          <div className="px-2">
            <p className={styles['modalHeading']}>{heading}</p>

            <p className={styles['modalsubTxt']}>{modalTxt}</p>
            <p className={styles['whychoosetxtRed']} onClick={onClick}>
              {modalRedTxt}
            </p>
          </div>
        </div>
      ) : null}

      <CustomModal
        open={modalOpen}
        setOpen={() => setModalOpen(false)}
        renderComponent={
          <div className={styles['modalContainer']}>
            <span className={styles['cross']} onClick={() => setModalOpen(false)}>
              X
            </span>
            <div className="px-2">
              <p className={styles['modalHeading']}>{heading}</p>

              <p className={styles['modalsubTxt']}>{modalTxt}</p>
              <p className={styles['whychoosetxtRed']} onClick={onClick}>
                {modalRedTxt}
              </p>
            </div>
          </div>
        }
      />
    </Col>
  )
}

const CalimFeatures = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  const router = useRouter()
  const raisedClaim = () => {
    window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}register-claims/auto`)
  }
  const contactUs = () => {
    router.push('/products/contactUs')
  }
  const getStarted = () => {
    router.push('/auth/auth')
  }
  return (
    <div className={styles['wrapper']}>
      {/* <MediaQuery maxWidth={430}>
        <div className={` ${styles['CategoriesBottonsMobileContainer']}`}>
          <BannerForm />
        </div>
      </MediaQuery> */}

      <Container className={styles['whatIsAutoTakaful']}>
        <p className={styles['heading']}>
          Takaful Bazaar <span className={styles['autoTakafulRedText']}>Claim Features</span>
        </p>
        <Row className={`d-flex align-items-start justify-content-around ${styles['row']}`}>
          <EachColumn
            heading="We’re Super Simple"
            paraTxt="Takaful Bazaar offers a simple 3-step online claim process."
            modalTxt="
            You can face damages and thefts, but it doesn’t mean that you & your family have to bear the long & tiring claim process when you are already struggling in your hard times. Takaful Bazaar offers a simple 3-step online claim process; this can be done in minutes at your convenience.
            "
            modalRedTxt="Raise a Claim"
            img={isDesktopOrLaptop ? whyChoose1c : whyChoose1}
            image={'WhyChoose1c.png'}
            onClick={raisedClaim}
          />

          <EachColumn
            heading="We’re Paperless"
            paraTxt="Our digital claim makes the whole coverage process easier & simpler."
            modalTxt="
            No one wants to take time to fill out an extensive claim form, especially when you want to file a claim as early as possible. That’s why Takaful Bazaar has introduced a hassle-free and partial digital claim process. Now you can check the status of your claim online anytime, anywhere.
            "
            modalRedTxt="Get Started"
            img={isDesktopOrLaptop ? whyChoose2c : whyChoose2}
            image={'WhyChoose2c.png'}
            onClick={getStarted}
          />
          <EachColumn
            img={isDesktopOrLaptop ? whyChoose3c : whyChoose3}
            image={'WhyChoose3c.png'}
            heading="We’re Available 24/7!"
            paraTxt="Get instant assistance after theft or damage on your auto claims. "
            modalTxt="
            Want to make a claim immediately after an accident or loss? No need to wait, as TB’s hardworking customer service agents are available day & night to give you immediate assistance with your claim needs.
            "
            modalRedTxt="Hello Team-TB"
            onClick={contactUs}
          />
        </Row>
      </Container>
    </div>
  )
}

export default CalimFeatures
