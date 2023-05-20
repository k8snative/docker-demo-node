import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'

import HealthCircle from '../../../public/assets/HealthCircle.png'
import LifeCircle from '../../../public/assets/LifeCircle.png'
import MotorCircle from '../../../public/assets/MotorCircle.png'
import TravelCircle from '../../../public/assets/TravelCircle.png'
import burgerSearch from '../../../public/assets/burgerSearch.png'
import searchSubIcon from '../../../public/assets/searchSubIcon.png'
import threeDots from '../../../public/assets/threeDots.png'
import upGrey from '../../../public/assets/upGrey.png'
import FAQButton from '../FAQButton/FAQButton'
import GeneralFAQs from '../GeneralFAQs/GeneralFAQs'
import WebTabs from '../WebTabs/WebTabs'
import styles from './RegistorClaimTabs.module.scss'

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
  link: String
}

// const searchSetSelectedFAQ = (
//   faq: FaqProps,
//   setSelectedFAQ: Function,
//   allFAQ: FaqProps[],
//   setAllFAQ: Function,
//   setSelectedType: Function,
// ) => {
//   const tempData = allFAQ
//   for (let i = 0; i < tempData.length; i += 1) {
//     const item = tempData[i] as FaqProps

//     if (faq?.txt === item?.txt) {
//       item.isActive = true
//       setSelectedFAQ(item.faq)
//       setSelectedType(item?.txt)
//     } else {
//       item.isActive = false
//     }
//     tempData[i] = item
//   }
//   setAllFAQ(tempData)
// }

// const MainFAQMobile = ({
//   allFAQ,
//   searchInput,
//   setSearchInput,
//   selectedType,
//   getAllFAQ,
// }: {
//   allFAQ: FaqProps
//   searchInput: string | number | readonly string[] | undefined
//   setSearchInput: Function
//   selectedType: any
//   getAllFAQ: any
// }) => (
//   <>
//     <div
//       className={`w-100 m-0 px-4 py-0 d-flex flex-column ${styles['wrapper']}`}
//     // style={{ border: '10px solid red' }}
//     >
//       <p className={styles['heading']}>
//         Compare and Get
//         <p className={styles['headingRed']}>Best Car Takaful Deals in Pakistan</p>
//       </p>
//       <div
//         // style={{ border: '5px solid blue' }}
//         className={`w-100 d-flex align-items-center justify-content-between ${styles['mobileBtnContainer']}`}
//       >
//         {allFAQ.map((faq, index) => (
//           <FAQButton faq={faq} key={index} />
//         ))}
//       </div>
//     </div>
//     <div className={`w-100 d-flex align-items-center justify-content-center ${styles['bottomContainerMobile']}`}>
//       <FAQSearchMobile
//         searchInput={searchInput}
//         setSearchInput={setSearchInput}
//         selectedType={selectedType}
//         getAllFAQ={getAllFAQ}
//       />
//     </div>
//   </>
// )

// const MobileFAQnTabs = ({
//   allFAQ,
//   setSelectedType,
//   openedTabIndex,
// }: {
//   allFAQ: FaqProps[]
//   setSelectedType: Function
//   openedTabIndex?: number
// }) => {
//   const [mobileSelectedTab, setMobileSelectedTab] = useState(allFAQ[0]?.tabName)
//   useEffect(() => {
//     if (openedTabIndex) {
//       setMobileSelectedTab(allFAQ[openedTabIndex]?.tabName)
//     }
//   }, [openedTabIndex])

//   return (
//     <div className={`w-100 mt-4 px-4 d-flex flex-column ${styles['']}`}>
//       {allFAQ.map((faqCat: any, index: number) => (
//         <>
//           <div
//             onClick={() => {
//               if (mobileSelectedTab === faqCat?.tabName) {
//                 setMobileSelectedTab('')
//                 setSelectedType('')
//               } else {
//                 setMobileSelectedTab(faqCat?.tabName)
//                 setSelectedType(faqCat?.txt)
//               }
//             }}
//             key={index}
//             className={`my-2 d-flex ${styles['mobileTab']}`}
//           // style={{ border: '5px solid blue' }}
//           >
//             <div className={`mx-2 d-flex align-items-center justify-content-center ${styles['mobTabImg']}`}>
//               <Image priority={true} src={upGrey} alt="" />
//             </div>
//             <p className={` ${styles['mobileTabTxt']}`}>{faqCat?.tabName}</p>
//           </div>
//           {mobileSelectedTab === faqCat?.tabName && (
//             <GeneralFAQs heading="" headingRed="" para="" faqs={faqCat?.faq} showMore={false} />
//           )}
//         </>
//       ))}
//     </div>
//   )
// }

