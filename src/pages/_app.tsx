import 'bootstrap/dist/css/bootstrap.min.css'
import { NextPage } from 'next'
import NextProgress from 'next-progress'
import withRedux from 'next-redux-wrapper'
import type { AppProps } from 'next/app'
import App from 'next/app'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import WindowWrapper from '../components/WindowWrapper'
import AppWrapper from '../lib/appWrapper'
import { persistor, store } from '../lib/redux'
import '../styles/globals.scss'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  store: any
}
type GuardProps = {
  authGuard: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard }: GuardProps) => {
  if (authGuard) {
    return <AppWrapper>{children}</AppWrapper>
  }
  return <>{children}</>
}
class MyApp extends App<ExtendedAppProps> {
  static override async getInitialProps({ Component, ctx }: any) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    // Anything returned here can be accessed by the client
    return { pageProps }
  }

  override render() {
    const { Component, pageProps } = this.props
    const authGuard = Component.authGuard ?? false
    return (
      <Provider store={store}>
        <NextProgress height={3} delay={200} color={'#E91431'} options={{ showSpinner: false }} />
        <PersistGate loading={null} persistor={persistor}>
          <Guard authGuard={authGuard}>
            <WindowWrapper>
              <Component {...pageProps} />
            </WindowWrapper>
          </Guard>
        </PersistGate>
      </Provider>
    )
  }
}

export default withRedux(() => store)(MyApp)
