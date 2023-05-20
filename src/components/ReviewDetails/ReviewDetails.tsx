import { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import SignaturePad from 'react-signature-canvas'
import Api from 'src/lib/api'
import { setAllowedTab, setLockedTab } from 'src/lib/redux/auth/action'
import { FormatDate, formatTime } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'
import GradientBtn from '~components/GradientBtn/GradientBtn'

import styles from './ReviewDetails.module.scss'

const PersonalDetailsData = ({ customerInfo, nationality }: { customerInfo: any; nationality: string }) => (
  <div>
    <p className={`${styles['PersonalDetailsheading']}`}>Personal Details</p>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Full Name</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.customer_name}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Current Address</p>
          <p className={`m-0 ${styles['text2']}`}>{customerInfo?.OrderDetailAuto?.current_address} </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Phone Number</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.contact}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Date of Birth</p>
          {customerInfo?.OrderDetailAuto?.date_of_birth !== undefined && (
            <p className={`m-0 ${styles['text']}`}>
              {FormatDate(customerInfo?.OrderDetailAuto?.date_of_birth, 'DD/MM/YYYY')}
            </p>
          )}
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Email Address</p>
          <p className={`m-0 ${styles['text2']}`}>{customerInfo?.OrderDetailAuto?.email}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Place of Birth</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.place_of_birth}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Father/ Spouse Name</p>
          <p className={`m-0 ${styles['text']}`}>
            {customerInfo?.OrderDetailAuto?.father_name === null ? '-' : customerInfo?.OrderDetailAuto?.father_name}
          </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Mother&lsquo; Maiden Name</p>
          <p className={`m-0 ${styles['text2']}`}>{customerInfo?.OrderDetailAuto?.mother_name}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Nationality</p>
          <p className={`m-0 ${styles['text']}`}>{nationality}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>CNIC/ Passport Number</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.cnic_number}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>CNIC/ Passport Issue Date</p>
          {customerInfo?.OrderDetailAuto?.cnic_issue_date !== undefined && (
            <p className={`m-0 ${styles['text2']}`}>
              {FormatDate(customerInfo?.OrderDetailAuto?.cnic_issue_date, 'DD/MM/YYYY')}
            </p>
          )}
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>CNIC/ Passport Expiry Date</p>
          {customerInfo?.OrderDetailAuto?.cnic_expiry_date !== undefined && (
            <p className={`m-0 ${styles['text']}`}>
              {FormatDate(customerInfo?.OrderDetailAuto?.cnic_expiry_date, 'DD/MM/YYYY')}
            </p>
          )}
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Occupation</p>
          <p className={`m-0 ${styles['text']}`}>
            {customerInfo?.OrderDetailAuto?.occupation === null ? '-' : customerInfo?.OrderDetailAuto?.occupation}
          </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Source of Income</p>
          <p className={`m-0 ${styles['text2']}`}>{customerInfo?.OrderDetailAuto?.source_of_income}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Beneficiary Name</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.benificiary_name}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Beneficiary Relation</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.benificiary_relation}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Beneficiary CNIC Number</p>
          <p className={`m-0 ${styles['text2']}`}>{customerInfo?.OrderDetailAuto?.benificiary_cnic_number}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Beneficiary Address</p>
          <p className={`m-0 ${styles['text2']}`}>
            {customerInfo?.OrderDetailAuto?.benificiary_address === null
              ? '-'
              : customerInfo?.OrderDetailAuto?.benificiary_address}
          </p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Income Tax Status</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.is_filer ? 'Filer' : 'Non-filer'}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading2']}`}>Holder of any Government Office, (MNA / MPA / Local bodies)</p>
          <p className={`m-0 ${styles['text']}`}>
            {customerInfo?.OrderDetailAuto?.is_government_employee ? 'Yes' : 'No'}
          </p>
        </div>
      </Col>
    </Row>
    <div className={`mt-5 mb-3 ${styles['seperator']} `} />
  </div>
)

const VehicleDetailsData = ({ customerInfo }: { customerInfo: any }) => (
  <div>
    <p className={`${styles['PersonalDetailsheading']}`}>Vehicle Details</p>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Make</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.Make?.name}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Model</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.Model?.name}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Year</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.year}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Value</p>
          {customerInfo?.OrderDetailAuto?.value !== undefined && (
            <p className={`m-0 ${styles['text']}`}>{currencyFormat(customerInfo?.OrderDetailAuto?.value)}</p>
          )}
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Color</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.color}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Engine Number</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.engine_number}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Chassis Number</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.chassis_number}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Registration Number</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.registration_number}</p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>My car is brand new and at 3s dealership</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.is_brand_new ? 'Yes' : 'No'}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Modifications</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.modification ? 'Yes' : 'No'}</p>
        </div>
      </Col>
    </Row>
    <div className={`mt-5 mb-3 ${styles['seperator']} `} />
  </div>
)

