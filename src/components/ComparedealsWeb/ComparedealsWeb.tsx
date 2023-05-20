import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'
import { clearBuyNow, clearPurchaseInfo, setBuyNowData } from 'src/lib/redux/auth/action'
import { calculateAmountAfterPromotion, calculateDiscountAmount } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'

import GoBack from '../../../public/assets/arrowBack.png'
import Cross from '../../../public/assets/cardcross.png'
import dropDownIconRed from '../../../public/assets/dropDownIconRed.png'
import tickDropDown from '../../../public/assets/tickDropDown.png'
import upGrey from '../../../public/assets/upGrey.png'
import SignInUpButton from '../SignInUpButton/SignInUpButton'
import styles from './ComparedealsWeb.module.scss'

type TabItemProps = {
  heading: String
  picture1: StaticImageData
  picture2: StaticImageData
}

type TabProps = {
  tabName: String
  value: TabItemProps[]
}

type CompareProps = {
  pin: boolean
  img: StaticImageData
  heading: string
  price: string
  details: {
    heading: string
    subInfo: {
      name: string
      bit: boolean
    }[]
  }[]
}

const routeBackToProdPlan = (router: any, data: any) => {
  // let id: string = data?.reduce((acc: string, item: any) => `${acc + item.id},`, '')
  // id = id?.slice(0, -1)
  router.push({
    pathname: '/productPlan',
    // query: {
    //   ...router.query,
    //   ids: id,
    // },
  })
}

