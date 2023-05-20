import styles from "./travelReviewDetails.module.scss";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import SignaturePad from "react-signature-canvas";
import Api from "src/lib/api";
import { setAllowedTab, setLockedTab } from "src/lib/redux/auth/action";
import { formatTime } from "src/lib/utils";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import RadioButton from "~components/RadioButton/RadioButton";

const PersonalDetailsData = ({
  customerInfo,
  nationality,
}: {
  customerInfo: any;
  nationality: string;
}) => {
  return (
    <div>
      <p className={`${styles["PersonalDetailsheading"]}`}>Personal Details</p>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Full Name</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.customer_name}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Current Address</p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.current_address}{" "}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Phone Number</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.contact}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Date of Birth</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.date_of_birth.substring(0, 10)}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Email Address</p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.email}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Place of Birth</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.place_of_birth}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Father/ Spouse Name</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.father_name === null
                ? "-"
                : customerInfo?.OrderDetailAuto?.father_name}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>
              Mother&lsquo; Maiden Name
            </p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.mother_name}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Nationality</p>
            <p className={`m-0 ${styles["text"]}`}>{nationality}</p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>CNIC/ Passport Number</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.cnic_number}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>
              CNIC/ Passport Issue Date
            </p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.cnic_issue_date.substring(0, 10)}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>
              CNIC/ Passport Expiry Date
            </p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.cnic_expiry_date.substring(0, 10)}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Occupation</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.occupation === null
                ? "-"
                : customerInfo?.OrderDetailAuto?.occupation}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Source of Income</p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.source_of_income}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Next of Kin Name</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.benificiary_name}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>
              Next of Kin Phone Number
            </p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.benificiary_relation}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Next of Kin Relation</p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.benificiary_cnic_number}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>
              Next of Kin CNIC Number
            </p>
            <p className={`m-0 ${styles["text2"]}`}>
              {customerInfo?.OrderDetailAuto?.benificiary_address === null
                ? "-"
                : customerInfo?.OrderDetailAuto?.benificiary_address}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Next of Kin address</p>
            <p className={`m-0 ${styles["text"]}`}>
              {customerInfo?.OrderDetailAuto?.is_filer ? "Filer" : "Non-filer"}
            </p>
          </div>
        </Col>
      </Row>
      <div className={`mt-5 mb-3 ${styles["seperator"]} `} />
    </div>
  );
};

const VehicleDetailsData = ({ customerInfo }: { customerInfo: any }) => (
  <div>
    <p className={`${styles["PersonalDetailsheading"]}`}>Family Details</p>
    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Member 1</p>
          <p className={`m-0 ${styles["text"]}`}>Spouce</p>
          <p className={`m-0 ${styles["text"]}`}>03052198108</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Member 1</p>
          <p className={`m-0 ${styles["text"]}`}>Spouce</p>
          <p className={`m-0 ${styles["text"]}`}>03052198108</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Member 1</p>
          <p className={`m-0 ${styles["text"]}`}>Spouce</p>
          <p className={`m-0 ${styles["text"]}`}>03052198108</p>
        </div>
      </Col>
    </Row>
    <div className={`mt-5 mb-3 ${styles["seperator"]} `} />
  </div>
);

