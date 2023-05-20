import { Form } from 'react-bootstrap'

import styles from './RadioButton.module.scss'

const RadioButton = ({ label, isChecked, handleChange }: { label: string; isChecked: any; handleChange: Function }) => {
  const handleRadioChange = (e: any) => handleChange(e.target.value)

  return (
    <Form className={styles['formstyles']}>
      <Form.Check
        inline
        label={label}
        className={` ${styles['radiotxt']}`}
        type={'radio'}
        value={label}
        checked={isChecked}
        onChange={handleRadioChange}
      />
    </Form>
  )
}
export default RadioButton
