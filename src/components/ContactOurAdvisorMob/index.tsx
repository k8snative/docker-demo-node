import Image from 'next/image'
import Link from 'next/link'

import WHeadphones from '../../../public/assets/contactphone.png'
import styles from './ContactOurAdvisorMob.module.scss'

const ContactOurAdvisorMob = () => (
  <Link href="/contactUs">
    <div className={styles['mwrapper']}>
      <div className={`d-flex  align-items-center justify-content-center ${styles['mcontactadvisor']}`}>
        <div className={`d-flex ${styles['micon']}`}>
          <Image src={WHeadphones} alt="headphones" objectFit="contain" />
        </div>
        <p className={`m-0 ${styles['madvisorpara']}`}>Contact our advisor</p>
      </div>
    </div>
  </Link>
)

export default ContactOurAdvisorMob
