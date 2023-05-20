import styles from './MobileTabs.module.scss'

const MobileTabs = ({
  data,
  mobileSelectedTab,
  setMobileSelectedTab,
}: {
  data: any
  mobileSelectedTab: number
  setMobileSelectedTab: Function
}) => (
  <>
    <div className={` ${styles['mobilecontainer']}`}>
      {data.map((each: any, index: number) => (
        <>
          <div
            key={index}
            onClick={() => {
              if (mobileSelectedTab === index) setMobileSelectedTab('')
              else setMobileSelectedTab(index)
            }}
            className={` ${styles['mobileTab']}`}
          >
            <p className={`m-0 ${styles['mobileTabTxt']}`}>{each?.name}</p>
          </div>
          {mobileSelectedTab === index && each?.component}
        </>
      ))}
    </div>
  </>
)

export default MobileTabs
