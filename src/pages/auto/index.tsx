import SliderImage from "../../../public/assets/autobanner.png";
import loader from "../../../public/assets/loader.json";
import AutoTakafulClaim from "../../components/AutoTakafulClaim/AutoTakafulClaim";
import Banner from "../../components/Banner/Banner";
import ContactOurAdvisor from "../../components/ContactOurAdvisor/ContactOurAdvisor";
import Footer from "../../components/Footer/Footer";
import GeneralFAQs from "../../components/GeneralFAQs/GeneralFAQs";
import Header from "../../components/Header";
import OurPartners from "../../components/OurPartners/OurPartners";
import SeoHead from "../../components/SeoHead";
import WhatIsAutoTakaful from "../../components/WhatIsAutoTakaful/WhatIsAutoTakaful";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import AutoTakaful from "~components/AutoTakaful/AutoTakaful";

const Auto = () => {
  const [faq, setFAQ] = useState();
  const getFAQ = async () => {
    const apiData = await Api("GET", `faq/Auto`);
    setFAQ(apiData?.data);
  };
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    getFAQ();
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 430px)",
  });
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
      {loading ? (
        <div>
          <Lottie
            height={"56vh"}
            width={615}
            options={{
              loop: true,
              autoplay: true,
              animationData: loader,
            }}
          />
        </div>
      ) : (
        <>
          <Banner
            path={`auto`} 
            key={1}
            bannerHeadingText={"Auto"}
            bannerSecondText={"Takaful Plan"}
            bannerSubText={"Pakistan's only Digital Takaful Solution for All"}
          />
          <ContactOurAdvisor
            categoriesVisible={false}
            contactAvisorMob={false}
          />
          <WhatIsAutoTakaful />
          <WhyChooseUs />
          <AutoTakaful />
          <AutoTakafulClaim />
          <OurPartners />
        </>
      )}
      <Footer />
    </div>
  );
};
export default Auto;
