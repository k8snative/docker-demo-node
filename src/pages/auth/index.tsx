import { NextPage } from 'next'
import SeoHead from '~components/SeoHead'

import FloatingForm from '../../components/FloatingForm/FloatingForm'
import Header from '../../components/Header'
import styles from '../../styles/Home.module.scss'

const Auth: NextPage = () => (
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
    <FloatingForm />
  </div>
)

// const Auth = () => (
//   <div style={{border:'10px solid blue'}} className={`w-100 d-flex flex-column`}>
//     <Header />
//     <FloatingForm />
//   </div>
// )

// Auth.authGuard = true
export default Auth
