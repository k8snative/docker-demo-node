import styles from "./PersonalDetails.module.scss";
import { differenceInYears, endOfDay } from "date-fns";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import {
  setAllowedTab,
  setLockedTab,
  setPersonalDetails,
  updatePersonalDetails,
} from "src/lib/redux/auth/action";
import { validatePhoneNoPersonalInfo } from "src/lib/utils";
import * as Yup from "yup";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import PersonalDetailsDDInput from "~components/PersonalDetailsDDInput/PersonalDetailsDDInput";
import RadioButton from "~components/RadioButton/RadioButton";
import AutoCompleteDropdown from "~components/ReusuableComponent/AutoCompleteDropdown";

const nameOptions = [{ option: "Mr." }, { option: "Mrs." }, { option: "Ms." }];
const phoneOptions = [
  { option: "+92" },
  { option: "+923" },
  { option: "+924" },
];
const placeOptions = [
  { option: "Karachi" },
  { option: "Islamabad" },
  { option: "Hyderabad" },
  { option: "Sukkur" },
];
const Occupation = [
  {
    id: "Self Employed",
    name: "Self Employed",
    value: "Self Employed",
  },
  {
    id: "Salaried",
    name: "Salaried",
    value: "Salaried",
  },
  {
    id: "Employed",
    name: "Employed",
    value: "Employed",
  },
];
// const income = [{ option: 'Earned Income.' }, { option: 'Profit Income' }, { option: 'Interest Income' }]

// const Companyname = [
//   { option: 'Jubilee Life Insurance' },
//   { option: 'EFU Life Insurance' },
//   { option: 'State Life Insurance Corporation of Pakistan' },
// ]
const Relation = [
  {
    id: "Mother",
    name: "Mother",
    value: "Mother",
  },
  {
    id: "Father",
    name: "Father",
    value: "Father",
  },
  {
    id: "Sister",
    name: "Sister",
    value: "Sister",
  },
  {
    id: "Brother",
    name: "Brother",
    value: "Brother",
  },
  {
    id: "Husband",
    name: "Husband",
    value: "Husband",
  },
  {
    id: "Wife",
    name: "Wife",
    value: "Wife",
  },
];

