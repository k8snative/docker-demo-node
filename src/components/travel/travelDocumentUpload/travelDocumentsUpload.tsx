import styles from "./travelDocumentsUpload.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import {
  setAllowedTab,
  setDocumentDetails,
  setLockedTab,
} from "src/lib/redux/auth/action";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import RadioButton from "~components/RadioButton/RadioButton";
import VehicleDetails from "~components/VehicleDetails/VehicleDetails";
import Cross from "~public/assets/cross.png";
import iGrey from "~public/assets/iGrey.png";
import Upload from "~public/assets/upload.png";
import UploadR from "~public/assets/uploadRed.png";

type DocumentLinksListType = {
  cnic_front: {
    filename: string;
    filePath: string;
  } | null;
  cnic_back: {
    filename: string;
    filePath: string;
  } | null;
  ["income-proof"]: {
    filename: string;
    filePath: string;
  };
  ["additional-documents"]: {
    filename: string;
    filePath: string;
  };
  ["running-paper"]: {
    filename: string;
    filePath: string;
  };
  invoice: {
    filename: string;
    filePath: string;
  };
  ["additional-documents"]: Array<{
    filename: string;
    filePath: string;
  }> | null;
  passport: {
    filename: string;
    filePath: string;
  } | null;
};

type DocumentDetailsType = {
  cnic_front: {
    filename: string;
    filePath: string;
  } | null;
  cnic_back: {
    filename: string;
    filePath: string;
  } | null;
  ["income-proof"]: {
    filename: string;
    filePath: string;
  };
  ["running-paper"]: {
    filename: string;
    filePath: string;
  };
  invoice: {
    filename: string;
    filePath: string;
  };
  ["additional-documents"]: Array<{
    filename: string;
    filePath: string;
  }> | null;
  passport: {
    filename: string;
    filePath: string;
  } | null;
  isPassport: boolean;
};

const UploadBtn = ({
  showErrors,
  isRequired,
  errTxt,
  label,
  redBorder,
  changeHandler,
  name,
  multiple,
  documentLinksList,
  setDocumentLinksList,
  isAdditionalDocuments,
}: {
  showErrors: Boolean | undefined;
  isRequired: Boolean;
  errTxt: string;
  label: string;
  redBorder: Boolean;
  changeHandler: ChangeEventHandler<T> | undefined;
  name: string;
  multiple?: boolean;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
  isAdditionalDocuments?: boolean;
}) => {
  const isDesktopOrMobile = useMediaQuery({
    query: "(max-width: 430px)",
  });

  return (
    <>
      {isDesktopOrMobile ? (
        <div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <label htmlFor={name}>
              <div className={`${styles["uploadmobimg"]}`} onClick={() => {}}>
                <Image src={redBorder ? UploadR : Upload} alt="upload" />
                <input
                  type="file"
                  accept="image/*"
                  id={name}
                  name={name}
                  className={`${styles["inputfield"]}`}
                  hidden
                  onChange={changeHandler}
                />
              </div>
            </label>
          </div>
          {/* adding error for mobile screen */}
          {showErrors && isRequired && !documentLinksList?.[name]?.filename && (
            <p className={styles["notOTPTxt"]}>{errTxt}</p>
          )}

          {isAdditionalDocuments
            ? documentLinksList?.["additional-documents"] !== null &&
              documentLinksList?.["additional-documents"].map((item, index) => (
                <div key={index} className={`${styles["filetxtdiv"]}`}>
                  <p className={`m-0 ${styles["filetxt"]}`}>
                    {item.filename.length > 10
                      ? item.filename.substring(0, 7) + "..."
                      : item.filename}
                  </p>
                  <div
                    className={`${styles["filetxtimg"]}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        ["additional-documents"]: documentLinksList?.[
                          "additional-documents"
                        ]?.filter(
                          (filterItem) => item.filename !== filterItem.filename
                        ),
                      });
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              ))
            : documentLinksList?.[name] !== null &&
              documentLinksList?.[name].filePath.length !== 0 && (
                <div className={`${styles["filetxtdiv"]}`}>
                  <p className={`m-0 ${styles["filetxt"]}`}>
                    {documentLinksList?.[name]?.filename.length > 10
                      ? documentLinksList?.[name]?.filename.substring(0, 7) +
                        "..."
                      : documentLinksList?.[name]?.filename}
                  </p>
                  <div
                    className={`${styles["filetxtimg"]}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        [name]: null,
                      });
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              )}
        </div>
      ) : (
        <>
          {isAdditionalDocuments
            ? documentLinksList?.["additional-documents"] !== null &&
              documentLinksList?.["additional-documents"].map((item, index) => (
                <div key={index} className={`${styles["filetxtdiv"]}`}>
                  <p className={`m-0 ${styles["filetxt"]}`}>
                    {item.filename.length > 10
                      ? item.filename.substring(0, 7) + "..."
                      : item.filename}
                  </p>
                  <div
                    className={`${styles["filetxtimg"]}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        ["additional-documents"]: documentLinksList?.[
                          "additional-documents"
                        ]?.filter(
                          (filterItem) => item.filename !== filterItem.filename
                        ),
                      });
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              ))
            : documentLinksList?.[name] !== null &&
              documentLinksList?.[name].filePath.length !== 0 && (
                <div className={`${styles["filetxtdiv"]}`}>
                  <p className={`m-0 ${styles["filetxt"]}`}>
                    {documentLinksList?.[name]?.filename.length > 10
                      ? documentLinksList?.[name]?.filename.substring(0, 7) +
                        "..."
                      : documentLinksList?.[name]?.filename}
                  </p>
                  <div
                    className={`${styles["filetxtimg"]}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        [name]: null,
                      });
                    }}
                  >
                    <span className={`${styles["uploadfilename"]}`}>
                      &#x2715;
                    </span>
                  </div>
                </div>
              )}
          <div>
            <label htmlFor={name} className={styles["uploadlabel"]}>
              <div
                className={
                  redBorder
                    ? `${styles["uploadbtndiv2"]}`
                    : `${styles["uploadbtndiv"]}`
                }
                onClick={() => {}}
              >
                <p className="p-0 m-0"> {label}</p>
                <input
                  type="file"
                  name={name}
                  accept="image/*"
                  id={name}
                  className={`${styles["inputfield"]}`}
                  hidden
                  onChange={changeHandler}
                  multiple={multiple}
                />
              </div>
            </label>
            {/* showing errors if field is required and documentlist has no file in it and sumit btn is clicked */}
            {showErrors &&
              isRequired &&
              !documentLinksList?.[name]?.filename && (
                <p className={styles["notOTPTxt"]}>{errTxt}</p>
              )}
          </div>
        </>
      )}
    </>
  );
};

