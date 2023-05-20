import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import currencyFormat from 'src/utils/currencyFormat'
import SignInUpButton from '~components/SignInUpButton/SignInUpButton'
import CarSheild from '~public/assets/carsheild.png'

//
import Address from '../../../public/assets/addresslogo.png'
import GoBackRed from '../../../public/assets/arrowBackred.png'
import Email from '../../../public/assets/emaillogo.png'
import Facebook from '../../../public/assets/facebooklogo.png'
import Instagram from '../../../public/assets/instalogo.png'
import InvoiceLogo from '../../../public/assets/invoicelogo.png'
import Phone from '../../../public/assets/mobilelogo.png'
import pdfBorder from '../../../public/assets/pdfBorder.png'
import TakafulLogo from '../../../public/assets/takafullogoblack.png'
import Web from '../../../public/assets/weblogo.png'
import styles from './InvoiceMob.module.scss'

///

// Function To Print PDF
// const printPdf = async () => {
//   const pageWidth = 650
//   const pageHeigth = 700
//   var pdf = new jsPDF('l', 'mm', [pageWidth * 1.2, pageHeigth * 1.2])

//   var imgHeight = document.getElementById('invoicereportwrapper').clientHeight
//   let count = Math.ceil(imgHeight / pageHeigth)
//   let invoiceImages = []
//   for (let i = 0; i < count; i++) {
//     var img = await html2canvas(document.getElementById('invoicereportwrapper'), {
//       width: pageWidth,
//       height: pageHeigth,
//       y: pageHeigth * i,
//       scale: 1,
//     }).then(canvas => {
//       return canvas.toDataURL('image/png')
//     })
//     invoiceImages.push(img)
//   }
//   invoiceImages.forEach((invoiceImage: any, idx: number) => {
//     idx && pdf.addPage()

//     pdf.addImage(invoiceImage.toString(), 'PNG', 90, 30, pageWidth, pageHeigth)
//   })
//   pdf.save('invoice')
// }

