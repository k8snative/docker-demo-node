import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import whyChoose1c from '../../public/assets/WhyChoose1c.png'
import whyChoose2c from '../../public/assets/WhyChoose2c.png'
import whyChoose3c from '../../public/assets/WhyChoose3c.png'
import whyChoose4c from '../../public/assets/WhyChoose4c.png'
import whyChoose5c from '../../public/assets/WhyChoose5c.png'
import whyChoose6c from '../../public/assets/WhyChoose6c.png'
import whyChoose1 from '../../public/assets/whyChoose1.png'
import whyChoose2 from '../../public/assets/whyChoose2.png'
import whyChoose3 from '../../public/assets/whyChoose3.png'
import whyChoose4 from '../../public/assets/whyChoose4.png'
import whyChoose5 from '../../public/assets/whyChoose5.png'
import whyChoose6 from '../../public/assets/whyChoose6.png'
import styles from '../styles/WhyChooseUs.module.scss'

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
  modalText,
  modalHeading,
}: {
  img: StaticImageData
  image: string
  heading: string
  paraTxt: string
  modalText: string
  modalHeading: string
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [divOpen, setDivOpen] = useState(false)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.data.user)
  console.log('user details', user)
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
        <div className={styles['modalContainer2']}>
          <div className={styles['lists']}>
            <div>
              <p className={styles['whychoosetxt']}>{modalText}</p>
            </div>
            {user ? (
              ''
            ) : (
              <p className={styles['signUpText']} onClick={() => router.push('/auth/auth')}>
                Sign Up Now!
              </p>
            )}
          </div>

          <p className={styles['whychoosetxtRed']} onClick={() => setDivOpen(false)}>
            Show less
          </p>
        </div>
      ) : null}

      <CustomModal
        open={modalOpen}
        setOpen={() => setModalOpen(false)}
        renderComponent={
          <div className={styles['modalContainer']}>
            <p className={styles['modalHeading']}>{modalHeading}</p>
            <div>
              <p className={styles['modalTxt']}>{modalText}</p>
            </div>
            {user ? (
              ''
            ) : (
              <p className={styles['signUpText']} onClick={() => router.push('/auth/auth')}>
                Sign Up Now!
              </p>
            )}
          </div>
        }
      />
    </Col>
  )
}

