import Image from 'next/image'

import Address from '../../../public/assets/addresslogo.png'
import Email from '../../../public/assets/emaillogo.png'
import Facebook from '../../../public/assets/facebooklogo.png'
import Instagram from '../../../public/assets/instalogo.png'
import Invoice from '../../../public/assets/invoicelogo.png'
import Phone from '../../../public/assets/mobilelogo.png'
import pdfBorder from '../../../public/assets/pdfBorder.png'
import TakafulLogo from '../../../public/assets/takafullogoblack.png'
import Web from '../../../public/assets/weblogo.png'
import styles from './ComponentPDF.module.scss'

const ComponentPDF = () => (
  <div className={`${styles['pdfcontainer']}`}>
    <div className="container mt-2">
      {/* 1st row */}
      <div className={`${styles['invoicelogoContainer']}`}>
        <div className={` mb-2 ${styles['takafullogo']}`}>
          <Image src={TakafulLogo} alt="" />
        </div>
      </div>
      {/* 2nd row */}
      <div className={`${styles['invoicelogoContainer']}`}>
        <div className={`${styles['invoicelogo']}`}>
          <Image src={Invoice} alt="" />
        </div>
        <div className={`${styles['invoicevalueContainer']}`}>
          <p className={`${styles['invoicenoText']}`}>
            Invoice No: <span className={`${styles['invoiceValue']}`}>000565 </span>
          </p>
          <p className={`${styles['invoicenoText']}`}>
            Date: <span className={`${styles['invoiceValue']}`}>02 October, 2022 </span>
          </p>
        </div>
      </div>
      {/* 3rd row */}
      <div className="d-flex justify-content-between mt-2 ">
        <div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Takaful Provider:</p>
            <p className={`${styles['invoiceValue']}`}>UBL Insurers </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Reference ID:</p>
            <p className={`${styles['invoiceValue']}`}>2434565 </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Name:</p>
            <p className={`${styles['invoiceplainText']}`}>Yousuf Khatri </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Address:</p>
            <p className={`${styles['invoiceplainText']}`}>
              Office 1503, 15th ﬂoor, Emerald Tower, Clifton, Block-5, Karachi, Pakistan.
            </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Mobile:</p>
            <p className={`${styles['invoiceplainText']}`}>0300-0000000</p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Email:</p>
            <p className={`${styles['invoiceplainText']}`}>yousuf@gmail.com</p>
          </div>
        </div>
        {/*  */}
        <div className="d-flex align-items-end flex-column">
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Car Make:</p>
            <p className={`${styles['invoiceplainText']}`}>Toyota </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Car Model - Variant:</p>
            <p className={`${styles['invoiceplainText']}`}>Corolla XLI </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}> Year:</p>
            <p className={`${styles['invoiceplainText']}`}>2018 </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Color:</p>
            <p className={`${styles['invoiceplainText']}`}>Black</p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Registration Number:</p>
            <p className={`${styles['invoiceplainText']}`}>1234355 </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Engine Number:</p>
            <p className={`${styles['invoiceplainText']}`}>42353345 </p>
          </div>
          <div className="d-flex">
            <p className={`${styles['invoicenoText']}`}>Chassis Number:</p>
            <p className={`${styles['invoiceplainText']}`}>53345 </p>
          </div>
        </div>
        {/*  */}
      </div>
      {/*
       */}
      <div className="container px-5 mt-3">
        <div className="d-flex justify-content-between my-3">
          <p className={`${styles['invoiceBigText']}`}>Vehicle Value:</p>
          <p className={`${styles['invoiceplainBigText']}`}>PKR 20,000,00 </p>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className={`${styles['invoiceBigText']}`}>Contribution Rate</p>
          <p className={`${styles['invoiceplainBigText']}`}>1.65% </p>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className={`${styles['invoiceBigText']}`}>Annual Contribution</p>
          <p className={`${styles['invoiceplainBigText']}`}>Rs. 41,000 </p>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className={`${styles['invoiceBigText']}`}>Add-ons</p>
          <p className={`${styles['invoiceplainBigText']}`}>Rs. 8,000 </p>
        </div>
        <div className="d-flex justify-content-between my-3">
          <p className={`${styles['invoiceBigText']}`}>Filer/ Non FilerTax</p>
          <p className={`${styles['invoiceplainBigText']}`}>4.5% </p>
        </div>
      </div>
      <div className={`d-flex justify-content-between mt-2 ${styles['totalContainer']}`}>
        <p className={`${styles['totalText']}`}>Total</p>
        <p className={`${styles['totalText']}`}>Rs. 52,000 </p>
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

export default ComponentPDF
