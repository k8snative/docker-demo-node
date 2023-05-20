import ProdPlanWebTabs from "../../ProdPlanWebTabs/ProdPlanWebTabs";
import SignInUpButton from "../../SignInUpButton/SignInUpButton";
import styles from "./TravelPlanCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import Api from "src/lib/api";
import {
  clearBuyNow,
  clearPurchaseInfo,
  setBuyNowData,
} from "src/lib/redux/auth/action";
import {
  calculateAmountAfterPromotion,
  calculateDiscountAmount,
} from "src/lib/utils";
import currencyFormat from "src/utils/currencyFormat";
import cross from "~public/assets/cross.png";
import dropDownIconRed from "~public/assets/dropDownIconRed.png";
import iGrey from "~public/assets/iGrey.png";
import minus from "~public/assets/minus.png";
import plus from "~public/assets/plus.png";
import tick from "~public/assets/tick.png";
import uparrow from "~public/assets/uparrow.png";

const tabData = [
  {
    name: "Coverage",
    isActive: true,
  },
  {
    name: "Depreciation Policy",
    isActive: false,
  },
  {
    name: "Cancellation Policy",
    isActive: false,
  },
  {
    name: "Claim Process",
    isActive: false,
  },
  {
    name: "Add-ons",
    isActive: false,
  },
];

