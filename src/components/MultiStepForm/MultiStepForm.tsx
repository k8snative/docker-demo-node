import { useSelector } from 'react-redux'

import styles from './MultiStepForm.module.scss'

const EachTab = ({
  data,
  index,
  updateState,
  selected,
  currentStep,
  allowedTabIndex,
  lockedTabIndex,
}: {
  data: { name: string; isActive: boolean }
  index: number
  updateState: Function
  selected: any
  currentStep: any
  allowedTabIndex: number
  lockedTabIndex: number
}) => {
  const setTabStyles = () => {
    if (selected) {
      return 'eachTabTxtActive'
    }
    if (index < allowedTabIndex) {
      if (index > lockedTabIndex && lockedTabIndex !== -1) {
        return 'eachTabTxtInactive'
      }
      return 'eachTabTxtFilled'
    } else {
      return 'eachTabTxtInactive'
    }
  }
  return (
    <>
      <div
        className={` ${styles['eachTabContainer']}
      ${styles[selected ? 'eachTabContainerActive' : 'eachTabContainerInactive']}`}
        onClick={() => {
          if (index <= allowedTabIndex && lockedTabIndex === -1) {
            updateState(index - 1)
          }
        }}
      >
        <p className={` ${styles['eachTabTxt']} ${styles[setTabStyles()]}`}>{data?.name}</p>
      </div>
    </>
  )
}

const MultiStepForm = ({
  data,
  updateState,
  currentStep,
  allowedTabIndex,
  lockedTabIndex,
}: {
  data: { name: string }
  updateState: Function
  currentStep: any
  allowedTabIndex: number
  lockedTabIndex: number
}) => (
  <div className={`w-100 d-flex justify-content-between align-items-center ${styles['wrapper2']}`}>
    {data.map((each: any, index: number) => (
      <EachTab
        key={index}
        data={each}
        index={index}
        updateState={updateState}
        selected={currentStep === index}
        currentStep={currentStep}
        allowedTabIndex={allowedTabIndex}
        lockedTabIndex={lockedTabIndex}
      />
    ))}
  </div>
)

export default MultiStepForm