const printPdf = async () => {
  const pageWidth = 750
  const pageHeight = 900
  var pdf = new jsPDF('p', 'mm', [pageWidth * 1.2, pageHeight * 1.2])

  var imgHeight = document.getElementById('pdfcontainer').clientHeight

  let count = Math.ceil(imgHeight / pageHeight)
  let invoiceImages = []
  for (let i = 0; i < count; i++) {
    var img = await html2canvas(document.getElementById('pdfcontainer'), {
      width: pageWidth,
      height: pageHeight,
      y: pageHeight * i,
      scale: 1,
    }).then(canvas => {
      return canvas.toDataURL('image/png')
    })
    invoiceImages.push(img)
  }
  invoiceImages.forEach((invoiceImage: any, idx: number) => {
    idx && pdf.addPage()

    pdf.addImage(invoiceImage.toString(), 'PNG', 120, 30, pageWidth, pageHeight)
  })
  pdf.save(`invoice-${new Date().toISOString()}.pdf`)
}
const DownloadInvoice = () => (
  <div className={`${styles['downloadinvoicewrapper']}`}>
    <Link href={{ pathname: '/' }}>
      <div className={styles['gobackdiv']}>
        <div className={styles['gobackarrow']}>
          <Image src={GoBackRed} alt="backarrow" />
        </div>
        <p className={`mt-3 ${styles['gobacktxt']}`}>Back To Home</p>
      </div>
    </Link>

    <div className={`${styles['downloadinvoicecontainer']}`}>
      <Container>
        <Row>
          <Col className={`${styles['carcol']}`}>
            <div className={`${styles['carimage']}`}>
              <Image src={CarSheild} alt="car" />
            </div>
            <div>
              <p className={`p-0 m-0 ${styles['normaltext']}`}>Now you are</p>
              <p className={`p-0 m-0 ${styles['normaltextred']}`}>Covered*</p>
            </div>
          </Col>
          <Col>
            <div>
              <p className={` m-0 ${styles['plaintext']}`}>Thanks for using Takaful Bazaar.pk</p>
              <p onClick={() => printPdf()} className={` ${styles['plaintextred']}`}>
                Download Invoice
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
)
const Invoicereport = ({
  company_logo,
  purchase_date,
  purchase_id,
  premium_rate,
  addon,
  annual_premium,
  tax,
  discount,
  total,
}: {
  company_logo: string
  purchase_date: string
  purchase_id: number
  premium_rate: number
  addon: number
  annual_premium: number
  tax: number
  total: number
  discount: number
}) => (
  <div id="invoicereportwrapper" className={`${styles['invoicereportwrapper']}`}>
    <div className={`${styles['invoicediv']}`}>
      <div className={`${styles['invoiceupperdiv']}`}>
        <div className={`${styles['invoicedivimg']}`}>
          <Image
            alt=""
            src={`${process.env['NEXT_PUBLIC_IMAGE_ORIGIN']}${company_logo}`}
            width={'100%'}
            height={'100%'}
            objectFit={'contain'}
          />
        </div>
        <p className={`m-0 ${styles['invoicetxtred']}`}>Invoice</p>
      </div>
      <div className={`${styles['invoicelowerdiv']}`}>
        <div className={`${styles['invoicelowerrow']}`}>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Purchase ID:</p>
          <p className={`m-0 ${styles['invoiceheadingstxtred']}`}>{purchase_id}</p>
        </div>
        <div className={`${styles['invoicelowerrow']}`}>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Purchase Date:</p>
          <p className={`m-0 ${styles['invoiceheadingstxtred']}`}>
            {new Date(purchase_date).toLocaleDateString('en-BZ', { day: 'numeric', year: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>
      <div className={`mt-1 ${styles['invoicelowerdiv']}`}>
        <div className={`${styles['invoicelowerrow2']}`}>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Contribution Rate:</p>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>{premium_rate}%</p>
        </div>

        <div className={`${styles['invoicelowerrow2']}`}>
          <div className={`${styles['line']}`} />
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Add ons:</p>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>{addon ? currencyFormat(addon) : '-'}</p>
        </div>
        <div className={`${styles['invoicelowerrow2']}`}>
          <div className={`${styles['line']}`} />
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}> Annual Premium (PKR):</p>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>{currencyFormat(annual_premium)}</p>
        </div>
        <div className={`${styles['invoicelowerrow2']}`}>
          <div className={`${styles['line']}`} />
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Tax:</p>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>{tax}%</p>
        </div>
        <div className={`${styles['invoicelowerrow2']}`}>
          <div className={`${styles['line']}`} />
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Discount:</p>
          <p className={`m-0 ${styles['invoiceheadingstxt']}`}>Rs. {currencyFormat(discount)}</p>
        </div>
        <div className={`${styles['invoicelowerrow2']}`}>
          <div className={`${styles['line']}`} />
          <p className={`m-0  ${styles['invoiceheadingstxt']}`}>Total:</p>
          <p className={`m-0 ${styles['invoiceheadingstxtred']}`}>Rs. {currencyFormat(total)}</p>
        </div>
      </div>
    </div>
  </div>
)

const ComponentPDF = ({ invoice }: { invoice: any }) => {
  return (
    <div id="pdfcontainer" className={`${styles['pdfcontainer']}`}>
      <div className="w-100 mt-2">
        {/* 1st row */}
        <div className={`${styles['invoicelogoContainer']}`}>
          <div className={` mb-2 ${styles['takafullogo']}`}>
          </div>
        </div>
        {/* 2nd row */}
        <div className={`${styles['invoicelogoContainer']}`}>
          <div className={`${styles['invoicelogo']} p-2`}>
            {/* <Image src={InvoiceLogo} alt="Invoice" fill={"contain"} /> */}
            <h2> Invoice</h2>
          </div>
          <div className={`${styles['invoicevalueContainer']}`}>
            <p className={`${styles['invoicenoText']}`}>
              Invoice No: <span className={`${styles['invoiceValue']}`}>{invoice?.purchase_id} </span>
            </p>
            <p className={`${styles['invoicenoText']}`}>
              Date:{' '}
              <span className={`${styles['invoiceValue']}`}>
                {new Date(invoice?.purchase_date).toLocaleDateString('en-BZ', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </p>
          </div>
        </div>
        {/* 3rd row */}
        <div className="d-flex justify-content-between mt-2 ">
          <div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Takaful Provider:</p>
              <p className={`${styles['invoiceValue']}`}>
                {invoice?.order?.OrderDetailAuto?.Policy?.CompanySetup?.name}{' '}
              </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Reference ID:</p>
              <p className={`${styles['invoiceValue']}`}>{invoice?.purchase_id} </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Name:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.customer_name} </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Address:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.current_address}</p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Mobile:</p>
              <p className={`${styles['invoiceplainText']}`}> {invoice?.order?.OrderDetailAuto?.contact}</p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Email:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.email}</p>
            </div>
          </div>
          {/*  */}
          <div className="d-flex align-items-end flex-column">
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Car Make:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.Make?.name}</p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Car Model - Variant:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.Model?.name}</p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}> Year:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.year} </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Color:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.color}</p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Registration Number:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.registration_number} </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Engine Number:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.engine_number} </p>
            </div>
            <div className="d-flex">
              <p className={`${styles['invoicenoText']}`}>Chassis Number:</p>
              <p className={`${styles['invoiceplainText']}`}>{invoice?.order?.OrderDetailAuto?.chassis_number} </p>
            </div>
          </div>
          {/*  */}
        </div>
        {/*
         */}
        <div className=" px-5 mt-3">
          <div className="d-flex justify-content-between my-3">
            <p className={`${styles['invoiceBigText']}`}>Vehicle Value:</p>
            <p className={`${styles['invoiceplainBigText']}`}>
              {' '}
              Rs.{currencyFormat(invoice?.order?.OrderDetailAuto?.value | 0)}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p className={`${styles['invoiceBigText']}`}>Contribution Rate</p>
            <p className={`${styles['invoiceplainBigText']}`}>{invoice?.premium_rate}%</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p className={`${styles['invoiceBigText']}`}>Annual Contribution</p>
            <p className={`${styles['invoiceplainBigText']}`}>{currencyFormat(invoice?.annual_premium) | 0}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p className={`${styles['invoiceBigText']}`}>Add-ons</p>
            <p className={`${styles['invoiceplainBigText']}`}>
              {invoice?.addon ? currencyFormat(invoice?.addon | 0) : '-'}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p className={`${styles['invoiceBigText']}`}>Filer/ Non FilerTax</p>
            <p className={`${styles['invoiceplainBigText']}`}>{invoice?.tax}% </p>
          </div>
        </div>
        <div className={`d-flex justify-content-between mt-2 ${styles['totalContainer']}`}>
          <p className={`${styles['totalText']}`}>Total</p>
          <p className={`${styles['totalText']}`}>Rs.{currencyFormat(invoice?.total | 0)}</p>
        </div>
        {/* <div className="d-flex mt-2">
          <p className={`${styles['invoicenoText']}`}>Note:</p>
          <p className={`${styles['invoiceplainText']}`}>
            {' '}
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat{' '}
          </p>
        </div> */}
        <div className="d-flex justify-content-center align-items-center mt-4 flex-column">
          <p className={`${styles['thankyouText']}`}>
            Thankyou for choosing<span className={`${styles['thankyouTextRed']}`}> Takaful Bazaar</span>{' '}
          </p>
          <div className={`${styles['border']}`}>
            <p className={`mt-2 ${styles['thankyouText']}`}>For more information, please contact us on</p>
          </div>
          <div>
            <p className={`mt-2 ${styles['numberRedtext']}`}>021 - 111 - 832 - 682</p>
          </div>
        </div>
      </div>
      <div className={` ${styles['footer']}`}>
        <div style={{ marginBottom: '-10px', width: '100%' }}>
          <Image src={pdfBorder} alt="" />
        </div>
        <div className={` ${styles['blackbg']}`}>
          <div className="container d-flex justify-content-between mt-2">
            <div className="d-flex flex-column">
              <p className={` ${styles['addresstxtbold']}`}>Takaful Market Pvt. Ltd.</p>
              <div className="d-flex align-items-center">
                <div className={` ${styles['mapImg']}`}>
                  <Image src={Address} />
                </div>
                <p className={` ${styles['addresstxt']}`}> Office: 1503, 15th ﬂoor, Emerald Tower, G-19, Block-5,</p>
              </div>

              <p className={` ${styles['addresstxt']}`}>Main Clifton Road, Karachi, Pakistan</p>
            </div>
            {/*  */}
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className={` ${styles['mapImg']}`}>
                    <Image src={Phone} />
                  </div>
                  <p className={` ${styles['addresstxt']}`}> 021 35147500-02 </p>
                </div>
                <div className={` ${styles['seperator']}`} />

                <div className="d-flex align-items-center">
                  <div className={`${styles['mapImg']}`}>
                    <Image src={Email} />
                  </div>
                  <p className={` ${styles['addresstxt']}`}>hello@takafulbazaar.pk</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className={`${styles['mapImg']}`}>
                    <Image src={Facebook} />
                  </div>
                  <div className={`${styles['seperator']}`} />
                  <div className={`${styles['mapImg']}`}>
                    <Image src={Instagram} />
                  </div>
                  <p className={` ${styles['addresstxt']}`}> /takafulbazaar </p>
                </div>
                <div className={` ${styles['seperator']}`} />

                <div className="d-flex align-items-center">
                  <div className={` ${styles['mapImg']}`}>
                    <Image src={Web} />
                  </div>
                  <p className={` ${styles['addresstxt']}`}> www.takafulbazaar.pk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Lowerbtn = () => (
  <div
    className={`w-100 fixed-bottom position-sticky d-flex align-items-center justify-content-center ${styles['mcontactadvisor']}`}
  >
    <p className={`m-0 ${styles['madvisorpara']}`}>Go To Dashboard</p>
  </div>
)

const InvoiceMob = ({
  company_logo,
  purchase_date,
  purchase_id,
  premium_rate,
  addon,
  annual_premium,
  tax,
  discount,
  total,
  fullData,
}: {
  company_logo: string
  purchase_date: string
  purchase_id: number
  premium_rate: number
  addon: number
  annual_premium: number
  tax: number
  total: number
  discount: number
  fullData: any
}) => (
  <>
    <MediaQuery maxWidth={430}>
      <div className="position-relative">
        <DownloadInvoice />
        <div className={` ${styles['pdfdiv']}`}>
          <ComponentPDF invoice={fullData} />
        </div>
        <div className={`${styles['invoicediv1']}`}>
          <Invoicereport
            company_logo={company_logo}
            purchase_date={purchase_date}
            purchase_id={purchase_id}
            premium_rate={premium_rate}
            addon={addon}
            annual_premium={annual_premium}
            tax={tax}
            discount={discount}
            total={total}
          />
        </div>
        {/* <p className={`d-flex mx-4 my-5`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
        </p> */}
      </div>
    </MediaQuery>
  </>
)

export default InvoiceMob