const PersonalDetailsComponent = ({ formik }: { formik: any }) => {
  const [showDiv, setShowDiv] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [datesObj, setDatesObj] = useState({});
  const [cnic, setCnic] = useState();

  const fetchNationalityData = async () => {
    const fetchedNationalities = await Api("GET", "/nationality");
    setNationalities(
      fetchedNationalities.data.map((item: any) => ({
        id: item.id,
        name: item.nationality,
        value: item.value,
      }))
    );
  };
  useEffect(() => {
    fetchNationalityData();
  }, []);

  return (
    <div>
      <p className={`${styles["PersonalDetailsheading"]}`}>Personal Details</p>
      <MediaQuery minWidth={430}>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={5}>
            <PersonalDetailsDDInput
              name="customer_name"
              placeholder="Name (As per CNIC)*"
              type="text"
              options={nameOptions}
              customDropDown={true}
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              required={true}
              error={
                formik.touched.customer_name && formik.errors.customer_name
              }
              value={formik.values.customer_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
              initialDropdownValue={formik.values.honorifics}
              setDropdownValueIn={"honorifics"}
            />
          </Col>
          <Col lg={7}>
            <PersonalDetailsDDInput
              name="permanent_address"
              placeholder="Permanent Address (As per CNIC)*"
              type="text"
              options={phoneOptions}
              setShowDiv={() => { }}
              required={true}
              error={
                formik.touched.permanent_address &&
                formik.errors.permanent_address
              }
              value={formik.values.permanent_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <PersonalDetailsDDInput
              name="current_address"
              placeholder="Current Address*"
              type="text"
              options={""}
              setShowDiv={() => {}}
              required={false}
              error={
                formik.touched.current_address && formik.errors.current_address
              }
              value={
                formik.values.same_as_permanent_address
                  ? formik.values.permanent_address
                  : formik.values.current_address
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.same_as_permanent_address}
            />
          </Col>

          <Col lg={3}>
            <PersonalDetailsDDInput
              name="contact"
              placeholder="Phone Number*"
              // type="number"
              // options={phoneOptions}
              // customDropDown={true}
              // showDiv={showDiv}
              // setShowDiv={setShowDiv}
              required={true}
              error={formik.touched.contact && formik.errors.contact}
              value={formik.values.contact}
              onChange={(val: any) => {
                formik.setFieldValue("contact", val);
              }}
              onBlur={formik.handleBlur}
              formik={formik} // initialDropdownValue={formik.values.phone_code}
              // setDropdownValueIn={'phone_code'}
            />
          </Col>

          <Col lg={4}>
            <PersonalDetailsDDInput
              name="email"
              placeholder="Email Address*"
              type="text"
              options={""}
              setShowDiv={() => {}}
              required={false}
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col
            lg={12}
            // className={`${styles['custom-width-checkbox']} align-items-center`}
          >
            <Form>
              <div key={`default-checkbox`} className="mt-2">
                <Form.Check
                  name="same_as_permanent_address"
                  value={formik.values.same_as_permanent_address}
                  type={"checkbox"}
                  id={`default-checkbox`}
                  label={`Same as Permanent Address`}
                  className={`${styles["same-as-text-color"]}`}
                  onChange={formik.handleChange}
                />
              </div>
            </Form>
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="date_of_birth"
              placeholder="Date of Birth*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.date_of_birth && formik.errors.date_of_birth
              }
              value={formik.values.date_of_birth}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          {/* <Col lg={4}>
            <Dropdown
              name="place_of_birth"
              label="Place of Birth*"
              options={placeOptions}
              error={formik.touched.place_of_birth && formik.errors.place_of_birth}
              value={formik.values.place_of_birth}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col> */}
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="father_name"
              placeholder="Father's / Spouse Name*"
              type="text"
              options={""}
              required={true}
              setShowDiv={() => { }}
              error={formik.touched.father_name && formik.errors.father_name}
              value={formik.values.father_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4} className="paymentPage">
            <AutoCompleteDropdown
              label={`Nationality*`}
              option={nationalities}
              formikKey="nationality_id"
              formik={formik}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="mother_name"
              placeholder="Mother's Maiden Name (optional)"
              type="text"
              options={""}
              required={true}
              setShowDiv={() => { }}
              error={formik.touched.mother_name && formik.errors.mother_name}
              value={formik.values.mother_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4} className="paymentPage">
            <AutoCompleteDropdown
              label={`Occupation *`}
              option={Occupation}
              formikKey="occupation"
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="cnic_number"
              placeholder="CNIC No.*"
              type="text"
              options={""}
              required={false}
              setShowDiv={() => {}}
              error={formik.touched.cnic_number && formik.errors.cnic_number}
              value={formik.values.cnic_number}
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="cnic_issue_date"
              placeholder="CNIC Issue Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.cnic_issue_date && formik.errors.cnic_issue_date
              }
              value={formik.values.cnic_issue_date}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="cnic_expiry_date"
              placeholder="CNIC Expiry Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.cnic_expiry_date &&
                formik.errors.cnic_expiry_date
              }
              value={formik.values.cnic_expiry_date}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          {/* <Col lg={4}>
            <Dropdown
              name="source_of_income"
              label="Source Of Income*"
              options={income}
              error={formik.touched.source_of_income && formik.errors.source_of_income}
              value={formik.values.source_of_income}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col> */}
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          {/* <Col lg={4}>
            <Dropdown
              name="occupation"
              label="Occupation*"
              options={Occupation}
              error={formik.touched.occupation && formik.errors.occupation}
              value={formik.values.occupation}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col> */}
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={5}>
            <PersonalDetailsDDInput
              name="customer_name"
              placeholder="Name (As per CNIC)*"
              type="text"
              options={nameOptions}
              customDropDown={true}
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              required={true}
              error={
                formik.touched.customer_name && formik.errors.customer_name
              }
              value={formik.values.customer_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              initialDropdownValue={"Mr."}
            />
          </Col>
          {/* <Col lg={5}>
            <PersonalDetailsDDInput
              name="contact"
              placeholder="Phone Number*"
              // type="number"
              // options={phoneOptions}
              // customDropDown={true}
              // showDiv={showDiv}
              // setShowDiv={setShowDiv}
              required={true}
              error={formik.touched.contact && formik.errors.contact}
              value={formik.values.contact}
              onChange={(val: any) => {
                formik.setFieldValue('contact', val)
              }}
              // onChange={formik.handleChange}

              onBlur={formik.handleBlur}
              formik={formik}
              // initialDropdownValue={formik.values.phone_code}
              // setDropdownValueIn={'phone_code'}
            /> */}
          {/* <PersonalDetailsDDInput
              name="contact"
              placeholder="Phone Number*"
              type="number"
              options={phoneOptions}
              customDropDown={true}
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              required={true}
              error={formik.touched.contact && formik.errors.contact}
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              initialDropdownValue={formik.values.phone_code}
              setDropdownValueIn={'phone_code'}
            /> */}
          {/* </Col> */}
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="email"
              placeholder="Email Address*"
              type="text"
              options={""}
              setShowDiv={() => {}}
              required={false}
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="father_name"
              placeholder="Father's / Spouse name*"
              type="text"
              options={""}
              required={false}
              setShowDiv={() => {}}
              error={formik.touched.father_name && formik.errors.father_name}
              value={formik.values.father_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="mother_name"
              placeholder="Mother's Maiden Name (Optional)"
              type="text"
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.mother_name && formik.errors.mother_name}
              value={formik.values.mother_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="contact"
              placeholder="Phone Number*"
              // type="number"
              // options={phoneOptions}
              // customDropDown={true}
              // showDiv={showDiv}
              // setShowDiv={setShowDiv}
              required={true}
              error={formik.touched.contact && formik.errors.contact}
              value={formik.values.contact}
              onChange={(val: any) => {
                formik.setFieldValue('contact', val)
              }}
              onBlur={formik.handleBlur}
              formik={formik}           // initialDropdownValue={formik.values.phone_code}
            // setDropdownValueIn={'phone_code'}
            />
          </Col>
          <Col lg={4} className={`${styles['dropdown-input']}`}>
            <AutoCompleteDropdown
              label={`Occupation*`}
              option={Occupation}
              formikKey='occupation'
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="cnic_number"
              placeholder="CNIC No.*"
              type="text"
              options={""}
              required={false}
              setShowDiv={() => {}}
              error={formik.touched.cnic_number && formik.errors.cnic_number}
              value={formik.values.cnic_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={7}>
            <PersonalDetailsDDInput
              name="permanent_address"
              placeholder="Permanent Addresses (As per CNIC)*"
              type="text"
              options={phoneOptions}
              setShowDiv={() => { }}
              required={true}
              error={
                formik.touched.permanent_address &&
                formik.errors.permanent_address
              }
              value={formik.values.permanent_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>

          <Col lg={7}>
            <PersonalDetailsDDInput
              name="current_address"
              placeholder="Current Address (If different from CNIC)*"
              type="text"
              options={""}
              setShowDiv={() => {}}
              required={false}
              error={
                formik.touched.current_address && formik.errors.current_address
              }
              value={formik.values.current_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.same_as_permanent_address}
            />
          </Col>

          <Form>
            <div key={`default-checkbox`}
              className="mt-2"
            >
              <Form.Check
                checked={formik.values.same_as_permanent_address}
                name="same_as_permanent_address"
                value={formik.values.same_as_permanent_address}
                type={'checkbox'}
                id={`default-checkbox`}
                label={`Same as Permanent Address`}
                className={`${styles['same-as-text-color']}`}
                onChange={formik.handleChange}
              />
            </div>
          </Form>

          <Col lg={4}>
            <PersonalDetailsDDInput
              name="date_of_birth"
              placeholder="Date of Birth*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.date_of_birth && formik.errors.date_of_birth
              }
              value={formik.values.date_of_birth}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>

          <Col lg={4} className="paymentPage">
            <AutoCompleteDropdown
              label={`Nationality*`}
              option={nationalities}
              formikKey="nationality_id"
              formik={formik}
            />
          </Col>
        </Row>

        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col xs={6}>
            <PersonalDetailsDDInput
              name="cnic_issue_date"
              placeholder="Issue Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.cnic_issue_date && formik.errors.cnic_issue_date
              }
              value={formik.values.cnic_issue_date}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col xs={6}>
            <PersonalDetailsDDInput
              name="cnic_expiry_date"
              placeholder="Expiry Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.cnic_expiry_date &&
                formik.errors.cnic_expiry_date
              }
              value={formik.values.cnic_expiry_date}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          {/* <Col lg={4}>
            <Dropdown
              name="occupation"
              label="Occupation"
              options={Occupation}
              error={formik.touched.occupation && formik.errors.occupation}
              value={formik.values.occupation}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col> */}
          {/* <Col lg={4}>
            <Dropdown
              name="source_of_income"
              label="Source Of Income*"
              options={income}
              error={formik.touched.source_of_income && formik.errors.source_of_income}
              value={formik.values.source_of_income}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col> */}
        </Row>
      </MediaQuery>
    </div>
  );
};

