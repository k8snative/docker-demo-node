import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import CardsDesign from '../../../public/assets/cards.png'
import styles from './DocumentListTabs.module.scss'

type DocumentProps = {
  txt: String
  tabName: String
  isActive: boolean
  link: String
}

const listDocument = [
  'License',
  'Pictures',
  'Running Paper',
  'Registration Book must be on the same Name as of Policy',
  'CNIC',
  'Policy Copy',
  'Claim Form signed & filled'

]
const theifDocument = [
  'License',
  'Running Paper',
  'Registration Book must be on the same Name as of Policy',
  'CNIC',
  'Policy Copy',
  'Claim Form signed & filled',
  'FIR / Roznamcha'

]

const listDocument1 = [
  'License',

]
const theifDocument2 = [
  'Test',

]

const listDocumentMob = [
  'Duly filled and signed claim form',
  'KYC',
  'Copy of takaful policy',
  'Copy of Vehicle RC',
  'License copy of the driver driving the vehicle at the time of the accident',
]
const DocumentListTabs = () => {
  const router = useRouter()
  const { tab } = router.query
  const [documentType, setDocumentType] = useState<DocumentProps[]>([
    {
      txt: 'damage',
      tabName: 'damage',
      isActive: true,
      link: '/',
    },
    {
      txt: 'theft',
      tabName: 'theft',
      isActive: false,
      link: '/auto',
    },
  ])
  const [resetOpened, setResetOpened] = useState(false)
  const [initialSelectedTab, setInitialSelectedTab] = useState('damage')
  const [selectedTab, setSelectedTab] = useState('damage')
  const [tabContent, setTabContent] = useState(listDocument)

  const handleInitialTab = (val) => {
    let content = ''
    if (val === 'damage' && selectedTab === 'Personal Vehicle Damage') {
      content = listDocument
    } else if (val === 'damage' && selectedTab === 'Third Party Vehicle Damage') {
      content = theifDocument
    } else if (val === 'theft' && selectedTab === 'Personal Vehicle Damage') {
      content = listDocument1
    } else if (val === 'theft' && selectedTab === 'Third Party Vehicle Damage') {
      content = theifDocument2
    }
    setTabContent(content) 
  }

  const handleTabs = (val) => {
    setSelectedTab(val?.tabName)
    let content = ''
    if (val?.tabName === 'damage') {
      content = listDocument
    } else if (val?.tabName === 'theft') {
      content = theifDocument
    }
    setTabContent(content) 
  }

  useEffect(() => {
    if (tab) {
      const tabNumber = parseInt(tab)
    }
  }, [tab])

  return (
    <>
      <MediaQuery minWidth={450}>
        <Row>
          {/* <Col md={6}>
            <div className={`d-flex mt-5 align-items-center justify-content-center flex-column h-100`}>
              <div className="d-flex flex-row align-items-center">
                <p className={styles['documentDamageList']}>Personal Vehicle Damage</p>
                <div className={styles['circle']} />
              </div>
              <p className={styles['documentDamageList']}>Third Party Vehicle Damage</p>
            </div>
          </Col> */}
          <Col md={12}>
            <div className=" mb-5 mx-4">
                {/* <div className="tabsBtn">
                  <button 
                    className={initialSelectedTab === 'damage' && "active-tab-btn"} 
                    onClick={() => {handleInitialTab('damage'), setInitialSelectedTab('damage')}
                  }>Damage</button>
                  <button 
                  className={initialSelectedTab === 'theft' && "active-tab-btn"} 
                  onClick={() => {handleInitialTab('theft'), setInitialSelectedTab('theft')}}>Theft</button>
                </div> */}
              <Container className={`d-flex p-0 align-items-center justify-content-between ${styles['tabs']}`} style={{width: 200}}>
                {documentType.map((each, index) => (
                  <div
                    className={`d-flex w-100 align-items-center justify-content-center ${
                      styles[each?.tabName === selectedTab  ? 'activeTab' : 'inActiveTab']
                    }`}
                    key={index}
                    onClick={() => {
                      handleTabs(each)
                    }}
                  >
                    <p className={`${styles[each?.tabName === selectedTab ? 'tabTxtActive' : 'tabTxtInactive']}`} style={{textTransform: 'capitalize'}}>{each?.tabName}</p>
                  </div>
                ))}
              </Container>
              <Container className={`w-25 ${styles['borderBottomTab']}`} />
            </div>
            <Row>
              <Col md={8}>
              <ul className={styles['listStyle']}>
                {tabContent?.map((val, ind) => (
                  <li className={styles['checkmark']} key={ind}>
                    {val}
                  </li>
                ))}
              </ul> 
              </Col>
              <Col md={4}>
                <Image src={CardsDesign} alt="autotakafulbanner" />
              </Col>
            </Row>
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={450}>
        <Card style={{ width: '18rem', marginBottom: 0 }}>
          <Card.Body>
            <Card.Title>Online</Card.Title>
            <ul className={styles['listStyle']}>
              {listDocumentMob.map((val, ind) => (
                <li className={styles['checkmark']} key={ind}>
                  {val}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </MediaQuery>
    </>
  )
}

export default DocumentListTabs