const RegistorClaimTabs = () => {
  const router = useRouter()
  const { tab } = router.query
  const [searchInput, setSearchInput] = useState('')
  const [allFAQ, setAllFAQ] = useState<FaqProps[]>([
    {
      txt: 'Online',
      tabName: 'Online',
      img: MotorCircle,
      faq: [],
      isActive: true,
      link: '/products/health',
    },
    {
      txt: 'Call Center ',
      tabName: 'Call Center',
      img: MotorCircle,
      faq: [],
      isActive: false,
      link: '/products/auto',
    },
    {
      txt: 'SMS',
      tabName: 'SMS',
      img: MotorCircle,
      faq: [],
      isActive: false,
      link: '/products/auto',
    },

    {
      txt: 'Email',
      tabName: 'Email',
      img: MotorCircle,
      faq: [],
      isActive: false,
      link: '/products/auto',
    },
  ])
  const [selectedType, setSelectedType] = useState('General')
  const [selectedFAQ, setSelectedFAQ] = useState(allFAQ[1]?.faq)
  const [resetOpenedFaq, setResetOpenedFaq] = useState(false)

  useEffect(() => {
    if (tab) {
      const tabNumber = parseInt(tab)
      // searchSetSelectedFAQ(allFAQ[tabNumber], setSelectedFAQ, allFAQ, setAllFAQ, setSelectedType)
    }
  }, [tab])

  // useEffect(() => {
  //   getAllFAQ()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="w-75 ms-md-5">
      <MediaQuery minWidth={450}>
        <div className=" mb-3 ml-1">
          <Container className={`d-flex w-100 p-0 align-items-center justify-content-between ${styles['tabs']}`}>
            {allFAQ.map((each, index) => (
              <div
                className={`d-flex w-75 align-items-center justify-content-center ${
                  styles[each?.isActive ? 'activeTab' : 'inActiveTab']
                }`}
                key={index}
                onClick={() => {
                  setResetOpenedFaq(true)
                }}
              >
                <p className={`${styles[each?.isActive ? 'tabTxtActive' : 'tabTxtInactive']}`}>{each?.tabName}</p>
              </div>
            ))}
          </Container>
          <Container className={`w-75 ${styles['borderBottomTab']}`} />
        </div>

        <div className={`d-flex w-100 flex-column ms-{20} h-100`}>
          <p className={styles['documentDamageList']}>Auto Takaful Claim Intimation</p>
          <p className={styles['documentDamageList']}>Health Takaful</p>
          <p className={styles['documentDamageList']}>Travel Takaful</p>
          <p className={styles['documentDamageList']}>Life Takaful</p>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={450}>
        <Card style={{ top: 60 }}>
          <Card.Body>
            <Container className={`d-flex w-100 p-0 align-items-center justify-content-between ${styles['tabs']}`}>
              {allFAQ.map((each, index) => (
                <div
                  className={`d-flex w-100 align-items-center justify-content-center ${
                    styles[each?.isActive ? 'activeTab' : 'inActiveTab']
                  }`}
                  key={index}
                  onClick={() => {
                    setResetOpenedFaq(true)
                  }}
                >
                  <p className={`${styles[each?.isActive ? 'tabTxtActive' : 'tabTxtInactive']}`}>{each?.tabName}</p>
                </div>
              ))}
            </Container>
            <Container className={`w-100 ${styles['borderBottomTab']}`} />
            <div className={`d-flex w-100 mt-2 flex-column h-100`}>
              <p className={styles['documentDamageList']}>Auto Takaful Claim Intimation</p>
              <p className={styles['documentDamageList']}>Health Takaful</p>
              <p className={styles['documentDamageList']}>Travel Takaful</p>
              <p className={styles['documentDamageList']}>Life Takaful</p>
            </div>
          </Card.Body>
        </Card>
      </MediaQuery>
    </div>
  )
}

export default RegistorClaimTabs
