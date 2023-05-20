import Image from 'next/image'
import Link from 'next/link'

import Headphones from '../../../public/assets/headphones.png'
import styles from './ContactAdvisor.module.scss'

const ContactAdvisor = () => (
  <Link href="/contactUs">
    <div className={` d-flex  align-items-center justify-content-end  ${styles['contactadvisor']}`}>
      <div className={`d-flex ${styles['icon']}`}>
        <Image src={Headphones} alt="headphones" height={36} width={34} objectFit="contain" />
      </div>
      <div className={`d-flex justify-content-center  ${styles['squarediv']}`}>
        <p className={`m-0 ${styles['advisorpara']}`}>Contact Team - TB</p>
      </div>
    </div>
  </Link>
)

export default ContactAdvisor
