import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { getCookie, setCookie } from 'src/lib/utils'
import Footer from '~components/Footer/Footer'
import GetOurApp from '~components/GetOurApp/GetOurApp'
import Header from '~components/Header'
import Invoice from '~components/Invoice/Invoice'
import InvoiceMob from '~components/InvoiceMob/InvoiceMob'
import SeoHead from '~components/SeoHead'
import SignInUpButton from '~components/SignInUpButton/SignInUpButton'

import styles from '../../../styles/Home.module.scss'

type InvoiceType = {
  purchase_id: number
  company_logo: string
  purchase_date: string
  premium_rate: number
  addon: number
  annual_premium: number
  tax: number
  discount: number
  total: number
}

const InvoicePage: NextPage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 430px)',
  })

  const [invoiceData, setInvoiceData] = useState<InvoiceType>({
    purchase_id: 0,
    company_logo: '',
    purchase_date: '',
    premium_rate: 0,
    addon: 0,
    annual_premium: 0,
    tax: 0,
    discount: 0,
    total: 0,
  })

  const router = useRouter()

  const { invoiceID } = router.query

  useEffect(() => {
    const getOrderDetails = async () => {
      await Api('GET', `order-customer-invoice/${invoiceID}`).then(res => {
        if (res.success) {
          setInvoiceData(res.invoice)
        }
      })
    }
    getOrderDetails()
  }, [invoiceID])
  // console.log('invoice data',invoiceData)

  return (
    <div className={`position-relative ${styles['container']}`}>
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
      <Invoice
        company_logo={invoiceData.company_logo}
        purchase_date={invoiceData.purchase_date}
        purchase_id={invoiceData.purchase_id}
        premium_rate={invoiceData.premium_rate}
        addon={invoiceData.addon}
        annual_premium={invoiceData.annual_premium}
        tax={invoiceData.tax}
        discount={invoiceData.discount}
        total={invoiceData.total}
        fullData={invoiceData}
      />
      <InvoiceMob
        company_logo={invoiceData.company_logo}
        purchase_date={invoiceData.purchase_date}
        purchase_id={invoiceData.purchase_id}
        premium_rate={invoiceData.premium_rate}
        addon={invoiceData.addon}
        annual_premium={invoiceData.annual_premium}
        tax={invoiceData.tax}
        discount={invoiceData.discount}
        total={invoiceData.total}
        fullData={invoiceData}
      />
      {isDesktopOrLaptop ? (
        <>
          <GetOurApp />
          <Footer />
        </>
      ) : (
        <div style={{ bottom: 0 }} className="w-100 position-fixed">
          <SignInUpButton
            btnTxt="Track Your Policy"
            onClick={() => window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}my-policies`)}
          />
        </div>
      )}
    </div>
  )
}

// InvoicePage.authGuard = true

export default InvoicePage
