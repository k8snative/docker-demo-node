import ContactUsPage from '../components/ContactUsPage/ContactUsPage'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header'
import OurPartners from '../components/OurPartners/OurPartners'
import SeoHead from '../components/SeoHead'
import loader from '../../public/assets/loader.json'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'

const ContactUs = () => {
  const { loading } = useSelector(state => state.auth)
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
            options={{
              loop: true,
              autoplay: true,
              animationData: loader,
            }}
          /> 
        </div>
        : 
          <>
            <ContactUsPage />
            <OurPartners />
          </> 
    }
    <Footer />
  </div>
)}

export default ContactUs
