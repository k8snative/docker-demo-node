import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import Lottie from 'react-lottie'
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'

import AutoTakaful from '../../../public/assets/autotakaful.json'
import Banner from '../../../public/assets/mbanner.json'
import BannerForm from '../BannerForm/BannerForm'
import styles from './WhatIsAutoTakaful.module.scss'

type CustomModalProps = {
  open: boolean
  renderComponent: ReactNode
  setOpen: Function
}

const CustomModal = ({ open, renderComponent, setOpen }: CustomModalProps) => (
  <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={setOpen} show={open}>
    {renderComponent}
  </Modal>
)
const WhatIsAutoTakaful = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [divOpen, setDivOpen] = useState(false)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  const router = useRouter()
  return (
    <div className={styles['wrapper']}>
      <MediaQuery maxWidth={430}>
        <div className={` ${styles['CategoriesBottonsMobileContainer']}`}>
          <BannerForm />
        </div>
      </MediaQuery>

      <Container className={styles['whatIsAutoTakaful']}>
        <p className={styles['heading']}>
          What is <span className={styles['autoTakafulRedText']}>My Auto Takaful</span>?
        </p>
        <p className={` ${styles['autoTakafulparagraph']}`}>
          Having a satisfactory functioning car is a basic necessity in Pakistan. Because life is spontaneous, and you
          never know when troubles beep and come in front of your vehicle, even when you have no doubts about your
          driving skills.
        </p>
        <p
          className={divOpen && isDesktopOrLaptop ? styles['empty'] : styles['whychoosetxtRed']}
          onClick={isDesktopOrLaptop ? () => setDivOpen(true) : () => setModalOpen(true)}
        >
          {divOpen && isDesktopOrLaptop ? '' : 'Read More..'}
        </p>
        <CustomModal
          open={modalOpen}
          setOpen={() => setModalOpen(false)}
          renderComponent={
            <div className={styles['modalContainer']}>
              <p className={styles['modalHeading']}>What is My Auto Takaful?</p>
              <p className={styles['modalsubTxt']}>
                Having a satisfactory functioning car is a basic necessity in Pakistan. Because life is spontaneous, and
                you never know when troubles beep and come in front of your vehicle, even when you have no doubts about
                your driving skills.
                <br />
                <br /> My Auto takaful is non- conventional Islamic car insurance that works on the concept of ‘sharing
                is caring. It requires contributions to a fund that each participant supports.
                <br />
                <br /> With Takaful Bazaar’s auto-takaful policy comparisons, pick up the best deals with the add-ons
                that suit your needs.
                <br />
                <br /> When you purchase a policy from Takaful Bazaar, rest assured & be relieved from the tension of
                auto theft and damage by following our swift & simple 3-steps claim process.
              </p>
              <p className={styles['modalsubTxtRed']} onClick={() => router.push('/productPlan')}>
                Compare and Get Your AutoTakaful Now
              </p>
            </div>
          }
        />
        {divOpen && isDesktopOrLaptop ? (
          <div className={styles['modalContainer2']}>
            <p className={styles['autoTakafulparagraph']}>
              My Auto takaful is non- conventional Islamic car insurance that works on the concept of ‘sharing is
              caring. It requires contributions to a fund that each participant supports.
              <br /> With Takaful Bazaar’s auto-takaful policy comparisons, pick up the best deals with the add-ons that
              suit your needs.
              <br /> When you purchase a policy from Takaful Bazaar, rest assured & be relieved from the tension of auto
              theft and damage by following our swift & simple 3-steps claim process.
            </p>
            <p className={styles['modalsubTxtRed']} onClick={() => router.push('/productPlan')}>
              Compare and Get Your AutoTakaful Now
            </p>

            <p className={styles['whychoosetxtRed']} onClick={() => setDivOpen(false)}>
              Show less
            </p>
          </div>
        ) : null}
      </Container>
      <MediaQuery minWidth={700}>
        <div className={styles['imageContainer']}>
          <Lottie
            // speed={0.6}
            options={{
              loop: true,
              autoplay: true,
              animationData: AutoTakaful,

              rendererSettings: {
                preserveAspectRatio: 'xMidYMin slice',
              },
            }}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <div className={styles['imageContainer']}>
          <Lottie
            // speed={0.6}
            options={{
              loop: true,
              autoplay: true,
              animationData: Banner,
              rendererSettings: {
                preserveAspectRatio: 'xMinYMin  slice',
              },
            }}
          />
        </div>
      </MediaQuery>
    </div>
  )
}

export default WhatIsAutoTakaful