const InsuranceDetails = ({
  companySetup,
  formik,
}: {
  companySetup: any;
  formik: any;
}) => (
  <Container className={`${styles["insuranceDetailsContainer"]}`}>
    <p className={` ${styles["insuranceDetailsHeading"]}`}>
      Previous Insurance Details{" "}
      <span className={`m-0 ${styles["insuranceDetailsHeadinggrey"]}`}>
        {" "}
        (If Any)
      </span>
    </p>
    <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
      <Col lg={8} className="paymentPage">
        <AutoCompleteDropdown
          label={`Insurance Company Name`}
          option={companySetup}
          formikKey="previous_insurance_company_name"
          formik={formik}
        />
      </Col>
      <Col lg={4}>
        <PersonalDetailsDDInput
          name="previous_date_of_expiry"
          placeholder="Date of Expiry"
          type="date"
          calendar={true}
          options={""}
          required={false}
          setShowDiv={() => {}}
          error={
            formik.touched.previous_date_of_expiry &&
            formik.errors.previous_date_of_expiry
          }
          value={formik.values.previous_date_of_expiry}
          onBlur={formik.handleBlur}
          formik={formik}
          minDate={moment().subtract(1, "years")}
          maxDate={moment().add(1, "years")}
        />
      </Col>
    </Row>
  </Container>
);

