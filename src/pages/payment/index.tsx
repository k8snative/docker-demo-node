import type { NextPage } from 'next'
import Header from '~components/Header'
import PaymentPage from '~components/PaymentPage/PaymentPage'
import SeoHead from '~components/SeoHead'

import styles from '../../styles/Home.module.scss'
import loader from '../../../public/assets/loader.json'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'

const Payment: NextPage = () => {
  const { loading } = useSelector(state => state.auth)

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
          <div
            style={{
              display: loading ? 'flex' : 'none',
            }}
          >
            <Lottie
              height={'56vh'}
              width={615}
              options={{
                loop: true,
                autoplay: true,
                animationData: loader,
              }}
            /> 
          </div>
        
          <div style={{ display: loading && 'none'  }}>
            <PaymentPage  />
          </div>
  </div>
)}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
Payment.authGuard = true
export default Payment
