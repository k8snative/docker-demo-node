import styles from './ProdPlanWebTabs.module.scss'

const EachTab = ({
  data,
  index,
  selectedTab,
  setSelectedTab,
}: {
  data: { name: string; isActive: boolean }
  index: number
  selectedTab: number
  setSelectedTab: Function
}) => (
  <div
    onClick={() => setSelectedTab(index)}
    className={` ${styles['eachTabContainer']} ${
      styles[selectedTab === index ? 'eachTabContainerActive' : 'eachTabContainerInactive']
    }`}
  >
    <p
      className={` ${styles['eachTabTxt']} ${
        styles[selectedTab === index ? 'eachTabTxtActive' : 'eachTabTxtInactive']
      }`}
    >
      {data?.name}
    </p>
  </div>
)

const ProdPlanWebTabs = ({
  data,
  selectedTab,
  setSelectedTab,
  whiteBg,
}: {
  data: { name: string; isActive: boolean }[]
  selectedTab: number
  setSelectedTab: Function
  whiteBg: boolean
}) => (
  <div
    className={`w-100 d-flex justify-content-between align-items-center ${
      whiteBg ? styles['wrapper2'] : styles['wrapper']
    }`}
  >
    {data.map((each, index) => (
      <EachTab key={index} data={each} index={index} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    ))}
  </div>
)

export default ProdPlanWebTabs