const SurveyDetailsData = ({ customerInfo, city }: { customerInfo: any; city: string }) => (
  <div>
    <p className={`${styles['PersonalDetailsheading']}`}>Survey Details</p>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Survey Request Date</p>
          <p className={`m-0 ${styles['text']}`}>
            {customerInfo?.OrderDetailAuto?.survey_request_date !== null &&
            customerInfo?.OrderDetailAuto?.survey_request_date.length
              ? FormatDate(customerInfo?.OrderDetailAuto?.survey_request_date, 'DD/MM/YYYY')
              : '-'}
          </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Survey Request Time</p>
          <p className={`m-0 ${styles['text']}`}>
            {customerInfo?.OrderDetailAuto?.survey_request_time === null
              ? '-'
              : formatTime(customerInfo?.OrderDetailAuto?.survey_request_time?.substring(0, 5))}
          </p>
        </div>
      </Col>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>City</p>
          <p className={`m-0 ${styles['text']}`}>{customerInfo?.OrderDetailAuto?.city_id === null ? '-' : city}</p>
        </div>
      </Col>
    </Row>
    <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
      <Col lg={4}>
        <div className={`d-flex flex-column`}>
          <p className={`m-0 ${styles['heading']}`}>Survey Address</p>
          <p className={`m-0 ${styles['text2']}`}>
            {customerInfo?.OrderDetailAuto?.survey_address === null
              ? '-'
              : customerInfo?.OrderDetailAuto?.survey_address}{' '}
          </p>
        </div>
      </Col>
    </Row>
    <div className={`mt-5 mb-3 ${styles['seperator']} `} />
  </div>
)

const DocumentDetailsData = ({
  customerInfo,
  signature,
  isLocked,
  setIsLocked,
  renewPolicyData,
  sigPad,
}: {
  customerInfo: any
  signature: any
  isLocked: boolean | undefined
  setIsLocked: Function
  renewPolicyData: any
  sigPad: any
}) => {
  const convertImageToDataURL = (url: string) =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const ctx = sigPad.current?.getCanvas().getContext('2d')
        ctx?.drawImage(img, 0, 0)
        const data = sigPad.current?.getCanvas().toDataURL('image/png')
        resolve(data)
      }
      img.onerror = () => {
        reject('Unable to load image')
      }
      img.src = url
    })

  useEffect(() => {
    const signaturePath = customerInfo?.OrderDetailAuto.signature_path
      ? customerInfo?.OrderDetailAuto.signature_path
      : renewPolicyData?.signature_path
    if (sigPad.current) {
      const url = `${process.env['NEXT_PUBLIC_IMAGE_ORIGIN']}${signaturePath}`
      convertImageToDataURL(url).then(data => {
        sigPad.current.fromDataURL(data)
        // setIsLocked(true)
      })
    }
  }, [sigPad.current, customerInfo?.OrderDetailAuto?.signature_path])
  return (
    <div className={`pb-5`}>
      <p className={`${styles['PersonalDetailsheading']}`}>Document Details</p>
      <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles['heading']}`}>ID Proof</p>
            <div className={`d-flex flex-column`}>
              <p className={` ${styles['filestxt']}`}>
                {customerInfo?.OrderDetailAuto?.id_proof_front_path?.split('-').at(-1).length > 10
                  ? customerInfo?.OrderDetailAuto?.id_proof_front_path?.split('-').at(-1).substring(0, 7) + '...'
                  : customerInfo?.OrderDetailAuto?.id_proof_front_path?.split('-').at(-1)}
              </p>
              <p className={` ${styles['filestxt']}`}>
                {customerInfo?.OrderDetailAuto?.id_proof_back_path?.split('-').at(-1).length > 10
                  ? customerInfo?.OrderDetailAuto?.id_proof_back_path?.split('-').at(-1).substring(0, 7) + '...'
                  : customerInfo?.OrderDetailAuto?.id_proof_back_path?.split('-').at(-1)}
              </p>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles['heading']}`}>Income Proof</p>
            <p className={`m-0 ${styles['filestxt']}`}>
              {customerInfo?.OrderDetailAuto?.income_proof_path?.split('-').at(-1).length > 10
                ? customerInfo?.OrderDetailAuto?.income_proof_path?.split('-').at(-1).substring(0, 7) + '...'
                : customerInfo?.OrderDetailAuto?.income_proof_path?.split('-').at(-1)}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles['heading']}`}>Running Paper</p>
            <p className={`m-0 ${styles['filestxt']}`}>
              {customerInfo?.OrderDetailAuto?.running_paper_path?.split('-').at(-1).length > 10
                ? customerInfo?.OrderDetailAuto?.running_paper_path?.split('-').at(-1).substring(0, 7) + '...'
                : customerInfo?.OrderDetailAuto?.running_paper_path?.split('-').at(-1)}
            </p>
          </div>
        </Col>
      </Row>
      <Row className={`gy-3 ${styles['txtFieldsRow']}`}>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles['heading']}`}>Invoice</p>
            <p className={`m-0 ${styles['filestxt']}`}>
              {customerInfo?.OrderDetailAuto?.invoice_path?.split('-').at(-1).length > 10
                ? customerInfo?.OrderDetailAuto?.invoice_path?.split('-').at(-1).substring(0, 7) + '...'
                : customerInfo?.OrderDetailAuto?.invoice_path?.split('-').at(-1)}
            </p>
          </div>
        </Col>
        <Col lg={4}>
          <div className={`d-flex flex-column`}>
            <p className={`m-0 ${styles['heading']}`}>Additional Documents</p>
            {customerInfo?.AdditionalDocuments.length === 0 ? (
              <p className={`m-0 ${styles['filestxt']}`}>None</p>
            ) : (
              customerInfo?.AdditionalDocuments.map((item: any, index: any) => (
                <p key={index} className={`m-0 ${styles['filestxt']}`}>
                  {item.document?.split('-').at(-1).length > 10
                    ? item.document?.split('-').at(-1).substring(0, 7) + '...'
                    : item.document?.split('-').at(-1)}
                </p>
              ))
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <div className={styles['sigContainer']}>
          <SignaturePad
            clearOnResize={false}
            canvasProps={{ className: styles['sigPad'] }}
            onEnd={() => {
              setIsLocked(true)
            }}
            ref={sigPad}
          />
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <GradientBtn
              onClick={() => {
                setIsLocked(true)
                signature(sigPad.current.clear())
              }}
              label="Clear Signature"
            />
            {/* <GradientBtn
              onClick={() => {
                if (sigPad.current.isEmpty()) {
                  alert('Signature is required')
                } else {
                  signature(sigPad.current.toDataURL('image/png'))
                }
              }}
              label="Save Signature"
            /> */}
          </div>
        </div>
      </Row>
    </div>
  )
}

