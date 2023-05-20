import { Form } from 'react-bootstrap'

import styles from './FormTopContainer.module.scss'

const FormTopContainer = ({
  isSignIn,
  setSignIn,
  topRedTxtConditional,
  topTxt,
  setError,
  isTermChecked,
}: {
  isSignIn: Boolean
  setSignIn: Function
  topRedTxtConditional: Boolean
  topTxt: String
  setError: Function
  isTermChecked: Function
}) => (
  <div
    // style={{ border: '5px solid yellow' }}
    className={`w-100 d-flex align-items-center justify-content ${styles['formTopContainer']}`}
  >
    <Form
    // style={{ border: '2px solid black' }}
    >
      <Form.Check
        onClick={() => {
          setSignIn(!isSignIn)
          if (setError) setError({})
          // isTermChecked(false)
        }}
        checked={isSignIn}
        className={styles['formstyles']}
        // style={{ border: '2px solid red', color: 'green' }}
        type="switch"
        id="custom-switch"
      />
    </Form>
    <p className={styles['topTxt']}>
      {topTxt}
      {topRedTxtConditional && (
        <span onClick={() => setSignIn(!isSignIn)} className={styles['topTxtRed']}>
          {isSignIn ? 'Sign in' : 'Sign up'}
          {'!'}
        </span>
      )}
    </p>
  </div>
)

export default FormTopContainer
