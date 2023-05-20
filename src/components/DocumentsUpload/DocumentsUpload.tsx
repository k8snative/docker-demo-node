import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { setAllowedTab, setDocumentDetails, setLockedTab } from 'src/lib/redux/auth/action'
import GradientBtn from '~components/GradientBtn/GradientBtn'
import RadioButton from '~components/RadioButton/RadioButton'
import VehicleDetails from '~components/VehicleDetails/VehicleDetails'
import Cross from '~public/assets/cross.png'
import iGrey from '~public/assets/iGrey.png'
import Upload from '~public/assets/upload.png'
import UploadR from '~public/assets/uploadRed.png'

import styles from './DocumentsUpload.module.scss'

type DocumentLinksListType = {
  cnic_front: {
    filename: string
    filePath: string
  } | null
  cnic_back: {
    filename: string
    filePath: string
  } | null
  ['income-proof']: {
    filename: string
    filePath: string
  }
  ['running-paper']: {
    filename: string
    filePath: string
  }
  invoice: {
    filename: string
    filePath: string
  }
  ['additional-documents']: Array<{
    filename: string
    filePath: string
  }> | null
  passport: {
    filename: string
    filePath: string
  } | null
}

type DocumentDetailsType = {
  cnic_front: {
    filename: string
    filePath: string
  } | null
  cnic_back: {
    filename: string
    filePath: string
  } | null
  ['income-proof']: {
    filename: string
    filePath: string
  }
  ['running-paper']: {
    filename: string
    filePath: string
  }
  invoice: {
    filename: string
    filePath: string
  }
  ['additional-documents']: Array<{
    filename: string
    filePath: string
  }> | null
  passport: {
    filename: string
    filePath: string
  } | null
  isPassport: boolean
}