const ReviewDetails = ({
  currentStep,
  updateState,
  renewPolicyData,
}: {
  currentStep: number
  updateState: Function
  renewPolicyData: any
}) => {
  const order_detail_id = useSelector(state => state?.auth?.purchaseDetails.details.order_detail_id)
  const [signatureUrl, setSignatureUrl] = useState()
  const [customerInfo, setCustomerInfo] = useState()
  const [nationality, setNationality] = useState<string>('')
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [city, setCity] = useState<string>('')
  const data = useSelector(state => state?.auth?.data)
  const allowedTabIndex = useSelector(state => state?.auth?.allowedTabIndex)
  const purchaseDetails = useSelector(state => state?.auth?.purchaseDetails)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const sigPad = useRef({})

  useEffect(() => {
    if (isLocked === true) {
      dispatch(setLockedTab(3))
      return
    }
    dispatch(setLockedTab(-1))
  }, [isLocked])

  useEffect(() => {
    const getAllData = () => {
      if (data?.user?.id) {
        Api('GET', `order/${purchaseDetails.order_id}`)
          .then(res => {
            if (res?.success) {
              setCustomerInfo(res.data)
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
    getAllData()
  }, [purchaseDetails])

  useEffect(() => {
    const fetchNationality = async () => {
      const fetchedNationality = await Api('GET', `/nationality/${customerInfo?.OrderDetailAuto?.nationality_id}`)
      setNationality(fetchedNationality.data?.nationality)
    }
    const fetchCity = async () => {
      if (customerInfo?.OrderDetailAuto?.city_id !== null) {
        const fetchedCity = await Api('GET', `/city/${customerInfo?.OrderDetailAuto?.city_id}`)
        setCity(fetchedCity.data?.city)
      }
    }
    fetchNationality()
    fetchCity()
  }, [customerInfo])

  const UploadSign = () => {
    if (sigPad.current.isEmpty()) {
      alert('Signature is required')
      return
    }
    // else {
    //   signature(sigPad.current.toDataURL('image/png'))
    // }
    const b64toBlob = (dataURI: any) => {
      const byteString = atob(dataURI.split(',')[1])
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)

      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/png' })
    }
    if (sigPad.current.toDataURL('image/png')) {
      const blob = b64toBlob(sigPad.current.toDataURL('image/png'))
      // var blob = b64toBlob(signatureUrl)
      const body = new FormData()
      body.append('file', blob)
      setIsLoading(true)
      Api('POST', `order/file`, body, false, true).then(res => {
        if (res?.success) {
          Api('PUT', `order/update/document_signature`, {
            order_detail_id: order_detail_id,
            signature_path: res?.filename,
          })
            .then(res => {
              if (res?.success) {
                setIsLoading(false)
                if (allowedTabIndex <= 4) {
                  dispatch(setAllowedTab(4))
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
          return
        }
        setIsLoading(false)
      })
    } else {
      alert('Signature is required')
    }
  }
  return (
    <Container className={`${styles['maincontainer']}`}>
      <PersonalDetailsData customerInfo={customerInfo} nationality={nationality} />
      <VehicleDetailsData customerInfo={customerInfo} />
      <SurveyDetailsData customerInfo={customerInfo} city={city} />
      <DocumentDetailsData
        customerInfo={customerInfo}
        signature={setSignatureUrl}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        renewPolicyData={renewPolicyData}
        sigPad={sigPad}
      />
      <div className={`mt-3 ${styles['submitButton']}`}>
        <GradientBtn disabled={isLoading} loading={isLoading} onClick={UploadSign} label="Save and continue" />
      </div>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({ renewPolicyData: state.auth.renewPolicyData })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(ReviewDetails)
