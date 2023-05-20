import { useEffect, useState } from 'react'
import Api from 'src/lib/api'
import AutoTakaful from '~components/AutoTakaful/AutoTakaful'
import CalimFeatures from '~components/CalimFeatures/CalimFeatures'
import CalimBanner from '~components/ClaimBanner/ClaimBanner'
import ClaimProcess from '~components/ClaimProcess/ClaimProcess'
import ClaimsAutoTakaful from '~components/ClaimsAutoTakaful/ClaimsAutoTakaful'
import DocumentCheckList from '~components/DocumentCheckList/DocumentCheckList'
import RegistorClaim from '~components/RegistorClaim/RegistorClaim'

import AutoTakafulClaim from '../../components/AutoTakafulClaim/AutoTakafulClaim'
import ContactOurAdvisor from '../../components/ContactOurAdvisor/ContactOurAdvisor'
import Footer from '../../components/Footer/Footer'
import GeneralFAQs from '../../components/GeneralFAQs/GeneralFAQs'
import Header from '../../components/Header'
import OurPartners from '../../components/OurPartners/OurPartners'
import SeoHead from '../../components/SeoHead'
import WhatIsAutoTakaful from '../../components/WhatIsAutoTakaful/WhatIsAutoTakaful'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import OnlineClaim from '~components/OnlineClaim/OnlineClaim'
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie'
import loader from '../../../public/assets/loader.json'  

const AutoCalims = () => {
  const [faq, setFAQ] = useState()
  const getFAQ = async () => {
    const apiData = await Api('GET', `faq/Life`)
    setFAQ(apiData?.data)
  }
  const { loading } = useSelector(state => state.auth)
  useEffect(() => {
    getFAQ()
  }, [])
  return (
    <div>
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
            // speed={0.6}
            options={{
              loop: true,
              autoplay: true,
              animationData: loader,
            }}
          /> 
        </div>
        : 
          <>
          <CalimBanner sampleTextProp="asdsa" key={1} />
          <ContactOurAdvisor categoriesVisible={false} contactAvisorMob={false} />
          <CalimFeatures />
          {/* <div>
            <Lottie
              // speed={0.6}
              options={{
                loop: true,
                autoplay: true,
                animationData: AutoTakafull,

                rendererSettings: {
                  preserveAspectRatio: 'xMidYMin slice',
                },
              }}
            />
          </div> */}
          <ClaimProcess />
          {/* <ClaimsAutoTakaful /> */}
          {/* <OnlineClaim /> */}
          <DocumentCheckList />
          <RegistorClaim />
          {/* <GeneralFAQs
            heading="Auto Claim"
            headingRed=" FAQ’s"
            para="Want to know more about our Auto Takaful claims? We are here to answer!"
            mobpara=""
            faqs={faq}
            redtxt={false}
            showMore={true}
            showMoreLink={'3'}
            backGroundColor={'#ffff'}
            topSeparator={true}
          /> */}

          <OurPartners />
      </> 
      }
      <Footer />
    </div>
  )
}

export default AutoCalims