const BeneficiaryDetails = ({ formik }: { formik: any }) => {
  const [showDiv, setShowDiv] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });
  return (
    <div className={`mt-4`}>
      {/* */}
      <p className={` ${styles["insuranceDetailsHeading"]}`}>Beneficiary</p>
      <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="benificiary_name"
            placeholder="Name"
            type="text"
            calendar={false}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={
              formik.touched.benificiary_name && formik.errors.benificiary_name
            }
            value={formik.values.benificiary_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="benificiary_contact"
            placeholder="Phone Number*"
            setShowDiv={setShowDiv}
            required={true}
            error={
              formik.touched.benificiary_contact &&
              formik.errors.benificiary_contact
            }
            value={formik.values.benificiary_contact}
            onChange={(val: any) => {
              formik.setFieldValue("benificiary_contact", val);
            }}
            onBlur={formik.handleBlur}
            formik={formik}
          />
        </Col>
        <Col lg={4} className="paymentPage">
          <AutoCompleteDropdown
            label={`Relation`}
            option={Relation}
            formikKey="benificiary_relation"
            formik={formik}
          />
        </Col>
      </Row>

      {/* <Row className={`gy-2 ${styles['txtFieldsRow']}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="benificiary_cnic_number"
            placeholder="CNIC No.*"
            type="text"
            calendar={false}
            options={''}
            required={true}
            setShowDiv={() => {}}
            error={formik.touched.benificiary_cnic_number && formik.errors.benificiary_cnic_number}
            value={formik.values.benificiary_cnic_number}
            // onChange={formik.handleChange}
            onChange={(e: any) => {
              formik.handleChange(e)
              // handleCnic(e)
            }}
            onBlur={formik.handleBlur}
          />
        </Col>
        <Col lg={8} xs={12}>
          {isDesktopOrLaptop ? (
            <PersonalDetailsDDInput
              name="benificiary_address"
              placeholder="Address"
              type="text"
              calendar={false}
              options={''}
              required={true}
              setShowDiv={() => {}}
              error={formik.touched.benificiary_address && formik.errors.benificiary_address}
              value={formik.values.benificiary_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          ) : (
            <>
              <textarea
                name="benificiary_address"
                className={` d-flex align-items-center justify-content-end position-relative  ${styles['inputBorder']}`}
                placeholder="Address"
                value={formik.values.benificiary_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.benificiary_address && formik.errors.benificiary_address && (
                <p className={`${styles['inputError']}`}>{formik.errors.benificiary_address}</p>
              )}
               {!!error.benificiary_address && (
                <p className={`${styles['inputError']}`}>{error ? error : `Benificiary Address is required`}</p>
              )} 
            </>
          )}
        </Col>
      </Row> */}

      {/* <Row className={` ${styles['txtFieldsRow']}`}>
        <Col lg={12} className={`d-flex flex-direction-row  ${styles['incometax']}`}>
          <p className={`m-0 ${styles['incomeheading']}`}>
            Income Tax Status<span className={` ${styles['incomeheadingred']}`}>*</span>
          </p>
          <div className={`d-flex flex-direction-row mt-1  ${styles['radiobtn']} `}>
            <RadioButton
              isChecked={formik.values.is_filer === true}
              handleChange={() => {
                formik?.setFieldValue('is_filer', true)
              }}
              label="Filer"
            />
            <RadioButton
              isChecked={formik.values.is_filer === false}
              handleChange={() => {
                formik?.setFieldValue('is_filer', false)
              }}
              label="Non Filer"
            />
          </div>
        </Col>

        <Col lg={12} xs={12} className={`${styles['filercol']}`}>
          <p className={` ${styles['filertextred']}`}>Check your Filer status</p>
          <p className={` ${styles['filertext']}`}> or SMS to 9966 or </p>
          <p className={` ${styles['filertextred']}`}> Call Team TB</p>
        </Col>
      </Row> */}

      <Row className={` ${styles["txtFieldsRow"]}`}>
        <Col
          lg={12}
          md={11}
          className={`d-flex flex-direction-row  ${styles["incometax"]}`}
        >
          <div>
            <p className={`mb-0 ${styles["incomeheading"]}`}>
              Holder of any Government Office, (MNA/ MPA/ Local bodies)
              <span className={` ${styles["incomeheadingred"]}`}>*</span>
            </p>
            <p className={`m-0 ${styles["note"]}`}>
              Includes family member or a close associate of any Public Figure/
              Politically Exposed Person
              <span className={` ${styles["incomeheadingred"]}`}>*</span>
            </p>
          </div>
          <div
            className={`d-flex flex-direction-row mt-1 ${styles["radiobtn2"]}`}
          >
            <RadioButton
              isChecked={formik.values.is_government_employee}
              handleChange={() => {
                formik?.setFieldValue("is_government_employee", true);
              }}
              label="Yes"
            />
            <RadioButton
              isChecked={!formik.values.is_government_employee}
              handleChange={() => {
                formik?.setFieldValue("is_government_employee", false);
              }}
              label="No"
            />
          </div>
        </Col>

        <Col lg={12}>
          <p className={`mt-4 ${styles["note"]}`}>
            <span className={` ${styles["notetxt"]}`}>Note: </span> Includes
            Heads of State or of Government, Senior Politicians, Senior
            Government / Judicial / Military Officials of Grade 21 or above,
            Senior Executive of State owned corporations, important political
            party officials, Senior management / member of board of an
            International Organization.
          </p>
        </Col>
      </Row>
    </div>
  );
};

