import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'

import whatIsTakaful from '../../public/assets/whatIsTakaful.png'
import whatIsTakafulMob from '../../public/assets/whatIsTakafulMob.png'
import styles from '../styles/WhatIsTakaful.module.scss'

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
const WhatIsTakafulWeb = ({ user }: { user: any }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [divOpen, setDivOpen] = useState(false)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  const router = useRouter()

  return (
    <div className={styles['wrapper']}>
      <Container className={styles['whatIsTakaful']}>
        <p className={styles['whatIsTakafulHeading']}>
          The Concept of <span className={styles['whatIsTakafulHeadingRed']}>Takaful</span>!
        </p>
        <p className={styles['whatIsTakafultxt']}>
          In Pakistan, there is a dire need for a Shariah-Compliant insurance solution, as traditional insurance has
          certain features that contradict some important principles of Islamic financial contracts. Recognizing the
          need to expand the safety net and the context of the fact that Muslims are guided by their faith to follow the
          path of justice in their daily lives, Takaful Bazaar has launched an end-to- end digital and fully Shariah-
          compliant Takaful Ecosystem.
        </p>
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
        <CustomModal
          open={modalOpen}
          setOpen={() => setModalOpen(false)}
          renderComponent={
            <div className={styles['modalContainer']}>
              <p className={styles['modalHeading']}>The Concept Of Takaful!</p>
              <p className={styles['modalsubTxt']}>
                In Pakistan, there is a dire need for a Shariah- complaint insurance solution, as traditional insurance
                has certain features that contradict some important principles of Islamic financial contracts.
                Recognizing the need to expand the safety net and the context of the fact that Muslims are guided by
                their faith to follow the path of justice in their daily lives, Takaful Bazaar has launched an
                end-to-end digital and fully Shariah- compliant Takaful Ecosystem.
                <br />
                <br /> Takaful, an Arabic word meaning “guaranteeing each other," is the same as insurance but approved
                under the principles of Sharia guidelines. It’s an Islamic insurance concept based on brotherhood and
                mutual welfare in which partners pay contributions to support and cover each other in case of an
                accident or damage to one’s life or property.
                <br />
                <br /> The concept of protection is deeply rooted in Islamic history, encouraged by the Holy Prophet
                (SAWS), and practiced by Muslims all over the world, which validates the basis of takaful or mutual
                protection or Sharia-complaint insurance.
                <br />
                <br /> Together with the committee of prominent Sharia scholars under Mr. Taqi Usmani, we ensure that
                the existence of Takaful Bazaar is based on the principles of Islam, brotherhood, protection, and mutual
                responsibility, which completely avoids acts of interest (riba), gambling (al-Maisir) and uncertainty
                (al-Gharar).
              </p>
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
      </Container>
      <div className={styles['imgContainer']}>
        <Image priority={true} src={whatIsTakaful} alt="" />
      </div>
    </div>
  )
}

const WhatIsTakafulMob = ({ user }: { user: any }) => {
  const [divOpen, setDivOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })
  return (
    <div className={styles['wrapperMobile']}>
      <Container className={styles['whatIsTakaful']}>
        <p className={styles['whatIsTakafulHeadingMobile']}>
          The Concept of <span className={styles['whatIsTakafulHeadingRed']}>Takaful</span>!
        </p>
        <p className={styles['whatIsTakafultxtMobile']}>
          In Pakistan, there is a dire need for a Shariah-Compliant insurance solution, as traditional insurance has
          certain features that contradict some important principles of Islamic financial contracts. Recognizing the
          need to expand the safety net and the context of the fact that Muslims are guided by their faith to follow the
          path of justice in their daily lives, Takaful Bazaar has launched an end-to- end digital and fully Shariah-
          compliant Takaful Ecosystem.
        </p>
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
        {divOpen && isDesktopOrLaptop ? (
          <div className={styles['modalContainer2']}>
            <p className={styles['whatIsTakafultxtMobile']}>
              Takaful, an Arabic word meaning “guaranteeing each other," is the same as insurance but approved under the
              principles of Sharia guidelines. It’s an Islamic insurance concept based on brotherhood and mutual welfare
              in which partners pay contributions to support and cover each other in case of an accident or damage to
              one’s life or property.
              <br /> The concept of protection is deeply rooted in Islamic history, encouraged by the Holy Prophet
              (SAWS), and practiced by Muslims all over the world, which validates the basis of takaful or mutual
              protection or Sharia-complaint insurance.
              <br /> Together with the committee of prominent Sharia scholars under Mr. Taqi Usmani, we ensure that the
              existence of Takaful Bazaar is based on the principles of Islam, brotherhood, protection, and mutual
              responsibility, which completely avoids acts of interest (riba), gambling (al-Maisir) and uncertainty
              (al-Gharar).
            </p>
            {user ? (
              ''
            ) : (
              <p className={styles['signUpText']} onClick={() => router.push('/auth/auth')}>
                Sign Up Now!
              </p>
            )}
            <p className={styles['whychoosetxtRed']} onClick={() => setDivOpen(false)}>
              Show less
            </p>
          </div>
        ) : null}
      </Container>
      <div className={styles['imgContainerMobile']}>
        <Image priority={true} style={{ zIndex: 1 }} src={whatIsTakafulMob} alt="" />
        <div className={styles['imgContainerMobileBottom']}></div>
      </div>
    </div>
  )
}

const WhatIsTakaful = () => {
  const user = useSelector((state: any) => state.auth.data.user)
  console.log('user details', user)
  return (
    <>
      <MediaQuery minWidth={700}>
        <WhatIsTakafulWeb user={user} />
      </MediaQuery>
      <MediaQuery maxWidth={700}>
        <WhatIsTakafulMob user={user} />
      </MediaQuery>
    </>
  )
}

export default WhatIsTakaful
