import type { NextPage } from 'next'
import Header from "../components/Header";
import SeoHead from "../components/SeoHead";
import Footer from "../components/Footer/Footer";
import loader from '../../public/assets/loader.json'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive';

const Businesses: NextPage = () => {
  const { loading } = useSelector(state => state.auth);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 750px)',
  })
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
          <div style={{
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#e91431',
            fontSize: 40,
            textAlign: 'center',
            paddingTop: isDesktopOrLaptop ? 125 : 60,
          }}>
            Coming Soon!
            <div 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(0, 0, 0, 0.87)',
                fontSize: isDesktopOrLaptop ? 18 : 16,
                width: '90%',
                textAlign: isDesktopOrLaptop ?  'center' : 'justify',
                margin: 'auto'
              }}
            >
              <br />
              <p>
                We are gearing ourselves up to provide you with the best digital experience.  
              </p>
              <p>
              Meanwhile, you may reach us out via <b 
                >whatsapp 
                <a style={{textDecoration:"underline",color:'#0000EE'}} href='https://wa.me/+923272055033' target="_blank">+923272055033</a>
                </b> or call us directly at <b>UAN: 111-832-682</b> and our Takaful specialist would be more than happy to assist you in choosing the right Health Takaful plan.
                {/* Meanwhile, you may reach out to us at <b>+92327055033</b> or call us directly at <b>UAN: 111-832-682/PTCL: (021) 388-922-30</b> and our call centre agents would be more than happy to assist you in choosing the right Health Takaful coverage plan to suit your needs. */}
              </p>
              <p>
                We appreciate your patience while we prepare to serve you through our web and mobile app.
              </p>
              <p>
                Looking forward to seeing you again to explore our amazing Takaful coverage plans soon.
              </p>
            </div>
          </div>
        </> 

      }
    <Footer />
  </div>
)}

export default Businesses
