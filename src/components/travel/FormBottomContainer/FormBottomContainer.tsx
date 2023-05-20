import Image from 'next/image'
import SignInUpButton from '~components/SignInUpButton/SignInUpButton'

import formRadioChecked from '../../../../public/assets/formRadioChecked.png'
import formRadioUnchecked from '../../../../public/assets/formRadioUnchecked.png'
import FormGoBack from '../../FormGoBack/FormGoBack'
import styles from './FormBottomContainer.module.scss'

const FormBottomContainer = ({
  goBack,
  btnTxt,
  onClick,
  link,
  backbtnlink,
  termChecked,
  isTermChecked,
  error,
  setTermError,
}: {
  goBack: Boolean
  btnTxt: string
  onClick: Function
  link: string
  backbtnlink: string
  termChecked: Boolean
  isTermChecked: Function
  error?: string
  setTermError: Function
}) => (
  <div className="w-100 d-flex flex-column">
    <div className="d-flex align-items-center">
      <div
        onClick={() => {
          if (setTermError) if (!termChecked) setTermError('')
          isTermChecked(!termChecked)
        }}
        className={`d-flex align-items-center justify-content-center ${styles['radioImgContainer']}`}
      >
        <Image alt="" src={!termChecked ? formRadioUnchecked : formRadioChecked} />
      </div>
      <p className={` ${styles['iAgreeTxt']}`}>
        I agree to the <a className={` ${styles['iAgreeTxtRed']}`} href={'https://takafulbazaar-production.s3.ap-southeast-1.amazonaws.com/terms-and-conditions+-+Takaful+Bazaar.pdf'} target='_blank'>Terms and Conditions</a>
      </p>
    </div>
    <div className="d-flex align-items-center" style={{ height: '25px' }}>
      {error && <p className={styles['notOTPTxt']}>{error}</p>}
    </div>
    <div className="w-100 d-flex flex-column mb-4" style={{ cursor: 'pointer' }}>
      <SignInUpButton
        btnTxt={btnTxt}
        link={link}
        onClick={() => {
          onClick()
        }}
      />
    </div>
    {goBack && (
      <div className="w-100 d-flex align-items-center justify-content-between">
        <FormGoBack link={backbtnlink} onClick={() => onClick()} />
      </div>
    )}
  </div>
)

export default FormBottomContainer
