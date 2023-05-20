import Image from 'next/image'
import { Container } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import Lottie from 'react-lottie'
import ClaimProcessImage from '../../../public/assets/claimprocess.png'
import ClaimProcessImageMob from '../../../public/assets/mobAutoClaim.png'
import styles from './ClaimProcess.module.scss'
import ClaimTakaful from '../../../public/assets/3_step_claims_animation.gif'
import AutoTakafull from '../../../public/assets/autotakaful.json'

const ClaimProcess = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex align-items-center flex-column ${styles['container']}`}>
      <p className={styles['heading']}>
        Auto Takaful <span className={styles['headingInRed']}> Claim Process </span>
      </p>
      {/* <p className={styles['paragraph']}>
        To ensure you get the fastest service on your auto claims, we have supportive, fast & fair staff that works round the clock so you can get back on track as soon as possible.
      </p> */}
      
      {/* <MediaQuery minWidth={430}>
        <div className={styles['imageContainer']}>
          <Image src={ClaimProcessImage} alt="autotakafulbanner" />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <div className={styles['mimageContainer']}>
          <Image src={ClaimProcessImageMob} alt="autotakafulbanner" />
        </div>
      </MediaQuery> */}
    </Container>
    <div>
      <Image src={ClaimTakaful}     
        alt ="ClaimTakaful"                    
        // layout="fill"
        height={600}        
        objectFit='scale-down'
     />
      </div>
  </div>
)

export default ClaimProcess