const CoverageTab = ({ data, coverages }: { data: object; coverages: any }) => (
  <>
    {coverages?.map((coverage, index) => (
      <>
        <div key={coverage?.id} style={{}} className="w-100 d-flex">
          <div className={styles["eachHeadingContainer"]}>
            <b>
              <p className={styles["infoHeadingTxt"]}>{coverage?.name}</p>
            </b>
          </div>
          <div style={{}} className="d-flex flex-wrap">
            {coverage?.child_coverages?.map((child: any) => {
              const state =
                data?.CompanySetup?.CompanyCoverages.filter(
                  (x) => x?.coverage_id === child?.id
                ).length > 0;
              return (
                <div key={child.id} className={styles["eachContainer"]}>
                  <p className={styles["eachTxt"]}>{child?.name}</p>
                  {/* { child?.state = data?.CompanySetup?.CompanyCoverages.filter(x => x?.coverage_id === child?.id).length > 0} */}
                  <div
                    className={
                      styles[state ? "tabImgContainer" : "tabImgContainerCross"]
                    }
                  >
                    <Image alt="" src={state ? tick : cross} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {index !== coverages?.length - 1 && (
          <div className={styles["tabSeparator"]} />
        )}
      </>
    ))}
  </>
);

const AddOnsTab = ({ data }: { data: object }) => (
  <>
    {data?.PolicyAddons?.map((addon: any, index: number) => (
      <div
        key={index}
        className={`d-flex align-items-center justify-content-between flex-wrap ${styles["addOnsTabContainer"]}`}
      >
        <div
          className={`${styles["addOnsEachContainer"]} w-75 d-flex my-1 align-items-center justify-content-between`}
        >
          <p className={styles["eachLblTxt"]}>{addon?.Addon?.name}</p>
          {addon?.type === "percentage" ? (
            <p className={styles["eachValTxt"]}>{addon?.value}%</p>
          ) : (
            <p className={styles["eachValTxt"]}>Rs.{addon?.value}</p>
          )}
        </div>
      </div>
    ))}
  </>
);

const TabData = ({
  selectedTab,
  data,
  coverages,
}: {
  selectedTab: number;
  data: object;
  coverages: any;
}) => {
  if (selectedTab === 0)
    return (
      <div style={{}} className="w-100">
        <CoverageTab data={data} coverages={coverages} />
      </div>
    );
  if (selectedTab === 4) return <AddOnsTab data={data} />;
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <p className="m-0">{tabData[selectedTab]?.name}</p>
      <p className="m-0">No Design Available</p>
      <p className="m-0">No Data Available</p>
    </div>
  );
};

const PriceSection2 = () => {
  const [showPolicyInfo, setShowPolicyInfo] = useState(false);
  const [value, setValue] = useState();

  return (
    <div className={` ${styles["priceContainer2"]}`}>
      <div className={` ${styles[""]}`}>
        <p className={styles["lblTxt"]}>Total Contribution</p>
        <>
          <p className={styles["newRateTxtSmallCrossed"]}>
            <del>PKR 21,000</del>
          </p>
          <p className={styles["newRateTxtSmall"]}>PKR 20,000</p>
        </>
      </div>
    </div>
  );
};

const PriceSection = ({ data, insurancePlansForm }: { data: object }) => (
  <div className={` ${styles["priceContainer"]}`}>
    <div className={` ${styles["providerTopContainer"]}`} />
    <div className={` ${styles["providerBottomContainer"]}`}>
      {/* <p className={styles['lblTxt']}>Annual Contribution</p>
        <p className={styles['oldRateTxt']}>Rs. {currencyFormat(data?.oldRate.toString())}</p>
        <p className={styles['newRateTxt']}>Rs. {currencyFormat(data?.newRate.toString())}</p> */}
      <p className={styles["newRateTxtSmall"]}>
        Rs.{" "}
        {currencyFormat(data?.annual_contribution + (data?.addon_amount || 0))}
      </p>
    </div>
  </div>
);

// interface data {
//   tbPick: boolean
//   img: StaticImageData
//   name: string
//   PolicyType: object
//   insurance_rate: string
//   discountRatePercent: number
//   oldRate: number
//   newRate: number
//   totalPrice: number

//   addOns: boolean
// }

const TravelPlanCard = ({
  data,
  index,
  showCompare,
  setShowCompare,
  insurancePlansForm,
  handleCompareData,
  ppCompareData,
  user,
  allCoverages,
  hasPromotion,
}: {
  data: any;
  showCompare: boolean;
  index: number;
  setShowCompare: Function;
  insurancePlansForm: object;
  handleCompareData: Function;
  ppCompareData: any;
  user: any;
  allCoverages?: any;
  hasPromotion?: boolean;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedShowMore, setSelectedShowMore] = useState(9999);
  const [showPolicyInfo, setShowPolicyInfo] = useState(false);
  const { addon_ids } = useSelector((state) => state?.auth?.planDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const serverImgPath = `${process.env["NEXT_PUBLIC_IMAGE_ORIGIN"]}${data?.CompanySetup?.logo}`;

  const navigateToPaymentPage = () => {

    let formatedAddons: any = []
    if (addon_ids.length !== 0) {
      const selectedAddons = data?.PolicyAddons?.filter((item, index) => {
        for (let i = 0; i < addon_ids.length; i += 1) {
          if (addon_ids[i] === item.addon_id) return true
        }
      })
      formatedAddons = selectedAddons.map(item => {
        if (item.type === 'fixed') {
          return { addon_id: item.addon_id, amount: parseFloat(item.value) }
        }
        if (item.type === 'percentage') {
          return { addon_id: item.addon_id, amount: data?.annual_contribution * (parseFloat(item.value) / 100) }
        }
      })
    }
    dispatch(clearBuyNow())
    dispatch(clearPurchaseInfo())

    dispatch(
      setBuyNowData({
        policy_id: data?.id.split('/')[0],
        policy_type_id: data?.PolicyType?.id,
        annual_contribution: data?.annual_contribution + (data?.addon_amount || 0),
        insurance_rate: data?.insurance_rate,
        company_logo_url: data?.CompanySetup?.logo,
        policy_name: data?.name,
        policy_addons: formatedAddons,
        promotion_coupon_id: data?.promotion_coupon_id,
        promotion_discount_type: data?.promotion_discount_type,
        promotion_discount_value: data?.promotion_discount_value,
      }),
    );
    if (!user) {
      router.push({
        pathname: '/auth?redirect=%2Fpayment',
        query: {
          redirect: '/payment',
        },
      })
    } else {
        router.push({
          pathname: '/payment',
        })
    }
  }


  const [coverages, setCoverages] = useState([]);

  const getCoverage = async () => {
    // const processedResult = []
    // if (allCoverages) {
    //   allCoverages.map((each: any) => {
    //     if (each?.status) {
    //       each?.child_coverages?.map((subEach: any) => {
    //         const companyCoverage = data?.CompanySetup?.CompanyCoverages.filter(x => x?.coverage_id === subEach?.id)
    //         if (companyCoverage && companyCoverage?.length > 0) subEach.state = true
    //         else subEach.state = false
    //       })
    //       return processedResult?.push(each)
    //     }
    //   })
    setCoverages(allCoverages);
    // }
  };

  const onLoad = () => {
    getCoverage();
  };

  const onClickCopmareOnCard = () => {
    router.push({ pathname: './travel-results/compare' })

  }

  useEffect(onLoad, []);
  return (
    <div className={` ${styles["wrapper"]}`}>
        <div className={` ${styles["cardTopContainer"]}`}>
          <div className={` ${styles["pickContainer"]}`}>
            <p className={` ${styles["pickTxt"]}`}>Takaful Bazaar Pick</p>
          </div>
          <div className={` ${styles["discOffContainer"]}`}>
            <p className={` ${styles["discOffTxt"]}`}>
                `11% Off`
            </p>
          </div>
        </div>
      <div
        className={`d-flex justify-content-between align-items-center ${
          styles["cardContainer"]
        } ${styles[hasPromotion ? "cardContainerGrey" : "cardContainerRed"]}`}
      >
        <div className={` ${styles["cardImgContainer"]}`}>
          <Image
            alt=""
            src={serverImgPath}
            width={"100%"}
            height={"100%"}
            objectFit={"contain"}
          />
        </div>
        <div className={` ${styles["providerContainer"]}`}>
          <div className={` ${styles["providerTopContainer"]}`}>
            <p className={styles["insurerTxt"]}>EFU Insurance</p>
          </div>
          <Row>
            <Col md={6}>
              <div className={` ${styles["providerBottomLeft"]}`}>
                <div className={` ${styles["polictTypeContainer"]}`}>
                  <p className={styles["lblTxt"]}>Product Name</p>
                </div>
                <p className={styles["cardTxt"]}>Schengen - Diamond </p>
              </div>
            </Col>
            <Col md={6}>
              <div className={` ${styles["providerBottomLeft"]}`}>
                <div className={` ${styles["polictTypeContainer"]}`}>
                  <p className={styles["lblTxt"]}>Policy Type</p>
                </div>
                <p className={styles["cardTxt"]}>Standard Plan </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3" >
            <Col md={6}>
              <div className={` ${styles["providerBottomRight"]}`}>
                <p className={styles["lblTxt"]}>pe</p>
                <p className={styles["cardTxt"]}>Standard Plan</p>
              </div>
            </Col>
            <Col>
              <div className={`${styles["providerBottomRight"]}`}>
                <p className={styles["redColor"]}>Health Cover</p>
                <p className={styles["redcColor"]}>PKR 15,000</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className={` ${styles["separator"]}`} />
        <PriceSection2 />
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${styles["btnContainer"]}`}
        >
          <div
            onClick={() => handleCompareData(data)}
            className={` ${styles["compareButton"]}`}
          >
            <div className={` ${styles["plusImgContainer"]}`}>
              <Image
                alt="dsfsf"
                src={
                  ppCompareData?.some((val) => val?.id === data?.id)
                    ? minus
                    : plus
                }
              />
              {/* <Image alt="dsfsf" src={(ppCompareData.some(val => val.id === data?.id) ? minus : plus} /> */}
            </div>
            <p onClick={onClickCopmareOnCard} className={` ${styles["compareBtnTxt"]}`}>Compare</p>
          </div>
          <div className={` ${styles["buyNowButton"]}`}>
            <SignInUpButton
              btnTxt="Buy Now"
              link=""
              onClick={() => navigateToPaymentPage()}
            />
          </div>
        </div>
      </div>
      {selectedShowMore === index && (
        <>
          <ProdPlanWebTabs
            whiteBg={false}
            data={tabData}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className={` ${styles["tabDataContainer"]}`}>
            <TabData
              selectedTab={selectedTab}
              data={data}
              coverages={coverages}
            />
          </div>
        </>
      )}
      <div
        onClick={() => {
          if (selectedShowMore === index) setSelectedShowMore(1000);
          else setSelectedShowMore(index);
        }}
        className={`w-100 d-flex align-items-center justify-content-center ${styles["moreDetailsContainer"]}`}
      >
        <div className={` ${styles["dropImgContainer"]}`}>
          <Image
            alt=""
            src={selectedShowMore === index ? uparrow : dropDownIconRed}
          />
        </div>
        <p className={styles["moreDetailsTxt"]}>
          {selectedShowMore === index ? "Show Less" : "More Details"}
        </p>
      </div>
    </div>
  );
};

export default TravelPlanCard;
