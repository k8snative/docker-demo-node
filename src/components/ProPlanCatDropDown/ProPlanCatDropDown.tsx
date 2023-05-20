import Image from 'next/image'
import { useState } from 'react'

import dropDownIconRed from '../../../public/assets/dropDownIconRed.png'
import styles from './ProPlanCatDropDown.module.scss'

interface ProPlanCatDropDownProps {
  dropDownItems: { option: string; id: number }[] | { option: string; value: string }[]
  insurancePlansForm: { value: object; setValue: any }
  field: string
  errTxt?: string
  selectedQuery?: string
  setSelectedQuery?: Function
  sort?: boolean
  resetModel?: boolean
}

const ProPlanCatDropDown = ({
  dropDownItems,
  insurancePlansForm,
  field,
  errTxt,
  sort,
  resetModel,
}: ProPlanCatDropDownProps) => {
  const [isOpen, setOpen] = useState(false)
  // eslint-disable-next-line eqeqeq
  const getSelectedValue = id => dropDownItems?.find(item => item?.id == id)?.option || 'Select'
  const getSelectedSort = name => dropDownItems?.find(item => item?.value === name)?.option || 'Select'
  // const getSelectedSort = name => console.log('name', name)
  // console.log('insurancePlansForm.value', insurancePlansForm.value)
  return (
    <>
      <div
        className={` ${styles['dropDownContainer']}`}
        style={{
          border: errTxt ? '2px solid #E91431 ' : '',
        }}
        onClick={() => setOpen(!isOpen)}
      >
        <p className={` ${styles['dropDownSelectedTxt']}`}>
          {sort
            ? getSelectedSort(insurancePlansForm?.value[field])
            : getSelectedValue(insurancePlansForm?.value[field])}
        </p>
        <div className={`d-flex align-items-center justify-content-center ${styles['imgContainer']}`}>
          <Image alt="" src={dropDownIconRed} />
        </div>
        {isOpen && dropDownItems && (
          <div onMouseLeave={() => setOpen(false)} className={` ${styles['dropDownItemsContainer']}`}>
            {dropDownItems.map((opt, index) => (
              <p
                className={` ${styles['dropDownItemTxt']}`}
                onClick={() => {
                  if (resetModel) {
                    insurancePlansForm.setValue({
                      ...insurancePlansForm.value,
                      [field]: sort ? opt?.value : opt?.id,
                      model_id: '',
                    })
                    return
                  }
                  insurancePlansForm.setValue({ ...insurancePlansForm.value, [field]: sort ? opt?.value : opt?.id })
                }}
                key={index}
              >
                {opt?.option}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProPlanCatDropDown
