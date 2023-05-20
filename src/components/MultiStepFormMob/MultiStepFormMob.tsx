import styles from './MultiStepFormMob.module.scss'

const MultiStepFormMob = ({
  data,
  selectedTab,
  updateState,
  allowedTabIndex,
  lockedTabIndex,
}: {
  data: { name: string; isActive: boolean }
  updateState: Function
  selectedTab: any
  allowedTabIndex: number
  lockedTabIndex: number
}) => (
  <>
    <div className={` ${styles['mobilecontainer']}`}>
      {data.map((each: any, index: number) => (
        <>
          <div
            key={index}
            onClick={() => {
              if (index <= allowedTabIndex && lockedTabIndex === -1) {
                updateState(index - 1)
              }
            }}
            className={` ${styles['mobileTab']}`}
          >
            <p className={`m-0 ${styles['mobileTabTxt']}`}>{each?.name}</p>
          </div>
          {selectedTab === index && each?.component}
        </>
      ))}
    </div>
  </>
)

export default MultiStepFormMob