const PersonalDetails = ({
  renewPolicyData,
  currentStep,
  updateState,
  cnicData,
}: {
  renewPolicyData: any;
  currentStep: number;
  updateState: Function;
  cnicData: Object;
}) => {
  const data = useSelector((state) => state?.auth?.data);
  const expiry_date = useSelector(
    (state) => state?.auth?.planDetails?.date_of_expiry
  );
  const date_of_expiry = !!expiry_date ? moment(expiry_date).toDate() : "";

  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);
  const allowedTabIndex = useSelector((state) => state?.auth?.allowedTabIndex);
  const plan_details = useSelector((state) => state?.auth?.planDetails);
  const {
    policy_id,
    annual_contribution,
    insurance_rate,
    policy_type_id,
    policy_addons,
    promotion_coupon_id,
    promotion_discount_type,
    promotion_discount_value,
    total_discount_value,
  } = plan_details.buy_now;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companySetup, setCompanySetup] = useState([]);

  const dispatch = useDispatch();

  const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PhoneNumberRegex = /^\d{3}-{0,1}\d{7}$|^\d{10}$|^\d{4}-\d{7}$/;
  const cnicRegex = /^(\d{13}|[a-z-A-Z0-9]{9})$/;
  // console.log('cniccc-->',cnicData)

  // /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$"/
  // useEffect(() => {
  //   if (purchaseDetails.details.order_detail_id !== 0) {
  //     const { policy_id, premium_rate, total_price, order_detail_id, policy_type_id, ...restData } =
  //       purchaseDetails.details
  //     formik.setValues({ ...restData })
  //   } else {
  //     formik.setValues({
  //       ...formik.values,
  //       customer_name: data.user.first_name + ' ' + data.user.last_name,
  //       email: data.user.email,
  //       contact: data.user.contact.slice(1),
  //     })
  //   }
  // }, [purchaseDetails, data])
  // console.log('dataValues===>',props)

  const initialValues = {
    customer_name: '',
    permanent_address: '',
    current_address: '',
    contact: '',
    email: '',
    date_of_birth: '',
    place_of_birth: '',
    father_name: '',
    mother_name: '',
    nationality_id: 1,
    cnic_number: '',
    cnic_issue_date: '',
    cnic_expiry_date: '',
    occupation: '',
    source_of_income: '',
    previous_insurance_company_name: '',
    previous_date_of_expiry: '',
    benificiary_name: '',
    benificiary_contact: '+92',
    benificiary_relation: '',
    benificiary_cnic_number: '',
    benificiary_address: '',
    is_filer: false,
    is_government_employee: false,
    phone_code: '+92',
    benificiary_contact_phone_code: '+92',
    honorifics: 'Mr.',
    same_as_permanent_address: true,
  }

  const currentAddressHandler = (value: any, schemaContext: any): boolean => {
    if (schemaContext.parent.same_as_permanent_address) {
      return true;
    } else {
      if (schemaContext.parent.current_address) {
        return true;
      } else {
        return false;
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      customer_name: Yup.string().required("Name is required."),
      permanent_address: Yup.string().required(
        "Permanent address is required."
      ),
      current_address: Yup.string().test(
        "same_as_permanent_address",
        "Current address is required.",
        currentAddressHandler
      ),
      contact: Yup.string()
        .required("Phone number is required.")
        .test({
          message: "Invalid phone number",
          test: (value) => {
            if (value) {
              return validatePhoneNoPersonalInfo(value);
            }
            return false;
          },
        }),
      email: Yup.string()
        .matches(EmailRegex, "Invalid Email.")
        .required("Email address is required."),
      date_of_birth: Yup.string()
        .required("Date of birth is required.")
        .typeError("Date of birth is required.")
        .test({
          name: "ageTest",
          message: "Age Should be greater than 18",
          test(value) {
            const ageInYears = moment().diff(
              moment(new Date(value).toLocaleDateString("en-GB"), "DD/MM/YYYY"),
              "years"
            );
            return ageInYears > 17;
          },
        }),
      place_of_birth: Yup.string().notRequired(),
      father_name: Yup.string().required("Father name is required."),
      mother_name: Yup.string().notRequired(),
      nationality_id: Yup.number().notRequired(),
      cnic_number: Yup.string()
        .matches(cnicRegex, "Invalid CNIC")
        .required("CNIC / Passport number is required."),
      cnic_issue_date: Yup.date()
        .required("CNIC / Passport issue date is required.")
        .test({
          name: "isIssueDateBeforeTodayDate",
          exclusive: false,
          params: {},
          message: "Issue date cannot be greater than todays date",
          test(value: any) {
            return new Date() >= value;
          },
        })
        .test(
          "Is18MoreYearsThanDOB",
          "Issue date must be alteast 18 years from date of birth",
          (val, context) => {
            return (
              differenceInYears(val, new Date(context.parent.date_of_birth)) >=
              18
            );
          }
        ),
      cnic_expiry_date: Yup.date()
        .required("CNIC / Passport expiry date is required.")
        .min(
          Yup.ref("cnic_issue_date"),
          "Expiry date cannot be before issue date"
        )
        .test(
          "test-not-same-expiry",
          "Expiry date cannot be the same as issue date",
          (value, context) => {
            return (
              value?.getTime() !== context.parent.cnic_issue_date?.getTime()
            );
          }
        )
        .test(
          "test-expiry-date-greater",
          "Expiry nic is not aceptable",
          (value, context) => {
            return new Date() < endOfDay(value);
          }
        ),
      occupation: Yup.string().required("Occupation is required"),
      source_of_income: Yup.string().notRequired(),
      previous_insurance_company_name: Yup.string().test(
        "is DateOfExipry",
        "Insurance Company is Required",
        (value: any) => {
          if (date_of_expiry && !value) {
            return false;
          }
          return true;
        }
      ),
      previous_date_of_expiry: Yup.string()
        .test(
          "isDateOfExpiry2",
          "Insurance Expiry is Required",
          (value: any) => {
            if (date_of_expiry && !value) {
              return false;
            }
            return true;
          }
        )
        .nullable(),
      benificiary_name: Yup.string().nullable(),
      benificiary_contact: Yup.string().nullable().notRequired(),
      benificiary_relation: Yup.string().nullable().notRequired(),
      benificiary_cnic_number: Yup.string().nullable().notRequired(),
      is_filer: Yup.boolean(),
      is_government_employee: Yup.boolean(),
      phone_code: Yup.string(),
      benificiary_contact_phone_code: Yup.string(),
      honorifics: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (true) {
        //purchaseDetails.details.order_detail_id === 0 <- original
        const postApiPayload = {
          order_id: purchaseDetails.order_id || 0,
          order_detail_id:
            purchaseDetails.order_detail_id ||
            purchaseDetails.details.order_detail_id ||
            0,
          customer_id: data.user.id,
          payment_status: "pending",
          ...(policy_addons?.length > 0 && { addons: policy_addons }),
          ...(renewPolicyData?.previous_order_id && {
            previous_order_id: renewPolicyData?.previous_order_id,
          }),
          ...(promotion_coupon_id !== 0 && {
            promotion_coupon_id: promotion_coupon_id,
          }),
          ...(promotion_coupon_id !== 0 && {
            promotion_discount_type: promotion_discount_type,
          }),
          ...(promotion_coupon_id !== 0 && {
            promotion_discount_value: promotion_discount_value,
          }),
          ...(promotion_coupon_id !== 0 && {
            total_discount_value: total_discount_value,
          }),
          details: {
            model_id: plan_details.model_id,
            make_id: plan_details.make_id,
            year: plan_details.year,
            value: plan_details.value,
            policy_id: parseInt(policy_id),
            policy_type_id: policy_type_id,
            premium_rate: insurance_rate,
            total_price:
              parseFloat(annual_contribution) > -1 ? annual_contribution : 0,
            customer_name: `${values.honorifics} ${values.customer_name}`,
            permanent_address: values.permanent_address,
            current_address: values.same_as_permanent_address
              ? values.permanent_address
              : values.current_address,
            contact: values.contact,

            // contact: values.phone_code + values.contact,
            email: values.email,
            date_of_birth: new Date(values.date_of_birth),
            place_of_birth: values.place_of_birth,
            ...(values.father_name?.length !== 0 && {
              father_name: values.father_name,
            }),
            mother_name: values.mother_name,
            nationality_id: String(values.nationality_id),
            cnic_number: values.cnic_number,
            cnic_issue_date: new Date(values.cnic_issue_date),
            cnic_expiry_date: new Date(values.cnic_expiry_date),
            // ...(values.occupation?.length !== 0 && { occupation: values.occupation ?? null }),
            occupation: values.occupation,
            source_of_income: values.source_of_income,
            ...(values.previous_insurance_company_name?.length !== 0 && {
              previous_insurance_company_name:
                values.previous_insurance_company_name,
            }),
            ...(values.previous_date_of_expiry?.length !== 0 && {
              previous_date_of_expiry: new Date(values.previous_date_of_expiry),
            }),
            benificiary_name: values.benificiary_name,
            benificiary_contact: values.benificiary_contact,
            // benificiary_contact: values.benificiary_contact_phone_code + values.benificiary_contact,

            benificiary_relation: values.benificiary_relation,
            benificiary_cnic_number: values.benificiary_cnic_number,
            ...(values.benificiary_address?.length !== 0 && {
              benificiary_address: values.benificiary_address,
            }),
            is_filer: values.is_filer,
            is_government_employee: values.is_government_employee,
          },
        };

        setIsLoading(true);
        Api("POST", `order/add`, postApiPayload)
          .then((res) => {
            if (res?.success) {
              setIsLoading(false);
              const postReduxPayload = {
                payment_status: "pending",
                ...(policy_addons?.length !== 0 && { addons: policy_addons }),
                order_id: res?.data?.id,
                ...(promotion_coupon_id !== 0 && {
                  promotion_coupon_id: promotion_coupon_id,
                }),
                ...(promotion_coupon_id !== 0 && {
                  promotion_discount_type: promotion_discount_type,
                }),
                ...(promotion_coupon_id !== 0 && {
                  promotion_discount_value: promotion_discount_value,
                }),
                ...(promotion_coupon_id !== 0 && {
                  total_discount_value: total_discount_value,
                }),
                details: {
                  order_detail_id: res?.data?.order_detail.id,
                  policy_id: parseInt(policy_id),
                  policy_type_id: policy_type_id,
                  premium_rate: insurance_rate,
                  total_price:
                    parseFloat(annual_contribution) > -1
                      ? annual_contribution
                      : 0,
                  customer_name: values.customer_name,
                  permanent_address: values.permanent_address,
                  same_as_permanent_address: values.same_as_permanent_address,
                  current_address: values.same_as_permanent_address
                    ? values.permanent_address
                    : values.current_address,
                  contact: values.contact,
                  email: values.email,
                  // date_of_birth: new Date(getFormattedDateForInput(values.date_of_birth)),
                  date_of_birth: values.date_of_birth,
                  place_of_birth: values.place_of_birth,
                  ...(values.father_name?.length !== 0 && {
                    father_name: values.father_name,
                  }),
                  mother_name: values.mother_name ?? null,
                  nationality_id: values?.nationality_id ?? null,
                  cnic_number: values.cnic_number,
                  cnic_issue_date: values.cnic_issue_date,
                  cnic_expiry_date: values.cnic_expiry_date,
                  ...(values.occupation?.length !== 0 && {
                    occupation: values.occupation ?? null,
                  }),
                  source_of_income: values.source_of_income,
                  ...(values.previous_insurance_company_name?.length !== 0 && {
                    previous_insurance_company_name:
                      values.previous_insurance_company_name,
                  }),
                  previous_date_of_expiry: values.previous_date_of_expiry,
                  benificiary_name: values.benificiary_name ?? null,
                  benificiary_contact: values.benificiary_contact ?? null,
                  benificiary_relation: values.benificiary_relation ?? null,
                  benificiary_cnic_number:
                    values.benificiary_cnic_number ?? null,
                  ...(values.benificiary_address?.length !== 0 && {
                    benificiary_address: values.benificiary_address ?? null,
                  }),
                  is_filer: values.is_filer ?? null,
                  is_government_employee: values.is_government_employee ?? false,
                  phone_code: values.phone_code ?? null,
                  benificiary_contact_phone_code:
                    values.benificiary_contact_phone_code ?? null,
                  honorifics: values.honorifics ?? null,
                },
              };
              dispatch(setPersonalDetails(postReduxPayload));
              if (allowedTabIndex <= 2) {
                dispatch(setAllowedTab(2));
                dispatch(setLockedTab(-1));
              }
              updateState(currentStep);
              return;
            }
            setIsLoading(false);
          })
          .catch((e) => {
            setIsLoading(false);
          });
      } else {
        const putApiPayload = {
          ...(promotion_coupon_id !== 0 && {
            promotion_coupon_id: promotion_coupon_id,
          }),
          ...(promotion_coupon_id !== 0 && {
            promotion_discount_type: promotion_discount_type,
          }),
          ...(promotion_coupon_id !== 0 && {
            promotion_discount_value: promotion_discount_value,
          }),
          ...(promotion_coupon_id !== 0 && {
            total_discount_value: total_discount_value,
          }),
          order_detail_id: purchaseDetails.details.order_detail_id,
          policy_id: parseInt(policy_id),
          policy_type_id: policy_type_id,
          premium_rate: insurance_rate,
          total_price:
            parseFloat(annual_contribution) > -1 ? annual_contribution : 0,
          customer_name: values.honorifics + " " + values.customer_name,
          permanent_address: values.permanent_address,
          current_address: values.same_as_permanent_address
            ? values.permanent_address
            : values.current_address,
          contact: values.contact,
          email: values.email,
          date_of_birth: values.date_of_birth,
          place_of_birth: values.place_of_birth,
          ...(values.father_name?.length !== 0 && {
            father_name: values.father_name,
          }),
          mother_name: values.mother_name,
          nationality_id: values.nationality_id,
          cnic_number: values.cnic_number,
          cnic_issue_date: values.cnic_issue_date,
          cnic_expiry_date: values.cnic_expiry_date,
          ...(values.occupation?.length !== 0 && {
            occupation: values.occupation,
          }),
          source_of_income: values.source_of_income,
          ...(values.previous_insurance_company_name?.length !== 0 && {
            previous_insurance_company_name:
              values.previous_insurance_company_name,
          }),
          ...(values.previous_date_of_expiry?.length !== 0 && {
            previous_date_of_expiry: values.previous_date_of_expiry,
          }),
          benificiary_name: values.benificiary_name,
          benificiary_contact: values.benificiary_contact,
          benificiary_relation: values.benificiary_relation,
          benificiary_cnic_number: values.benificiary_cnic_number,
          ...(values.benificiary_address?.length !== 0 && {
            benificiary_address: values.benificiary_address,
          }),
          is_filer: values.is_filer,
          is_government_employee: values.is_government_employee,
        };

        setIsLoading(true);
        Api("PUT", `order/update/personal_details`, putApiPayload)
          .then((res) => {
            if (res?.success) {
              setIsLoading(false);
              const putReduxPayload = {
                order_detail_id: purchaseDetails.details.order_detail_id,
                policy_id: parseInt(policy_id),
                policy_type_id: policy_type_id,
                premium_rate: insurance_rate,
                total_price:
                  parseFloat(annual_contribution) > -1
                    ? annual_contribution
                    : 0,
                customer_name: values.customer_name,
                permanent_address: values.permanent_address,
                same_as_permanent_address: values.same_as_permanent_address,
                current_address: values.same_as_permanent_address
                  ? values.permanent_address
                  : values.current_address,
                contact: values.contact,
                email: values.email,
                date_of_birth: values.date_of_birth,
                place_of_birth: values.place_of_birth,
                ...(values.father_name?.length !== 0 && {
                  father_name: values.father_name,
                }),
                mother_name: values.mother_name,
                nationality_id: values.nationality_id,
                cnic_number: values.cnic_number,
                cnic_issue_date: values.cnic_issue_date,
                cnic_expiry_date: values.cnic_expiry_date,
                ...(values.occupation?.length !== 0 && {
                  occupation: values.occupation,
                }),
                source_of_income: values.source_of_income,
                ...(values.previous_insurance_company_name?.length !== 0 && {
                  previous_insurance_company_name:
                    values.previous_insurance_company_name,
                }),
                previous_date_of_expiry: values.previous_date_of_expiry,
                benificiary_name: values.benificiary_name,
                benificiary_contact: values.benificiary_contact,
                benificiary_relation: values.benificiary_relation,
                benificiary_cnic_number: values.benificiary_cnic_number,
                ...(values.benificiary_address?.length !== 0 && {
                  benificiary_address: values.benificiary_address,
                }),
                is_filer: values.is_filer,
                is_government_employee: values.is_government_employee,
                phone_code: values.phone_code,
                benificiary_contact_phone_code:
                  values.benificiary_contact_phone_code,
                honorifics: values.honorifics,
              };
              dispatch(updatePersonalDetails(putReduxPayload));
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
      }
    },
  });

  const getCompanySetup = async () => {
    const tempCompanySetup = await Api("GET", `/company_setup`);
    if (tempCompanySetup?.success) {
      const tempData = tempCompanySetup?.data
        .filter(
          (v: any) =>
            v?.status && { id: v?.name, name: v?.name, option: v?.name }
        )
        .map(
          (v: any) =>
            v?.status && { id: v?.name, name: v?.name, option: v?.name }
        );
      setCompanySetup(tempData);
    }
  };

  useEffect(() => {
    if (
      purchaseDetails.details.order_detail_id !== 0 &&
      !renewPolicyData?.customer_name
    ) {
      const {
        policy_id,
        premium_rate,
        total_price,
        order_detail_id,
        policy_type_id,
        ...restData
      } = purchaseDetails.details;
      formik.setValues({
        ...restData,
        ...{
          email: purchaseDetails?.details?.email || data?.user?.email,
          contact: purchaseDetails?.details?.contact || data?.user?.contact,
          customer_name:
            purchaseDetails?.details?.customer_name ||
            purchaseDetails?.customer_name ||
            `${data?.user?.first_name} ${data?.user?.last_name}`,
          cnic_number:
            purchaseDetails?.details?.cnic_number ||
            purchaseDetails?.cnic_number ||
            cnicData?.cnic ||
            "",
          date_of_birth: purchaseDetails?.details?.date_of_birth
            ? new Date(purchaseDetails?.details?.date_of_birth)
            : purchaseDetails?.date_of_birth
            ? new Date(purchaseDetails?.date_of_birth)
            : "",
          father_name:
            purchaseDetails?.details?.father_name ||
            purchaseDetails?.father_name ||
            "",
          cnic_issue_date: purchaseDetails?.details?.cnic_issue_date
            ? new Date(purchaseDetails?.details?.cnic_issue_date)
            : purchaseDetails?.cnic_issue_date
            ? new Date(purchaseDetails?.cnic_issue_date)
            : "",
          cnic_expiry_date: purchaseDetails?.details?.cnic_expiry_date
            ? new Date(purchaseDetails?.details?.cnic_expiry_date)
            : purchaseDetails?.cnic_expiry_date
            ? new Date(purchaseDetails?.cnic_expiry_date)
            : "",
        },
        ...(date_of_expiry && { previous_date_of_expiry: date_of_expiry }),
      });
    } else if (
      purchaseDetails.details.order_detail_id !== 0 &&
      renewPolicyData?.customer_name
    ) {
      formik.setValues({
        ...formik.values,
        customer_name: `${data.user.first_name} ${data.user.last_name}`,
        email: data.user.email,
        contact: data.user.contact,
        ...(date_of_expiry && { previous_date_of_expiry: date_of_expiry }),
      });
      if (renewPolicyData?.customer_name) {
        formik.setValues({
          ...renewPolicyData,
          benificiary_contact: renewPolicyData?.benificiary_contact,
          contact: renewPolicyData?.contact,
          phone_code: formik?.values?.phone_code,
          benificiary_contact_phone_code:
            formik?.values?.benificiary_contact_phone_code,
          date_of_birth: new Date(renewPolicyData?.date_of_birth),
          cnic_issue_date: new Date(renewPolicyData?.cnic_issue_date),
          cnic_expiry_date: new Date(renewPolicyData?.cnic_expiry_date),
          previous_date_of_expiry: new Date(
            renewPolicyData?.previous_date_of_expiry
          ),
        });
      }
    } else {
      formik.setValues({
        ...formik.values,
        email: data.user.email,
        contact: data.user.contact,
        customer_name:
          purchaseDetails.customer_name ||
          `${data.user.first_name} ${data.user.last_name}`,
        cnic_number: purchaseDetails.cnic_number || cnicData?.cnic || "",
        date_of_birth: purchaseDetails.date_of_birth
          ? new Date(purchaseDetails.date_of_birth)
          : "",
        father_name: purchaseDetails.father_name || "",
        cnic_issue_date: purchaseDetails.cnic_issue_date
          ? new Date(purchaseDetails.cnic_issue_date)
          : cnicData?.cnic_issue_date
          ? new Date(cnicData?.cnic_issue_date)
          : "",
        cnic_expiry_date: purchaseDetails.cnic_expiry_date
          ? new Date(purchaseDetails.cnic_expiry_date)
          : "",
        ...(date_of_expiry && { previous_date_of_expiry: date_of_expiry }),
      });
      if (renewPolicyData?.customer_name) {
        formik.setValues({
          ...renewPolicyData,
          benificiary_contact: renewPolicyData?.benificiary_contact,
          contact: renewPolicyData?.contact,
          phone_code: formik?.values?.phone_code,
          benificiary_contact_phone_code:
            formik?.values?.benificiary_contact_phone_code,
          date_of_birth: new Date(renewPolicyData?.date_of_birth),
          cnic_issue_date: new Date(renewPolicyData?.cnic_issue_date),
          cnic_expiry_date: new Date(renewPolicyData?.cnic_expiry_date),
          previous_date_of_expiry: new Date(
            renewPolicyData?.previous_date_of_expiry
          ),
        });
      }
    }
  }, [purchaseDetails, data, renewPolicyData]);

  useEffect(() => {
    if (purchaseDetails.details.order_detail_id !== 0) {
      const formikData = JSON.stringify(formik.values);
      const {
        policy_id,
        premium_rate,
        total_price,
        order_detail_id,
        policy_type_id,
        ...restData
      } = purchaseDetails.details;
      const reduxData = JSON.stringify(restData);

      if (formikData !== reduxData) {
        // Lock current tab if changes are made
        dispatch(setLockedTab(1));
        return;
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1));
    }
  }, [formik.values]);

  useEffect(() => {
    getCompanySetup();
  }, []);

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <PersonalDetailsComponent formik={formik} />
      <InsuranceDetails companySetup={companySetup} formik={formik} />
      <BeneficiaryDetails formik={formik} />
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          disabled={isLoading}
          loading={isLoading}
          link={""}
          onClick={formik.handleSubmit}
          label="Save and continue"
        />
      </div>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  renewPolicyData: state.auth.renewPolicyData,
});

const mapDispatchProps = {};

export default connect(mapStateToProps, mapDispatchProps)(PersonalDetails);
