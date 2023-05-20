import { StaticImageData } from 'next/image'
import { Container } from 'react-bootstrap'

import styles from './WebTabs.module.scss'

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
}
const WebTabs = ({
  allFAQ,
  setAllFAQ,
  setSelectedFAQ,
  searchSetSelectedFAQ,
  setSelectedType,
  setResetOpenedFaq,
}: {
  allFAQ: FaqProps[]
  setAllFAQ: Function
  setSelectedFAQ: Function
  searchSetSelectedFAQ: Function
  setSelectedType: Function
  setResetOpenedFaq: Function
}) => {
  const data = allFAQ
  return (
    
    <div className="w-100 mb-3 ml-1">
      <Container className={`d-flex  p-0 align-items-center justify-content-around ${styles['tabs']}`}>
        {data.map((each, index) => (
          <>
          
          {!!each?.tabName &&   (

            <div
              className={`d-flex align-items-center justify-content-center ${
                styles[each?.isActive ? 'activeTab' : 'inActiveTab']
              }`}
              key={index}
              onClick={() => {
                searchSetSelectedFAQ(each, setSelectedFAQ, allFAQ, setAllFAQ, setSelectedType)
                setResetOpenedFaq(true)
              }}
            >
              
           <p className={`${styles[each?.isActive ? 'tabTxtActive' : 'tabTxtInactive']}`}>{each?.tabName}</p>
            </div>
          )}
          </>
        ))}
      </Container>
      <Container className={styles['borderBottomTab']} />
    </div>
  )
}

export default WebTabs
