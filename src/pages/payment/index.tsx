import type { NextPage } from 'next'
import Header from '~components/Header'
import PaymentPage from '~components/PaymentPage/PaymentPage'
import SeoHead from '~components/SeoHead'

import styles from '../../styles/Home.module.scss'

const Payment: NextPage = () => (
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
    <PaymentPage />
  </div>
)

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
Payment.authGuard = true
export default Payment
