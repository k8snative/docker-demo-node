import ContactUsPage from '../../components/ContactUsPage/ContactUsPage'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header'
import OurPartners from '../../components/OurPartners/OurPartners'
import SeoHead from '../../components/SeoHead'

const ContactUs = () => (
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
    <ContactUsPage />
    <OurPartners />
    <Footer />
  </div>
)

export default ContactUs
