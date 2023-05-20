// ** React Imports
// ** Next Import
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'src/lib/redux/auth/action'
import { getCookie } from 'src/lib/utils'

interface Props {
  children: ReactNode
}

const WindowWrapper = ({ children }: Props) => {
  // ** State
  const [windowReadyFlag, setWindowReadyFlag] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.data.user)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowReadyFlag(true)
    }
    const token = getCookie('uat_accessToken')
    if (!token && user) {
      dispatch(logout())
    }
  }, [router.route])

  if (windowReadyFlag) {
    return <>{children}</>
  }
  return <></>
}

export default WindowWrapper
