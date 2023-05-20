// import Banner from "../../components/Banner/Banner";
import HeadPhone from "../../../public/assets/headphone.svg";
import UploadImage from "../../../public/assets/upload-image.svg";
import Header from "../../components/Header";
import SeoHead from "../../components/SeoHead";
import Style from "./best-gurantee-add-request.module.scss";
import moment from "moment";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Api from "src/lib/api";
import Swal from "sweetalert2";
import SimpleBanner from "~components/Banner/simpleBanner";
import FormInput from "~components/FormInput/FormInput";
import PersonalDetailsDDInput from "~components/PersonalDetailsDDInput/PersonalDetailsDDInput";

export default function CreateGuranteeReq() {
  const [data, setData] = useState({
    claimer_name: "",
    provider_name: "",
    offer_price: "",
    policy_purchase_date: "",
    other_provider_name: "",
    other_offer_price: "",
    upload_proof: "",
  });
  const [error, setError] = useState({
    claimer_nameError: "",
    provider_nameError: "",
    offer_priceError: "",
    policy_purchase_dateError: "",
    other_provider_nameError: "",
    other_offer_priceError: "",
    upload_proofError: "",
  });
  const [file, setFile] = useState({});
  const [checkValidate, setCheckValidate] = useState(false);
  const ref = useRef();
  const onChangeText = (e) => {
    setError({
      ...error,
      [`${e?.target?.name}Error`]: "",
    });

    if (e?.name === "policy_purchase_date") {
      setError({ ...error, policy_purchase_dateError: "" });
      setData({
        ...data,
        policy_purchase_date: moment(e?.date).format("YYYY-MM-DD"),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onSubmitReq = () => {
    console.log("fileNammee===>", file);
    const err = { ...error };
    if (
      !data?.claimer_name?.trim()?.length ||
      !data?.provider_name?.trim()?.length ||
      !data?.offer_price?.trim()?.length ||
      !data?.policy_purchase_date?.trim()?.length ||
      !data.other_provider_name?.trim()?.length ||
      !file?.name?.length
    ) {
      if (!data?.claimer_name?.trim()?.length) {
        err.claimer_nameError = "Name is required field.";
      }
      if (!data?.provider_name?.trim()?.length) {
        err.provider_nameError = "Provider name is required field.";
      }
      if (!data?.offer_price?.trim()?.length) {
        err.offer_priceError = "Coverage rate is required field.";
      }
      if (!data?.policy_purchase_date?.trim()?.length) {
        err.policy_purchase_dateError =
          "Policy purchase date is required field.";
      }
      if (!data.other_provider_name?.trim()?.length) {
        err.other_provider_nameError = "Other Provider name is required field.";
      }
      if (!data.other_offer_price?.trim()?.length) {
        err.other_offer_priceError = "Other Coverage rate is required field.";
      }
      if (!file?.name?.length) {
        error.upload_proofError = "Upload Proof is required field";
      }
      setCheckValidate(true);
      setError(err);
      return;
    }

    setCheckValidate(false);

    const formData = new FormData();
    formData.append("file", file);
    console.log("data===>", data);
    Api("POST", `order/file`, formData, false, true).then((res) => {
      console.log(res, "data===>");
      if (res?.success) {
        let obj = { ...data };
        obj.upload_proof = res.filename;
        obj.offer_price = Number(data?.offer_price);
        obj.other_offer_price = Number(data?.other_offer_price);

        Api("POST", "price-claim/add", obj).then((v) => {
          console.log("bestGuranteeSucces", v);

          Swal.fire({
            icon: "success",
            text: "Your request has been logged",
            confirmButtonColor: "#df0025",
          });
          setData({
            claimer_name: "",
            provider_name: "",
            offer_price: "",
            policy_purchase_date: "",
            other_provider_name: "",
            other_offer_price: "",
            upload_proof: "",
          });
          setFile({});
        });
      }
    });
  };

  return (
    <div>
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
      <SimpleBanner fromCreateRequest />
      <Row style={{ zIndex: 100, position: "relative", margin: 0 }}>
        <Col lg={6}></Col>
        <Col lg={4} style={{ padding: "24px" }}>
          <h3>Contact Us</h3>
          <p style={{ fontSize: "17px", textAlign: "left" }}>
            At Takaful Bazaar, it is our constant endeavor to provide a great
            customer experience. In case you require assistance, Please call
          </p>
        </Col>
      </Row>
      <Row style={{ zIndex: 100, position: "relative", margin: 0 }}>
        <Col lg={6}></Col>

        <Col lg={6} style={{ padding: "0 0 0 24px" }}>
          <button className={`${Style["contact-us-btn"]}`}>
            <Image
              priority={true}
              src={HeadPhone}
              alt=""
              objectFit="contain"
              width={20}
            />
            UAN: 111-832-682
          </button>
        </Col>
      </Row>
      <Container>
        <Row
          style={{
            zIndex: 100,
            position: "relative",
            border: "solid #939393 0.5px",
            height: "auto",
            marginTop: "60px",
            background: "white",
            boxShadow: "rgb(147 147 147) 0px 2px 1px -1px",
            borderRadius: "6px",
            padding: "10px",
            marginRight:'10px',
            marginLeft:'10px'
          }}
        >
          <Col lg={12} xl={12} className="p-3">
            <span className={`${Style["info-heading"]}`}>
              Enter Your Details
            </span>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <FormInput
              placeHolder="Name"
              name="claimer_name"
              onChange={onChangeText}
              value={data?.claimer_name}
            />
            <Row>
              <Col>
                <p className="text-danger">{error?.claimer_nameError}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <FormInput
              placeHolder="Name of Takaful Provider"
              name="provider_name"
              onChange={onChangeText}
              value={data?.provider_name}
            />
            <Row>
              <Col>
                <p className="text-danger">{error?.provider_nameError}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <FormInput
              placeHolder="Coverage Rate Offered at Takaful Bazaar"
              name="offer_price"
              onChange={onChangeText}
              type="number"
              value={data?.offer_price}
            />
            <Row>
              <Col>
                <p className="text-danger">{error?.offer_priceError}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <PersonalDetailsDDInput
              name="policy_purchase_date"
              placeholder="Date of policy purchase*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              onBlur={() => {}}
              onChange={onChangeText}
              bestPriceGurantee
              value={data?.policy_purchase_date}

              //   error={
              //     formik.touched.cnic_expiry_date &&
              //     formik.errors.cnic_expiry_date
              //   }
              //   value={formik.values.cnic_expiry_date}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              //   formik={formik}
            />
            <Row>
              <Col>
                <p className="text-danger">
                  {error?.policy_purchase_dateError}
                </p>
              </Col>
            </Row>
          </Col>
          {/* <Col lg={6}></Col>

        <Col lg={6}>
          <button className={`${Style["contact-us-btn"]}`}>
            <Image
              priority={true}
              src={HeadPhone}
              alt=""
              objectFit="contain"
              width={20}
            />
           UAN: 111-832-682
          </button>
        </Col> */}
        </Row>
        <Row
          style={{
            position: "relative",
            border: "solid #939393 0.5px",
            height: "auto",
            // marginTop: "60px",
            background: "white",
            boxShadow: "rgb(147 147 147) 0px 2px 1px -1px",
            borderRadius: "6px",
            marginTop: "20px",
            marginRight:'10px',
          marginLeft:'10px'
          }}
        >
          <Col lg={12} xl={12} className="p-3">
            <span className={`${Style["info-heading"]}`}>
              Other Takaful Provider
            </span>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <FormInput
              placeHolder="Name of Takaful Provider"
              name="other_provider_name"
              onChange={onChangeText}
              value={data?.other_provider_name}
            />
            <Row>
              <Col>
                <p className="text-danger">{error?.other_provider_nameError}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={5} lg={5} md={5} sm={6} xs={12}>
            <FormInput
              placeHolder="Coverage Rate offered"
              name="other_offer_price"
              onChange={onChangeText}
              type="number"
              value={data?.other_offer_price}
            />
            <Row>
              <Col>
                <p className="text-danger">{error?.other_offer_priceError}</p>
              </Col>
            </Row>
          </Col>
          <Col lg={12}>
            <Row
              style={{ background: "#F5F5F5", height: "auto", padding: "10px" }}
            >
              <Col className="p-3" lg={12}>
                <span className={`${Style["info-upload-heading"]}`}>
                  Upload Proof{" "}
                </span>
                <p style={{ color: "#707070" }}>
                  Upload Proof of document/image/screenshot or Enter weblink of
                  lower rate offer valid within last 7 days
                </p>
              </Col>
              <Col
                lg={4}
                style={{
                  height: "200px",
                  border: "1px solid rgb(186 185 185)",
                  marginLeft: "0px",
                  borderRadius: "10px",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  ref.current.click();
                }}
              >
                <Row>
                  <Col lg={12}>
                    <Image priority={true} src={UploadImage} />
                    <h6>Upload Image</h6>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <p className="text-success">{file?.name}</p>
              </Col>
              <Row>
                <Col>
                  <p className="text-danger">
                    {" "}
                    {!file?.name && checkValidate
                      ? "Upload proof is required field"
                      : ""}
                  </p>
                </Col>
              </Row>

              <Col xl={4} lg={4} md={5} sm={6} xs={12} className="p-3">
                <FormInput
                  placeHolder="Enter Weblink"
                  backgroundColor={"white"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{   marginRight:'10px',
          marginLeft:'10px'}}>
          <Col lg={12} xl={12} className="p-2">
            <span className={`${Style["info-heading"]}`}>
              Terms & Conditions
            </span>
          </Col>
          <Col lg={12} xl={12} className="p-2">
            <span className={`${Style["term-condition"]}`}>
              - Best Price Guarantee feature is valid on Auto Takaful only
            </span>
          </Col>{" "}
          <Col lg={12} xl={12} className="p-2">
            <span className={`${Style["term-condition"]}`}>
              - Proof document needs to be from 7 days prior to refund
              submission{" "}
            </span>
          </Col>{" "}
          <Col lg={12} xl={12} className="p-2">
            <span className={`${Style["term-condition"]}`}>
              - Refund will be processed once all proof documents have been
              verified by Takaful Bazaar
            </span>
          </Col>{" "}
          <Col lg={12} xl={12} className="p-2">
            <span className={`${Style["term-condition"]}`}>
              - Refund processing time can take up to 15 working days
            </span>
          </Col>
          <Col lg={12} className="d-flex justify-content-center">
            <button
              className={`${Style["contact-us-btn"]}`}
              onClick={onSubmitReq}
            >
              Submit Request
            </button>
          </Col>
        </Row>
        {/* <Row
          style={{
            border: "solid  #EE1633 0.5px",
            height: "7rem",
            marginBottom: "5rem",
            borderRadius: "5px",
            padding: "10px",
            display:'flex',
            alignItems:'center',
            borderLeft:'solid px red'
          }}
        >
          <Col lg={6}>
            <Row>
              <Col lg={12}>
                <h3>Best Price guarantee</h3>{" "}
              </Col>

              <Col lg={12} className="d-flex alignItems-center">
                <Image src={iGrey} height="20" width="20" />
                <span style={{ fontSize: "14px",marginLeft:'4px' }}>
                  Our best price guarantee means that you can be sure of buying
                  the right Plan.
                </span>
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <button className={`${Style["contact-us-btn"]}`}>View more</button>
          </Col>
          <Col>
          
          </Col>
        </Row> */}
      </Container>
      <input
        type="file"
        className="d-none"
        ref={ref}
        name="file"
        onChange={(e) => {
          setFile(e?.target?.files[0]);

          setError({ ...error, upload_proofError: "" });
        }}
      />
    </div>
  );
}