const WhyChooseUs = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  const ColumnData = [
    {
      heading: 'Super-Simple Claims',
      paraTxt: 'We keep it simple by speaking your language and avoiding',
      img: isDesktopOrLaptop ? whyChoose1c : whyChoose1,
      image: 'WhyChoose1c.png',
      modalHeading: 'Super-Simple Claims',
      modalText: isDesktopOrLaptop
        ? 'complicated  insurance  terms so,  you  know  exactly  what you’re  paying  for.  Takaful Bazaar  brings  you  simple,easy  and  user-friendly  claims management.  Enjoy  exclusive discounts  and  more  in  2  easy steps '
        : 'We keep it simple by speaking your  language  and  avoiding  complicated  insurance  terms so,  you  know  exactly  what you’re  paying  for.  Takaful Bazaar  brings  you  simple,easy  and  user-friendly  claims management.  Enjoy  exclusive discounts  and  more  in  2  easy steps',
    },
    {
      heading: 'Zero Documentation',
      paraTxt: 'Forget about searching for the list of documents and worrying',
      img: isDesktopOrLaptop ? whyChoose2c : whyChoose2,
      image: 'WhyChoose2c.png',
      modalHeading: 'Zero Documentation',
      modalText: isDesktopOrLaptop
        ? 'about paper loss. Now, with Takaful bazaar, you can scan and upload all important information and documents with just a few clicks'
        : 'Forget about searching for the list of documents and worrying about paper loss. Now, with Takaful bazaar, you can scan and upload all important information and documents with just a few clicks',
    },
    {
      heading: '24/7 Available',
      paraTxt: 'Team-TB is here for you in the toughest of times. Weathers it’s a...',
      img: isDesktopOrLaptop ? whyChoose3c : whyChoose3,
      image: 'WhyChoose3c.png',
      modalHeading: '24/7 Available',

      modalText: isDesktopOrLaptop
        ? 'claim or inquiry – We provide 24-hour assistance through Calls, emails & WhatsApp for our customers. Our incredible Team-TB is always at your service.'
        : 'Team-TB is here for you in the toughest of times. Weathers it’s a claim or inquiry – We provide 24-hour assistance through Calls, emails & WhatsApp for our customers. Our incredible Team-TB is always at your service.',
    },
    {
      heading: 'Transparency and Reliability',
      paraTxt: 'Transparency is TB philosophy. You won’t be hit with hidden',
      img: isDesktopOrLaptop ? whyChoose4c : whyChoose4,
      image: 'WhyChoose4c.png',
      modalHeading: 'Transparency and Reliability',
      modalText: isDesktopOrLaptop
        ? 'fees or  additional  charges.  The takaful bazaar paves the way for digital  trust  and  ensures  a seamless  customer  experience with  full  transparency  and accountability  through  simpler processes  and  comprehensive takaful products.'
        : 'Transparency  is  TB  philosophy. You won’t be hit with hidden fees or  additional  charges.  The takaful bazaar paves the way for digital  trust  and  ensures  a seamless  customer  experience with  full  transparency  and accountability  through  simpler processes  and  comprehensive takaful products.',
    },
    {
      heading: 'Unbiased Advice',
      paraTxt: 'Incomparable  Fairness  and  Expertise,  with Takaful bazaar, ',
      img: isDesktopOrLaptop ? whyChoose5c : whyChoose5,
      image: 'WhyChoose5c.png',
      modalHeading: 'Unbiased Advice ',

      modalText: isDesktopOrLaptop
        ? 'matching to your perfect adviser is easy,  fast  and  free.  Enriched  with  immense  industry  experience, advisors from Team-TB can help you  choose the best products for your circumstances,  so you cover yourself to the right level of risk and  dont  waste  money  on  unsuitable  policies.  Make  insurance decisions with confidence and peace of  mind.  100%  unbiased  comparisons,  reviews  and  recommendations you can trust'
        : 'Incomparable Fairness and Expertise, with Takaful bazaar, matching to your perfect adviser is easy,  fast  and  free.  Enriched  with  immense  industry  experience, advisors from Team-TB can help you  choose the best products for your circumstances,  so you cover yourself to the right level of risk and  dont  waste  money  on  unsuitable  policies.  Make  insurance decisions with confidence and peace of  mind.  100%  unbiased  comparisons,  reviews  and  recommendations you can trust',
    },
    {
      heading: 'Lowest Contribution Rates',
      paraTxt: 'Bringing the best deals and discounts from across the industry ',
      img: isDesktopOrLaptop ? whyChoose6c : whyChoose6,
      image: 'WhyChoose6c.png',
      modalHeading: 'Lowest Contribution Rates',

      modalText: isDesktopOrLaptop
        ? ' We’re on a mission to make Takaful accessible,  affordable, and ultimately a household brand. Now with takaful bazaar, you can not only compare rates, track your  expenses, but also get a birds eye view of the most discounted rates for Takaful products.'
        : 'Bringing the best deals and discounts from across the industry - We’re on a mission to make Takaful accessible,  affordable, and ultimately a household brand. Now with takaful bazaar, you can not only compare rates, track your  expenses, but also get a birds eye view of the most discounted rates for Takaful products.',
    },
  ]

  return (
    <div className={styles['wrapper']}>
      <Container className={styles['container']}>
        <p className={styles['whyChooseHeading']}>
          Why <span className={styles['TakafulRedText']}>Takaful Bazaar</span> ?{' '}
        </p>
        <p className={styles['factsText']}>Fast Facts About Takaful Bazaar</p>
        <Row className={styles['row']}>
          {ColumnData.map((data, index) => (
            <EachColumn
              heading={data.heading}
              paraTxt={data.paraTxt}
              img={data.img}
              image={data.image}
              modalHeading={data.modalHeading}
              modalText={data.modalText}
            />
          ))}

          {/* <EachColumn
            heading="Zero Documentation"
            paraTxt="Forget about searching for the list
            of documents and worrying"
            img={isDesktopOrLaptop ? whyChoose2c : whyChoose2}
            image={'WhyChoose2c.png'}
          />
          <EachColumn
            heading="24/7 Available"
            paraTxt="Team-TB is here for you in the
            toughest of times. Weathers it’s a..."
            img={isDesktopOrLaptop ? whyChoose3c : whyChoose3}
            image={'WhyChoose3c.png'}
          /> */}
          {/* <EachColumn
            heading="Transparency and Reliability"
            paraTxt="Transparency is TB philosophy. You won’t
            be hit with hidden"
            img={isDesktopOrLaptop ? whyChoose4c : whyChoose4}
            image={'WhyChoose4c.png'}
          /> */}
          {/* <EachColumn
            heading="Unbiased Advice"
            paraTxt="Incomparable  Fairness  and  Expertise,  with
            Takaful bazaar, "
            img={isDesktopOrLaptop ? whyChoose5c : whyChoose5}
            image={'WhyChoose5c.png'}
          /> */}
          {/* <EachColumn
            // heading="Lowest Contribution Rates"
            // paraTxt="Bringing the best deals and discounts from across the
            // industry "
            // img={isDesktopOrLaptop ? whyChoose6c : whyChoose6}
            // image={'WhyChoose6c.png'}
          /> */}
        </Row>
      </Container>
    </div>
  )
}

export default WhyChooseUs
