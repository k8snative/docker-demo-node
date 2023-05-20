import { useRouter } from 'next/router'

import styles from './SignInUpButton.module.scss'

const SignInUpButton = ({ btnTxt, link, onClick, disable = false }: { btnTxt: string; link?: string; onClick: Function; disable?: string }) => {
  const router = useRouter()
  const onClickHandler = () => {
    onClick()
    if (link?.length > 1)
      router.push({
        pathname: link,
      })
  }
  return (
    <div onClick={() => disable ? null : onClickHandler()} className={`w-100 d-flex align-items-center justify-content-center`} >
      <div className={`w-100 d-flex align-items-center justify-content-center ${styles['mcontactadvisor']}`} >
        <p className={`m-0 ${styles['madvisorpara']}`}>{btnTxt}</p>
      </div>
    </div>
  )
}

export default SignInUpButton
