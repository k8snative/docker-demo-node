import type { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import type { ReactElement, ReactNode } from 'react'

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    authGuard?: boolean
    guestGuard?: boolean
    setConfig?: () => void
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode
  }
}

declare module 'react-signature-canvas'
