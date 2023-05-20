import { StaticImageData } from 'next/image'
import { useState } from 'react'

import HealthCircle from '../../../public/assets/HealthCircle.png'
import LifeCircle from '../../../public/assets/LifeCircle.png'
import MotorCircle from '../../../public/assets/MotorCircle.png'
import TravelCircle from '../../../public/assets/TravelCircle.png'
import FAQButtonBanner from '../FAQButtonBanner/FAQButtonBanner'
import styles from './CategoriesBottons.module.scss'

type FaqItemProps = {
  question: String
  answer: String
}
type FaqProps = {
  txt: String
  tabName: String
  img: StaticImageData
  faq: FaqItemProps[]
  link: String
  isActive: boolean
}

const dummyData = [
  {
    txt: 'General',
    tabName: "General FAQ's",
    img: MotorCircle,
    isActive: true,
    link: '/health',
  },
  {
    txt: 'Auto',
    tabName: "Auto Takaful FAQ's",
    img: MotorCircle,
    isActive: false,
    link: '/auto',
  },
  {
    txt: 'Health',
    tabName: "Health Takaful FAQ's",
    img: HealthCircle,
    isActive: false,
    link: '/health',
  },
  {
    txt: 'Life',
    tabName: "Life Takaful FAQ's",
    img: LifeCircle,
    isActive: false,
    link: '/life',
  },
  {
    txt: 'Travel',
    tabName: "Travel Takaful FAQ's",
    img: TravelCircle,
    isActive: false,
    link: '/travel',
  },
]

const CategoriesBottons = () => {
  const [allFAQ, setAllFAQ] = useState<FaqProps[]>(dummyData)
  const [selectedFAQ, setSelectedFAQ] = useState(allFAQ[0]?.faq)
  return (
    <div
      className={`px-2 w-100 d-flex align-items-center justify-content-around ${styles['wrapper']}`}
      // style={{ border: '5px solid blue' }}
    >
      {dummyData.map((cat, index) => (
        <FAQButtonBanner
          allFAQ={allFAQ}
          setAllFAQ={setAllFAQ}
          selectedFAQ={selectedFAQ}
          setSelectedFAQ={setSelectedFAQ}
          link={cat.link}
          faq={cat}
          key={index}
        />
      ))}
    </div>
  )
}

export default CategoriesBottons
