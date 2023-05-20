import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

import styles from './FAQButton.module.scss'

type FaqItemProps = {
  question: String
  answer: String
}
type FaqProps = {
  txt: String
  tabName: String
  img: StaticImageData
  faq: FaqItemProps[]
  isActive: boolean
  link: string
}
const searchSetSelectedFAQ = (faq: FaqProps, setSelectedFAQ: Function, allFAQ: FaqProps[], setAllFAQ: Function) => {
  const tempData = allFAQ
  for (let i = 0; i < tempData?.length; i += 1) {
    const item = tempData[i] as FaqProps

    if (faq?.txt === item?.txt) {
      item.isActive = true
      setSelectedFAQ(item.faq)
    } else {
      item.isActive = false
    }
    tempData[i] = item
  }
  setAllFAQ(tempData)
}
const FAQButton = ({
  faq,
  setSelectedFAQ,
  allFAQ,
  setAllFAQ,
}: {
  faq: FaqProps
  selectedFAQ: FaqProps
  setSelectedFAQ: Function
  allFAQ: FaqProps[]
  setAllFAQ: Function
}) => {
  const router = useRouter()
  if (faq?.txt !== 'General')
    return (
      // <Link href={faq?.link}>
      <div
        // className="d-flex flex-column align-items-center justify-content-center"
        className={`d-flex flex-column align-items-center justify-content-center ${styles['eachBtn']}`}
        onClick={() => {
          // searchSetSelectedFAQ(faq, setSelectedFAQ, allFAQ, setAllFAQ)
          router.push({ pathname: faq?.link })
        }}
      >
        <div className={` d-flex align-items-center  ${styles['icons']}`}>
          <Image priority={true} src={faq?.img} alt="" />
        </div>
        <p className={styles['btnFAQTxt']}>{faq?.txt}</p>
      </div>
      // </Link>
    )
  return <></>
}

export default FAQButton
