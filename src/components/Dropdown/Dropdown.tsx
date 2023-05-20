import Image from 'next/image'
import { useEffect, useState } from 'react'
import dropDownSmall from '~public/assets/dropDownIcon.png'

import styles from './Dropdown.module.scss'

const Dropdown = ({
  label,
  options,
  value,
  error,
  name,
  onBlur,
  formik,
  type = 'string',
  disabled = false,
}: {
  label: string
  options: any
  value: any
  error?: any
  name: string
  onBlur: any
  formik: any
  type?: 'string' | 'object'
  disabled?: boolean
}) => {
  const [isOpen, setOpen] = useState(false)
  // const handleItemClick = (id: any) => (selectedItem === id ? setSelectedItem(label) : setSelectedItem(id))

  const setValue = (option: any) => {
    switch (type) {
      case 'string':
        formik?.setFieldValue(name, option?.option)
        break
      case 'object':
        formik?.setFieldValue(name, option?.id)
        break
    }
  }
  const getValue = () => {
    switch (type) {
      case 'string':
        return value
      case 'object':
        return options?.filter((item: any) => item.id === value)?.[0]?.option
    }
  }

  return (
    <div onMouseLeave={() => setOpen(false)} className={`p-0 ${styles['mainWrapper']}`}>
      <div
        onClick={() => {
          disabled ? {} : setOpen(!isOpen)
        }}
        className={` ${styles['dropDownContainer']} ${disabled && styles['disabled']}`}
      >
        <p className={`m-0 ${value ? styles['selectedTxt'] : styles['labelTxt']}`}>{value ? getValue() : label}</p>
        <div className={styles['formImageContainer']}>
          <Image src={dropDownSmall} alt="" />
        </div>
      </div>
      {isOpen && (
        <div className={` ${styles['dropContainer']}`}>
          {options.map((opt: any, index: any) => (
            <div key={index}>
              <p onClick={() => setValue(opt)} className={styles['dropMenuItems']}>
                {opt?.option}
              </p>
            </div>
          ))}
        </div>
      )}
      {error && <p className={`${styles['inputError']}`}>{error}</p>}
    </div>
  )
}

export default Dropdown
