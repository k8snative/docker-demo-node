import styles from './FormHeading.module.scss'

const FormHeading = ({ isSignIn }: { isSignIn: Boolean }) => (
  <p className={styles['formHeading']}>Sign {!isSignIn ? 'In' : 'Up'}!</p>
)

export default FormHeading
