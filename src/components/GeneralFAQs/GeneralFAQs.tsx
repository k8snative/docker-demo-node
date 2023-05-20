import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import stepHeading from '../../../public/assets/stepHeading.png'
import styles from './GeneralFAQs.module.scss'

const EachQuestion = ({
  showFAQ,
  setShowFAQ,
  faq,
  index,
  length,
  redtxt,
}: {
  showFAQ: number
  setShowFAQ: Function
  faq: { question: string; answer: string }
  index: number
  length: number
  redtxt: Boolean
}) => {
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between ${styles['eachWrapper']}`}
        onClick={() => {
          if (showFAQ === index) {
            setShowFAQ('')
          } else {
            setShowFAQ(index)
          }
        }}
      >
        <div className={`d-flex align-items-center ${styles['eachTopRow']}`}>
          <div className={`d-flex ${styles['eachImgContainer']}`}>
            <Image priority={true} width={'100%'} height={'100%'} src={stepHeading} alt="" />
          </div>
          <p className={styles['eachQuestion']}>{faq?.question}</p>
        </div>
        <div className={`d-flex ${styles['eachImgContainerAbsolute']}`}>
          <Image
            priority={true}
            width={'100%'}
            height={showFAQ === index ? '30%' : '100%'}
            src={showFAQ === index ? minus : plus}
            alt=""
          />
        </div>
      </div>
      {/* {isOpen && <p className={styles['eachAnswer']}>{faq?.answer}</p>} */}
      {showFAQ === index && (
        <p className={styles['eachAnswer']}>
          {faq?.answer}
          {redtxt === true && <span className={styles['eachAnswer2']}>(Direct to claims page)</span>}
        </p>
      )}

      {index !== length - 1 && <div className={styles['separator']} />}
    </>
  )
}

const GeneralFAQs = ({
  heading,
  headingRed,
  para,
  mobpara,
  faqs,
  redtxt,
  showMore,
  backGroundColor,
  topSeparator,
  showMoreLink = '/products/faq',
  resetOpenedFaq,
  setResetOpenedFaq,
  linkText,
  onClick,
}: {
  heading: string
  headingRed: string
  para: string
  mobpara: string
  faqs: Array<object>
  redtxt: boolean
  showMore: boolean
  backGroundColor: string
  topSeparator: boolean
  showMoreLink?: string
  resetOpenedFaq?: boolean
  setResetOpenedFaq?: Function
  linkText?: string
  onClick?: () => void
}) => {
  const [showFAQ, setShowFAQ] = useState(-1)

  useEffect(() => {
    if (resetOpenedFaq) {
      setShowFAQ(-1)
      setResetOpenedFaq(false)
    }
  }, [resetOpenedFaq])

  return (
    <div style={{ backgroundColor: backGroundColor }} className={`${styles['wrapper']}`}>
      <Container className={`d-flex flex-column align-items-center justify-content-center ${styles['container']}`}>
        {heading && (
          <p className={styles['mainHeading']}>
            {heading} <span className={styles['mainHeadingRed']}>{headingRed}</span>
          </p>
        )}
        {para && (
          <p className={styles['mainTxt']}>
            {para}
            <span className={styles['mainTxtRed']} onClick={onClick}>
              {linkText}
            </span>
          </p>
        )}
        <MediaQuery maxWidth={600}>{mobpara && <p className={styles['mainTxt2']}>{mobpara}</p>}</MediaQuery>
        <div className={styles['wrapper']}>
          {topSeparator && <div className={styles['separator']} />}
          {faqs?.map((faq, index) => {
            if (heading) {
              if (index <= 3) {
                return (
                  <EachQuestion
                    showFAQ={showFAQ}
                    setShowFAQ={setShowFAQ}
                    redtxt={redtxt}
                    faq={faq}
                    key={index}
                    index={index}
                    length={faqs.length}
                  />
                )
              } else {
                return <></>
              }
            } else {
              return (
                <EachQuestion
                  showFAQ={showFAQ}
                  setShowFAQ={setShowFAQ}
                  redtxt={redtxt}
                  faq={faq}
                  key={index}
                  index={index}
                  length={faqs.length}
                />
              )
            }
          })}
        </div>
        {showMore && faqs?.length > 4 && (
          <div className="d-flex align-items-center justify-content-center w-100">
            <Link
              href={{
                pathname: '/products/faq',
                query: {
                  tab: showMoreLink,
                },
              }}
            >
              <p className={styles['redTxt']}>Show more</p>
            </Link>
          </div>
        )}
      </Container>
    </div>
  )
}

export default GeneralFAQs
