import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
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
import styles from './MainFAQ.module.scss'

type FaqItemProps = {
  question: String
  answer: String
}
type FaqProps = {
  txt: String
  option: String
  tabName: String
  img: StaticImageData
  faq: FaqItemProps[]
  isActive: boolean
  link: String
}

const FAQSearchMobile = ({
  searchInput,
  setSearchInput,
  selectedType,
  getAllFAQ,
}: {
  searchInput: string | number | readonly string[] | undefined
  setSearchInput: Function
  selectedType: any
  getAllFAQ: any
}) => {
  const [isSearchSelected, setSearchSelected] = useState(false)
  return (
    <div
      onClick={() => setSearchSelected(!isSearchSelected)}
      className={`d-flex align-items-center justify-content-between ${styles['searchContainer']}`}
    // style={{ border: '10px solid coral' }}
    >
      <div className={`d-flex justify-content-center align-items-center ${styles['searchImgContainer']}`}>
        <Image priority={true} src={burgerSearch} alt="" />
      </div>
      <input
        value={searchInput}
        onChange={e => {
          setSearchInput(e.target.value)
          getAllFAQ(e.target.value, selectedType)
        }}
        placeholder="Search ..."
        className={styles['searchInput']}
        type={'text'}
      />

      <div className={`d-flex justify-content-center align-items-center ${styles['dotImgContainer']}`}>
      </div>
    </div>
  )
}

const FAQSearch = ({
  searchInput,
  setSearchInput,
  selectedType,
  getAllFAQ,
}: {
  searchInput: string | number | readonly string[] | undefined
  setSearchInput: Function
  selectedType: string
  getAllFAQ: Function
}) => {
  const [isSearchSelected, setSearchSelected] = useState(false)
  return (
    <div
      onClick={() => {
        if (!isSearchSelected) {
          setSearchSelected(!isSearchSelected)
        }
      }}
      className={`d-flex align-items-center justify-content-between ${styles['searchContainer']}`}
    // style={{ border: '10px solid coral' }}
    >
      {isSearchSelected ? (
        <>
          <div
            onClick={() => setSearchSelected(!isSearchSelected)}
            className={`d-flex justify-content-center align-items-center ${styles['searchImgContainer']}`}
          >
            <Image priority={true} src={searchSubIcon} alt="" />
          </div>
          <input
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value)
              getAllFAQ(e.target.value, selectedType)
            }}
            placeholder="Search ..."
            className={styles['searchInput']}
            type={'text'}
          />
        </>
      ) : (
        <>
          <div></div>
          <p className={styles['searchNotSelectedText']}>Search</p>
        </>
      )}
      <div
        onClick={() => setSearchSelected(!isSearchSelected)}
        className={`d-flex justify-content-center align-items-center ${styles['dotImgContainer']}`}
      >
      </div>
    </div>
  )
}

const searchSetSelectedFAQ = (
  faq: FaqProps,
  setSelectedFAQ: Function,
  allFAQ: FaqProps[],
  setAllFAQ: Function,
  setSelectedType: Function,
) => {
  const tempData = allFAQ
  for (let i = 0; i < tempData.length; i += 1) {
    const item = tempData[i] as FaqProps

    if (faq?.txt === item?.txt) {
      item.isActive = true
      setSelectedFAQ(item.faq)
      setSelectedType(item?.txt)
    } else {
      item.isActive = false
    }
    tempData[i] = item
  }
  setAllFAQ(tempData)
}

