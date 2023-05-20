import loader from "../../public/assets/loader.json";
import Banner from "../components/Banner/Banner";
import ContactOurAdvisor from "../components/ContactOurAdvisor/ContactOurAdvisor";
import Footer from "../components/Footer/Footer";
import GeneralFAQs from "../components/GeneralFAQs/GeneralFAQs";
import Header from "../components/Header";
import OurPartners from "../components/OurPartners/OurPartners";
import SeoHead from "../components/SeoHead";
import TakafulBazaarPlans from "../components/TakafulBazaarPlans/TakafulBazaarPlans";
import WhatIsTakaful from "../components/WhatIsTakaful";
import WhyChooseUs from "../components/WhyChooseUs";
import styles from "../styles/Home.module.scss";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import Api from "src/lib/api";

const Home: NextPage = () => {
  const [faq, setFAQ] = useState();
  const router = useRouter();
  const getFAQ = async () => {
    const apiData = await Api("GET", `faq/General`);
    setFAQ(apiData?.data);
  };
  // let loading = true;
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    getFAQ();
  }, []);
  return (
    <div className={styles["container"]}>
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
          <Banner path={`main`} sampleTextProp="asdsa" key={1} hideForm showBanner={false}/>
          {/* <ContactOurAdvisor categoriesVisible={true} contactAvisorMob={true} /> */}
          <WhatIsTakaful />
          <WhyChooseUs />
          <TakafulBazaarPlans />
          {/* <GeneralFAQs
                heading="General"
                headingRed="FAQ's"
                para="Got a question? We are here to answer ! If you don’t find
                your answer here, drop us a line at our"
                linkText="24/7 Available Call Center"
                onClick={() => router.push('/contactUs')}
                mobpara=""
                faqs={faq}
                redtxt={false}
                showMore={true}
                showMoreLink={'0'}
                backGroundColor="#fff"
                topSeparator={false}
              /> */}
          <OurPartners />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
