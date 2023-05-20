import 'bootstrap/dist/css/bootstrap.min.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 
import { NextPage } from 'next'
import NextProgress from 'next-progress'
import withRedux from 'next-redux-wrapper'
import type { AppProps } from 'next/app'
import App from 'next/app'
import React, { ReactNode, useState } from 'react'
import { Provider } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Script from 'next/script'
import Link from 'next/link'
import WindowWrapper from '../components/WindowWrapper'
import AppWrapper from '../lib/appWrapper'
import { persistor, store } from '../lib/redux'
import '../styles/globals.scss'
import Router from "next/router"
import Lottie from 'react-lottie'
import loader from '../../public/assets/loader.json'
import Head from 'next/head'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  store: any
}
type GuardProps = {
  authGuard: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard }: GuardProps) => {
  const [Loading, setLoading] = useState(false);

  Router.onRouteChangeStart = url => {
    setLoading(true);
  }

  Router.onRouteChangeComplete = () => setLoading(false);

  Router.onRouteChangeError = () => setLoading(false);
  if (authGuard) {
    return <AppWrapper>{children}</AppWrapper>;
  }
  return <>
    {
      Loading 
    ?        
      <div
        style={{
          height: '99vh',
          width: '99vw',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Lottie
          style={{
            padding: 0,
            margin: 0
          }}
          height={'56vh'}
          width={615}
          options={{
            loop: true,
            autoplay: true,
            animationData: loader,
          }}
        />  
      </div>
    : 
      children
    }
    </>;
};

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
              <Head>
                <script async src="https://www.googletagmanager.com/gtag/js"></script>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE']}');
                    `
                  }}
                />
              </Head>
              <Component {...pageProps} />
            </WindowWrapper>
          </Guard>
        </PersistGate>
      </Provider>
    )
  }
}

export default withRedux(() => store)(MyApp)
