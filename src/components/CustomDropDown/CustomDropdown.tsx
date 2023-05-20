import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'

import dropDownIcon from '../../../public/assets/dropDownIcon.png'
import styles from './CustomDropdown.module.scss'

const CustomDropdown = ({
  navtxt,
  options,
  navItems,
}: {
  navtxt: String
  options?: boolean
  navItems?: Array<Object>
}) => {
  const [isActive, setIsActive] = useState<Boolean>(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (!isActive) {
        return
      }

      const targetElement =
        window && (window.document.getElementsByClassName(styles['navOptionTxt'] || '')[0] as HTMLElement)

      if (!targetElement.contains(event.target as HTMLElement)) {
        setIsActive(false)
      }
    }

    // Bind the event listener
    document.addEventListener('keydown', handleClickOutside)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mouseout', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleClickOutside)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mouseout', handleClickOutside)
    }
  })
  return (
    <NavDropdown
      title={
        <span className={styles['iconhover']}>
          <span className={styles['navTitle']}>{navtxt}</span>
          <Image
            width={'18px'}
            height={'12px'}
            className={`${isActive ? styles['rotate'] : styles['default']}`}
            src={dropDownIcon}
            alt=""
          />
        </span>
      }
      className={`${styles['navOptionTxt']}`}
      onClick={() => {
        setIsActive(!isActive)
      }}
      onMouseLeave={() => {
        setIsActive(false)
      }}
      onMouseOut={() => {
        setIsActive(false)
      }}
    >
      {options && (
        <>
          {navItems?.map((value, index) => (
            <Link key={index} href={{ pathname: value?.link }}>
              <NavDropdown.Item href="#action/3.1">{value?.name}</NavDropdown.Item>
            </Link>
          ))}
        </>
      )}

      <></>
    </NavDropdown>
  )
}

export default CustomDropdown
