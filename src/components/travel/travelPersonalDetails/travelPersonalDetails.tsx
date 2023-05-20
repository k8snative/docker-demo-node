import styles from "./travelPersonalDetails.module.scss";
import { useFormik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Api from "src/lib/api";
import {
  setAllowedTab,
  setLockedTab,
  setPersonalDetails,
  updatePersonalDetails,
} from "src/lib/redux/auth/action";
import * as Yup from "yup";
import Dropdown from "~components/Dropdown/Dropdown";
import GradientBtn from "~components/GradientBtn/GradientBtn";
import PersonalDetailsDDInput from "~components/PersonalDetailsDDInput/PersonalDetailsDDInput";
import RadioButton from "~components/RadioButton/RadioButton";

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
  { option: "Doctor" },
  { option: "Engineer" },
  { option: "Shopkeeper" },
];
const income = [
  { option: "Earned Income." },
  { option: "Profit Income" },
  { option: "Interest Income" },
];

const Companyname = [
  { option: "Jubilee Life Insurance" },
  { option: "EFU Life Insurance" },
  { option: "State Life Insurance Corporation of Pakistan" },
];
const Relation = [
  { option: "Mother" },
  { option: "Father" },
  { option: "Sister" },
  { option: "Brother" },
  { option: "Husband" },
  { option: "Wife" },
];

