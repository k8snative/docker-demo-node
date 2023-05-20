import Footer from "../../../components/Footer/Footer";
import AutoTakafulClaim from "../../components/AutoTakafulClaim/AutoTakafulClaim";
import WhatIsAutoTakaful from "../../components/WhatIsAutoTakaful/WhatIsAutoTakaful";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import { useEffect, useState } from "react";
import Api from "src/lib/api";
import AutoTakaful from "~components/AutoTakaful/AutoTakaful";
import CalimFeatures from "~components/CalimFeatures/CalimFeatures";
import CalimBanner from "~components/ClaimBanner/ClaimBanner";
import ClaimProcess from "~components/ClaimProcess/ClaimProcess";
import ClaimsAutoTakaful from "~components/ClaimsAutoTakaful/ClaimsAutoTakaful";
import ContactOurAdvisor from "~components/ContactOurAdvisor/ContactOurAdvisor";
import DocumentCheckList from "~components/DocumentCheckList/DocumentCheckList";
import GeneralFAQs from "~components/GeneralFAQs/GeneralFAQs";
import Header from "~components/Header";
import OurPartners from "~components/OurPartners/OurPartners";
import RegistorClaim from "~components/RegistorClaim/RegistorClaim";
import SeoHead from "~components/SeoHead";
import ClaimsTravelTakaful from "~components/travel/ClaimsTravelTakaful/ClaimsTravelTakaful";
import TravelCalimFeatures from "~components/travel/TravelCalimFeatures/TravelCalimFeatures";
import TravelDocumentCheckList from "~components/travel/TravelDocumentCheckList/TravelDocumentCheckList";

const AutoCalims = () => {
  const [faq, setFAQ] = useState();
  const getFAQ = async () => {
    const apiData = await Api("GET", `faq/Life`);
    setFAQ(apiData?.data);
  };
  useEffect(() => {
    getFAQ();
  }, []);


  const testFAQ = {
    success: true,
    data: [
      {
        id: 7,
        faq_preference: 0,
        question: "Why is comparing necessary before buying Takaful policies?",
        answer:
          "Apart from being online and digital friendly;  Health Takaful plan offers unique benefits such as customizations,Zohair complimentary annual health check-ups, no restriction on room rent, daily hospital cash allowance, psychiatric support included, and so much more that ensures quality healthcare for both you and your family.",
        show_on_homepage: true,
        type: "General",
        createdAt: "2022-10-07T10:54:56.965Z",
        updatedAt: "2022-10-07T10:54:56.965Z",
      },
      {
        id: 7,
        faq_preference: 0,
        question: "Why is comparing necessary before buying Takaful policies?",
        answer:
          "Apart from being online and digital friendly;  Health Takaful plan offers unique benefits such as customizations,Zohair complimentary annual health check-ups, no restriction on room rent, daily hospital cash allowance, psychiatric support included, and so much more that ensures quality healthcare for both you and your family.",
        show_on_homepage: true,
        type: "General",
        createdAt: "2022-10-07T10:54:56.965Z",
        updatedAt: "2022-10-07T10:54:56.965Z",
      },
    ],
  };

  return (
    <div>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: "icon",
            href: "/favIcon.png",
          },
        ]}
      />
      <Header />
      <CalimBanner sampleTextProp="asdsa" key={1} />
      <ContactOurAdvisor categoriesVisible={false} contactAvisorMob={false} />
      <TravelCalimFeatures />
      <ClaimsTravelTakaful />
      <TravelDocumentCheckList />
      <ClaimProcess />
      <RegistorClaim />
      <GeneralFAQs
        heading="Auto Claim"
        headingRed=" FAQ’s"
        para=" Of course, you may have more questions related to renewing or buying takaful only, so scroll down and find your question answered!"
        mobpara=""
        faqs={testFAQ.data}
        redtxt={false}
        showMore={true}
        showMoreLink={"3"}
        backGroundColor={"#F3F3F3"}
        topSeparator={true}
      />

      <OurPartners />
      
      <Footer />
    </div>
  );
};
// Auto.authGuard = true
export default AutoCalims;
