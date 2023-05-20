import UploadDocs from "../../../public/assets/UploadDocs.json";
import styles from "./DocumentsUpload.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Accordion,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Lottie from "react-lottie";
import { connect, useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";
import Api from "src/lib/api";
import {
  setAllowedTab,
  setDocumentDetails,
  setLockedTab,
  setPersonalDetails,
  setVehicleDetails,
  updateLoader,
} from "src/lib/redux/auth/action";
import Swal from "sweetalert2";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import UploadCard from "~components/UploadCard/UploadCard";
import GoBack from "~public/assets/arrowBack.png";
import Cross from "~public/assets/cross.png";

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
  label,
  redBorder,
  changeHandler,
  name,
  multiple,
  documentLinksList,
  setDocumentLinksList,
  isAdditionalDocuments,
  documentLoading,
}: {
  label: string;
  redBorder: Boolean;
  changeHandler: ChangeEventHandler<T> | undefined;
  name: string;
  multiple?: boolean;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
  isAdditionalDocuments?: boolean;
  documentLoading?: any;
}) => {
  const isDesktopOrMobile = useMediaQuery({
    query: "(max-width: 430px)",
  });
  let [sizeError, setSizeError] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const localChangeHandler = (event) => {
    const FIVE_MEGABYTES = 5 * 1024 * 1024;
    let file = null;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
      let ext = file.name.split(".").pop();
      if (
        [
          "jpg",
          "JPG",
          "jpeg",
          "JPEG",
          "png",
          "PNG",
          "gif",
          "GIF",
          "pdf",
          "PDF",
          "heif",
          "HEIF",
        ].includes(ext) === false
      ) {
        setSizeError("Image or PDF only");
      } else if (file.size > FIVE_MEGABYTES) {
        setSizeError("Max 5MB Only");
      } else {
        // event.target.files
        setSizeError("");
        changeHandler(event);
      }
    }
  };

  return (
    <>
      {isAdditionalDocuments
        ? documentLinksList?.["additional-documents"] !== null &&
          documentLinksList?.["additional-documents"]?.map((item, index) => (
            <div key={index} className={`${styles["filetxtdiv"]}`}>
              <p className={`m-0 ${styles["filetxt"]}`}>
                {item.filename?.length > 10
                  ? `${item.filename.substring(0, 7)}...`
                  : item.filename}
                {/* {
                  !item?.filename && (<span style={{color: '#808080', fontSize: 18}}>{`Document-${index + 1}`}</span>)
                } */}
              </p>

              <div
                className={`${styles["filetxtimg"]}`}
                onClick={() => {
                  setDocumentLinksList({
                    ...documentLinksList,
                    "additional-documents": documentLinksList?.[
                      "additional-documents"
                    ]?.filter((filterItem) =>
                      item.filename
                        ? item.filename !== filterItem.filename
                        : item.document !== filterItem.document
                    ),
                  });
                }}
              >
                <div style={{ display: "flex" }}>
                  <Image src={Cross} alt="cross" />
                </div>
              </div>
            </div>
          ))
        : documentLinksList?.[name] !== null &&
          documentLinksList?.[name]?.filePath?.length !== 0 && (
            <div className={`${styles["filetxtdiv"]}`}>
              <p className={`m-0 ${styles["filetxt"]}`}>
                {documentLinksList?.[name]?.filename?.length > 10
                  ? `${documentLinksList?.[name]?.filename.substring(0, 7)}...`
                  : documentLinksList?.[name]?.filename}
              </p>
              <div
                className={`${styles["filetxtimg"]}`}
                //remove filepath and file name from documentLinksList
                onClick={(event: any) => {
                  // event?.target?.value = ''
                  changeHandler(event);

                  setDocumentLinksList({
                    ...documentLinksList,
                    [name]: {
                      filename: "",
                      filePath: "",
                    },
                  });
                }}
              >
                <Image src={Cross} alt="cross" />
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
            {documentLoading.loading && documentLoading.name == name ? (
              <p className="p-0 m-0">
                <Spinner
                  size="sm"
                  animation="border"
                  style={{ color: "#E11631" }}
                />{" "}
                {label}
              </p>
            ) : (
              <p className="p-0 m-0"> {label}</p>
            )}
            <input
              type="file"
              name={name}
              accept="image/jpeg, image/jpg, image/HEIF, image/png, image/gif, application/pdf "
              id={name}
              className={`${styles["inputfield"]}`}
              hidden
              onChange={localChangeHandler}
              multiple={multiple}
            />
          </div>
          {sizeError ? (
            <div className={styles["sizeError"]}>{sizeError}</div>
          ) : null}
        </label>
        {sizeError ? (<div className={styles['sizeError']}>{sizeError}</div>) : null}

      </div>
    </>
  );
};

const IdProof = ({
  changeHandler,
  selectedInput,
  setSelectedInput,
  documentLinksList,
  setDocumentLinksList,
  documentLoading,
  backBtnHandler = () => null,
}: {
  changeHandler: any;
  selectedInput: any;
  setSelectedInput: Function;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
  documentLoading: any;
  backBtnHandler?: Function;
}) => {
  const handleChange = (inputValue: any) => {
    setSelectedInput(inputValue);
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center">
          {backBtnHandler && (
            <div
              className={styles["gobackdiv"]}
              style={{ marginBottom: 30, marginRight: 20 }}
            >
              <div className={styles["gobackarrow"]} onClick={backBtnHandler}>
                <Image src={GoBack} alt="backarrow" />
              </div>
            </div>
          )}

          <p
            className={`${styles["documentheading"]}`}
            style={{ marginBottom: 40 }}
          >
            Documents Upload
          </p>
        </div>
        <MediaQuery maxWidth={768}>
          <br />
          <br />
        </MediaQuery>

        <Accordion
          defaultActiveKey="0"
          bsPrefix={`${styles["customAccordian"]}`}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className={`mt-3 ${styles["idprooftxt"]}`}>
                ID Proof (CNIC / NICOP)*
              </p>
            </Accordion.Header>
            <Accordion.Body>
              <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
                <Col lg={4} xs={6}>
                  {selectedInput === "CNIC / NICOP" && (
                    <div className={`m-0 ${styles["uploadbuttonsdiv"]}`}>
                      <UploadCard
                        changeHandler={changeHandler}
                        uploadText={"Upload the front of your CNIC"}
                        documentLinksList={documentLinksList}
                        setDocumentLinksList={setDocumentLinksList}
                        name="cnic_front"
                        documentLoading={documentLoading}
                        redBorder={false}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={4} xs={6}>
                  {selectedInput === "CNIC / NICOP" && (
                    <div className={`m-0 ${styles["uploadbuttonsdiv"]}`}>
                      <UploadCard
                        changeHandler={changeHandler}
                        uploadText={"Upload the back of your CNIC"}
                        documentLinksList={documentLinksList}
                        setDocumentLinksList={setDocumentLinksList}
                        redBorder={false}
                        documentLoading={documentLoading}
                        name="cnic_back"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <p className={` mt-3 ${styles["idprooftxt"]}`}>Running Paper*</p>
            </Accordion.Header>
            <Accordion.Body>
              <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
                <Col lg={4} xs={6}>
                  <div className={`m-0 ${styles["uploadbuttonsdiv"]}`}>
                    <UploadCard
                      changeHandler={changeHandler}
                      uploadText={"Upload your Running Proof"}
                      documentLinksList={documentLinksList}
                      setDocumentLinksList={setDocumentLinksList}
                      name="running-paper"
                      documentLoading={documentLoading}
                      redBorder={false}
                    />
                  </div>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <p className={` mt-3 ${styles["idprooftxt"]}`}>Income Proof*</p>
            </Accordion.Header>
            <Accordion.Body>
              <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
                <Col lg={4} xs={6}>
                  <div className={`m-0 ${styles["uploadbuttonsdiv"]}`}>
                    <UploadCard
                      changeHandler={changeHandler}
                      uploadText={"Upload your Income Proof"}
                      documentLinksList={documentLinksList}
                      setDocumentLinksList={setDocumentLinksList}
                      name="income-proof"
                      documentLoading={documentLoading}
                      redBorder={false}
                    />
                  </div>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

const BottomRows = ({
  changeHandler,
  documentLinksList,
  setDocumentLinksList,
  documentLoading,
}: {
  changeHandler: any;
  documentLinksList: DocumentLinksListType;
  setDocumentLinksList: Function;
  documentLoading: any;
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
        <p className={`m-0 ${styles["idprooftxt"]}`}>Income Proof*</p>
        <UploadBtn
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="income-proof"
          redBorder={true}
          documentLoading={documentLoading}
        />
      </div>
      <div className={`mt-3 mb-3 ${styles["seperator"]} `} />

      <div
        className={`w-100 d-flex flex-row justify-content-between align-items-center `}
      >
        <p className={` m-0 ${styles["idprooftxt"]}`}>Running Paper*</p>
        <UploadBtn
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="running-paper"
          redBorder={true}
          documentLoading={documentLoading}
        />
      </div>
      <div className={`mt-3 mb-3 ${styles["seperator"]} `} />
      {/* <div className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
        <div className={` d-flex`}>
          <p className={`m-0 ${styles['idprooftxt']}`}>Invoice*</p>
          <div
            onMouseLeave={() => setShowPolicyInfo(false)}
            onMouseEnter={() => setShowPolicyInfo(true)}
            onClick={() => setShowPolicyInfo(!showPolicyInfo)}
            className={` ${styles['iImgCont']}`}
          >
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <UploadBtn
            documentLinksList={documentLinksList}
            setDocumentLinksList={setDocumentLinksList}
            changeHandler={changeHandler}
            label="Upload"
            name="invoice"
            redBorder={true}
            documentLoading={documentLoading}

          />
        </div>
      </div>
      <div className={`mt-3 mb-3 ${styles['seperator']} `} /> */}

      {/* <div className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
        <p className={`m-0  ${styles['idprooftxt']}`}>
          {isDesktopOrMobile ? 'Additional Documents (If Any)' : 'Additional Documents'}
        </p>
        <UploadBtn
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="additional-documents"
          multiple={true}
          redBorder={true}
          isAdditionalDocuments={true}
          documentLoading={documentLoading}

        />
      </div> */}
      {/* <div className={`mt-3 mb-3 ${styles['seperator']} `} />
      <div className={`mt-4`}>
        <p className={`m-0`}>
          *These documents are nessasary for policy issuance but you can skip for now.
        </p>
      </div> */}
    </div>
  );
};

const DocumentsUpload = ({
  currentStep,
  updateState,
  renewPolicyData,
  backBtnHandler = () => null,
}: {
  currentStep: number;
  updateState: Function;
  renewPolicyData: any;
  backBtnHandler?: Function;
}) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [uploadingDoc,setUploadingDoc]=useState('')

  const [documentLinksList, setDocumentLinksList] =
    useState<DocumentLinksListType>({
      cnic_front: null,
      cnic_back: null,
      "income-proof": {
        filename: "",
        filePath: "",
      },
      "running-paper": {
        filename: "",
        filePath: "",
      },
    });
  const [selectedInput, setSelectedInput] = useState(
    useSelector((state) =>
      state?.auth?.purchaseDetails.documentDetails?.isPassport
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
    (state) => state?.auth?.purchaseDetails.details?.order_detail_id
  );
  const plan_details = useSelector((state) => state?.auth.planDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentLoading, setDocumentLoading] = useState({
    name: "",
    loading: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (renewPolicyData?.customer_name)
      setDocumentLinksList({
        ...documentDetails,
        invoice: renewPolicyData?.invoice,
        cnic_front: renewPolicyData?.cnic_front,
        cnic_back: renewPolicyData?.cnic_back,
        "income-proof": renewPolicyData?.["income-proof"],
        "running-paper": renewPolicyData?.["running-paper"],
        passport: renewPolicyData?.passport,
        "additional-documents": renewPolicyData?.["additional-documents"]
          ? renewPolicyData?.["additional-documents"]
          : [],
      });
  }, [renewPolicyData]);

  useEffect(() => {
    if (documentDetails["income-proof"].filePath?.length !== 0) {
      const dataFromRedux = {
        ...(documentDetails.cnic_front !== null
          ? { cnic_front: documentDetails.cnic_front }
          : { cnic_front: null }),
        ...(documentDetails.cnic_back !== null
          ? { cnic_back: documentDetails.cnic_back }
          : { cnic_back: null }),
        ...(documentDetails.passport !== null
          ? { passport: documentDetails.passport }
          : { passport: null }),
        "income-proof": documentDetails["income-proof"],
        "running-paper": documentDetails["running-paper"],
        invoice: documentDetails.invoice,
        ...(documentDetails["additional-documents"] !== null
          ? {
              "additional-documents": documentDetails["additional-documents"],
            }
          : {
              "additional-documents": null,
            }),
      };

      setDocumentLinksList(dataFromRedux);
    }
  }, [documentDetails]);

  const changeHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const MAX_FIVE_MEGABYTES = 5 * 1024 * 1024;
      if (target.files[0] && target.files[0].size > MAX_FIVE_MEGABYTES) {
        return;
      }
      const body = new FormData();
      body.append("file", target?.files[0]);
      body.append("name", target?.files[0].name);

      setDocumentLoading({ name: target?.name, loading: true });
      Api("POST", `order/file`, body, false, true)
        .then((res) => {
          if (res?.success) {
            if (target.name == "cnic_front" && res?.imageData?.success) {
              const personalDetails = {
                customer_name: res.imageData.imageData.Name || "",
                cnic_number:
                  res.imageData.imageData.CNICNumber.replaceAll("-", "") || "",
                date_of_birth: res.imageData.imageData.DateOfBirth || "",
                father_name: res.imageData.imageData.FatherName || "",
                cnic_issue_date: res.imageData.imageData.IssueDate || "",
                cnic_expiry_date: res.imageData.imageData.ValidUpto || "",
              };
              dispatch(setPersonalDetails(personalDetails));
            } else if (
              target.name == "running-paper" &&
              res?.imageData?.success
            ) {
              const VehicleDetails = {
                color: res.imageData.imageData.Color || "",
                chassis_number: res.imageData.imageData.ChassisNo || "",
                engine_number: res.imageData.imageData.Engine || "",
                registration_number: res.imageData.imageData.RegNo || "",
              };
              dispatch(setVehicleDetails(VehicleDetails));
            }
            if (target.name === "additional-documents") {
              setDocumentLinksList({
                ...documentLinksList,
                "additional-documents": [
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
                filename: target?.name,
                filePath: res?.filename,
              },
            });
          }
          setDocumentLoading({ name: target?.name, loading: false });
        })

        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };
  // setUploadLoading(false)
  const documentUpload = async () => {
    if (selectedInput === "Passport" && documentLinksList?.passport === null) {
      Swal.fire({
        icon: "error",
        text: `Please provide your passport`,
        confirmButtonColor: "#df0025",
      });
      return;
    }

    if (
      (selectedInput === "CNIC / NICOP" &&
        documentLinksList?.cnic_front === null) ||
      documentLinksList?.cnic_front?.filePath === ""
    ) {
      Swal.fire({
        icon: "error",
        text: `Please provide the front side of your CNIC`,
        confirmButtonColor: "#df0025",
      });
      return;
    }

    if (
      (selectedInput === "CNIC / NICOP" &&
        documentLinksList?.cnic_back === null) ||
      documentLinksList?.cnic_back?.filePath === ""
    ) {
      Swal.fire({
        icon: "error",
        text: `Please provide the back side of your CNIC`,
        confirmButtonColor: "#df0025",
      });
      return;
    }

    // Uploading docs and their links as well
    setUploadLoading(true);
    setProgressPercent(0);
    setUploadingDoc('')
    let uploadedDocs = 0;
    let dataNumber=0
    // console.log('doucmentList===>',Object.keys(documentLinksList))
    Object.keys(documentLinksList).forEach(async (item, index) => {
      // setProgressPercent((data) => data + 25);
   

      if (documentLinksList[item].file) {
        const body = new FormData();
        body.append("file", documentLinksList[item]?.file);
        body.append("name", documentLinksList[item]?.filename);
        let res = await Api("POST", `order/file`, body, false, true);
        if (res.success) {
             dataNumber+=25
      setProgressPercent(dataNumber)
      setUploadingDoc(item)
          ++uploadedDocs;
        }
        if (
          uploadedDocs ===
          Object.keys(documentLinksList).filter(
            (item) => documentLinksList[item].filename
          ).length
        ) {
          setTimeout(()=>{
            setUploadLoading(false);
            updateState(currentStep);

          },2000)
        }
      }
    });
    return;

    // setDocumentLoading({ name: target?.name, loading: true })

    // we only need to validate one thing between inovice and running paper if inovice is not provided then running paper is required and vice versa

    const apiPayload = {
      model_id: plan_details.model_id,
      make_id: plan_details.make_id,
      year: plan_details.year,
      value: plan_details.value,
      order_id: order_id || 0,
      order_detail_id: order_detail_id || 0,
      customer_id: data.user.id,
      ...(selectedInput === "Passport"
        ? {
            id_proof_front_path: documentLinksList.passport?.filePath,
            id_proof_back_path: null,
          }
        : {
            id_proof_front_path: documentLinksList?.cnic_front?.filePath,
            id_proof_back_path: documentLinksList?.cnic_back?.filePath,
          }),
      income_proof_path: documentLinksList?.["income-proof"].filePath,
      running_paper_path:
        documentLinksList?.["running-paper"]?.filePath ?? null,
      invoice_path: documentLinksList?.invoice?.filePath ?? null,
      ...(documentLinksList?.["additional-documents"] !== null &&
      documentLinksList?.["additional-documents"]?.length !== 0
        ? {
            additional_document: documentLinksList?.[
              "additional-documents"
            ]?.map((item) => ({
              order_id,
              document: item.filePath ? item.filePath : item.document,
            })),
          }
        : { additional_document: [] }),
    };

    setIsLoading(true);
    Api("PUT", `order/update/document_uploads`, apiPayload)
      .then((res) => {
        if (res?.success) {
          setIsLoading(false);
          const reduxPayload = {
            ...(selectedInput === "Passport"
              ? {
                  passport: {
                    filename: documentLinksList?.passport?.filename,
                    filePath: documentLinksList?.passport?.filePath,
                  },
                }
              : { passport: null }),
            ...(selectedInput === "Passport"
              ? { cnic_front: null }
              : {
                  cnic_front: {
                    filename: documentLinksList?.cnic_front?.filename,
                    filePath: documentLinksList?.cnic_front?.filePath,
                  },
                }),
            ...(selectedInput === "Passport"
              ? { cnic_back: null }
              : {
                  cnic_back: {
                    filename: documentLinksList?.cnic_back?.filename,
                    filePath: documentLinksList?.cnic_back?.filePath,
                  },
                }),
            "income-proof": {
              filename: documentLinksList?.["income-proof"]?.filename,
              filePath: documentLinksList?.["income-proof"]?.filePath,
            },
            "running-paper": {
              filename: documentLinksList?.["running-paper"]?.filename,
              filePath: documentLinksList?.["running-paper"]?.filePath,
            },
            invoice: {
              filename: documentLinksList?.invoice?.filename,
              filePath: documentLinksList?.invoice?.filePath,
            },
            ...(documentLinksList?.["additional-documents"] !== null
              ? {
                  "additional-documents": documentLinksList?.[
                    "additional-documents"
                  ].map((item) => ({
                    filename: item.filename,
                    filePath: item.filePath,
                  })),
                }
              : { "additional-documents": null }),
            isPassport: selectedInput === "Passport",
          };
          const order_id = res.order_id || 0;
          const order_detail_id = res.order_detail_id || 0;
          dispatch(setDocumentDetails(reduxPayload, order_id, order_detail_id));
          if (allowedTabIndex <= 1) {
            dispatch(setAllowedTab(1));
            dispatch(setLockedTab(-1));
          }
          updateState(currentStep);
          return;
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };
  const handleSkipStep = () => {
    dispatch(setAllowedTab(1));
    dispatch(setLockedTab(-1));
    updateState(currentStep);
  };

  console.log('percentage===>',progressPercent)
  useEffect(() => {
    if (documentDetails["income-proof"].filePath?.length !== 0) {
      const currentData = JSON.stringify(documentLinksList);
      const reduxData = JSON.stringify({
        ...(documentDetails.cnic_front !== null
          ? { cnic_front: documentDetails.cnic_front }
          : { cnic_front: null }),
        ...(documentDetails.cnic_back !== null
          ? { cnic_back: documentDetails.cnic_back }
          : { cnic_back: null }),
        ...(documentDetails.passport !== null
          ? { passport: documentDetails.passport }
          : { passport: null }),
        "income-proof": documentDetails["income-proof"],
        "running-paper": documentDetails["running-paper"],
        invoice: documentDetails.invoice,
        ...(documentDetails["additional-documents"] !== null
          ? {
              "additional-documents": documentDetails["additional-documents"],
            }
          : {
              "additional-documents": null,
            }),
      });

      if (currentData !== reduxData) {
        // Lock current tab if changes are made
        dispatch(setLockedTab(0));
        return;
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1));
    }
  }, [documentLinksList]);

  return (
    <Container
      className={`${styles["maincontainer"]}`}
      style={{ position: "relative" }}
    >
      <IdProof
        changeHandler={changeHandler}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
        documentLinksList={documentLinksList}
        setDocumentLinksList={setDocumentLinksList}
        documentLoading={documentLoading}
        backBtnHandler={backBtnHandler}
      />
      <div className={`mt-3 ${styles["formFooter"]}`}>
        <div data-note="blank-element"></div>
        <div className={styles["submitButton"]}>
          <GradientBtn
            disabled={isLoading}
            loading={isLoading}
            onClick={documentUpload}
            label="Save and continue"
          />
        </div>
      </div>

      <Modal show={uploadLoading} size="md" centered>
        <Lottie
          speed={10}
          options={{
            loop: true,
            autoplay: true,
            animationData: UploadDocs,

            rendererSettings: {
              preserveAspectRatio: "xMidYMin overflow",
            },
          }}
        />
        <p style={{textAlign:'center'}}>Uploading {uploadingDoc}...</p>
        <ProgressBar animated now={progressPercent} label={`${progressPercent}%`}/>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  renewPolicyData: state.auth.renewPolicyData,
});

const mapDispatchProps = {};

export default connect(mapStateToProps, mapDispatchProps)(DocumentsUpload);
