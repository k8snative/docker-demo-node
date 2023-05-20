import Image from 'next/image'
import Link from 'next/link'

import arrowBack from '../../../public/assets/arrowBack.png'
import styles from './FormGoBack.module.scss'

const FormGoBack = ({ onClick, link }: { onClick: Function; link: string }) => (
  <div className="w-100 d-flex align-items-center">
    {!link || link === '' ? (
      <div onClick={() => onClick()} className={styles['cursorPointer']}>
        <div className={`d-flex align-items-center justify-content-center ${styles['goBackImgContainer']}`}>
          <Image alt="" src={arrowBack} />
        </div>
        <p className={`${styles['goBackTxt']}`}>Go Back</p>
      </div>
    ) : (
      <Link href={link}>
        <div
          onClick={() => {
            // onClick()
          }}
          className={styles['cursorPointer']}
        >
          <div className={`d-flex align-items-center justify-content-center ${styles['goBackImgContainer']}`}>
            <Image alt="" src={arrowBack} />
          </div>
          <p className={`${styles['goBackTxt']}`}>Go Back</p>
        </div>
      </Link>
    )}
  </div>
)

export default FormGoBack
