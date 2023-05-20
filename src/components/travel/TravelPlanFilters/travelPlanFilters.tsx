/* eslint-disable react-hooks/exhaustive-deps */
import BtnMobile from "../../BtnMobile/BtnMobile";
import SignInUpButton from "../../SignInUpButton/SignInUpButton";
import styles from "./travelPlanFilters.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Slider from "react-rangeslider";
import { useDispatch, useSelector } from "react-redux";
import Api from "src/lib/api";
import { setInsuranceDetails } from "src/lib/redux/auth/action";
import dropDownIconRed from "~public/assets/dropDownIconRed.png";
import formRadioChecked from "~public/assets/formRadioChecked.png";
import formRadioUnchecked from "~public/assets/formRadioUnchecked.png";
import iGrey from "~public/assets/iGrey.png";
import iRed from "~public/assets/iRed.png";
import uparrow from "~public/assets/uparrow.png";

const FilterItems = ({
  data,
  insurancePlansState,
  field,
}: {
  data: {
    name: string;
    description?: string;
  };
  insurancePlansState: any;
  field: any;
}) => {
  const [isHovering, setIsHovered] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [showItxt, setShowItxt] = useState("");
  const [showPolicyInfo, setShowPolicyInfo] = useState(false);

  const filterTxt = data?.name;

  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState;

  const getImage = () => {
    if (showItxt) return iRed;
    if (isHovering) return iRed;
    return iGrey;
  };

  const handleSelect = () => {
    const index = insurancePlansForm[field].findIndex(
      (item) => item == data.id
    );
    if (index > -1) {
      insurancePlansForm[field].splice(index, 1);
    } else {
      insurancePlansForm[field].push(data.id);
    }

    setInsurancePlansForm({ ...insurancePlansForm });
  };

  const handleClick = () => {
    setIsHovered(true);
    setShowPolicyInfo(true);
    showPolicyInfo = true;
  };
  const hoverGone = () => {
    setIsHovered(false);
    setShowPolicyInfo(false);
    showPolicyInfo = false;
  };
  // if (data?.status)
  return (
    data?.status && (
      <div
        // style={{ border: '1px solid black' }}
        className={`d-flex align-items-center justify-content ${styles["filterItemContainer"]}`}
      >
        <div onClick={handleSelect} className={styles["imgContainer"]}>
          <Image
            alt=""
            src={
              insurancePlansForm[field]?.includes(data?.id)
                ? formRadioChecked
                : formRadioUnchecked
            }
          />
        </div>
        <p onClick={handleSelect} className={styles["filterTxt"]}>
          {filterTxt}
        </p>

        {data?.description && (
          <div
            onMouseLeave={() => hoverGone()}
            onMouseEnter={() => setIsHovered(true)}
            onClick={() => handleClick()}
            className={`${styles["iImgContainer"]}`}
          >
            <Image alt="" src={getImage()} />

            {showPolicyInfo && data?.description && (
              <div className={styles["infoWrapper"]}>
                <div className={styles["infoContainer"]}>
                  <p className={styles["infoTxt"]}>{data?.description}</p>
                </div>
              </div>
            )}
          </div>
        )}
        {showItxt === filterTxt && (
          <div className={styles["infoWrapper"]}>
            <div className={styles["infoContainer"]}>
              <p className={styles["infoTxt"]}>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

// type ProductPlanFiltersProps ={
//   filterData: {
//     heading: string
//     insurances: {
//       name: string
//     }[]
//   }
//   insuranceTypeData: {
//     heading: string
//     types: {
//       name: string
//     }[]
//   }
//   addOnsData: {
//     types: {
//       name: string
//     }[]
//   }
// }
const TravelPlanFilters = ({
  plans,
  insurancePlansState,
  ppCompareData,
  setPPCompareData,
  setShowMobileFilter,
  validateForm,
  filterData,
}: {
  plans: any;
  insurancePlansState: any;
  ppCompareData: any[];
  setPPCompareData: Function;
  setShowMobileFilter?: Function;
  validateForm: any;
  filterData: any;
}) => {
  const [insurances, setAllInsurance] = useState([]);
  const [policyType, setPolicyType] = useState([]);
  const [addOns, setAllAddOns] = useState([]);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { buy_now, ...insuranceData } = useSelector(
    (state) => state?.auth?.planDetails
  );
  const planDetails = useSelector((state) => state?.auth?.planDetails);

  const dispatch = useDispatch();

  const getAllInsuranceCompanies = async () => {
    const result = await Api("Get", "/company_setup");
    if (result.data) {
      setAllInsurance(result.data);
    }
  };
  const getAllPolicyTypes = async () => {
    const result = await Api("Get", "/policy_type");
    if (result.data) {
      setPolicyType(result.data);
    }
  };
  const getAllAddOns = async () => {
    const result = await Api("Get", "/addons");
    if (result.data) {
      setAllAddOns(result.data);
    }
  };
  const onLoad = () => {
    getAllInsuranceCompanies();
    getAllPolicyTypes();
    getAllAddOns();
  };
  useEffect(() => {
    onLoad();
    setInsurancePlansForm(insuranceData);
  }, []);

  const { insurancePlansForm, setInsurancePlansForm } = insurancePlansState;

  const getFilteredPlans = async () => {
    validateForm.validateForm();
    if (Object.keys(validateForm.errors).length) return;
    const { sortOrder, ...restData } = insurancePlansForm;
    setDisableButton(true);
    const res = await Api(
      "POST",
      `policy/filters?${insurancePlansForm?.sortOrder}`,
      {
        ...restData,
        year: insurancePlansForm.year.toString(),
      }
    );
    if (res?.data) {
      plans.setValue({ value: insurancePlansForm.value, data: res.data });
      if (ppCompareData.length) {
        const tempData =
          ppCompareData.map(
            (each) => res.data.filter((val) => val?.id === each?.id)[0]
          ) || [];
        setPPCompareData(tempData.filter((each) => each));
      }
    }
    setDisableButton(false);
    dispatch(setInsuranceDetails(insurancePlansForm));
  };

  const [companyCount, setCompanyCount] = useState(3);
  const [companyLength, setCompanyLength] = useState(3);
  const [policyCount, setPolicyCount] = useState(3);
  const [policyLength, setPolicyLength] = useState(3);
  const [addOnCount, setAddOnCount] = useState(3);
  const [addOnLength, setAddOnLength] = useState(3);

  useEffect(() => {
    let count = 0;
    insurances.map((each: any) => {
      if (each?.status) count += 1;
    });
    setCompanyLength(count);
  }, [insurances]);

  useEffect(() => {
    let count = 0;
    policyType.map((each: any) => {
      if (each?.status) count += 1;
    });
    setPolicyLength(count);
  }, [policyType]);

  useEffect(() => {
    let count = 0;
    addOns.map((each: any) => {
      if (each?.status) count += 1;
    });
    setAddOnLength(count);
  }, [addOns]);

  return (
    <>
      <PerfectScrollbar
        style={{
          width: "100%",
          overflowY: "auto",
          paddingRight: "15px",
        }}
        options={{
          wheelPropagation: false,
        }}
      >
        <div
          className={`position-relative d-flex flex-column justify-content-between ${
            ppCompareData.length > 0
              ? styles["wrapperWithCompareOn"]
              : styles["wrapper"]
          }`}
        >
          <div className={`w-100 ${styles["scrolldiv"]}`}>
            <div className={` ${styles["scrolldiv2"]}`}>
              <p className={` ${styles["heading"]}`}>Takaful Companies</p>

              <div className={`w-100 `}>
                <div className={styles["separator"]} />
                {insurances?.map((each, index) => {
                  // if (each?.status) setCompanyLength(companyLength + 1)
                  if (index < companyCount)
                    return (
                      <FilterItems
                        field={"company_ids"}
                        insurancePlansState={insurancePlansState}
                        data={each}
                        key={index}
                      />
                    );
                })}

                <div className={styles["separator"]} />
                <div className={styles["mobileSeparator"]} />
              </div>

              <p className={` ${styles["heading"]}`}>Plan Category</p>
              <div className={`w-100 ${styles[""]}`}>
                <div className={styles["separator"]} />
                {policyType.map((each, index) => {
                  if (index < policyCount)
                    return (
                      <FilterItems
                        field={"policy_type_ids"}
                        insurancePlansState={insurancePlansState}
                        key={index}
                        data={each}
                      />
                    );
                })}
                {policyLength > 3 && (
                  <div
                    onClick={() => {
                      if (policyCount === 3) setPolicyCount(addOns.length + 1);
                      else setPolicyCount(3);
                    }}
                    className={`w-100 my-2 d-flex align-items-center ${styles["cursorPointer"]}`}
                  >
                    <p className={styles["moreDetailsTxt"]}>
                      {policyCount === 3 ? "See more" : "See less"}
                    </p>
                    <div className={`mt-1 mx-2 ${styles["dropImgContainer"]}`}>
                      <Image
                        alt=""
                        src={policyCount !== 3 ? uparrow : dropDownIconRed}
                      />
                    </div>
                  </div>
                )}
                <div className={styles["separator"]} />
                <div className={styles["mobileSeparator"]} />
              </div>
              <p className={`${styles["heading"]}`}>Coverage Type</p>
              <div className={`w-100 ${styles[""]}`}>
                <div className={styles["separator"]} />
                {policyType.map((each, index) => {
                  if (index < policyCount)
                    return (
                      <FilterItems
                        field={"policy_type_ids"}
                        insurancePlansState={insurancePlansState}
                        key={index}
                        data={each}
                      />
                    );
                })}
                {policyLength > 3 && (
                  <div
                    onClick={() => {
                      if (policyCount === 3) setPolicyCount(addOns.length + 1);
                      else setPolicyCount(3);
                    }}
                    className={`w-100 my-2 d-flex align-items-center ${styles["cursorPointer"]}`}
                  >
                    <p className={styles["moreDetailsTxt"]}>
                      {policyCount === 3 ? "See more" : "See less"}
                    </p>
                    <div className={`mt-1 mx-2 ${styles["dropImgContainer"]}`}>
                      <Image
                        alt=""
                        src={policyCount !== 3 ? uparrow : dropDownIconRed}
                      />
                    </div>
                  </div>
                )}
                <div className={styles["separator"]} />
                <div className={styles["mobileSeparator"]} />
              </div>

              <p className={` ${styles["mainHeading"]}`}>Health Cover</p>

              <div className={`w-100 ${styles[""]}`}>
                
              </div>
            </div>
          </div>
          {/* <div className={`fixed-bottom position-sticky ${styles['btnWeb']}`}> */}
          <div className={` ${styles["btnWeb"]}`}>
            <SignInUpButton
              btnTxt="Update Prices"
              link=""
              onClick={disableButton ? () => {} : getFilteredPlans}
            />
          </div>
          <div
            className={styles["btnMob"]}
            onClick={
              disableButton
                ? () => {}
                : () => {
                    getFilteredPlans();
                    setShowMobileFilter(false);
                  }
            }
          >
            <BtnMobile btnTxt="Update Prices" />
          </div>
        </div>
      </PerfectScrollbar>
    </>
  );
};
export default TravelPlanFilters;