const SurveyDetailsData = ({
  customerInfo,
  city,
}: {
  customerInfo: any;
  city: string;
}) => (
  <div>
    <p className={`${styles["PersonalDetailsheading"]}`}>Policy Details</p>
    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Trip Start & End Date</p>
          <p className={`m-0 ${styles["text"]}`}>11 June, 2012</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Duration</p>
          <p className={`m-0 ${styles["text"]}`}>2 Month</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Trip Purpose</p>
          <p className={`m-0 ${styles["text"]}`}>Work</p>
        </div>
      </Col>
    </Row>

    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Trip Type</p>
          <p className={`m-0 ${styles["text"]}`}>Single</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Policy Type</p>
          <p className={`m-0 ${styles["text"]}`}>Single</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles["heading"]}`}>Visiting Contry</p>
          <p className={`m-0 ${styles["text"]}`}>Chine</p>
        </div>
      </Col>
    </Row>

    <div className={`mt-5 mb-3 ${styles["seperator"]} `} />
  </div>
);

const DocumentDetailsData = ({
  customerInfo,
  signature,
  isLocked,
  setIsLocked,
}: {
  customerInfo: any;
  signature: any;
  isLocked: boolean | undefined;
  setIsLocked: Function;
}) => {
  const sigPad = useRef({});

  const convertImageToDataURL = (url: string) => {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        var ctx = sigPad.current?.getCanvas().getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = sigPad.current?.getCanvas().toDataURL("image/png");
        resolve(data);
      };
      img.onerror = () => {
        reject("Unable to load image");
      };
      img.src = url;
    });
  };

  useEffect(() => {
    if (sigPad.current) {
      const url = `${process.env["NEXT_PUBLIC_IMAGE_ORIGIN"]}${customerInfo?.OrderDetailAuto.signature_path}`;
      convertImageToDataURL(url).then((data) => {
        sigPad.current.fromDataURL(data);
        // setIsLocked(true)
      });
    }
  }, [sigPad.current, customerInfo?.OrderDetailAuto.signature_path]);
  return (
    <div className={`pb-5`}>
      <p className={`${styles["PersonalDetailsheading"]}`}>Document Details</p>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>CNIC</p>
            <div className={`d-flex flex-column`}>
              <p className={` ${styles["filestxt"]}`}>File name</p>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Passport</p>
            <p className={`m-0 ${styles["filestxt"]}`}>images</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles["heading"]}`}>Additional Document</p>
            <p className={`m-0 ${styles["filestxt"]}`}>NOne</p>
          </div>
        </Col>
      </Row>

      <Row>
        <div className={styles["sigContainer"]}>
          <SignaturePad
            clearOnResize={false}
            canvasProps={{ className: styles["sigPad"] }}
            onEnd={() => {
              setIsLocked(true);
            }}
            ref={sigPad}
          />

          <div
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <GradientBtn
              onClick={() => {
                setIsLocked(true);
                signature(sigPad.current.clear());
              }}
              label="Clear Signature"
            />
            <GradientBtn
              onClick={() => {
                if (sigPad.current.isEmpty()) {
                  alert("Signature is required");
                } else {
                  signature(sigPad.current.toDataURL("image/png"));
                }
              }}
              label="Save Signature"
            />
          </div>
        </div>
      </Row>
      <div className="d-flex flex-row mt-2">
        <div className="p-2">
          <Form>
            <div className="mb-3">
              <Form.Check
              // type={type}
              // id={`default-${type}`}
              // label={`default ${type}`}
              />
            </div>
          </Form>
        </div>
        <div className="p-2">
          <p className={`m-0 ${styles["termAndConditions"]}`}>
            I agree that this is proposa; and declaration shall be the basis of
            the contract between me and the company and shall be deemed to be
            incorpotrated in such contract. I undertake that ... Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

const TravelReviewDetails = ({
  currentStep,
  updateState,
}: {
  currentStep: number;
  updateState: Function;
}) => {
  const order_detail_id = useSelector(
    (state) => state?.auth?.purchaseDetails.details.order_detail_id
  );
  const [signatureUrl, setSignatureUrl] = useState();
  const [customerInfo, setCustomerInfo] = useState();
  const [nationality, setNationality] = useState<string>("");
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const data = useSelector((state) => state?.auth?.data);
  const allowedTabIndex = useSelector((state) => state?.auth?.allowedTabIndex);
  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLocked === true) {
      dispatch(setLockedTab(3));
      return;
    }
    dispatch(setLockedTab(-1));
  }, [isLocked]);

  useEffect(() => {
    const getAllData = () => {
      if (data?.user?.id) {
        Api("GET", `order/${purchaseDetails.order_id}`)
          .then((res) => {
            if (res?.success) {
              setCustomerInfo(res.data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getAllData();
  }, [purchaseDetails]);

  useEffect(() => {
    const fetchNationality = async () => {
      const fetchedNationality = await Api(
        "GET",
        `/nationality/${customerInfo?.OrderDetailAuto?.nationality_id}`
      );
      setNationality(fetchedNationality.data?.nationality);
    };
    const fetchCity = async () => {
      if (customerInfo?.OrderDetailAuto?.city_id !== null) {
        const fetchedCity = await Api(
          "GET",
          `/city/${customerInfo?.OrderDetailAuto?.city_id}`
        );
        setCity(fetchedCity.data?.city);
      }
    };
    fetchNationality();
    fetchCity();
  }, [customerInfo]);

  const UploadSign = () => {
    const b64toBlob = (dataURI: any) => {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/png" });
    };
    if (signatureUrl) {
      var blob = b64toBlob(signatureUrl);
      const body = new FormData();
      body.append("file", blob);
      Api("POST", `order/file`, body, false, true).then((res) => {
        if (res?.success) {
          Api("PUT", `order/update/document_signature`, {
            order_detail_id: order_detail_id,
            signature_path: res?.filename,
            created_by: data.user.id,
            updated_by: data.user.id,
          })
            .then((res) => {
              if (res?.success) {
                if (allowedTabIndex <= 4) {
                  dispatch(setAllowedTab(4));
                  dispatch(setLockedTab(-1));
                }
                updateState(currentStep);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    } else {
      alert("Signature is required");
    }
  };
  return (
    <Container className={`${styles["maincontainer"]}`}>
      <PersonalDetailsData
        customerInfo={customerInfo}
        nationality={nationality}
      />
      <VehicleDetailsData customerInfo={customerInfo} />
      <SurveyDetailsData customerInfo={customerInfo} city={city} />
      <DocumentDetailsData
        customerInfo={customerInfo}
        signature={setSignatureUrl}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
      />
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          // onClick={UploadSign}
          onClick={() => updateState(currentStep)}
          label="Proceed to Payment"
        />
      </div>
    </Container>
  );
};

export default TravelReviewDetails;
