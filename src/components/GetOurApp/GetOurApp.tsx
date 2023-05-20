import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import ourPartnerMobImg from '../../../public/assets/ourPartnerMobImg.png'
import googlePlay from '../../../public/assets/googlePlay.png';
import applePlay from '../../../public/assets/applePlay.png';
// import ourPartnersStore from '../../../public/assets/ourPartnersStore.png'
import styles from './GetOurApp.module.scss'

const GetOurApp = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 450px)',
  })
  return (
    <div className={`d-flex justify-content-center align-items-center ${styles['imgWrapper']}`}>
      <div
        style={{ width: '8%' }}
        className={`${isDesktopOrLaptop ? 'd-flex' : 'd-none'} align-items-center justify-content-center`}
      >
        <Image priority={true} src={ourPartnerMobImg} alt="" height={80} width={111} />
      </div>
      <div
        style={{ width: `${isDesktopOrLaptop ? '10%' : '100%'}` }}
        className={`align-items-center justify-content-center`}
      >
        <p className={styles['headingTxt2']}>Get our app</p>
      </div>
      <div
        style={{ display: 'flex' }}
        // style={{ display: `${isDesktopOrLaptop && 'flex'}` }}
        className={`${!isDesktopOrLaptop && 'align-items-center justify-content-center'}`}
      >
        <div
          style={{ width: isDesktopOrLaptop ? '50%' : '30%', margin: `${!isDesktopOrLaptop && '10px'}` }}
          className="d-flex align-items-center justify-content-center "
        >
          <Image priority={true} src={googlePlay} alt="" height={60} width={208} />
        </div>
        <div
          style={{ width: isDesktopOrLaptop ? '50%' : '30%', margin: `${!isDesktopOrLaptop && '10px'}`}}
          className="d-flex align-items-center justify-content-center "
        >
          <Image priority={true} src={applePlay} alt="" height={60} width={180} />
        </div>
      </div>
    </div>
  )
}

export default GetOurApp
