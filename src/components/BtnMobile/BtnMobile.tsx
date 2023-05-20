import styles from './BtnMobile.module.scss'

const BtnMobile = ({ btnTxt }: { btnTxt: string }) => (
  <div className={styles['wrapper']}>
    <p className={styles['txt']}>{btnTxt}</p>
  </div>
)

export default BtnMobile
