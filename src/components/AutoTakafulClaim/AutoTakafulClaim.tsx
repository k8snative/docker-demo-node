import Image from 'next/image'
import { Container } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

// import AutoTakafulBanner2 from '../../../public/assets/AutoTakafulBanner2.png'
import AutoTakafulBanner from '../../../public/assets/CoverageBanner.svg'
import styles from './AutoTakafulClaim.module.scss'

const AutoTakafulClaim = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex align-items-center flex-column ${styles['container']}`}>
      <p className={styles['heading']}>
        Three Steps to <span className={styles['headingInRed']}> Buying the Right Coverage</span>
      </p>
      <p className={styles['paragraph']}>Get covered with Takaful Bazaar in three easy steps!</p>
      <MediaQuery minWidth={430}>
        <div className={styles['imageContainer']}>
          <Image src={AutoTakafulBanner} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <div className={styles['mimageContainer']}>
          <Image src={AutoTakafulBanner} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
    </Container>
  </div>
)

export default AutoTakafulClaim
