import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Api from 'src/lib/api'
import { clearBuyNow, clearPurchaseInfo, setBuyNowData } from 'src/lib/redux/auth/action'
import { calculateAmountAfterPromotion, calculateDiscountAmount } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'

import cross from '../../../public/assets/cross.png'
import dropDownIconRed from '../../../public/assets/dropDownIconRed.png'
import iGrey from '../../../public/assets/iGrey.png'
import minus from '../../../public/assets/minus.png'
import plus from '../../../public/assets/plus.png'
import tick from '../../../public/assets/tick.png'
import uparrow from '../../../public/assets/uparrow.png'
import ProdPlanWebTabs from '../ProdPlanWebTabs/ProdPlanWebTabs'
import SignInUpButton from '../SignInUpButton/SignInUpButton'
import styles from './ProductPlanCard.module.scss'
import { Table } from "react-bootstrap";
import React from "react";

const TabsEnum = {
  Coverage: 0,
  DepreciationPolicy: 1,
  ClaimProcess:2,
  Addons:3
}
const tabData = [
  {
    name: 'Coverage',
    isActive: true,
  },
  {
    name: 'Depreciation Policy',
    isActive: false,
  },
  {
    name: 'Claim Process',
    isActive: false,
  },
  {
    name: 'Add-ons',
    isActive: false,
  },
]