const StickyDiv = ({ data, deleteFromCompareState }: { data: any; deleteFromCompareState: Function }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const compareData = useSelector(state => state.auth.compareDetails)
  const user = useSelector(state => state.auth.data.user)
  const addon_ids = useSelector(state => state.auth.planDetails.addon_ids)
  const emptyContainer = () => {
    const tempEmpty = []
    for (let i = data?.length; i < 3; i += 1) tempEmpty.push({ name: 'Add to compare' })
    return tempEmpty.map(index => (
      <Col
        key={index}
        // style={{ border: '10px solid black' }}
        lg={3}
        md={3}
        sm={3}
        xs={3}
        className="pt-5 pb-3"
      >
        <div
          // style={{ border: '10px solid black' }}
          onClick={() => {
            routeBackToProdPlan(router, data)
          }}
          className={` ${styles['card']}`}
        >
          <p className={`m-0 ${styles['add-to-compare']}`}>Add to compare</p>
        </div>
      </Col>
    ))
  }
  const navigateToPaymentPage = id => {
    const tempData = compareData.filter(item => item.id === id)[0]
    let formatedAddons = []
    if (addon_ids.length !== 0) {
      const selectedAddons = tempData?.PolicyAddons?.filter((item, index) => {
        for (let i = 0; i < addon_ids.length; i++) {
          if (addon_ids[i] === item.addon_id) return true
        }
      })

      formatedAddons = selectedAddons.map(item => {
        if (item.type === 'fixed') {
          return { addon_id: item.addon_id, amount: parseFloat(item.value) + tempData?.annual_contribution }
        }
        if (item.type === 'percentage') {
          return { addon_id: item.addon_id, amount: tempData?.annual_contribution * (parseFloat(item.value) / 100) }
        }
      })
    }

    dispatch(clearBuyNow())
    dispatch(clearPurchaseInfo())

    dispatch(
      setBuyNowData({
        policy_id: tempData?.id.split('/')[0],
        policy_type_id: tempData?.PolicyType?.id,
        annual_contribution: tempData?.annual_contribution + (tempData?.addon_amount || 0),
        insurance_rate: tempData?.insurance_rate,
        company_logo_url: tempData?.CompanySetup?.logo,
        policy_name: tempData?.name,
        policy_addons: formatedAddons,
        promotion_coupon_id: tempData?.promotion_coupon_id,
        promotion_discount_type: tempData?.promotion_discount_type,
        promotion_discount_value: tempData?.promotion_discount_value,
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
  return (
    <div className={`${styles['wrapper']}`}>
      <Container className={` ${styles['container']}`}>
        <Row className={`${styles['stickyrow']}`}>
          <Col lg={3} md={3} sm={3} xs={3} className={`pt-3 ${styles['gobackcol']}`}>
            <div
              onClick={() => {
                routeBackToProdPlan(router, data)
              }}
              // style={{ border: '5px solid red' }}
              className={styles['gobackdiv']}
            >
              <div className={styles['gobackarrow']}>
                <Image src={GoBack} alt="backarrow" />
              </div>
              <p className={`mt-3 ${styles['gobacktxt']}`}>Back to Search</p>
            </div>
            <div className={`p-0 m-0 d-flex flex-wrap ${styles['para']}`}>
              <p className="m-0">
                Comparison between{' '}
                {data?.map((each, index) => (
                  <span key={index}>
                    <span className={`m-0 ${styles['redTxt']}`}>{`${each?.heading}`}</span>
                    <span className={`m-0`}>{`${index === data?.length - 1 ? '' : index === data?.length - 2 ? ' & ' : ', '
                      }`}</span>
                  </span>
                ))}
              </p>
            </div>
          </Col>
          {data?.map((each: any, index: number) => (
            <Col
              // style={{ border: '10px solid black' }}
              key={index}
              lg={3}
              md={3}
              sm={3}
              xs={3}
              className="pt-5 pb-3"
            >
              <div
                // style={{ border: '10px solid black' }}
                className={` ${styles['card']}`}
              >
                <div className={styles['upperportion']}>
                  <div className={styles['cardimagecontainer']}>
                    <Image
                      alt=""
                      src={`${each?.img}`}
                      width={'100%'}
                      height={'100%'}
                      objectFit={'contain'}
                    />
                  </div>
                  <div className="w-50">
                    <p className={styles['cardtext']}>{each?.heading}</p>
                    <p className={styles['cardtext']}>{each?.policyType}</p>
                  </div>
                  {data?.length > 1 && (
                    <div
                      onClick={() => deleteFromCompareState(each?.id)}
                      className={` d-flex justify-content-center align-items-center ${styles['cross']}`}
                    >
                      <div onClick={() => { }} className={` d-flex  align-items-center ${styles['crossimg']}`}>
                        <Image src={Cross} alt="cross" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-100">
                  <p className={`p-0 m-0 ${styles['pricetext']}`}>{`Rs.${currencyFormat(each?.price)}`}</p>
                </div>
              </div>
              <div className={`${styles['buynowbtn']}`}>
                <SignInUpButton
                  link=""
                  btnTxt="Buy Now"
                  onClick={() => {
                    navigateToPaymentPage(each.id)
                  }}
                />
              </div>
            </Col>
          ))}
          {emptyContainer()}
        </Row>
      </Container>
    </div>
  )
}

const WebRow = ({
  data,
  selectedTabObj,
  setSelectedTabObj,
  heading,
  isLength2,
}: {
  data: any
  selectedTabObj: Set<String>
  setSelectedTabObj: Function
  heading?: Boolean
  isLength2?: Boolean
}) => (
  <div className="w-25 d-flex flex-column">
    {data?.details?.map((each: any, index: number) => (
      <div key={index} className="w-100">
        <div
          onClick={() => {
            if (selectedTabObj.has(each.heading)) {
              const tempOpenGroups = new Set(selectedTabObj)
              tempOpenGroups.delete(each.heading)
              setSelectedTabObj(tempOpenGroups)
            } else {
              setSelectedTabObj(new Set(selectedTabObj.add(each.heading)))
            }
          }}
          className={`d-flex align-items-center position-relative ${!heading && 'justify-content-center'} ${styles['headingColumn']
            }`}
        >
          {heading && !isLength2 ? (
            <div className={`d-flex align-items-center justify-content-center`}>
              {
                <div className={`d-flex align-items-center justify-content-center ${styles['tabarrow']}`}>
                  <Image
                    priority={true}
                    src={selectedTabObj.has(each?.heading) ? dropDownIconRed : upGrey}
                    alt=""
                    className={`${styles['default']}`}
                  />
                </div>
              }
              <p
                className={`${styles[isLength2 ? 'transparentTxt' : 'eachHeading']} ${heading && styles['headingColumnLong']
                  }`}
              >
                {each?.heading}
              </p>
            </div>
          ) : (
            <div
              className={`position-absolute d-flex align-items-center justify-content-center ${styles['blanckColumn']}`}
            >
              <p className={`m-0 ${styles['transparentTxt']}`}>{''}</p>
            </div>
          )}
        </div>
        {each?.subInfo?.map((subEach: any, index2: number) => (
          <>
            {selectedTabObj.has(each?.heading) && (
              <div
                key={index2}
                className={`d-flex align-items-center ${''} ${styles[index2 === each?.subInfo.length - 1 ? 'bodyColumnLast' : 'bodyColumn']
                  }`}
              >
                {heading ? (
                  <div className="w-100">
                    <p className={` ${styles[isLength2 ? 'transparentTxt' : 'tabtxt']}`}>
                      {isLength2 ? '' : subEach?.name}
                    </p>
                  </div>
                ) : (
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <div
                      style={{ width: subEach?.bit ? '20px' : '15px' }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Image alt="" src={subEach?.bit ? tickDropDown : Cross} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ))}
      </div>
    ))}
  </div>
)

const ScrollDiv = ({ data }: { data: any }) => {
  const [selectedTabObj, setSelectedTabObj] = useState<Set<String>>(new Set())
  useEffect(() => {
    setSelectedTabObj(new Set(selectedTabObj.add(data[0]?.details[0]?.heading)))
  }, [data])

  const emptyContainer = () => {
    let tempEmpty = []
    for (let i = data?.length; i < 3; i += 1) tempEmpty.push({ name: 'Add to compare' })
    return tempEmpty.map(index => (
      <WebRow
        data={data[0]}
        selectedTabObj={selectedTabObj}
        setSelectedTabObj={setSelectedTabObj}
        heading={true}
        isLength2={true}
        key={index.toString()}
      />
    ))
  }
  return (
    <div className={` ${styles['scrollwrapper']}`}>
      <Container className={`p-0 d-flex ${styles['container']}`}>
        <WebRow data={data[0]} selectedTabObj={selectedTabObj} setSelectedTabObj={setSelectedTabObj} heading={true} />
        {data.map?.((each2, index) => (
          <WebRow key={index} data={each2} selectedTabObj={selectedTabObj} setSelectedTabObj={setSelectedTabObj} />
        ))}
        {emptyContainer()}
      </Container>
    </div>
  )
}

const CompareDealsWeb = ({
  data,
  deleteFromCompareState,
}: {
  data: CompareProps[]
  deleteFromCompareState: Function
}) => (
  <MediaQuery minWidth={600}>
    <StickyDiv data={data} deleteFromCompareState={deleteFromCompareState} />
    <ScrollDiv data={data} />
  </MediaQuery>
)

export default CompareDealsWeb