const PersonalDetailsComponent = ({ formik }) => {
  const [showDiv, setShowDiv] = useState("");
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    const fetchNationalityData = async () => {
      const fetchedNationalities = await Api("GET", "/nationality");
      setNationalities(
        fetchedNationalities.data.map((item: any) => {
          return { id: item.id, option: item.nationality };
        })
      );
    };
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
              setShowDiv={() => {}}
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
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
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
            />
          </Col>
          <Col lg={5}>
            <PersonalDetailsDDInput
              name="contact"
              placeholder="Phone Number*"
              type="number"
              options={phoneOptions}
              customDropDown={false}
              showDiv={showDiv}
              setShowDiv={setShowDiv}
              required={true}
              error={formik.touched.contact && formik.errors.contact}
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
              initialDropdownValue={formik.values.phone_code}
              setDropdownValueIn={"phone_code"}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
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
              formik={formik}
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4}>
            <Dropdown
              name="place_of_birth"
              label="Place of Birth*"
              options={placeOptions}
              error={
                formik.touched.place_of_birth && formik.errors.place_of_birth
              }
              value={formik.values.place_of_birth}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="father_name"
              placeholder="Fathers name / Spouse name"
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
              placeholder="Mother’s Maiden Name*"
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
            <Dropdown
              name="nationality_id"
              label="Nationality*"
              options={nationalities}
              error={
                formik.touched.nationality_id && formik.errors.nationality_id
              }
              value={formik.values.nationality_id}
              onBlur={formik.handleBlur}
              formik={formik}
              type={"object"}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>

        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="passport_number"
              placeholder="Passport Number*"
              type="text"
              options={""}
              required={false}
              setShowDiv={() => {}}
              error={
                formik.touched.passport_number && formik.errors.passport_number
              }
              value={formik.values.passport_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="passport_issue_date"
              placeholder="Passport Issue Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.passport_issue_date &&
                formik.errors.passport_issue_date
              }
              value={formik.values.passport_issue_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="passport_expiry_date"
              placeholder="Passport Expiry Date*"
              type="date"
              calendar={true}
              options={""}
              required={true}
              setShowDiv={() => {}}
              error={
                formik.touched.passport_expiry_date &&
                formik.errors.passport_expiry_date
              }
              value={formik.values.passport_expiry_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>

        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <Dropdown
              name="occupation"
              label="Occupation"
              options={Occupation}
              error={formik.touched.occupation && formik.errors.occupation}
              value={formik.values.occupation}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <Dropdown
              name="source_of_income"
              label="Source Of Income*"
              options={income}
              error={
                formik.touched.source_of_income &&
                formik.errors.source_of_income
              }
              value={formik.values.source_of_income}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>

        <Row className={` ${styles["txtFieldsRow"]}`}>
          <Col
            lg={12}
            className={`d-flex flex-direction-row  ${styles["incometax"]}`}
          >
            <p className={`m-0 ${styles["incomeheading"]}`}>
              Are your travel dates confirmed?
              <span className={` ${styles["incomeheadingred"]}`}>*</span>
            </p>
            <div
              className={`d-flex flex-direction-row mt-1  ${styles["radiobtn"]} `}
            >
              <RadioButton
                isChecked={formik.values.is_confirm === true}
                handleChange={() => {
                  formik?.setFieldValue("is_confirm", true);
                }}
                label="Yes"
              />
              <RadioButton
                isChecked={formik.values.is_confirm === false}
                handleChange={() => {
                  formik?.setFieldValue("is_confirm", false);
                }}
                label="No"
              />
            </div>
          </Col>
        </Row>

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
                Includes family member or a close associate of any Public
                Figure/ Politically Exposed Person
                <span className={` ${styles["incomeheadingred"]}`}>*</span>
              </p>
            </div>
            <div
              className={`d-flex flex-direction-row mt-1 ${styles["radiobtn2"]}`}
            >
              <RadioButton
                isChecked={formik.values.is_government_employee === true}
                handleChange={() => {
                  formik?.setFieldValue("is_government_employee", true);
                }}
                label="Yes"
              />
              <RadioButton
                isChecked={formik.values.is_government_employee === false}
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
              International Organization etc.
            </p>
          </Col>
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
          <Col lg={5}>
            <PersonalDetailsDDInput
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
              setDropdownValueIn={"phone_code"}
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
          <Col lg={4}>
            <PersonalDetailsDDInput
              name="father_name"
              placeholder="Fathers name / Spouse name"
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
              placeholder="Mother’s Maiden Name*"
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
              placeholder="Permanent Address (As per CNIC)*"
              type="text"
              options={phoneOptions}
              setShowDiv={() => {}}
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
            />
          </Col>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <Dropdown
              name="place_of_birth"
              label="Place of Birth*"
              options={placeOptions}
              error={
                formik.touched.place_of_birth && formik.errors.place_of_birth
              }
              value={formik.values.place_of_birth}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>

          <Col lg={4}>
            <Dropdown
              name="nationality_id"
              label="Nationality*"
              options={nationalities}
              error={
                formik.touched.nationality_id && formik.errors.nationality_id
              }
              value={formik.values.nationality_id}
              onBlur={formik.handleBlur}
              formik={formik}
              type={"object"}
            />
          </Col>
        </Row>

        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col xs={6}>
            {/* ??? */}
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>
        <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
          <Col lg={4}>
            <Dropdown
              name="occupation"
              label="Occupation"
              options={Occupation}
              error={formik.touched.occupation && formik.errors.occupation}
              value={formik.values.occupation}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
          <Col lg={4}>
            <Dropdown
              name="source_of_income"
              label="Source Of Income*"
              options={income}
              error={
                formik.touched.source_of_income &&
                formik.errors.source_of_income
              }
              value={formik.values.source_of_income}
              onBlur={formik.handleBlur}
              formik={formik}
            />
          </Col>
        </Row>
      </MediaQuery>
    </div>
  );
};

const InsuranceDetails = ({ formik }) => {
  return (
    <Container className={`${styles["insuranceDetailsContainer"]}`}>
      <p className={` ${styles["insuranceDetailsHeading"]}`}>
        Previous Insurance Details{" "}
        <span className={`m-0 ${styles["insuranceDetailsHeadinggrey"]}`}>
          {" "}
          (If Any)
        </span>
      </p>
      <Row className={`gy-3 ${styles["txtFieldsRow"]}`}>
        <Col lg={8}>
          <Dropdown
            name="previous_insurance_company_name"
            label="Insurance Company Name"
            options={Companyname}
            error={
              formik.touched.previous_insurance_company_name &&
              formik.errors.previous_insurance_company_name
            }
            value={formik.values.previous_insurance_company_name}
            onBlur={formik.handleBlur}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
          />
        </Col>
      </Row>
    </Container>
  );
};

