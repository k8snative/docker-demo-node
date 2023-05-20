import Header from "../../components/Header";
import SeoHead from "../../components/SeoHead";
import styles from "../../styles/Home.module.scss";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "src/lib/api";
import { setCompareDetails } from "src/lib/redux/auth/action";
import * as Yup from "yup";
import Footer from "~components/Footer/Footer";
import GetOurApp from "~components/GetOurApp/GetOurApp";
import TravelPlanCategoryContainer from "~components/travel/TravelPlanCategoryContainer/TravelPlanCategoryContainer";
import TravelPlanMainContainer from "~components/travel/TravelPlanMainContainer/TravelPlanMainContainer";
import TravelTopBanner from "~components/travel/TravelTopBanner";

const ProductPlan = () => {
  const dispatch = useDispatch();
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const {
    make_id,
    model_id,
    year,
    value,
    sortOrder,
    addon_ids,
    company_ids,
    policy_type_ids,
  } = useSelector((state) => state?.auth?.planDetails);

  const [plans, setPlans] = useState([]);
  const initialCompareData = useSelector((state) => state.auth.compareDetails);
  const [ppCompareData, setPPCompareData] = useState(initialCompareData);
  // eslint-disable-next-line @typescript-eslint/naming-convention

  useEffect(() => {
    const getPlans = async () => {
      const res = await Api("POST", `policy/filters?${sortOrder}`, {
        make_id: make_id,
        model_id: model_id,
        year: year?.toString(),
        value: value,
        addon_ids: addon_ids,
        company_ids: company_ids,
        policy_type_ids: policy_type_ids,
      });
      if (res.data) {
        setPlans({ data: res.data, value: value });
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, []);

  const [insurancePlansForm, setInsurancePlansForm] = useState({
    make_id: make_id || "",
    model_id: model_id || "",
    year: year || "",
    value: value || "",
    company_ids: [],
    policy_type_ids: [],
    addon_ids: [],
  });

  useEffect(() => {
    dispatch(setCompareDetails(ppCompareData));
  }, [ppCompareData]);

  return (
    <div className={`position-relative ${styles["container"]}`}>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: "icon",
            href: "/favIcon.png",
          },
        ]}
      />
      <Header />
      <TravelTopBanner />

      <TravelPlanCategoryContainer
        plans={{ value: plans, setValue: (data: any) => setPlans(data) }}
        insurancePlansState={{
          insurancePlansForm,
          setInsurancePlansForm: (data: any) => setInsurancePlansForm(data),
        }}
        ppCompareData={ppCompareData}
        setPPCompareData={setPPCompareData}
        // setValidateForm={validateForm}
      />

      <TravelPlanMainContainer
        plans={{ value: plans, setValue: (data: any) => setPlans(data) }}
        insurancePlansState={{
          insurancePlansForm,
          setInsurancePlansForm: (data: any) => setInsurancePlansForm(data),
        }}
        ppCompareData={ppCompareData}
        setPPCompareData={setPPCompareData}
      />

      {/* <ProductPlanCategoryContainerMobile
        plans={{ value: plans, setValue: (data: any) => setPlans(data) }}
        insurancePlansState={{ insurancePlansForm, setInsurancePlansForm: (data: any) => setInsurancePlansForm(data) }}
        ppCompareData={ppCompareData}
        setPPCompareData={setPPCompareData}
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
        previousInsurancePlansForm={structuredClone(insurancePlansForm)}
      /> */}

      <GetOurApp />
      <Footer />
    </div>
  );
};

export default ProductPlan;
