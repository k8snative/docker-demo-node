import Footer from '../components/Footer/Footer'
import Header from '../components/Header'
import MainFAQ from '../components/MainFAQ/MainFAQ'
import OurPartners from '../components/OurPartners/OurPartners'
import SeoHead from '../components/SeoHead'
import loader from '../../public/assets/loader.json'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'

const faq = () => {
  const { loading } = useSelector(state => state.auth)
  return (
  <div className="w-100 m-0 p-0">
    <SeoHead
      title="Takaful Bazar FAQs"
      description="General FAQs"
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
    <MainFAQ />
    <OurPartners />
          </> 
    }
    <Footer />
  </div>
)}

export default faq
