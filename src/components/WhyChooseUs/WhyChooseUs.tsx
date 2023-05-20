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
  console.log('user details', user)
  return (
    <div className={styles['wrapper']}>
      <Container className={styles['container']}>
        <p className={styles['heading']}>Why choose us?</p>
        <p className={styles['paragraph']}>
          Takaful Bazaar is Pakistan’s 1st digital takaful marketplace that guarantees a transparent & smooth customer
          experience by offering the best auto takaful deals from leading takaful operators in Pakistan.
        </p>
        {/* <Row className="m-5"> */}
        <Row className={`d-flex align-items-start justify-content-around ${styles['row']}`}>
          <Columns
            image={CashlessRepair}
            heading="Cashless Repairs"
            text="With TB cashless repairs, say goodbye to huge bills."
            modalHeading="Cashless Repairs"
            modalText="We  understand  when  your  vehicle  has  been
          compromised by theft or damage, the last thing you
          want to do is spend your hard-earned money on car
          repairs.  Takaful  Bazaar  gives  nationwide  cashless
          repair  benefits,  so  you  don't  have  to  worry  about
          paying huge bills because Team-TB is here to work
          effortlessly to ensure your comfort."
            link={user ? '' : 'Start Now'}
            onClick={() => router.push('/auth/auth')}
          />
          <Columns
            image={CompetitivePricing}
            heading="Competitive Pricing"
            text="Compare top Pakistan’s auto takaful products with no hidden charges."
            modalHeading="Competitive Pricing"
            modalText="Nothing  sounds  more  pleasing  than  getting  your  preferred  auto-takaful  policy  at  competitive
          market  rates  because  nobody  wants  to  spend  tons  of  money  only  on  contributions.  Takaful
          Bazaar  is  an  easy-to-use  takaful  marketplace  that  compares  top  Pakistan’s  auto  takaful
          products with no hidden charges and within your budget."
            link="Get  Free  Comparison"
            onClick={() => router.push('/productPlan')}
          />
          <Columns
            image={ClaimSupport}
            heading="Claim Support"
            text="Get your enquiries answered whenever you want."
            modalHeading="Claim Support"
            modalText="Customers are the center of the Takaful Bazaar market; therefore, we have a separate call center
          office  with  trustworthy  agents  who  are  available  for  assistance  throughout  the  week.  You  can
          reach out to us for any query related to takaful policy purchase or help during claim settlement.
          TB call center agents work 24/7 to help you with auto-takaful inquiries in
          the simplest & easiest way possible."
            link="Hello  Team-TB"
            onClick={() => router.push('/products/contactUs')}
          />
        </Row>
        <Row className={`d-flex align-items-start justify-content-around `}>
          <Columns
            image={UniqueAddons}
            heading="Unique Add-Ons"
            text="Get unique add-ons on your auto takaful insurance like never before."
            modalHeading="Unique Add-Ons"
            modalText="Takaful Bazaar is an innovative & customer-centric takaful marketplace in Pakistan that provides add-ons like never before. With added features like zero debt, no claims bonuses, roadside assistance and trackers, we're creating customer-centric solutions."
            link="Get Exclusive Benefits"
            onClick={() => router.push('/products/auto')}
          />
          <Columns
            image={Phygital}
            heading="We’re Phygital"
            text="Buy takaful policy effortlessly with our Phygital model."
            modalHeading="We’re Phygital"
            modalText="In order to provide the best physical and digital customer-centric experience, Takaful Bazaar now brings Pakistan's first phygital takaful marketplace concept to provide convenience and simplicity to users.
          Now, there is no need to spend hours or days in queues doing heavy paperwork for your takaful policy. Our Phygital model includes physical and digital touchpoints through which Team-TB connects with our customers and provides on-the-ground claims support as well. This helps us create the best products and services that meet the needs of our valued customers. TEAM-TB is here to take care!"
            link="Locate Us"
            onClick={() => router.push('/products/contactUs')}
          />
          <Columns
            image={Discounts}
            heading="More Discounts, More Value"
            text="Stay on budget & save money on your contributions. "
            modalHeading="More Discounts, More Value"
            modalText="Ever thought you could choose and pick car takaful policies from leading takaful operators in Pakistan while enjoying huge discounts? Save your money with TB’s voucher & codes on your contribution & cover your car inexpensively. "
            link="Start Saving Now"
            onClick={() => router.push('/products/auto')}
          />
        </Row>
      </Container>
    </div>
  )
}

export default WhyChooseUs
