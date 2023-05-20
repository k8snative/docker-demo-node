import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import ourPartnerMobImg from '../../../public/assets/ourPartnerMobImg.png'
import ourPartnersStore from '../../../public/assets/ourPartnersStore.png'
import styles from './GetOurApp.module.scss'

const GetOurApp = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 450px)',
  })
  return (
    <div className={`d-flex justify-content-center align-items-center ${styles['imgWrapper']}`}>
      <div
        style={{ width: '12%' }}
        className={`${isDesktopOrLaptop ? 'd-flex' : 'd-none'} align-items-center justify-content-center`}
      >
        <Image priority={true} src={ourPartnerMobImg} alt="" />
      </div>
      <p className={styles['headingTxt2']}>Get our app</p>
      <div
        style={{ width: isDesktopOrLaptop ? '30%' : '80%' }}
        className="d-flex align-items-center justify-content-center "
      >
        <Image priority={true} src={ourPartnersStore} alt="" />
      </div>
    </div>
  )
}

export default GetOurApp
