import Image from 'next/image'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import stepHeading from '../../../public/assets/stepHeading.png'
import styles from './AutoTakafulFAQS.module.scss'

const Data = [
  {
    question: 'What is the claim process? ',
    step1: ' Call to let us know what happened',
    step2: 'Fill out the claims form and upload the required documents on the portal.',
    step3:
      'We will align a surveyor and will coordinate with the workshop on your behalf. We will make sure that your claim gets settled.For more information about the claims process click. (Direct to claims page)',
  },
  {
    question: 'What to do in case my policy document is misplaced/lost?',
    step1: 'Call to let us know what happened',
    step2: 'Fill out the claims form and upload the required documents on the portal.',
    step3:
      'We will align a surveyor and will coordinate with the workshop on your behalf. We will make sure that your claim gets settled.For more information about the claims process click. (Direct to claims page)',
  },
  {
    question: 'I have a luxury vehicle; Can I buy Takaful for it?',
    step1: 'Call to let us know what happened',
    step2: 'Fill out the claims form and upload the required documents on the portal.',
    step3:
      'We will align a surveyor and will coordinate with the workshop on your behalf. We will make sure that your claim gets settled.For more information about the claims process click. (Direct to claims page)',
  },
  {
    question: 'What are the payment methods at Takaful Bazaar?',
    step1: 'Call to let us know what happened',
    step2: 'Fill out the claims form and upload the required documents on the portal.',
    step3:
      'We will align a surveyor and will coordinate with the workshop on your behalf. We will make sure that your claim gets settled.For more information about the claims process click. (Direct to claims page)',
  },
]

const Steps = ({ faq }: { faq: FaqProps }) => (
  <div>
    <p style={{ margin: '0.2em' }}>Step 1:</p>
    <p style={{ margin: '0.2em' }}>{faq.step1}</p>
    <p style={{ margin: '0.2em' }}>Step 2:</p>
    <p style={{ margin: '0.2em' }}>{faq.step2}</p>
    <p style={{ margin: '0.2em' }}>Step 3:</p>
    <p style={{ margin: '0.2em' }}>{faq.step3}</p>
  </div>
)

type FaqProps = {
  question: string
  step1: string
  step2: string
  step3: string
}

const Question = ({ faq }: { faq: FaqProps }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between ${styles['eachWrapper']}`}
        onClick={() => setOpen(!isOpen)}
      >
        <div className={`d-flex align-items-center ${styles['eachTopRow']}`}>
          <div className={`d-flex ${styles['eachImgContainer']}`}>
            <Image width={'100%'} height={'100%'} src={stepHeading} alt="" />
          </div>

          <p className={styles['eachQuestion']}>{faq.question}</p>
        </div>
        <div className={`d-flex ${styles['eachImgContainerAbsolute']}`}>
          <Image width={'100%'} height={isOpen ? '30%' : '100%'} src={isOpen ? minus : plus} alt="" />
        </div>
      </div>
      {isOpen && <Steps faq={faq} />}
    </>
  )
}

const AutoTakafulFAQS = () => (
  <div className={styles['wrapper']}>
    <Container className={`d-flex flex-column align-items-center justify-content-center ${styles['container']}`}>
      <p className={styles['mainHeading']}>
        FAQ&apos;s related to buying<span className={styles['mainHeadingRed']}> Auto Takaful Online </span>
      </p>
      <p className={styles['mainTxt']}>
        Of course, you may have more questions related to renewing or buying auto takaful only, so scroll down and find
        your question answered!
      </p>
      <div className={styles['wrapper']}>
        {Data.map((faq, index) => (
          <Question key={index} faq={faq} />
        ))}
      </div>
    </Container>
  </div>
)

export default AutoTakafulFAQS
