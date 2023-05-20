import Link from 'next/link'

import styles from './FormButton.module.scss'

const FormButton = ({ btnTxt, onClick }: { btnTxt: string; onClick: Function }) => (
  <div className={`w-100 ${styles['mwrapper']}`}>
    <div
      onClick={() => onClick()}
      className={`d-flex align-items-center justify-content-center ${styles['mcontactadvisor']}`}
    >
      <Link href="/">
        <p className={`m-0 ${styles['madvisorpara']}`}>{btnTxt}</p>
      </Link>
    </div>
  </div>
)

export default FormButton
