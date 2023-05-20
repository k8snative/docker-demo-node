import type { NextPage } from 'next'
import { useMediaQuery } from 'react-responsive'
import Footer from '~components/Footer/Footer'
import GetOurApp from '~components/GetOurApp/GetOurApp'
import Header from '~components/Header'
import Invoice from '~components/Invoice/Invoice'
import InvoiceMob from '~components/InvoiceMob/InvoiceMob'
import SeoHead from '~components/SeoHead'

import styles from '../../styles/Home.module.scss'

const InvoicePage: NextPage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 430px)',
  })
  return (
    <div className={styles['container']}>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: 'icon',
            href: '/favIcon.png',
          },
        ]}
      />
      <Header />
      <Invoice />
      <InvoiceMob />
      {isDesktopOrLaptop && (
        <>
          <GetOurApp />
          <Footer />
        </>
      )}
    </div>
  )
}

export default InvoicePage
