import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Api from 'src/lib/api'

// import SliderImage from '../../../public/assets/healthbanner.png'
import Banner from '../../components/Banner/Banner'
import ContactOurAdvisor from '../../components/ContactOurAdvisor/ContactOurAdvisor'
import Footer from '../../components/Footer/Footer'
import GeneralFAQs from '../../components/GeneralFAQs/GeneralFAQs'
import Header from '../../components/Header'
import OurPartners from '../../components/OurPartners/OurPartners'
import SeoHead from '../../components/SeoHead'
import TakafulBazaarPlans from '../../components/TakafulBazaarPlans/TakafulBazaarPlans'
import WhatIsTakaful from '../../components/WhatIsTakaful'
import WhyChooseUs from '../../components/WhyChooseUs'
import styles from '../../styles/Home.module.scss'

const Home: NextPage = () => {
  const [faq, setFAQ] = useState()
  const router = useRouter()
  const getFAQ = async () => {
    const apiData = await Api('GET', `faq/General`)
    // console.log(apiData)
    setFAQ(apiData?.data)
  }
  useEffect(() => {
    getFAQ()
  }, [])
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

      {/* <NavBar /> */}
      <Header />
      <Banner sampleTextProp="asdsa" key={1} />
      <ContactOurAdvisor categoriesVisible={true} contactAvisorMob={true} />
      <WhatIsTakaful />
      <WhyChooseUs />
      <TakafulBazaarPlans />
      <GeneralFAQs
        heading="General"
        headingRed="FAQ's"
        para="Got a question? We are here to answer ! If you don’t find
        your answer here, drop us a line at our"
        linkText="24/7 Available Call Center"
        onClick={() => router.push('/products/contactUs')}
        mobpara=""
        faqs={faq}
        redtxt={false}
        showMore={true}
        showMoreLink={'0'}
        backGroundColor="#fff"
        topSeparator={false}
      />
      <OurPartners />
      <Footer />
    </div>
  )
}

export default Home