const IdProof = ({
  showErrors,
  changeHandler,
  selectedInput,
  setSelectedInput,
  documentLinksList,
  setDocumentLinksList,
}: {
  showErrors: Boolean;
  changeHandler: any;
  selectedInput: any;
  setSelectedInput: Function;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
}) => {
  const handleChange = (inputValue: any) => {
    setSelectedInput(inputValue);
  };

  return (
    <div>
      <p className={`${styles["documentheading"]}`}>Documents Upload</p>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={2} xs={6}>
          <p className={`m-0 ${styles["idprooftxt"]}`}>CNIC*</p>
        </Col>
        <Col lg={10} xs={6}>
          <div className={`m-0 ${styles["uploadbuttonsdiv"]}`}>
            <UploadBtn
              showErrors={showErrors}
              isRequired={true}
              errTxt="CNIC front is Required"
              documentLinksList={documentLinksList}
              setDocumentLinksList={setDocumentLinksList}
              changeHandler={changeHandler}
              label="Front Upload"
              redBorder={false}
              name="cnic_front"
            />
            <UploadBtn
              showErrors={showErrors}
              isRequired={true}
              errTxt="CNIC back is Required"
              documentLinksList={documentLinksList}
              setDocumentLinksList={setDocumentLinksList}
              changeHandler={changeHandler}
              label="Back Upload"
              name="cnic_back"
              redBorder={false}
            />
          </div>
        </Col>
      </Row>
      <div className={`mt-2 mb-3 ${styles["seperator"]} `} />
    </div>
  );
};

