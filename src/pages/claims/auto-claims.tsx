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

const AutoCalims = () => {
  const [faq, setFAQ] = useState()
  const getFAQ = async () => {
    const apiData = await Api('GET', `faq/Life`)
    // console.log(apiData)
    setFAQ(apiData?.data)
  }
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
      <CalimBanner sampleTextProp="asdsa" key={1} />
      <ContactOurAdvisor categoriesVisible={false} contactAvisorMob={false} />
      <CalimFeatures />
      <ClaimsAutoTakaful />
      <DocumentCheckList />
      <ClaimProcess />
      <RegistorClaim />
      <GeneralFAQs
        heading="Auto Claim"
        headingRed=" FAQ’s"
        para=" Of course, you may have more questions related to renewing or buying takaful only, so scroll down and find your question answered!"
        mobpara=""
        faqs={faq}
        redtxt={false}
        showMore={true}
        showMoreLink={'3'}
        backGroundColor={'#F3F3F3'}
        topSeparator={true}
      />

      <OurPartners />
      <Footer />
    </div>
  )
}
// Auto.authGuard = true
export default AutoCalims
