import Image, { StaticImageData } from 'next/image'
import { ReactNode, useState } from 'react'
import { Col, Modal } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import Cross from '../../../public/assets/cardcross.png'
import styles from './Columns.module.scss'

type AllColumnsProps = {
  image: StaticImageData
  heading: string
  text: string
  modalHeading: string
  modalText: string
  link: string
  onClick: () => void
}
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
const Columns = ({ image, heading, text, modalHeading, modalText, onClick, link }: AllColumnsProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={4} className={`d-flex flex-column align-items-center ${styles['col']}`}>
      <Image width="180px" height="160px" src={image} alt="" />
      <p className={styles['headingText']}>{heading}</p>
      <p className={styles['paraText']}>{text}</p>
      {/* <p className={styles['whychoosetxtRed']} onClick={() => setModalOpen(true)}>
        Read More..
      </p> */}
      <CustomModal
        open={modalOpen}
        setOpen={() => setModalOpen(false)}
        renderComponent={
          <div>
            <div className={styles['modalContainer']}>
              <p className={styles['modalHeading']} style={{display: 'flex', justifyContent: 'space-between'}}>{modalHeading} <span className={styles['crossBtn']} onClick={() => setModalOpen(false)}><Image src={Cross} alt="" width={10} height={10} /></span></p>
              <p className={styles['modalsubTxt']}>{modalText}</p>
              <p className={styles['modalsubTxtRed']} onClick={onClick}>
                {link}
              </p>
            </div>
            <div></div>
          </div>
        }
      />
    </Col>
  )
}

export default Columns
