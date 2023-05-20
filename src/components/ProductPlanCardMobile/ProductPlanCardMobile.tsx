/* eslint-disable @next/next/no-img-element */
import cross from "../../../public/assets/cross.png";
import dropDownIconRed from "../../../public/assets/dropDownIconRed.png";
import minus from "../../../public/assets/minus.png";
import plus from "../../../public/assets/plus.png";
import tick from "../../../public/assets/tick.png";
import uparrow from "../../../public/assets/uparrow.png";
import styles from "./ProductPlanCardMobile.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import SignInUpButton from "~components/SignInUpButton/SignInUpButton";

const tabData = [
  {
    heading: "Coverage",
    data: [
      {
        heading: "Third Party Coverage",
        data: [
          { label: "Road Side Assistance", value: false },
          { label: "No Claim Bonus", value: true },
          { label: "Health Takaful", value: false },
          { label: "Travel Rakaful", value: true },
        ],
      },
      {
        heading: "Value Added Features",
        data: [
          { label: "Road Side Assistance", value: false },
          { label: "No Claim Bonus", value: true },
        ],
      },
    ],
  },
  {
    heading: "Add-ons",
    data: [
      { label: "Road Side Assistance", value: 2000 },
      { label: "No Claim Bonus", value: 4000 },
      { label: "Health Takaful", value: "20%" },
      { label: "Travel Rakaful", value: "10%" },
    ],
  },
  { heading: "Depreciation policy" },
  { heading: "Cancellation policy" },
  { heading: "Businesses" },
];