const UploadBtn = ({
  label,
  redBorder,
  changeHandler,
  name,
  multiple,
  documentLinksList,
  setDocumentLinksList,
  isAdditionalDocuments,
}: {
  label: string
  redBorder: Boolean
  changeHandler: ChangeEventHandler<T> | undefined
  name: string
  multiple?: boolean
  documentLinksList: DocumentLinksListType
  setDocumentLinksList: Function
  isAdditionalDocuments?: boolean
}) => {
  const isDesktopOrMobile = useMediaQuery({
    query: '(max-width: 430px)',
  })

  return (
    <>
      {isDesktopOrMobile ? (
        <div>
          <div style={{ display: 'flex', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
            <label htmlFor={name}>
              <div className={`${styles['uploadmobimg']}`} onClick={() => {}}>
                <Image src={redBorder ? UploadR : Upload} alt="upload" />
                <input
                  type="file"
                  accept="image/*"
                  id={name}
                  name={name}
                  className={`${styles['inputfield']}`}
                  hidden
                  onChange={changeHandler}
                />
              </div>
            </label>
          </div>

          {isAdditionalDocuments
            ? documentLinksList?.['additional-documents'] !== null &&
              documentLinksList?.['additional-documents'].map((item, index) => (
                <div key={index} className={`${styles['filetxtdiv']}`}>
                  <p className={`m-0 ${styles['filetxt']}`}>
                    {item.filename.length > 10 ? `${item.filename.substring(0, 7)}...` : item.filename}
                  </p>
                  <div
                    className={`${styles['filetxtimg']}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        'additional-documents': documentLinksList?.['additional-documents']?.filter(
                          filterItem => item.filename !== filterItem.filename,
                        ),
                      })
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              ))
            : documentLinksList?.[name] !== null &&
              documentLinksList?.[name].filePath.length !== 0 && (
                <div className={`${styles['filetxtdiv']}`}>
                  <p className={`m-0 ${styles['filetxt']}`}>
                    {documentLinksList?.[name]?.filename.length > 10
                      ? `${documentLinksList?.[name]?.filename.substring(0, 7)}...`
                      : documentLinksList?.[name]?.filename}
                  </p>
                  <div
                    className={`${styles['filetxtimg']}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        [name]: null,
                      })
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
            ? documentLinksList?.['additional-documents'] !== null &&
              documentLinksList?.['additional-documents'].map((item, index) => (
                <div key={index} className={`${styles['filetxtdiv']}`}>
                  <p className={`m-0 ${styles['filetxt']}`}>
                    {item.filename.length > 10 ? `${item.filename.substring(0, 7)}...` : item.filename}
                  </p>
                  <div
                    className={`${styles['filetxtimg']}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        'additional-documents': documentLinksList?.['additional-documents']?.filter(
                          filterItem => item.filename !== filterItem.filename,
                        ),
                      })
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              ))
            : documentLinksList?.[name] !== null &&
              documentLinksList?.[name]?.filePath?.length !== 0 && (
                <div className={`${styles['filetxtdiv']}`}>
                  <p className={`m-0 ${styles['filetxt']}`}>
                    {documentLinksList?.[name]?.filename?.length > 10
                      ? `${documentLinksList?.[name]?.filename.substring(0, 7)}...`
                      : documentLinksList?.[name]?.filename}
                  </p>
                  <div
                    className={`${styles['filetxtimg']}`}
                    onClick={() => {
                      setDocumentLinksList({
                        ...documentLinksList,
                        [name]: null,
                      })
                    }}
                  >
                    <Image src={Cross} alt="cross" />
                  </div>
                </div>
              )}
          <div>
            <label htmlFor={name} className={styles['uploadlabel']}>
              <div
                className={redBorder ? `${styles['uploadbtndiv2']}` : `${styles['uploadbtndiv']}`}
                onClick={() => {}}
              >
                <p className="p-0 m-0"> {label}</p>
                <input
                  type="file"
                  name={name}
                  accept="image/*"
                  id={name}
                  className={`${styles['inputfield']}`}
                  hidden
                  onChange={changeHandler}
                  multiple={multiple}
                />
              </div>
            </label>
          </div>
        </>
      )}
    </>
  )
}

const IdProof = ({
  changeHandler,
  selectedInput,
  setSelectedInput,
  documentLinksList,
  setDocumentLinksList,
}: {
  changeHandler: any
  selectedInput: any
  setSelectedInput: Function
  documentLinksList: DocumentLinksListType
  setDocumentLinksList: Function
}) => {
  const handleChange = (inputValue: any) => {
    setSelectedInput(inputValue)
  }

  return (
    <div>
      <p className={`${styles['documentheading']}`}>Documents Upload</p>
      <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
        <Col lg={2} xs={6}>
          <p className={`m-0 ${styles['idprooftxt']}`}>ID Proof*</p>
        </Col>
        <Col lg={10} xs={6}>
          {selectedInput === 'CNIC / NICOP' && (
            <div className={`m-0 ${styles['uploadbuttonsdiv']}`}>
              <UploadBtn
                documentLinksList={documentLinksList}
                setDocumentLinksList={setDocumentLinksList}
                changeHandler={changeHandler}
                label="Front Upload"
                redBorder={false}
                name="cnic_front"
              />
              <UploadBtn
                documentLinksList={documentLinksList}
                setDocumentLinksList={setDocumentLinksList}
                changeHandler={changeHandler}
                label="Back Upload"
                name="cnic_back"
                redBorder={false}
              />
            </div>
          )}
          {selectedInput === 'Passport' && (
            <div className={`m-0 ${styles['uploadbuttonsdiv']}`}>
              <UploadBtn
                documentLinksList={documentLinksList}
                setDocumentLinksList={setDocumentLinksList}
                changeHandler={changeHandler}
                label="Upload"
                redBorder={true}
                name="passport"
              />
            </div>
          )}
        </Col>
      </Row>
      <Row className="mt-0">
        <Col lg={6}>
          <div className={`d-flex flex-direction-row  ${styles['radiobtn']} `}>
            <RadioButton
              isChecked={selectedInput === 'CNIC / NICOP'}
              handleChange={handleChange}
              label="CNIC / NICOP"
            />
            <RadioButton isChecked={selectedInput === 'Passport'} handleChange={handleChange} label="Passport" />
          </div>
        </Col>
      </Row>
      <div className={`mt-2 mb-3 ${styles['seperator']} `} />
    </div>
  )
}

const BottomRows = ({
  changeHandler,
  documentLinksList,
  setDocumentLinksList,
}: {
  changeHandler: any
  documentLinksList: DocumentLinksListType
  setDocumentLinksList: Function
}) => {
  const [showPolicyInfo, setShowPolicyInfo] = useState(false)

  const isDesktopOrMobile = useMediaQuery({
    query: '(min-width: 430px)',
  })

  return (
    <div className={`d-flex flex-column  `}>
      <div className={`w-100 d-flex   justify-content-between align-items-center`}>
        <p className={`m-0 ${styles['idprooftxt']}`}>Income Proof*</p>
        <UploadBtn
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="income-proof"
          redBorder={true}
        />
      </div>
      <div className={`mt-3 mb-3 ${styles['seperator']} `} />

      <div className={`w-100 d-flex flex-row justify-content-between align-items-center `}>
        <p className={` m-0 ${styles['idprooftxt']}`}>Running Paper*</p>
        <UploadBtn
          documentLinksList={documentLinksList}
          setDocumentLinksList={setDocumentLinksList}
          changeHandler={changeHandler}
          label="Upload"
          name="running-paper"
          redBorder={true}
        />
      </div>
      <div className={`mt-3 mb-3 ${styles['seperator']} `} />
      <div className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
        <div className={` d-flex`}>
          <p className={`m-0 ${styles['idprooftxt']}`}>Invoice*</p>
          <div
            onMouseLeave={() => setShowPolicyInfo(false)}
            onMouseEnter={() => setShowPolicyInfo(true)}
            onClick={() => setShowPolicyInfo(!showPolicyInfo)}
            className={` ${styles['iImgCont']}`}
          >
            <Image alt="" src={iGrey} className={styles['greyImg']} />
            {showPolicyInfo && (
              <div className={styles['infoWrapper']}>
                <div className={styles['infoContainer']}>
                  <p className={styles['infoTxt']}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. accumsan et iusto{' '}
                  </p>
                </div>
              </div>
            )}
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
          />
        </div>
      </div>
      <div className={`mt-3 mb-3 ${styles['seperator']} `} />

      <div className={`w-100 d-flex flex-row justify-content-between align-items-center`}>
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
        />
      </div>
      <div className={`mt-3 mb-3 ${styles['seperator']} `} />
      <div className={`mt-4`}>
        <p className={`m-0`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        </p>
        <p className={`m-0`}>
          *Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        </p>
      </div>
    </div>
  )
}

const DocumentsUpload = ({
  currentStep,
  updateState,
  renewPolicyData,
}: {
  currentStep: number
  updateState: Function
  renewPolicyData: any
}) => {
  const [documentLinksList, setDocumentLinksList] = useState<DocumentLinksListType>({
    cnic_front: null,
    cnic_back: null,
    'income-proof': {
      filename: '',
      filePath: '',
    },
    'running-paper': {
      filename: '',
      filePath: '',
    },
    invoice: {
      filename: '',
      filePath: '',
    },
    'additional-documents': null,
    passport: null,
  })
  const [selectedInput, setSelectedInput] = useState(
    useSelector(state => (state?.auth?.purchaseDetails.documentDetails.isPassport ? 'Passport' : 'CNIC / NICOP')),
  )

  const data = useSelector(state => state?.auth?.data)
  const allowedTabIndex = useSelector(state => state?.auth?.allowedTabIndex)
  const documentDetails: DocumentDetailsType = useSelector(state => state?.auth?.purchaseDetails.documentDetails)
  const order_id = useSelector(state => state?.auth?.purchaseDetails.order_id)
  const order_detail_id = useSelector(state => state?.auth?.purchaseDetails.details.order_detail_id)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('renewPolicyData', renewPolicyData)
    if (renewPolicyData?.customer_name)
      setDocumentLinksList({
        ...documentDetails,
        invoice: renewPolicyData?.invoice,
        cnic_front: renewPolicyData?.cnic_front,
        cnic_back: renewPolicyData?.cnic_back,
        'income-proof': renewPolicyData?.['income-proof'],
        'running-paper': renewPolicyData?.['running-paper'],
        passport: renewPolicyData?.passport,
        'additional-documents': renewPolicyData?.['additional-documents']
          ? renewPolicyData?.['additional-documents']
          : [],
      })
  }, [renewPolicyData])

  useEffect(() => {
    if (documentDetails['income-proof'].filePath.length !== 0) {
      const dataFromRedux = {
        ...(documentDetails.cnic_front !== null ? { cnic_front: documentDetails.cnic_front } : { cnic_front: null }),
        ...(documentDetails.cnic_back !== null ? { cnic_back: documentDetails.cnic_back } : { cnic_back: null }),
        ...(documentDetails.passport !== null ? { passport: documentDetails.passport } : { passport: null }),
        'income-proof': documentDetails['income-proof'],
        'running-paper': documentDetails['running-paper'],
        invoice: documentDetails.invoice,
        ...(documentDetails['additional-documents'] !== null
          ? {
              'additional-documents': documentDetails['additional-documents'],
            }
          : {
              'additional-documents': null,
            }),
      }

      setDocumentLinksList(dataFromRedux)
    }
  }, [documentDetails])

  const changeHandler = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      const body = new FormData()
      body.append('file', target?.files[0])
      Api('POST', `order/file`, body, false, true)
        .then(res => {
          if (res?.success) {
            if (target.name === 'additional-documents') {
              setDocumentLinksList({
                ...documentLinksList,
                'additional-documents': [
                  ...(documentLinksList?.['additional-documents'] || []),
                  {
                    filename: target?.files[0].name,
                    filePath: res?.filename,
                  },
                ],
              })
              return
            }
            setDocumentLinksList({
              ...documentLinksList,
              [target?.name]: { filename: target?.files[0].name, filePath: res?.filename },
            })
          }
        })
        .catch(e => {
          console.log('Error: ', e)
        })
    }
  }

  const documentUpload = () => {
    if (selectedInput === 'Passport' && documentLinksList?.passport === null) {
      alert('Please provide your passport')
      return
    }

    if (selectedInput === 'CNIC / NICOP' && documentLinksList?.cnic_front === null) {
      alert('Please provide the front side of your CNIC')
      return
    }

    if (selectedInput === 'CNIC / NICOP' && documentLinksList?.cnic_back === null) {
      alert('Please provide the back side of your CNIC')
      return
    }

    if (documentLinksList?.['income-proof'] === null || documentLinksList?.['income-proof']?.filePath?.length === 0) {
      alert('Please provide income proof')
      return
    }
    if (documentLinksList?.['running-paper'] === null || documentLinksList?.['running-paper']?.filePath?.length === 0) {
      alert('Please provide running papers')
      return
    }
    if (documentLinksList?.invoice === null || documentLinksList?.invoice?.filePath?.length === 0) {
      alert('Please provide invoice')
      return
    }

    const apiPayload = {
      order_id,
      order_detail_id,
      ...(selectedInput === 'Passport'
        ? { id_proof_front_path: documentLinksList.passport?.filePath, id_proof_back_path: null }
        : {
            id_proof_front_path: documentLinksList?.cnic_front?.filePath,
            id_proof_back_path: documentLinksList?.cnic_back?.filePath,
          }),
      income_proof_path: documentLinksList?.['income-proof'].filePath,
      running_paper_path: documentLinksList?.['running-paper'].filePath,
      invoice_path: documentLinksList?.invoice.filePath,
      ...(documentLinksList?.['additional-documents'] !== null &&
      documentLinksList?.['additional-documents'].length !== 0
        ? {
            additional_document: documentLinksList?.['additional-documents']?.map(item => ({
              order_id,
              document: item.filePath,
            })),
          }
        : { additional_document: [] }),
    }

    setIsLoading(true)
    Api('PUT', `order/update/document_uploads`, apiPayload)
      .then(res => {
        if (res?.success) {
          setIsLoading(false)
          const reduxPayload = {
            ...(selectedInput === 'Passport'
              ? {
                  passport: {
                    filename: documentLinksList?.passport?.filename,
                    filePath: documentLinksList?.passport?.filePath,
                  },
                }
              : { passport: null }),
            ...(selectedInput === 'Passport'
              ? { cnic_front: null }
              : {
                  cnic_front: {
                    filename: documentLinksList?.cnic_front?.filename,
                    filePath: documentLinksList?.cnic_front?.filePath,
                  },
                }),
            ...(selectedInput === 'Passport'
              ? { cnic_back: null }
              : {
                  cnic_back: {
                    filename: documentLinksList?.cnic_back?.filename,
                    filePath: documentLinksList?.cnic_back?.filePath,
                  },
                }),
            'income-proof': {
              filename: documentLinksList?.['income-proof']?.filename,
              filePath: documentLinksList?.['income-proof']?.filePath,
            },
            'running-paper': {
              filename: documentLinksList?.['running-paper']?.filename,
              filePath: documentLinksList?.['running-paper']?.filePath,
            },
            invoice: {
              filename: documentLinksList?.invoice?.filename,
              filePath: documentLinksList?.invoice?.filePath,
            },
            ...(documentLinksList?.['additional-documents'] !== null
              ? {
                  'additional-documents': documentLinksList?.['additional-documents'].map(item => ({
                    filename: item.filename,
                    filePath: item.filePath,
                  })),
                }
              : { 'additional-documents': null }),
            isPassport: selectedInput === 'Passport',
          }

          dispatch(setDocumentDetails(reduxPayload))
          if (allowedTabIndex <= 3) {
            dispatch(setAllowedTab(3))
            dispatch(setLockedTab(-1))
          }
          updateState(currentStep)
          return
        }
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    if (documentDetails['income-proof'].filePath.length !== 0) {
      const currentData = JSON.stringify(documentLinksList)
      const reduxData = JSON.stringify({
        ...(documentDetails.cnic_front !== null ? { cnic_front: documentDetails.cnic_front } : { cnic_front: null }),
        ...(documentDetails.cnic_back !== null ? { cnic_back: documentDetails.cnic_back } : { cnic_back: null }),
        ...(documentDetails.passport !== null ? { passport: documentDetails.passport } : { passport: null }),
        'income-proof': documentDetails['income-proof'],
        'running-paper': documentDetails['running-paper'],
        invoice: documentDetails.invoice,
        ...(documentDetails['additional-documents'] !== null
          ? {
              'additional-documents': documentDetails['additional-documents'],
            }
          : {
              'additional-documents': null,
            }),
      })

      if (currentData !== reduxData) {
        // Lock current tab if changes are made
        dispatch(setLockedTab(2))
        return
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1))
    }
  }, [documentLinksList])

  return (
    <Container className={`${styles['maincontainer']}`}>
      <IdProof
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
      <div className={`mt-3 ${styles['submitButton']}`}>
        <GradientBtn disabled={isLoading} loading={isLoading} onClick={documentUpload} label="Save and continue" />
      </div>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({ renewPolicyData: state.auth.renewPolicyData })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(DocumentsUpload)
