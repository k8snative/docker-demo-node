import { differenceInYears, endOfDay } from 'date-fns'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { setAllowedTab, setLockedTab, setPersonalDetails, updatePersonalDetails } from 'src/lib/redux/auth/action'
import { validatePhoneNoPersonalInfo } from 'src/lib/utils'
import * as Yup from 'yup'
import DocumentsUpload from '~components/DocumentsUpload/DocumentsUpload'
import GradientBtn from '~components/GradientBtn/GradientBtn'
import PersonalDetailsDDInput from '~components/PersonalDetailsDDInput/PersonalDetailsDDInput'
import RadioButton from '~components/RadioButton/RadioButton'
import AutoCompleteDropdown from '~components/ReusuableComponent/AutoCompleteDropdown'

import styles from './UploadDocumentsMini.module.scss'

const SubmitCnic = ({ formik }: { formik: any }) => {
    return (
        <div className={`${styles['wrapper']}`}>
            <p className={`${styles['PersonalDetailsheading']}`}>Enter Details</p>
            <p className={`${styles['subText']}`}>Please Enter Your Cnic Details</p>
            <Row className={`${styles['row']}`}>
                <Col lg={7}>
                    <PersonalDetailsDDInput
                        name="cnic"
                        placeholder="CNIC Number *"
                        type="text"
                        options={''}
                        setShowDiv={() => { }}
                        required={false}
                        error={formik.touched.cnic && formik.errors.cnic}
                        value={formik.values.cnic}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Col>

                <Col lg={5}>
                    <PersonalDetailsDDInput
                        name="cnic_issue_date"
                        placeholder="CNIC Issue Date *"
                        type="date"
                        calendar={true}
                        options={''}
                        required={true}
                        setShowDiv={() => { }}
                        error={formik.touched.cnic_issue_date && formik.errors.cnic_issue_date}
                        value={formik.values.cnic_issue_date}
                        onBlur={formik.handleBlur}
                        formik={formik}
                    />
                </Col>

            </Row>
            <div className={`mt-4 ${styles['submitButton']}`}>
                <GradientBtn
                    // disabled={isLoading}
                    // loading={isLoading}
                    link={''}
                    onClick={formik.handleSubmit}
                    label="Continue"
                />
            </div>
        </div>
    )
}

const UploadDocuments = ({ showDetailsHandler }) => {
    return (
        <div className={`${styles['wrapper']}`}>
            <p className={`${styles['PersonalDetailsheading']}`}>Upload Documents</p>
            <p className={`${styles['subText']}`}>Please prepare these following documents</p>
            <ul>
                <li className={`${styles["bulletPoint"]}`}><span> *CNIC</span></li>
                <li className={`${styles["bulletPoint"]}`}><span> Income Proof</span></li>
                <li className={`${styles["bulletPoint"]}`}> <span> Running Paper </span></li>
            </ul>
            <div className={`mt-4 ${styles['submitButtonUpload']}`}>
                <GradientBtn
                    // disabled={isLoading}
                    // loading={isLoading}
                    link={''}
                    onClick={showDetailsHandler}
                    label="Upload Documents"
                />
            </div>
        </div>
    )
}

const UploadDocumentsMini = ({
    currentStep,
    updateState,
}: {
    renewPolicyData: any
    currentStep: number
    updateState: Function
}) => {
    const [showDetailPage, setShowDetailPage] = useState<boolean>(false)

    const cnicRegex = /^(\d{13}|[a-z-A-Z0-9]{9})$/;

    const initialValues = {
        cnic: "",
        cnic_issue_date: ""
    }

    const formik = useFormik({
        initialValues,
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: Yup.object({
            cnic_issue_date: Yup.date()
                .required('CNIC issue date is required.'),
            cnic: Yup.string()
                .matches(cnicRegex, 'Invalid CNIC').required("CNIC Nuumber is required")
        }),
        onSubmit: async values => {
            alert("submitted Successfully")
            updateState(currentStep,formik)
        },
    })


    return (
        <Container className={`${styles['maincontainer']}`}>
            {!showDetailPage ? (<Row>
                <Col md={6}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <SubmitCnic formik={formik} />
                        <span className={`${styles['PersonalDetailsheadingOR']}`}>OR</span>
                    </div>
                </Col>
                {/* <Col md={2}>

                </Col> */}
                <Col md={6}>
                    <UploadDocuments showDetailsHandler={() => setShowDetailPage(true)} />
                </Col>
            </Row>) : <DocumentsUpload currentStep={currentStep} updateState={updateState} backBtnHandler={() => { setShowDetailPage(false) }} />}
        </Container >
    )
}

const mapStateToProps = (state: any) => ({ renewPolicyData: state.auth.renewPolicyData })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(UploadDocumentsMini)
