import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Api from 'src/lib/api'
import Banner from '../components/Banner/Banner'
import AboutUsBanner from "../components/AboutUs/AboutUsBanner/AboutUsBanner"
import ContactOurAdvisor from '../components/ContactOurAdvisor/ContactOurAdvisor'
import Footer from '../components/Footer/Footer'
import GeneralFAQs from '../components/GeneralFAQs/GeneralFAQs'
import Header from '../components/Header'
import OurPartners from '../components/OurPartners/OurPartners'
import SeoHead from '../components/SeoHead'
import TakafulBazaarPlans from '../components/TakafulBazaarPlans/TakafulBazaarPlans'
import WhatIsTakaful from '../components/WhatIsTakaful'
import WhyChooseUs from '../components/WhyChooseUs'
import styles from '../styles/Home.module.scss'
import loader from '../../public/assets/loader.json'
import Lottie from 'react-lottie'
import HowWeStarted from '~components/AboutUs/HowWeStarted/HowWeStarted'
import OurWayForward from '~components/AboutUs/OurWayForward/OurWayForward'
import WhatWeOffer from '~components/AboutUs/WhatWeOffer/WhatWeOffer'
import BrandValues from '~components/AboutUs/BrandValues/BrandValues'
import VissionMission from '~components/AboutUs/VissionMission/VissionMission'

const AboutUs: NextPage = () => {
  const [faq, setFAQ] = useState()
  const router = useRouter()
  const getFAQ = async () => {
    const apiData = await Api('GET', `faq/General`)
    setFAQ(apiData?.data)
  }
  // let loading = true;
  const { loading } = useSelector(state => state.auth)
  useEffect(() => {
    getFAQ()
  }, [])
  return  (
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
      {loading 
        ? 
        <div>
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
        : 
          <>
            <AboutUsBanner sampleTextProp="asdsa" key={1} hideForm/>
              {/* <ContactOurAdvisor categoriesVisible={true} contactAvisorMob={true} /> */}
              <HowWeStarted />
              <VissionMission/>
              <BrandValues/>
              <WhatWeOffer/>
              <OurWayForward/>
              <OurPartners />
          </>
      }
      <Footer />
    </div>
  )
}

export default AboutUs