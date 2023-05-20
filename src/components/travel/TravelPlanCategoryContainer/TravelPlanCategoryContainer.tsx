/* eslint-disable react-hooks/exhaustive-deps */
import SignInUpButton from "../../SignInUpButton/SignInUpButton";
import styles from "./travelPlanCategoryContainer.module.scss";
import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Api from "src/lib/api";
import { setInsuranceDetails } from "src/lib/redux/auth/action";
import { DropDownStyles, DropDownStylesGray } from "src/lib/utils";
import * as Yup from "yup";

interface ProductPlanCategoryContainerProps {
  plans: {
    value: object;
    setValue: any;
  };
  insurancePlansState: {
    insurancePlansForm: any;
    setInsurancePlansForm: any;
  };
  ppCompareData: any;
  setPPCompareData: Function;
  setValidateForm: Function;
}

const getYearOptions = () => {
  let currentMonth = new Date().getMonth();
  let maxYear = new Date().getFullYear();
  maxYear += currentMonth > 5 ? 1 : 0;
  let years = [];
  while (maxYear >= 1980) {
    years.unshift({
      option: maxYear.toString(),
      id: maxYear,
    });
    maxYear--;
  }
  return years;
};

const TravelPlanCategoryContainer = ({
  plans,
  insurancePlansState,
  ppCompareData,
  setPPCompareData,
  setValidateForm,
}: ProductPlanCategoryContainerProps) => {
  const [vehicles, setVehicles] = useState([]);
  const [models, setModels] = useState([]);
  const [date, setDate] = useState<Date>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { buy_now, ...insuranceData } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState;
  const yearOptions = getYearOptions();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const sortOrdertemp = insurancePlansForm?.sortOrder
      ? `?${insurancePlansForm?.sortOrder}`
      : "";
    const { sortOrder, ...restData } = insurancePlansForm;
    setDisableButton(true);
    const res = await Api("POST", `policy/filters${sortOrdertemp}`, {
      ...restData,
      year: insurancePlansForm.year.toString(),
    });
    if (res?.data) {
      plans.setValue({ value: insurancePlansForm.value, data: res.data });
      if (ppCompareData.length) {
        const tempData =
          ppCompareData.map(
            (each: any) =>
              res.data.filter((val: any) => val?.id === each?.id)[0]
          ) || [];
        setPPCompareData(tempData.filter((each: any) => each));
      }
    }
    setDisableButton(false);
    dispatch(setInsuranceDetails(insurancePlansForm));
  };

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      destination: "",
      model_id: "",
      year: "",
      value: "",
      company_ids: [],
      policy_type_ids: [],
      addon_ids: [],
      sortOrder: "",
    },
    validationSchema: Yup.object({
      destination: Yup.string().required("Destination is required"),
      model_id: Yup.string().required("Model is required"),
      year: Yup.string()
        .matches(/^(19|20)\d{2}$/, "Year must be like 19xx")
        .required("Year is Required")
        .test(
          "Check when entering one year if year is greater than next year",
          `Year cannot be greater than ${new Date().getFullYear() + 1}`,
          (value: any) =>
            parseInt(value) > new Date().getFullYear() + 1 ? false : true
        )
        .test(
          "Check when entering one year if first year is less than 1980",
          "First year cannot be less than 1980",
          (value: any) => (parseInt(value) < 1980 ? false : true)
        ),
      value: Yup.number()
        .min(1, "Positive Value")
        .typeError("Value can only be number")
        .test("is-decimal", "Decimal value is not allowed", (value: any) =>
          /^[^.]*$/.test(value)
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleSearch();
    },
  });

  useEffect(() => {
    formik.setValues({ ...insurancePlansForm });
  }, [insurancePlansForm]);

  const getOptions = (arr) =>
    arr.map((item) => ({ option: item.name, id: item.id }));

  const destinationDemo = [
    {
      id: 12,
      name: "Changan",
      status: true,
    },
    {
      id: 13,
      name: "Honda",
      status: true,
    },
    {
      id: 14,
      name: "Toyota",
      status: true,
    },
  ];

  const getDestinations = async () => {
    setVehicles(getOptions(destinationDemo));
  };

  const getModels = () => {
    Api("GET", `model_make/${insurancePlansForm.make_id}?status=1`).then(
      (res) => {
        if (res.success) setModels(getOptions(res.data));
      }
    );
  };
  //

  useEffect(() => {
    getModels();
  }, []);

  const onLoad = () => {
    getDestinations();
  };

  useEffect(() => {
    onLoad();
    setInsurancePlansForm(insuranceData);
  }, []);

  const onChangeDate = (value: any) => {
    setDate(value);
  };

  const testtest = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Container>
      <div
        className={` ${styles["wrapper"]}`}
        style={{ borderColor: "green" }}
        onBlur={formik.handleBlur}
      >
        <div
          style={{
            flexDirection: "column",
            width: "16%",
            position: "relative",
          }}
        >
          <Select
            styles={DropDownStyles}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="destination"
            placeholder="Select Destination"
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        </div>

        <div
          style={{
            flexDirection: "column",
            width: "16%",
            position: "relative",
          }}
        >
          <Select
            styles={DropDownStyles}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="destination"
            placeholder="Single"
            options={testtest}
            onChange={(value) => console.log(value)}
          />
        </div>
        <div
          style={{
            flexDirection: "column",
            width: "16%",
            position: "relative",
          }}
        >
          <Select
            styles={DropDownStyles}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="destination"
            placeholder="Family"
            options={testtest}
            onChange={(value) => console.log(value)}
          />
        </div>

        <div
          style={{
            flexDirection: "column",
            width: "16%",
            position: "relative",
          }}
        >
          <Calendar
            className={`w-100 ${styles["custom-data-range-picker-topbar"]}`}
            placeholder="Select Date Range"
            id="range"
            value={date}
            onChange={(e) => onChangeDate(e.value)}
            selectionMode="range"
            readOnlyInput
          />
        </div>

        <div className={styles["btnContainer"]}>
          <SignInUpButton
            btnTxt="Search"
            link=""
            onClick={disableButton ? () => {} : formik.handleSubmit}
          />
        </div>

        <div
          style={{
            flexDirection: "column",
            width: "16%",
            position: "relative",
          }}
        >
          <Select
            styles={DropDownStylesGray}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="order"
            placeholder="Sort by"
            options={testtest}
            onChange={(value) => console.log(value)}
          />
        </div>
      </div>
    </Container>
  );
};

export default TravelPlanCategoryContainer;