const MainFAQWeb = ({
  allFAQ,
  setAllFAQ,
  selectedFAQ,
  setSelectedFAQ,
  searchInput,
  setSearchInput,
  selectedType,
  getAllFAQ,
}: {
  allFAQ: FaqProps
  setAllFAQ: Function
  selectedFAQ: Function
  setSelectedFAQ: Function
  searchInput: string | number | readonly string[] | undefined
  setSearchInput: Function
  selectedType: string
  getAllFAQ: Function
}) => (
  <div
    className={`w-100 m-0 mb-5 p-0 d-flex flex-column align-items-center ${styles['wrapper']}`}
  // style={{ border: '10px solid red' }}
  >
    <Container>
      <div
        // style={{ border: '5px solid grey' }}
        className={`w-100 d-flex align-items-center justify-content-between ${styles['topContainer']}`}
      >
        <div
          // style={{ border: '5px solid green' }}
          className={` ${styles['leftContainer']}`}
        >
          <p className={styles['heading']}>
          Get answers to your most 
            <p className={styles['headingRed']}>frequently asked questions</p> 
            
          </p>
    
        </div>
        <div
          className={`d-flex align-items-center justify-content-between ${styles['rightContainer']}`}
        // style={{ border: '5px solid green' }}
        >
          {allFAQ.map((faq, index) => (
            <FAQButton
              allFAQ={allFAQ}
              setAllFAQ={setAllFAQ}
              selectedFAQ={selectedFAQ}
              setSelectedFAQ={setSelectedFAQ}
              faq={faq}
              key={index}
            />
          ))}
        </div>
      </div>
      <div
        // style={{ border: '5px solid grey' }}
        className={`w-100 d-flex align-items-center justify-content-center ${styles['bottomContainer']}`}
      >
        <FAQSearch
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedType={selectedType}
          getAllFAQ={getAllFAQ}
        />
      </div>
    </Container>
  </div>
)

const MainFAQMobile = ({
  allFAQ,
  searchInput,
  setSearchInput,
  selectedType,
  getAllFAQ,
}: {
  allFAQ: FaqProps
  searchInput: string | number | readonly string[] | undefined
  setSearchInput: Function
  selectedType: any
  getAllFAQ: any
}) => (
  <>
    <div
      className={`w-100 m-0 px-4 py-0 d-flex flex-column ${styles['wrapper']}`}
    // style={{ border: '10px solid red' }}
    >
       <p className={styles['heading']}>
          Get answers to your most 
            <p className={styles['headingRed']}>frequently asked questions</p> 
          </p>
      <div
        // style={{ border: '5px solid blue' }}
        className={`w-100 d-flex align-items-center justify-content-between ${styles['mobileBtnContainer']}`}
      >
        {allFAQ.map((faq, index) => (
          <FAQButton faq={faq} key={index} />
        ))}
      </div>
    </div>
    <div className={`w-100 d-flex align-items-center justify-content-center ${styles['bottomContainerMobile']}`}>
      <FAQSearchMobile
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedType={selectedType}
        getAllFAQ={getAllFAQ}
      />
    </div>
  </>
)

const MobileFAQnTabs = ({
  allFAQ,
  setSelectedType,
  openedTabIndex,
}: {
  allFAQ: FaqProps[]
  setSelectedType: Function
  openedTabIndex?: number
}) => {
  const [mobileSelectedTab, setMobileSelectedTab] = useState(allFAQ[0]?.tabName)
  useEffect(() => {
    if (openedTabIndex) {
      setMobileSelectedTab(allFAQ[openedTabIndex]?.tabName)
    }
  }, [openedTabIndex])

  return (
    <div className={`w-100 mt-4 px-4 d-flex flex-column ${styles['']}`}>
      {allFAQ.map((faqCat: any, index: number) => (
        <>
        {!!faqCat.tabName &&
        <>
          <div
            onClick={() => {
              if (mobileSelectedTab === faqCat?.tabName) {
                setMobileSelectedTab('')
                setSelectedType('')
              } else {
                setMobileSelectedTab(faqCat?.tabName)
                setSelectedType(faqCat?.txt)
              }
            }}
            key={index}
            className={`my-2 d-flex ${styles['mobileTab']}`}
          // style={{ border: '5px solid blue' }}
          >
            <div className={`mx-2 d-flex align-items-center justify-content-center ${styles['mobTabImg']}`}>
              <Image priority={true} src={upGrey} alt="" />
            </div>
            <p className={` ${styles['mobileTabTxt']}`}>{faqCat?.tabName}</p>
          </div>
          {mobileSelectedTab === faqCat?.tabName && (
            <GeneralFAQs heading="" headingRed="" para="" faqs={faqCat?.faq} showMore={false} />
          )}
          </>
          }
        </>
      ))}
    </div>
  )
}