const KinDetails = ({ formik }) => {
  const [showDiv, setShowDiv] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });

  return (
    <div className={`mt-4`}>
      <p className={` ${styles["insuranceDetailsHeading"]}`}>Nex of Kin</p>
      <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="kin_name"
            placeholder="Name*"
            type="text"
            calendar={false}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={formik.touched.kin_name && formik.errors.kin_name}
            value={formik.values.kin_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>
        <Col>
          <PersonalDetailsDDInput
            name="kin_contact"
            placeholder="Phone Number*"
            type="number"
            options={phoneOptions}
            customDropDown={false}
            showDiv={showDiv}
            setShowDiv={setShowDiv}
            required={true}
            error={formik.touched.kin_contact && formik.errors.kin_contact}
            value={formik.values.kin_contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
            initialDropdownValue={formik.values.phone_code}
            setDropdownValueIn={"phone_code"}
          />
        </Col>
        <Col lg={4}>
          <Dropdown
            name="kin_relation"
            label="Relation*"
            options={Relation}
            error={formik.touched.kin_relation && formik.errors.kin_relation}
            value={formik.values.kin_relation}
            onBlur={formik.handleBlur}
            formik={formik}
          />
        </Col>
      </Row>

      <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="kin_cnic_number"
            placeholder="CNIC Number*"
            type="text"
            calendar={false}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={
              formik.touched.kin_cnic_number && formik.errors.kin_cnic_number
            }
            value={formik.values.kin_cnic_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>

        <Col lg={4}>
          <PersonalDetailsDDInput
            name="kin_address"
            placeholder="Address (As per CNIC)*"
            type="text"
            options={phoneOptions}
            setShowDiv={() => {}}
            required={true}
            error={formik.touched.kin_address && formik.errors.kin_address}
            value={formik.values.kin_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>
      </Row>
    </div>
  );
};

const FamilyDetails = ({ formik }) => {
  const [showDiv, setShowDiv] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 430px)",
  });

  return (
    <div className={`mt-4`}>
      <p className={` ${styles["insuranceDetailsHeading"]}`}>Family Details</p>
      <p className={` ${styles["incomeheading"]}`}>Family Details</p>
      <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="f_name"
            placeholder="Name*"
            type="text"
            calendar={false}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={formik.touched.f_name && formik.errors.f_name}
            value={formik.values.f_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="f_date_of_birth"
            placeholder="Date of birth*"
            type="date"
            calendar={true}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={
              formik.touched.f_date_of_birth && formik.errors.f_date_of_birth
            }
            value={formik.values.f_date_of_birth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
          />
        </Col>
        <Col lg={4}>
          <Dropdown
            name="f_relation"
            label="Relation*"
            options={Relation}
            error={formik.touched.f_relation && formik.errors.f_relation}
            value={formik.values.f_relation}
            onBlur={formik.handleBlur}
            formik={formik}
          />
        </Col>
      </Row>

      <Row className={`gy-2 ${styles["txtFieldsRow"]}`}>
        <Col lg={4}>
          <PersonalDetailsDDInput
            name="f_passport_number"
            placeholder="Passport Number*"
            type="text"
            calendar={false}
            options={""}
            required={true}
            setShowDiv={() => {}}
            error={
              formik.touched.f_passport_number &&
              formik.errors.f_passport_number
            }
            value={formik.values.f_passport_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Col>
      </Row>
    </div>
  );
};

const TravelPersonalDetails = ({
  currentStep,
  updateState,
}: {
  currentStep: number;
  updateState: Function;
}) => {
  const data = useSelector((state) => state?.auth?.data);
  const purchaseDetails = useSelector((state) => state?.auth?.purchaseDetails);
  const allowedTabIndex = useSelector((state) => state?.auth?.allowedTabIndex);
  const {
    policy_id,
    annual_contribution,
    insurance_rate,
    policy_type_id,
    policy_addons,
  } = useSelector((state) => state?.auth?.planDetails?.buy_now);

  const dispatch = useDispatch();

  const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PhoneNumberRegex = /^\d{3}-{0,1}\d{7}$|^\d{10}$|^\d{4}-\d{7}$/;

  useEffect(() => {
    if (purchaseDetails.details.order_detail_id !== 0) {
      const {
        policy_id,
        premium_rate,
        total_price,
        order_detail_id,
        policy_type_id,
        ...restData
      } = purchaseDetails.details;
      formik.setValues({ ...restData });
    } else {
      formik.setValues({
        ...formik.values,
        customer_name: data?.user?.first_name + " " + data?.user?.last_name,
        email: data?.user?.email,
        contact: data?.user?.contact.slice(1),
      });
    }
  }, [purchaseDetails, data]);

  const initialValues = {
    customer_name: "",
    permanent_address: "",
    current_address: "",
    contact: "",
    email: "",
    date_of_birth: "",
    place_of_birth: "",
    father_name: "",
    mother_name: "",
    nationality_id: "",
    cnic_number: "",
    cnic_issue_date: "",
    cnic_expiry_date: "",
    passport_number: "",
    passport_issue_date: "",
    passport_expiry_date: "",
    occupation: "",
    source_of_income: "",
    previous_insurance_company_name: "",
    previous_date_of_expiry: "",
    f_name: "",
    f_contact: "",
    f_relation: "",
    f_passport_number: "",
    f_address: "",
    f_date_of_birth: "",
    is_filer: false,
    is_confirm: false,
    is_government_employee: false,
    phone_code: "+92",
    f_contact_phone_code: "+92",
    honorifics: "Mr.",
    kin_name: "",
    kin_contact: "",
    kin_relation: "",
    kin_cnic_number: "",
    kin_asddress: "",
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
      current_address: Yup.string().required("Current address is required."),
      contact: Yup.string()
        .matches(PhoneNumberRegex, "Invalid Phone Number.")
        .required("Phone number is required."),
      email: Yup.string()
        .matches(EmailRegex, "Invalid Email.")
        .required("Email address is required."),
      date_of_birth: Yup.string().required("Date of birth is required."),
      place_of_birth: Yup.string().required("Place of birth is required."),
      father_name: Yup.string(),
      mother_name: Yup.string().required("Mothers name is required."),
      nationality_id: Yup.number().required("Nationality is required"),
      cnic_number: Yup.string().required("CNIC / Passport number is required."),
      cnic_issue_date: Yup.date().required(
        "CNIC / Passport issue date is required."
      ),
      cnic_expiry_date: Yup.date()
        .min(
          Yup.ref("cnic_issue_date"),
          "Expiry date cannot be before issue date"
        )
        .test({
          name: "isIssueAndExpirySame",
          exclusive: false,
          params: {},
          message: "Expiry date cannot be same as issue date",
          test: function (value) {
            const issueDate = new Date(this.parent.cnic_issue_date);
            const expiryDate = new Date(value);
            return !(issueDate.getTime() === expiryDate.getTime());
          },
        })
        .required("CNIC / Passport expiry date is required."),

      passport_number: Yup.string().required("Passport number is required."),
      passport_issue_date: Yup.date().required(
        "Passport issue date is required."
      ),
      passport_expiry_date: Yup.date()
        .min(
          Yup.ref("passport_issue_date"),
          "Expiry date cannot be before issue date"
        )
        .test({
          name: "isIssueAndExpirySame",
          exclusive: false,
          params: {},
          message: "Expiry date cannot be same as issue date",
          test: function (value) {
            const issueDate = new Date(this.parent.cnic_issue_date);
            const expiryDate = new Date(value);
            return !(issueDate.getTime() === expiryDate.getTime());
          },
        })
        .required("Passport expiry date is required."),
      occupation: Yup.string(),
      source_of_income: Yup.string().required("Source of income is required."),
      previous_insurance_company_name: Yup.string(),
      previous_date_of_expiry: Yup.string(),
      f_date_of_birth: Yup.string().required("Date of birth is required"),
      f_name: Yup.string().required("Family name is required."),
      f_contact: Yup.string()
        .matches(PhoneNumberRegex, "Invalid Phone Number.")
        .required("Family phone number is required."),
      f_relation: Yup.string().required("Family relation is required."),
      f_passport_number: Yup.string().required("Passport number is required."),
      f_address: Yup.string(),
      is_filer: Yup.boolean(),
      is_confirm: Yup.boolean(),
      is_government_employee: Yup.boolean(),
      phone_code: Yup.string(),
      f_contact_phone_code: Yup.string(),
      honorifics: Yup.string(),
      kin_name: Yup.string().required("Name is required."),
      kin_contact: Yup.string().required("Contact number is required."),
      kin_relation: Yup.string().required("Relation is required."),
      kin_cnic_number: Yup.string().required("CNIC number is required."),
      kin_address: Yup.string().required("Address is required."),
    }),
    onSubmit: async (values) => {
      updateState(currentStep);
      if (purchaseDetails.details.order_detail_id === 0) {
        const postApiPayload = {
          customer_id: data.user.id,
          payment_status: "pending",
          order_status: "New Request TB",
          ...(policy_addons?.length !== 0 && { addons: policy_addons }),
          details: {
            policy_id: parseInt(policy_id),
            policy_type_id: policy_type_id,
            premium_rate: insurance_rate,
            total_price: annual_contribution,
            customer_name: values.honorifics + " " + values.customer_name,
            permanent_address: values.permanent_address,
            current_address: values.current_address,
            contact: values.phone_code + values.contact,
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
            passport_number: values.passport_number,
            passport_issue_date: values.passport_issue_date,
            passport_expiry_date: values.passport_expiry_date,
            source_of_income: values.source_of_income,
            ...(values.previous_insurance_company_name?.length !== 0 && {
              previous_insurance_company_name:
                values.previous_insurance_company_name,
            }),
            ...(values.previous_date_of_expiry?.length !== 0 && {
              previous_date_of_expiry: values.previous_date_of_expiry,
            }),
            f_name: values.f_name,
            f_contact: values.f_contact_phone_code + values.f_contact,
            f_relation: values.f_relation,
            f_date_of_birth: values.f_date_of_birth,
            f_passport_number: values.f_passport_number,
            ...(values.f_address?.length !== 0 && {
              f_address: values.f_address,
            }),
            is_filer: values.is_filer,
            is_confirm: values.is_confirm,
            is_government_employee: values.is_government_employee,
            kin_name: values.kin_name,
            kin_contact: values.kin_contact,
            kin_relation: values.kin_relation,
            kin_cnic_number: values.kin_cnic_number,
            kin_address: values.kin_address,
          },
          created_by: data.user.id,
          updated_by: data.user.id,
        };
        Api("POST", `order/add`, postApiPayload)
          .then((res) => {
            if (res?.success) {
              const postReduxPayload = {
                payment_status: "pending",
                order_status: "New Request TB",
                ...(policy_addons?.length !== 0 && { addons: policy_addons }),
                order_id: res?.data?.OrderDetail?.OrderId,
                details: {
                  order_detail_id: res?.data?.OrderDetail.id,
                  policy_id: parseInt(policy_id),
                  policy_type_id: policy_type_id,
                  premium_rate: insurance_rate,
                  total_price: annual_contribution,
                  customer_name: values.customer_name,
                  permanent_address: values.permanent_address,
                  current_address: values.current_address,
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
                  passport_number: values.passport_number,
                  passport_issue_date: values.passport_issue_date,
                  passport_expiry_date: values.passport_expiry_date,
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
                  f_name: values.f_name,
                  f_contact: values.f_contact,
                  f_relation: values.f_relation,
                  f_date_of_birth: values.f_date_of_birth,
                  f_passport_number: values.f_passport_number,
                  ...(values.f_address?.length !== 0 && {
                    f_address: values.f_address,
                  }),
                  is_filer: values.is_filer,
                  is_confirm: values.is_confirm,
                  is_government_employee: values.is_government_employee,
                  phone_code: values.phone_code,
                  f_contact_phone_code: values.f_contact_phone_code,
                  honorifics: values.honorifics,
                  kin_name: values.kin_name,
                  kin_contact: values.kin_contact,
                  kin_relation: values.kin_relation,
                  kin_cnic_number: values.kin_cnic_number,
                  kin_address: values.kin_address,
                },
              };
              dispatch(setPersonalDetails(postReduxPayload));
              if (allowedTabIndex <= 1) {
                dispatch(setAllowedTab(1));
                dispatch(setLockedTab(-1));
              }
              updateState(currentStep);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        const putApiPayload = {
          order_detail_id: purchaseDetails.details.order_detail_id,
          policy_id: parseInt(policy_id),
          policy_type_id: policy_type_id,
          premium_rate: insurance_rate,
          total_price: annual_contribution,
          customer_name: values.honorifics + " " + values.customer_name,
          permanent_address: values.permanent_address,
          current_address: values.current_address,
          contact: values.phone_code + values.contact,
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
          passport_number: values.passport_number,
          passport_issue_date: values.passport_issue_date,
          passport_expiry_date: values.passport_expiry_date,
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
          f_name: values.benificiary_name,
          f_contact: values.f_contact_phone_code + values.f_contact,
          f_relation: values.f_relation,
          f_date_of_birth: values.f_date_of_birth,
          f_passport_number: values.f_passport_number,
          ...(values.f_address?.length !== 0 && {
            f_address: values.f_address,
          }),
          is_filer: values.is_filer,
          is_confirm: values.is_confirm,
          is_government_employee: values.is_government_employee,
          created_by: data.user.id,
          updated_by: data.user.id,
          kin_name: values.kin_name,
          kin_contact: values.kin_contact,
          kin_relation: values.kin_relation,
          kin_cnic_number: values.kin_cnic_number,
          kin_address: values.kin_address,
        };
        Api("PUT", `order/update/personal_details`, putApiPayload)
          .then((res) => {
            if (res?.success) {
              const putReduxPayload = {
                order_detail_id: purchaseDetails.details.order_detail_id,
                policy_id: parseInt(policy_id),
                policy_type_id: policy_type_id,
                premium_rate: insurance_rate,
                total_price: annual_contribution,
                customer_name: values.customer_name,
                permanent_address: values.permanent_address,
                current_address: values.current_address,
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
                f_name: values.f_name,
                f_contact: values.f_contact,
                f_relation: values.f_relation,
                f_date_of_birth: values.f_date_of_birth,
                f_passport_number: values.f_passport_number,
                ...(values.f_address?.length !== 0 && {
                  f_address: values.f_address,
                }),
                is_filer: values.is_filer,
                is_confirm: values.is_confirm,
                is_government_employee: values.is_government_employee,
                phone_code: values.phone_code,
                f_contact_phone_code: values.f_contact_phone_code,
                honorifics: values.honorifics,
                kin_name: values.kin_name,
                kin_contact: values.kin_contact,
                kin_relation: values.kin_relation,
                kin_cnic_number: values.kin_cnic_number,
                kin_address: values.kin_address,
              };
              dispatch(updatePersonalDetails(putReduxPayload));
              if (allowedTabIndex <= 1) {
                dispatch(setAllowedTab(1));
                dispatch(setLockedTab(-1));
              }
              updateState(currentStep);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  });

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
        dispatch(setLockedTab(0));
        return;
      }
      // If no changes then unlock current tab
      dispatch(setLockedTab(-1));
    }
  }, [formik.values]);

  return (
    <Container className={`${styles["maincontainer"]}`}>
      <PersonalDetailsComponent formik={formik} />
      <KinDetails formik={formik} />
      <FamilyDetails formik={formik} />
      <div className={`mt-3 ${styles["submitButton"]}`}>
        <GradientBtn
          link={""}
          onClick={formik.handleSubmit}
          // onClick={()=>updateState(currentStep)}
          label="Save and continue"
        />
      </div>
    </Container>
  );
};

export default TravelPersonalDetails;