const MobileCoverages = ({ coverages }: { coverages: any }) => (
  <div>
    {coverages?.map((coverage: any, index: number) => (
      <div className="" key={index}>
        <div className={`px-3 ${styles["tabSubHeadingContainer"]}`}>
          <p className={`${styles["tabSubHeading"]}`}>{coverage?.name}</p>
        </div>
        {coverage?.child_coverages?.map((child: any, index2: number) => (
          <div
            className={`${styles[""]} px-4 my-2 d-flex align-items-center justify-content-between`}
            key={index2}
          >
            <p className={styles["tabDataTxt"]}>{child?.name}</p>
            <div
              className={`${
                styles[
                  child?.state
                    ? "boolImgContainerTick"
                    : "boolImgContainerCross"
                ]
              } d-flex align-items-center justify-content-center`}
            >
              <Image alt="" src={child?.state ? tick : cross} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const PPCardMobileTabEach = ({
  data,
  coverages,
  allData,
}: {
  data: {
    heading: string;
    data?: {
      heading: string;
      data: {
        label: string;
        value: boolean | number | string;
      }[];
    }[];
  };
  coverages?: any;
  allData?: any;
}) => {
  const [showTab, setShowTab] = useState("");
  return (
    <div className="w-100 d-flex flex-column">
      <div
        onClick={() => {
          if (showTab === data?.heading) setShowTab("");
          else setShowTab(data?.heading);
        }}
        className={`mx-3 d-flex align-items-center justify-content-between`}
      >
        <p className={styles["tabHeading"]}>{data?.heading}</p>
        <div
          className={`${styles["dropImgContainer"]} d-flex align-items-center justify-content-center`}
        >
          <Image
            alt=""
            src={showTab === data?.heading ? uparrow : dropDownIconRed}
          />
        </div>
      </div>
      {showTab === data?.heading && (
        <div className="w-100">
          {/* Coverage Tab Make Component In Future */}
          {data?.heading === "Coverage" && (
            <MobileCoverages coverages={coverages} />
          )}
          {/* Add-ons Tab Make Component In Future */}
          {data?.heading === "Add-ons" && (
            <div>
              {allData?.PolicyAddons?.map((addon: any, index: number) => (
                <div
                  className="px-3 my-2 d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <p className={styles["tabDataTxt"]}>{addon?.Addon?.name}</p>
                  {addon?.type === "percentage" ? (
                    <div className={styles["addonValueWidth"]}>
                      <p className={styles["eachValTxt"]}>{addon?.value}%</p>
                    </div>
                  ) : (
                    <div className={styles["addonValueWidth"]}>
                      <p className={styles["eachValTxt"]}>Rs.{addon?.value}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// interface data {
//   tbPick: boolean
//   img: StaticImageData
//   insurer: string
//   policy: string
//   premiumRate: string
//   discountRatePercent: number
//   oldRate: number
//   newRate: number
//   totalPrice: number
//   addOns: boolean
// }

const ProductPlanCardMobile = ({
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
  data: object | any;
  index: number;
  showCompare: boolean;
  setShowCompare: Function;
  insurancePlansForm: object;
  handleCompareData: Function;
  ppCompareData: any;
  user: any;
  allCoverages?: any;
  hasPromotion?: boolean;
}) => {
  const [showMore, setShowMore] = useState(9999);
  // const [value, setValue] = useState(0)
  // useEffect(() => setValue(insurancePlansForm.value), [])
  const { addon_ids } = useSelector((state) => state?.auth?.planDetails);
  const router = useRouter();
  const dispatch = useDispatch();

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
        pathname: '/auth',
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
    const processedResult = [];

    if (allCoverages) {
      allCoverages.map((each: any) => {
        if (each?.status) {
          each?.child_coverages?.map((subEach: any) => {
            const companyCoverage = data?.CompanySetup?.CompanyCoverages.filter(
              (x) => x?.coverage_id === subEach?.id
            );
            if (companyCoverage && companyCoverage?.length > 0)
              subEach.state = true;
            else subEach.state = false;
          });
          return processedResult?.push(each);
        }
      });
      setCoverages(processedResult);
    }
  };

  useEffect(() => {
    getCoverage();
  }, []);

  const serverImgPath = `${data?.CompanySetup?.logo}`;
  return (
    <div className={`my-5 ${styles["mainWrapper"]}`}>
      {hasPromotion && (
        <div className={` ${styles["cardTopContainer"]}`}>
          <div className={` ${styles["pickContainer"]}`}>
            <p className={` ${styles["pickTxt"]}`}>Takaful Bazaar Pick</p>
          </div>
        </div>
      )}
      <div className={`w-100 ${styles["wrapper"]}`}>
        <div
          onClick={() => handleCompareData(data)}
          className={`d-flex align-items-center justify-content-center ${styles["compareContainer"]}`}
        >
          <div
            className={`d-flex align-items-center justify-content-center ${styles["plusImgContainer"]}`}
          >
            <Image
              alt=""
              src={
                ppCompareData.some((val) => val.id === data?.id) ? minus : plus
              }
            />
          </div>
          <p className={styles["compareTxt"]}>Compare</p>
        </div>
        <div
          className={` w-100 d-flex flex-column ${styles["cardContainer"]} ${
            styles[hasPromotion ? "redBorder" : "greyBorder"]
          }`}
        >
          <div
            className={`w-100 d-flex align-items-center justify-content-between ${styles[""]}`}
          >
            <div className={` ${styles["leftContainer"]}`}>
              <div
                className={`d-flex align-items-center  ${styles["mainImgContainer"]}`}
              >
                <Image
                  alt=""
                  src={serverImgPath}
                  width={"100%"}
                  height={"100%"}
                  objectFit={"contain"}
                />
                {/* // <img alt="" src={serverImgPath} width={'100%'} /> */}
              </div>
            </div>
            <div className={` ${styles["rightContainer"]}`}>
              <p className={styles['lblTxt']}>Annual Contribution</p>
              <p className={` ${styles["priceMainTxt"]}`}>
              {hasPromotion ? (
                <>
                  <p className={styles['newRateTxtSmallDel']}>
                    <del>PKR {currencyFormat(data?.annual_contribution || 0)}</del>
                  </p>
                  <p className={styles['newRateTxtSmall']}>
                    PKR {' '}
                    {currencyFormat(
                      calculateAmountAfterPromotion(
                        data?.annual_contribution,
                        data?.promotion_discount_value,
                        data?.promotion_discount_type,
                      ) > 0 ? calculateAmountAfterPromotion(
                        data?.annual_contribution,
                        data?.promotion_discount_value,
                        data?.promotion_discount_type,
                      ) : 0,
                    )}
                  </p>
                </>
              ) : (
                <>
                  <p className={styles['newRateTxtSmall']}>PKR {currencyFormat(data?.annual_contribution || 0)}</p>
                </>
              )}
              </p>
            </div>
          </div>
          <div className={styles["separator"]} />
          <p className={` ${styles["insurerTxt"]}`}>{data?.name}</p>
          <div
            className={`w-100 d-flex align-items-end justify-content-between ${styles[""]}`}
          >
            <div className={` ${styles["leftContainer"]}`}>
              <p className={` ${styles["lblTxt"]}`}>Policy Type</p>
            </div>
            <div className={` ${styles["rightContainer"]}`}>
              <p className={` ${styles["lblTxt"]}`}>{data?.PolicyType?.name}</p>
            </div>
          </div>
          <div
            className={`w-100 d-flex align-items-end justify-content-between ${styles[""]}`}
          >
            <div className={` ${styles["leftContainer"]}`}>
              <p className={` ${styles["lblTxt"]}`}>Rate</p>
            </div>
            <div className={` ${styles["rightContainer"]}`}>
              {/* <p className={` ${styles['lblTxt']}`}>{data?.discountRatePercent}%</p> */}
              <p className={` ${styles["lblTxt"]}`}>{data?.insurance_rate}%</p>
            </div>
          </div>
          <div className="w-100 my-2">
            <SignInUpButton
              btnTxt="Buy Now"
              link=""
              onClick={() => navigateToPaymentPage()}
            />
          </div>
        </div>
        {showMore === index && (
          <div className={`mt-1 ${styles["moreDetailsContainer"]}`}>
            {tabData.map((each, index2) => (
              <>
                <PPCardMobileTabEach
                  key={index2}
                  data={each}
                  coverages={coverages}
                  allData={data}
                />
                <div className={`mx-2 ${styles[""]}`}>
                  <div className={` ${styles["separatorMob"]}`} />
                </div>
              </>
            ))}
          </div>
        )}
        <div
          onClick={() => {
            if (showMore === index) setShowMore(1000);
            else setShowMore(index);
          }}
          className={`d-flex align-items-center justify-content-center ${styles["showMoreContainer"]}`}
        >
          <div
            className={`d-flex align-items-center justify-content-center ${styles["showMoreImgContainer"]}`}
          >
            <Image
              alt=""
              src={showMore === index ? uparrow : dropDownIconRed}
            />
          </div>
          <p className={styles["showMoreTxt"]}>
            {showMore === index ? "Show Less" : "More Details"}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ user: state.auth.data.user });

const mapDispatchProps = {};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(ProductPlanCardMobile);
