import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'

import styles from './GradientBtn.module.scss'

const GradientBtn = ({
  label,
  onClick,
  link,
  loading,
  disabled,
}: {
  label: string
  onClick: Function
  link?: string
  loading?: boolean
  disabled?: boolean
}) => {
  const router = useRouter()
  const onClickHandler = () => {
    onClick()
    if (link?.length > 1)
      router.push({
        pathname: link,
      })
  }

  return (
    <div
      className={`${disabled ? styles['mDisabledWrapper'] : styles['mwrapper']}`}
      onClick={disabled ? () => {} : () => onClickHandler()}
    >
      <div className={`d-flex align-items-center justify-content-center ${styles['mcontactadvisor']}`}>
        {loading ? (
          <Spinner animation="border" style={{ color: '#FFFFFF' }} />
        ) : (
          <p className={`m-0 ${styles['madvisorpara']}`}>{label}</p>
        )}
      </div>
    </div>
  )
}

export default GradientBtn