const CoverageTab = ({ data, coverages }: { data: object; coverages: any }) => (
  <>
    {coverages.filter(cov => cov.child_coverages.length > 0 )?.map((coverage, index) => (
      <>
        <div key={coverage?.id} style={{}} className="w-100 d-flex">
          <div className={styles['eachHeadingContainer']}>
            <b>
              <p className={styles['infoHeadingTxt']}>{coverage?.name}</p>
            </b>
          </div>
          <div style={{}} className="d-flex flex-wrap">
            {coverage?.child_coverages?.map((child: any) => {
              const state = data?.CompanySetup?.CompanyCoverages.filter(x => x?.coverage_id === child?.id).length > 0
              return (
                <div key={child.id} className={styles['eachContainer']}>
                  <p className={styles['eachTxt']}>{child?.name}</p>
                  {/* { child?.state = data?.CompanySetup?.CompanyCoverages.filter(x => x?.coverage_id === child?.id).length > 0} */}
                  <div className={styles[state ? 'tabImgContainer' : 'tabImgContainerCross']}>
                    <Image alt="" src={state ? tick : cross} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {index !== coverages?.length - 1 && <div className={styles['tabSeparator']} />}
      </>
    ))}
  </>
)

const AddOnsTab = ({ data }: { data: object }) => (
  <>
    {data?.PolicyAddons?.map((addon: any, index: number) => (
      <div
        key={index}
        className={`d-flex align-items-center justify-content-between flex-wrap ${styles['addOnsTabContainer']}`}
      >
        <div className={`${styles['addOnsEachContainer']} w-75 d-flex my-1 align-items-center justify-content-between`}>
          <p className={styles['eachLblTxt']}>{addon?.Addon?.name}</p>
          {addon?.type === 'percentage' ? (
            <p className={styles['eachValTxt']}>{addon?.value}%</p>
          ) : (
            <p className={styles['eachValTxt']}>Rs.{addon?.value}</p>
          )}
        </div>
      </div>
    ))}
  </>
)

const TabData = ({ selectedTab, data, coverages }: { selectedTab: number; data: object; coverages: any }) => {

  if (selectedTab === TabsEnum.Coverage)
    return (
      <div style={{}} className="w-100">
        <CoverageTab data={data} coverages={coverages} />
      </div>
    )
  else if (selectedTab === TabsEnum.DepreciationPolicy){
    const data = [
      { yearMonth: "0 - 6 months", percentage: "5%" },
      { yearMonth: "7 - 12 months", percentage: "10%" },
      { yearMonth: "13 - 24 months", percentage: "20%" },
      { yearMonth: "25 - 36 months", percentage: "30%" },
      { yearMonth: "37 - 48 months", percentage: "40%" },
      { yearMonth: "49 - 60 months", percentage: "50%" },
      { yearMonth: "61 - 72 months", percentage: "60%" }
    ];
    return (
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <p style={{ padding: "10px",textAlign: "center" }}>In the event of a claim for replacement parts, including glass and plastic items, the following rates of depreciation will be applied. The depreciation is based on the year of manufacture, not the year of registration.</p>
        <Table striped bordered hover style={{ width: "70%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Year / Month</th>
              <th style={{ textAlign: "center" }}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{row.yearMonth}</td>
                <td style={{ textAlign: "center" }}>{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>  
    )
  }
  else if (selectedTab === TabsEnum.ClaimProcess){
    return (
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <p style={{ padding: "10px",textAlign: "center" }}>The claim process can be initiated through the Takaful Bazaar portal. Upon initiation, our team will promptly reach out to you to assist in the process or alternatively, you may contact our helpline for guidance in completing the claim process on the portal. Our team is dedicated to ensuring a smooth and efficient claim experience.</p>
      </div>  
    )
  }
  else if (selectedTab === TabsEnum.Addons) {
    return <AddOnsTab data={data} />
  }
  else {
    return (
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <p className="m-0">{tabData[selectedTab]?.name}</p>
        <p className="m-0">No Design Available</p>
        <p className="m-0">No Data Available</p>
      </div>
    )
  }

}

const PriceSection2 = ({ data, hasPromotion }: { data: object; hasPromotion: boolean }) => {
  const [showPolicyInfo, setShowPolicyInfo] = useState(false)
  const [value, setValue] = useState()

  useEffect(() => {
    setValue(data?.value)
  }, [data])

  return (
    <div key={data.id} className={` ${styles['priceContainer2']}`}>
      <div className={` ${styles['']}`}>
        <p className={styles['lblTxt']}>Annual Contribution</p>
        {hasPromotion ? (
          <>
            <p className={styles['newRateTxtSmallCrossed']}>
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
      </div>
      {data?.addon_amount ? (
        <div>
          <div className={` ${styles['addonsdiv']}`}>
            <p className={styles['lblTxtSmall']}>
              with <span className={styles['lblTxtSmallRed']}> Add-ons</span>
            </p>
            <div
              onMouseLeave={() => setShowPolicyInfo(false)}
              onClick={() => setShowPolicyInfo(!showPolicyInfo)}
              className={styles['iImgContred']}
            >
              <Image alt="" src={iGrey} className={styles['redimg']} />
              {showPolicyInfo && (
                <div className={styles['infoWrapper']}>
                  <div className={styles['infoContainer']}>
                    <p className={styles['infoTxt']}>{data?.addon_description?.replaceAll(',', '\n')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <p className={styles['oldRateTxtSmall']}>Rs. {currencyFormat(data?.oldRate.toString())}</p>
        <p className={styles['newRateTxtBig']}>Rs. {currencyFormat(data?.newRate.toString())}</p> */}
          {hasPromotion ? (
            <>
              <p className={styles['newRateTxtSmallCrossed']}>
                <del>PKR {currencyFormat(data?.annual_contribution + data?.addon_amount || 0)}</del>
              </p>
              <p className={styles['newRateTxtSmallBig']}>
                PKR{' '}
                {currencyFormat(
                  calculateAmountAfterPromotion(
                    data?.annual_contribution + data?.addon_amount,
                    data?.promotion_discount_value,
                    data?.promotion_discount_type,
                  ) || 0,
                )}
              </p>
            </>
          ) : (
            <>
              <p className={styles['newRateTxtSmallBig']}>
                PKR {currencyFormat(data?.annual_contribution + data?.addon_amount || 0)}
              </p>
            </>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const PriceSection = ({ data, insurancePlansForm }: { data: object }) => (
  <div className={` ${styles['priceContainer']}`}>
    <div className={` ${styles['providerTopContainer']}`} />
    <div className={` ${styles['providerBottomContainer']}`}>
      {/* <p className={styles['lblTxt']}>Annual Contribution</p>
        <p className={styles['oldRateTxt']}>Rs. {currencyFormat(data?.oldRate.toString())}</p>
        <p className={styles['newRateTxt']}>Rs. {currencyFormat(data?.newRate.toString())}</p> */}
      <p className={styles['newRateTxtSmall']}>
        Rs. {currencyFormat(data?.annual_contribution + (data?.addon_amount || 0))}
      </p>
    </div>
  </div>
)

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

const ProductPlanCard = ({
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
  data: any
  showCompare: boolean
  index: number
  setShowCompare: Function
  insurancePlansForm: object
  handleCompareData: Function
  ppCompareData: any
  user: any
  allCoverages?: any
  hasPromotion?: boolean
}) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedShowMore, setSelectedShowMore] = useState(9999)
  const [showPolicyInfo, setShowPolicyInfo] = useState(false)
  const { addon_ids } = useSelector(state => state?.auth?.planDetails)
  const router = useRouter()
  const dispatch = useDispatch()

  const serverImgPath = data?.CompanySetup?.logo;

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
      // }
    }
  }

  const [coverages, setCoverages] = useState([])

  const getCoverage = async () => {
    setCoverages(allCoverages)
  }

  const onLoad = () => {
    getCoverage()
  }

  useEffect(onLoad, [])

  return (
    <div className={` ${styles['wrapper']}`}>
      {hasPromotion && (
        <div className={` ${styles['cardTopContainer']}`}>
          <div className={` ${styles['pickContainer']}`}>
            <p className={` ${styles['pickTxt']}`}>Takaful Bazaar Pick</p>
          </div>
          <div className={` ${styles['discOffContainer']}`}>
            <p className={` ${styles['discOffTxt']}`}>
              {data.promotion_discount_type === 'percentage'
                ? `${data.promotion_discount_value}% Off`
                : `Rs. ${data.promotion_discount_value} Off`}
            </p>
          </div>
        </div>
      )}
      <div
        className={`d-flex justify-content-between align-items-center ${styles['cardContainer']} ${
          styles[hasPromotion ? 'cardContainerRed' : 'cardContainerGrey']
        }`}
      >
        <div className={` ${styles['cardImgContainer']}`}>
          <Image alt="" src={serverImgPath} width={'100%'} height={'100%'} objectFit={'contain'} />
        </div>
        <div className={` ${styles['providerContainer']}`}>
          <div className={` ${styles['providerTopContainer']}`} style={{display: 'block', height: 'auto'}}>
          <h3 className={styles['insurerTxt']} style={{fontSize: 22, marginTop: 10}}>{data?.CompanySetup?.name}</h3>
            <p className={styles['insurerTxt']} style={{textTransform: 'CAPITALIZE', marginTop: 5}}>{data?.name}</p>
          </div>
          <div className={` d-flex justify-content-between ${styles['providerBottomContainer']}`}>
            <div className={` ${styles['providerBottomLeft']}`}>
              <div className={` ${styles['polictTypeContainer']}`}>
                <p className={styles['lblTxt']}>Policy Type</p>
                {data?.PolicyType?.description && (
                  <div
                    onMouseLeave={() => setShowPolicyInfo(false)}
                    onClick={() => setShowPolicyInfo(!showPolicyInfo)}
                    className={styles['iImgCont']}
                  >
                    <Image alt="" src={iGrey} className={styles['greyImg']} />
                    {showPolicyInfo && (
                      <div className={styles['infoWrapper']}>
                        <div className={styles['infoContainer']}>
                          <p className={styles['infoTxt']}>{data?.PolicyType?.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className={styles['cardTxt']}>{data?.PolicyType?.name}</p>
            </div>
            <div className={` ${styles['providerBottomRight']}`}>
              <p className={styles['lblTxt']}>Contribution Rate</p>
              <p className={styles['cardTxt']}>{`${data?.insurance_rate}%`}</p>
            </div>
          </div>
        </div>
        {hasPromotion && <div className={` ${styles['separator']}`} />}
        <PriceSection2 hasPromotion={hasPromotion} data={data} insurancePlansForm={insurancePlansForm} />
        {/* <PriceSection data={data} insurancePlansForm={insurancePlansForm} /> */}
        {/* {data?.tbPick ? (
          <PriceSection2 data={data} insurancePlansForm={insurancePlansForm} />
        ) : (
          <PriceSection data={data} insurancePlansForm={insurancePlansForm} />
        )} */}
        <div className={`d-flex flex-column justify-content-center align-items-center ${styles['btnContainer']}`}>
          <div onClick={() => handleCompareData(data)} className={` ${styles['compareButton']}`}>
            <div className={` ${styles['plusImgContainer']}`}>
              <Image alt="dsfsf" src={ppCompareData?.some(val => val?.id === data?.id) ? minus : plus} />
              {/* <Image alt="dsfsf" src={(ppCompareData.some(val => val.id === data?.id) ? minus : plus} /> */}
            </div>
            <p className={` ${styles['compareBtnTxt']}`}>Compare</p>
          </div>
          <div className={` ${styles['buyNowButton']}`}>
            <SignInUpButton btnTxt="Buy Now" link="" onClick={() => navigateToPaymentPage()} />
          </div>
        </div>
      </div>
      {selectedShowMore === index && (
        <>
          <ProdPlanWebTabs whiteBg={false} data={tabData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div className={` ${styles['tabDataContainer']}`}>
            <TabData selectedTab={selectedTab} data={data} coverages={coverages} />
          </div>
        </>
      )}
      <div
        onClick={() => {
          if (selectedShowMore === index) setSelectedShowMore(1000)
          else setSelectedShowMore(index)
        }}
        className={`w-100 d-flex align-items-center justify-content-center ${styles['moreDetailsContainer']}`}
      >
        <div className={` ${styles['dropImgContainer']}`}>
          <Image alt="" src={selectedShowMore === index ? uparrow : dropDownIconRed} />
        </div>
        <p className={styles['moreDetailsTxt']}>{selectedShowMore === index ? 'Show Less' : 'More Details'}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ user: state.auth.data.user })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(ProductPlanCard)
