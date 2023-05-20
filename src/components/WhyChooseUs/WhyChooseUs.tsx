import { useRouter } from 'next/router'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import CashlessRepair from '../../../public/assets/CashlessRepair.png'
import ClaimSupport from '../../../public/assets/ClaimSupport.png'
import CompetitivePricing from '../../../public/assets/CompetitivePricing.png'
import Discounts from '../../../public/assets/discounts.png'
import Phygital from '../../../public/assets/phygital.png'
import UniqueAddons from '../../../public/assets/uniqueAddons.png'
import Columns from '../Columns/Columns'
import styles from './WhyChooseUs.module.scss'

const WhyChooseUs = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.data.user)
  return (
    <div className={styles['wrapper']}>
      <Container className={styles['container']}>
        <p className={styles['heading']}>Why Choose Us?</p>
        {/* <p className={styles['paragraph']}>
        Takaful Bazaar is Pakistan’s 1st digital takaful marketplace that provides you with unmatched customer service.  We will get you the best auto takaful rates, assist you in the timely settlement of your claims, and provide you with 24/7 support in matters related to your policy. 
        With Takaful Bazaar, you do not need to worry about anything. Just inform us, and we will be at your service.
        </p> */}
        {/* <Row className="m-5"> */}
        <Row className={`d-flex align-items-start justify-content-around ${styles['row']}`}>
          <Columns
            image={CashlessRepair}
            heading="Cashless Repairs"
            text="With us, there is no need to pay for auto repairs as our Takaful Partner will cover it directly"
            modalHeading="Cashless Repairs"
            modalText="We know how hard it is to get back on track when your vehicle has been affected by damages & theft. With the surging costs of repairs, the last thing you want to do is spend your money on car repairs 
            But no worries with Takaful Bazaar! 
            We enable cashless repairs with our partners, so your car never slows down & you can have ultimate peace of mind"
            link={user ? '' : 'Start Now'}
            onClick={() => router.push('/auth')}
          />
          <Columns
            image={CompetitivePricing}
            heading="Affordable Plans"
            text="By eliminating hidden charges and getting you the best prices, our plans are not only better but also more affordable"
            modalHeading="Best Rates"
            modalText="Takaful Bazaar’s auto-takaful plans are economical. Our plan cost goes down because we eliminate all hidden charges from our process.  We negotiate the best deals for you from the top takaful companies and make sure that no one overcharges for your takaful plan"
            link={user ? 'Get  Free  Comparison' : "Sign Up Now"}
            onClick={() => user ? router.push('/productPlan') : router.push('/auth')}
          />
          <Columns
            image={ClaimSupport}
            heading="24/7 Assistance"
            text="Any Auto Takaful queries or claims will be addressed by our team around the clock"
            modalHeading="24/7 Assistance"
            modalText="Takaful Bazaar has a separate call center office with experienced Takaful specialists available at any time for assistance. You can reach out to us for any query related to the purchase of a takaful policy or for help during claim settlement. TB’s call center specialists work 24/7 to help you with auto-takaful inquiries in the simplest & in an unbiased way"
            link="Contact Team-TB"
            onClick={() => router.push('/contactUs')}
          />
        </Row>
        <Row className={`d-flex align-items-start justify-content-around `}>
          <Columns
            image={UniqueAddons}
            heading="Unique Add-Ons"
            text=" We provide additional coverage options that give extra protection to your cars such as zero depreciation or roadside assistance"
            modalHeading="Unique Add-Ons"
            modalText="Takaful Bazaar is an innovative & user-friendly takaful marketplace that provides add-ons like never before. With added features like zero debt, no claims bonuses, roadside assistance, and trackers, we're creating customer-centric solutions"
            link="Sign Up Now"
            onClick={() => router.push('/auto')}
          />
          <Columns
            image={Phygital}
            heading="Instant Comparisons"
            text="We give you a one-stop solution to compare prices and plans from a wide range of Takaful providers"
            modalHeading="Instant Comparison"
            modalText="Now, there is no need to spend time inquiring from multiple takaful companies when you can do it instantly with us"
            link="Know More"
            onClick={() => router.push('/contactUs')}
          />
          <Columns
            image={Discounts}
            heading="Discounts and Codes"
            text="With discounts and promo codes, you can avail better value for money"
            modalHeading="More Discounts, More Value"
            modalText="
            Ever thought you could choose and pick car takaful plans from leading takaful operators in Pakistan while enjoying significant discounts? Now with Takaful Bazaar, save money with vouchers & referral codes on your contribution"
            link="Get Discounts Now"
            onClick={() => router.push('/auto')}
          />
        </Row>
      </Container>
    </div>
  )
}

export default WhyChooseUs
