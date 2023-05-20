import styles from "./covered.module.scss";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import currencyFormat from "src/utils/currencyFormat";
import Header from "~components/Header";
import SeoHead from "~components/SeoHead";
import CarSheild from "~public/assets/carsheild.png";

// Function To Print PDF
const printPdf = async () => {
  const pageWidth = 650;
  const pageHeigth = 900;
  var pdf = new jsPDF("l", "mm", [pageWidth * 1.2, pageHeigth * 1.2]);

  var imgHeight = document.getElementById("invoicereportwrapper").clientHeight;
  let count = Math.ceil(imgHeight / pageHeigth);
  let invoiceImages = [];
  for (let i = 0; i < count; i++) {
    var img = await html2canvas(
      document.getElementById("invoicereportwrapper"),
      {
        width: pageWidth,
        height: pageHeigth,
        y: pageHeigth * i,
        scale: 1,
      }
    ).then((canvas) => {
      return canvas.toDataURL("image/png");
    });
    invoiceImages.push(img);
  }
  invoiceImages.forEach((invoiceImage: any, idx: number) => {
    idx && pdf.addPage();

    pdf.addImage(invoiceImage.toString(), "PNG", 90, 30, pageWidth, pageHeigth);
  });
  pdf.save("invoice");
};

const DownloadInvoice = () => (
  <div className={`${styles["downloadinvoicecontainer"]}`}>
    <Container>
      <Row>
        <Col lg={2} md={2} className={`${styles["carcol"]}`}>
          <div className={`${styles["carimage"]}`}>
            <Image src={CarSheild} alt="car" />
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div>
            <p className={`p-0 m-0 ${styles["normaltext"]}`}>Now you are</p>
            <p className={`p-0 m-0 ${styles["normaltextred"]}`}>Covered *</p>
          </div>
          <div>
            <p className={` m-0 ${styles["plaintext"]}`}>
              Thanks for using Takaful Bazaar.pk
            </p>
            <p
              onClick={() => printPdf()}
              className={` ${styles["plaintextred"]}`}
            >
              Download Invoice
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const Buttondiv = () => (
  <div className={`${styles["buttondiv"]}`}>
    <div
      onClick={() =>
        window.open(`${process.env["NEXT_PUBLIC_DASHBOARD_ORIGIN"]}my-policies`)
      }
      className={`${styles["button"]}`}
    >
      <p className={`m-0 ${styles["buttontxt"]}`}>Go To Dashboard</p>
    </div>
    <div onClick={() => printPdf()} className={`${styles["button"]}`}>
      <p className={`m-0 ${styles["buttontxt"]}`}>Print PDF</p>
    </div>
  </div>
);

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
  company_logo: string;
  purchase_date: string;
  purchase_id: number;
  premium_rate: number;
  addon: number;
  annual_premium: number;
  tax: number;
  total: number;
  discount: number;
}) => (
  <div
    id="invoicereportwrapper"
    className={`${styles["invoicereportwrapper"]}`}
  >
    <div className={`${styles["invoicediv"]}`}>
      <div className={`${styles["invoiceupperdiv"]}`}>
        <div className={`${styles["invoicedivimg"]}`}>
          <Image
            alt=""
            src={`${process.env["NEXT_PUBLIC_IMAGE_ORIGIN"]}${company_logo}`}
            width={"100%"}
            height={"100%"}
            objectFit={"contain"}
          />
        </div>
        <p className={`m-0 ${styles["invoicetxtred"]}`}>Invoice</p>
      </div>
      <div className={`${styles["invoicelowerdiv"]}`}>
        <div className={`${styles["invoicelowerrow"]}`}>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>Purchase ID:</p>
          <p className={`m-0 ${styles["invoiceheadingstxtred"]}`}>
            {purchase_id}
          </p>
        </div>
        <div className={`${styles["invoicelowerrow"]}`}>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>
            Purchase Date:
          </p>
          <p className={`m-0 ${styles["invoiceheadingstxtred"]}`}>
            {new Date(purchase_date).toLocaleDateString("en-BZ", {
              day: "numeric",
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
      <div className={`mt-2 ${styles["invoicelowerdiv"]}`}>
        <div className={`${styles["invoicelowerrow2"]}`}>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>Contribution Rate:</p>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>
            {premium_rate}%
          </p>
        </div>

        <div className={`${styles["invoicelowerrow2"]}`}>
          <div className={`${styles["line"]}`} />
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>Add ons:</p>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>
            {/* {addon ? currencyFormat(addon) : "-"} */}
          </p>
        </div>
        <div className={`${styles["invoicelowerrow2"]}`}>
          <div className={`${styles["line"]}`} />
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>
            {" "}
            Annual Premium (PKR):
          </p>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>
            {/* {currencyFormat(annual_premium)} */}
          </p>
        </div>
        <div className={`${styles["invoicelowerrow2"]}`}>
          <div className={`${styles["line"]}`} />
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>Tax:</p>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>{tax}%</p>
        </div>
        <div className={`${styles["invoicelowerrow2"]}`}>
          <div className={`${styles["line"]}`} />
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>Discount:</p>
          <p className={`m-0 ${styles["invoiceheadingstxt"]}`}>{discount}%</p>
        </div>
        <div className={`${styles["invoicelowerrow2"]}`}>
          <div className={`${styles["line"]}`} />
          <p className={`m-0  ${styles["invoiceheadingstxt"]}`}>Total:</p>
          <p className={`m-0 ${styles["invoiceheadingstxtred"]}`}>
            {/* Rs. {currencyFormat(total)} */}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Covered = ({
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
  company_logo: string;
  purchase_date: string;
  purchase_id: number;
  premium_rate: number;
  addon: number;
  annual_premium: number;
  tax: number;
  total: number;
  discount: number;
}) => (
  <>
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
    <MediaQuery minWidth={430}>
      <DownloadInvoice />
      <div>
        <div className={`d-flex flex-row px-5`}>
          <Col lg={7} md={6}>
            <Buttondiv />
          </Col>
          <Col lg={5} md={6} className={` ${styles["invoicecol"]}`}>
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
          </Col>
        </div>
        <Container>
          <p className={`d-flex mx-2 my-5`}>
            *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut
          </p>
        </Container>
      </div>
    </MediaQuery>
  </>
);
export default Covered;
