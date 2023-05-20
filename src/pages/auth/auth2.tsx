import { useState } from 'react'

import Header from '../../components/Header'
import ModalForm from '../../components/ModalForm/ModalForm'

const Auth2 = () => {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      <Header />
      <ModalForm showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default Auth2
