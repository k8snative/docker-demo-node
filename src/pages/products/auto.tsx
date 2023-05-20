import { useEffect, useState } from 'react'
import Api from 'src/lib/api'
import AutoTakaful from '~components/AutoTakaful/AutoTakaful'

import SliderImage from '../../../public/assets/autobanner.png'
import AutoTakafulClaim from '../../components/AutoTakafulClaim/AutoTakafulClaim'
import Banner from '../../components/Banner/Banner'
import ContactOurAdvisor from '../../components/ContactOurAdvisor/ContactOurAdvisor'
import Footer from '../../components/Footer/Footer'
import GeneralFAQs from '../../components/GeneralFAQs/GeneralFAQs'
import Header from '../../components/Header'
import OurPartners from '../../components/OurPartners/OurPartners'
import SeoHead from '../../components/SeoHead'
import WhatIsAutoTakaful from '../../components/WhatIsAutoTakaful/WhatIsAutoTakaful'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'

const Auto = () => {
  const [faq, setFAQ] = useState()
  const getFAQ = async () => {
    const apiData = await Api('GET', `faq/Auto`)
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
      <Banner sampleTextProp="asdsa" key={1} />
      <ContactOurAdvisor categoriesVisible={false} contactAvisorMob={false} />
      <WhatIsAutoTakaful />
      <WhyChooseUs />
      <AutoTakaful />
      <AutoTakafulClaim />

      <GeneralFAQs
        heading="Auto Takaful "
        headingRed=" FAQ's"
        para=" Want to know more about our Auto Takaful? We are here to answer!"
        mobpara="Want to know more about our Auto Takaful? We are here to answer!"
        faqs={faq}
        redtxt={true}
        showMore={true}
        showMoreLink={'1'}
        backGroundColor={'#F3F3F3'}
        topSeparator={true}
      />

      <OurPartners />
      <Footer />
    </div>
  )
}
// Auto.authGuard = true
export default Auto