const MainFAQ = () => {
  const router = useRouter()
  const { tab } = router.query
  const [searchInput, setSearchInput] = useState('')
  const [allFAQ, setAllFAQ] = useState<FaqProps[]>([
    {
      txt: 'General',
      option:'',
      tabName: "General FAQ's",
      img: MotorCircle,
      faq: [],
      isActive: true,
      link: '/general',
    },
    {
      txt: 'Auto',
      option: 'Auto',
      tabName: "Auto Takaful FAQ's",
      img: MotorCircle,
      faq: [],
      isActive: false,
      link: '/auto',
    },
    {
      txt: 'Travel',
      option: 'Travel',
      tabName: "",
      img: TravelCircle,
      faq: [],
      isActive: false,
      link: '/travel',
    },
    {
      txt: 'Health',
      option: 'Health',
      tabName: "",
      img: HealthCircle,
      faq: [],
      isActive: false,
      link: '/health',
    },
    {
      txt: 'AutoClaim',
      option: 'Family',
      tabName: "Auto Claim FAQ's",
      img: LifeCircle,
      faq: [],
      isActive: false,
      link: '/autoClaim',
    },
   
  ])
  const [selectedType, setSelectedType] = useState('General')
  const [selectedFAQ, setSelectedFAQ] = useState(allFAQ[1]?.faq)
  const [resetOpenedFaq, setResetOpenedFaq] = useState(false)

  useEffect(() => {
    if (tab && allFAQ[0].faq.length !== 0) {
      const tabNumber = parseInt(tab)
      const tempAllFaqs = allFAQ.map((item: any, index) => {
        if (index === tabNumber) {
          return { ...item, isActive: true }
        }
        return { ...item, isActive: false }
      })
      setAllFAQ(tempAllFaqs)
      setSelectedType(allFAQ[tabNumber].txt)
      setSelectedFAQ(allFAQ[tabNumber].faq)
    }
  }, [tab, allFAQ[0].faq])

  const getAllFAQ = async (txt?: any, type?: any) => {
    const APIallFAQraw = txt && type ? await Api('GET', `faq/search/${type}/${txt}`) : await Api('GET', `faq`)
    const APIallFAQ = APIallFAQraw?.data
    const tempAllFAQ = JSON.parse(JSON.stringify(allFAQ))
    let selectedFAQIndex = 0
    for (let i = 0; i < tempAllFAQ.length; i += 1) {
      tempAllFAQ[i].faq = []
      if (type === tempAllFAQ[i].txt) selectedFAQIndex = i
    }
    for (let i = 0; i < APIallFAQ?.length; i += 1)
      for (let j = 0; j < tempAllFAQ.length; j += 1)
        if (APIallFAQ[i]?.type === tempAllFAQ[j]?.txt) tempAllFAQ[j]?.faq.push(APIallFAQ[i])

    setSelectedFAQ(tempAllFAQ[selectedFAQIndex].faq)
    setAllFAQ(tempAllFAQ)
  }

  useEffect(() => {
    getAllFAQ()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MediaQuery minWidth={450}>
        <MainFAQWeb
          allFAQ={allFAQ}
          setAllFAQ={setAllFAQ}
          selectedFAQ={selectedFAQ}
          setSelectedFAQ={setSelectedFAQ}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedType={selectedType}
          getAllFAQ={getAllFAQ}
        />
        <WebTabs
          allFAQ={allFAQ}
          setAllFAQ={setAllFAQ}
          selectedFAQ={selectedFAQ}
          setSelectedFAQ={setSelectedFAQ}
          setSelectedType={setSelectedType}
          searchSetSelectedFAQ={searchSetSelectedFAQ}
          setResetOpenedFaq={setResetOpenedFaq}
        />
        <GeneralFAQs
          heading=""
          headingRed=""
          para=""
          faqs={selectedFAQ}
          showMore={false}
          resetOpenedFaq={resetOpenedFaq}
          setResetOpenedFaq={setResetOpenedFaq}
        />
      </MediaQuery>
      <MediaQuery maxWidth={450}>
        <MainFAQMobile
          allFAQ={allFAQ}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedType={selectedType}
          getAllFAQ={getAllFAQ}
        />
        <MobileFAQnTabs
          allFAQ={allFAQ}
          setAllFAQ={setAllFAQ}
          selectedFAQ={selectedFAQ}
          setSelectedFAQ={setSelectedFAQ}
          setSelectedType={setSelectedType}
          openedTabIndex={parseInt(tab)}
        />
      </MediaQuery>
    </>
  )
}

export default MainFAQ
