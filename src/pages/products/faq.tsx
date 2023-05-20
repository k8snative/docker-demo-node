import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header'
import MainFAQ from '../../components/MainFAQ/MainFAQ'
import OurPartners from '../../components/OurPartners/OurPartners'
import SeoHead from '../../components/SeoHead'

const faq = () => (
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
    <MainFAQ />
    <OurPartners />
    <Footer />
  </div>
)

export default faq
