import { Container } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import styles from './OnlineClaim.module.scss'

const OnlineClaimSteps = [
  'Inform us by following our simple 3-step claim process.',
  'File FIR in the case of loss due to accident or theft.',
  'In case of damages, wait for our surveyor to visit you at your preferred spot or where your auto is parked, or simply use our digital survey whenever or wherever you want.',
  'When the surveyor completes the survey, he’ll submit the report to the Takaful company. This way, you are eligible to get the option of cashless services to repair your vehicle.',
  'In case of auto loss or theft, the surveyor will visit, and once the process is completed, you will get the settlement of your auto Takaful claims.',
]

const OnlineClaim = () => {

  return (
    <>
      <div className={styles['wrapper']}>
        <MediaQuery minWidth={430}>
          <Container className={styles['container']}>
            <p className={styles['heading']}>
              Online Claim Process of
              <span className={styles['headingInRed']}> Auto Takaful in Pakistan</span>
            </p>
            <p className={` ${styles['autoTakafulparagraph']}`}>
            Our auto takaful claim process is as easy as purchasing auto takaful from us . With our quick service, you can easily claim auto takaful by connecting with us without any hassle of paperwork or agents.
            </p>
            <p className={` ${styles['autoTakafulparagraph']}`}>
              Just follow these simple steps to raise an auto-takaful claim:
            </p>
            <div className={` ${styles['autoTakafulparagraph']}`}>
              <ul className={styles['listStyle']}>
                {OnlineClaimSteps?.map((val, ind) => (
                  <li className={styles['checkmark']} key={ind}>
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </MediaQuery>
      </div>
    </>
  )
}

export default OnlineClaim
