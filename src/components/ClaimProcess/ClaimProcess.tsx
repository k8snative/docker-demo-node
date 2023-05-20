import Image from 'next/image'
import { Container } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import ClaimProcessImage from '../../../public/assets/claimprocess.png'
import ClaimProcessImageMob from '../../../public/assets/mobAutoClaim.png'
import styles from './ClaimProcess.module.scss'

const ClaimProcess = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex align-items-center flex-column ${styles['container']}`}>
      <p className={styles['heading']}>
        Auto Takaful <span className={styles['headingInRed']}> Claim Process </span>
      </p>
      <p className={styles['paragraph']}>
        From the moment you make a takaful auto claim, TB aims to be fast, supportive and fair so you can get back on
        track as soon as possible.
      </p>
      <MediaQuery minWidth={430}>
        <div className={styles['imageContainer']}>
          <Image src={ClaimProcessImage} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <div className={styles['mimageContainer']}>
          <Image src={ClaimProcessImageMob} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
    </Container>
  </div>
)

export default ClaimProcess
