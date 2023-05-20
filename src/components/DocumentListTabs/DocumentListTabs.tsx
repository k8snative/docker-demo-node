import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

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
  'Running Paper from Registration Book',
  'Registration Book must be on the same Name as of Policy',
  'CNIC',
  'Policy Copy',
  'Claim Form signed & filled required on claimform',
  'Satisfaction Note signed & filled',
  'If car is on company name then company stamp is also required on satisfaction note',
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
      txt: 'Damage',
      tabName: 'Damage',
      isActive: true,
      link: '/products/health',
    },
    {
      txt: 'Theft ',
      tabName: 'Theft',
      isActive: false,
      link: '/products/auto',
    },
  ])
  const [resetOpened, setResetOpened] = useState(false)

  useEffect(() => {
    if (tab) {
      const tabNumber = parseInt(tab)
    }
  }, [tab])

  return (
    <>
      <MediaQuery minWidth={450}>
        <Row>
          <Col md={6}>
            <div className={`d-flex mt-5 align-items-center justify-content-center flex-column h-100`}>
              <div className="d-flex flex-row align-items-center">
                <p className={styles['documentDamageList']}>Personal Vehicle Damage</p>
                <div className={styles['circle']} />
              </div>
              <p className={styles['documentDamageList']}>Third Party Vehicle Damage</p>
            </div>
          </Col>
          <Col md={6}>
            <div className=" mb-5 mx-4">
              <Container className={`d-flex w-100 p-0 align-items-center justify-content-between ${styles['tabs']}`}>
                {documentType.map((each, index) => (
                  <div
                    className={`d-flex w-100 align-items-center justify-content-center ${
                      styles[each?.isActive ? 'activeTab' : 'inActiveTab']
                    }`}
                    key={index}
                    onClick={() => {
                      setResetOpened(true)
                    }}
                  >
                    <p className={`${styles[each?.isActive ? 'tabTxtActive' : 'tabTxtInactive']}`}>{each?.tabName}</p>
                  </div>
                ))}
              </Container>
              <Container className={`w-25 ${styles['borderBottomTab']}`} />
            </div>
            <ul className={styles['listStyle']}>
              {listDocument.map((val, ind) => (
                <li className={styles['checkmark']} key={ind}>
                  {val}
                </li>
              ))}
            </ul>
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