const BottomRows = ({
  changeHandler,
  documentLinksList,
  setDocumentLinksList,
}: {
  changeHandler: any;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
}) => {
  const [showPolicyInfo, setShowPolicyInfo] = useState(false);

  const isDesktopOrMobile = useMediaQuery({
    query: "(min-width: 430px)",
  });

  return (
    <div className={`d-flex flex-column  `}>
      <div
        className={`w-100 d-flex   justify-content-between align-items-center`}
      >
        <p className={`m-0 ${styles["idprooftxt"]}`}>Passport</p>
        <UploadBtn
          showErrors={false}
          isRequired={false}
          errTxt=""
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="passport"
          redBorder={true}
        />
      </div>
      <div className={`mt-3 mb-3 ${styles["seperator"]} `} />

      <div
        className={`w-100 d-flex   justify-content-between align-items-center`}
      >
        <p className={`m-0 ${styles["idprooftxt"]}`}>
          Additional Documents(If any)
        </p>
        <UploadBtn
          showErrors={false}
          isRequired={false}
          errTxt=""
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="additional-documents"
          redBorder={true}
        />
      </div>

      <div className={`mt-4`}>
        <p className={`m-0`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet
        </p>
        <p className={`m-0`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet
        </p>
      </div>
    </div>
  );
};

const TravelDocumentsUpload = ({
  currentStep,
  updateState,
}: {
  currentStep: number;
  updateState: Function;
}) => {
  const [documentLinksList, setDocumentLinksList] =
    useState<DocumentLinksListType>({
      cnic_front: null,
      cnic_back: null,
      ["passport"]: {
        filename: "",
        filePath: "",
      },
      ["additional-documents"]: {
        filename: "",
        filePath: "",
      },
      invoice: {
        filename: "",
        filePath: "",
      },
      ["additional-documents"]: null,
      passport: null,
    });
  const [selectedInput, setSelectedInput] = useState(
    useSelector((state) =>
      state?.auth?.purchaseDetails.documentDetails.isPassport
        ? "Passport"
        : "CNIC / NICOP"
    )
  );

  const data = useSelector((state) => state?.auth?.data);
  const allowedTabIndex = useSelector((state) => state?.auth?.allowedTabIndex);
  const documentDetails: DocumentDetailsType = useSelector(
    (state) => state?.auth?.purchaseDetails.documentDetails
  );
  const order_id = useSelector(
    (state) => state?.auth?.purchaseDetails.order_id
  );
  const order_detail_id = useSelector(
    (state) => state?.auth?.purchaseDetails.details.order_detail_id
  );
  const dispatch = useDispatch();

  const [showErrors, setShowErrors] = useState(false);
  const changeHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const body = new FormData();
      body.append("file", target?.files[0]);
      Api("POST", `order/file`, body, false, true)
        .then((res) => {
          if (res?.success) {
            if (target.name === "additional-documents") {
              setDocumentLinksList({
                ...documentLinksList,
                ["additional-documents"]: [
                  ...(documentLinksList?.["additional-documents"] || []),
                  {
                    filename: target?.files[0].name,
                    filePath: res?.filename,
                  },
                ],
              });
              return;
            }
            setDocumentLinksList({
              ...documentLinksList,
              [target?.name]: {
                filename: target?.files[0].name,
                filePath: res?.filename,
              },
            });
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };

  const documentUpload = () => {
    setShowErrors(true);
    if (selectedInput === "Passport" && documentLinksList?.passport === null) {
      alert("Please provide your passport");
      return;
    }

    // if (selectedInput === 'CNIC / NICOP' && documentLinksList?.cnic_front === null) {
    //   alert('Please provide the front side of your CNIC')
    //   // setFrontError("Please provide the front side of your CNIC")
    // }

    // if (selectedInput === 'CNIC / NICOP' && documentLinksList?.cnic_back === null) {
    //   alert('Please provide the back side of your CNIC')
    //   // setBackError("Please provide the front side of your CNIC")
    // }

    // Stopping form to submit, if any of the both will be falsed
    if (
      (selectedInput === "CNIC / NICOP" &&
        documentLinksList?.cnic_front === null) ||
      (selectedInput === "CNIC / NICOP" &&
        documentLinksList?.cnic_back === null)
    ) {
      return;
    }

    updateState(currentStep);
  };

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <IdProof
        showErrors={showErrors}
        changeHandler={changeHandler}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
        documentLinksList={documentLinksList}
        setDocumentLinksList={setDocumentLinksList}
      />
      <BottomRows
        changeHandler={changeHandler}
        documentLinksList={documentLinksList}
        setDocumentLinksList={setDocumentLinksList}
      />
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn onClick={documentUpload} label="Save and continue" />
      </div>
    </Container>
  );
};
export default TravelDocumentsUpload;
