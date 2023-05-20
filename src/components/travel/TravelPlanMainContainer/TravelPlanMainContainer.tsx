import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { setInsuranceDetails } from 'src/lib/redux/auth/action'
import { calculateAmountAfterPromotion } from 'src/lib/utils'
import currencyFormat from 'src/utils/currencyFormat'
import ContactAdvisor from '~components/ContactAdvisor/ContactAdvisor'
import ModalForm from '~components/ModalForm/ModalForm'
import SignInUpButton from '~components/SignInUpButton/SignInUpButton'

import crossCircle from '~public/assets/crossCircle.png'
import ProductPlanCard from '../../ProductPlanCard/ProductPlanCard'
import ProductPlanCardMobile from '../../ProductPlanCardMobile/ProductPlanCardMobile'
import ProductPlanFilters from '../../ProductPlanFilters/ProductPlanFilters'
import TravelPlanCard from '../TravelPlanCard/TravelPlanCard'
import TravelPlanFilters from '../TravelPlanFilters/travelPlanFilters'
import styles from './TravelPlanMainContainer.module.scss'

const filterData = {
  heading: 'Takaful Providers',
  insurances: [
    { name: 'jubilee General' },
    { name: 'Askari Insurance' },
    { name: 'Premier Insurance' },
    { name: 'State Life Insurance' },
    { name: 'jubilee General' },
    { name: 'Askari Insurance' },
    { name: 'Premier Insurance' },
    { name: 'State Life Insurance' },

  ],
}
const insuranceTypeData = {
  heading: 'Policy Type',
  types: [{ name: 'Comprehensive' }, { name: '3T (Total Loss, Theft & Third Party)' }],
}
const addOnsData = {
  types: [
    {
      name: 'Road Side Assistance',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Tracker',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Zero Dept',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Road Side',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Tracker',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Zero Dept',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
  ],
}

// const data = [
//   {
//     tbPick: true,
//     img: ublInsurer,
//     name: 'UBL Insurers',
//     policy: 'Comprehensive',
//     insurance_rate: '1.65%',
//     discountRatePercent: 11,
//     oldRate: 36150,
//     newRate: 31350,
//     totalPrice: 45500,
//     addOns: true,
//     CompanySetup: { name: 'Test' },
//   },
// ]

const CompareCard = ({
  data,
  handleCompareData,
  deleteCompareData,
  rightBorderBit,
}: {
  data: any
  handleCompareData: Function
  deleteCompareData: Function
  rightBorderBit?: Boolean
}) => {
  const serverImgPath = `${process.env['NEXT_PUBLIC_IMAGE_ORIGIN']}${data?.CompanySetup?.logo}`
  return (
    <div
      className={`position-relative ${styles['compareCardContainer']} ${styles[rightBorderBit ? 'borderColor' : '']}`}
    >
      <div
        onClick={() => deleteCompareData(data)}
        className={`position-absolute ${styles['crossImgContainer']} d-flex align-items-center justify-content-center`}
      >
        <Image alt="" src={crossCircle} />
      </div>
      <div
        // style={{ border: '1px solid red' }}
        className={`${styles['compareImgContainer']} position-relative d-flex align-items-center justify-content-center`}
      >
        <Image alt="" src={serverImgPath} width={'100%'} height={'100%'} objectFit={'contain'} />
      </div>
      <div className={`${styles['compareRightContainer']}`}>
        <p className={styles['compareCardTxt']}>{data?.name}</p>
        <p className={styles['compareCardTxt']}>{data?.PolicyType?.name}</p>
        <p className={styles['comparePriceTxt']}>
          {data?.promotion_coupon_id !== 0
            ? `Rs.${currencyFormat(
                calculateAmountAfterPromotion(
                  data?.annual_contribution + data?.addon_amount,
                  data?.promotion_discount_value,
                  data?.promotion_discount_type,
                ),
              )}`
            : `Rs.${currencyFormat(data?.annual_contribution + data?.addon_amount)}`}
        </p>
      </div>
    </div>
  )
}

interface ProductPlanMainContainerProp {
  plans: {
    value: object
    setValue: any
  }
}

const TravelPlanMainContainer = ({
  plans,
  insurancePlansState,
  user,
  showGenModal,
  ppCompareData,
  setPPCompareData,
  showMobileFilter,
  setShowMobileFilter,
  renewPolicyData,
  validateForm,
}: {
  plans: ProductPlanMainContainerProp
  insurancePlansState: any
  user: any
  showGenModal: any
  ppCompareData: any
  setPPCompareData: Function
  showMobileFilter: any
  setShowMobileFilter: Function
  renewPolicyData: any
  validateForm: any
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showCompare, setShowCompare] = useState(false)
  const [showModal, setShowModal] = useState(true)
  const { insurancePlansForm } = insurancePlansState
  const [allCoverages, setAllCoverages] = useState([])

  //Sticky component start

  const [sticky, setSticky] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  }, [])

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY
    const stickyClass = scrollTop >= 250 ? 'sticky' : ''
    setSticky(stickyClass)
  }

  //Sticky component end

  const getAllCoverage = async () => {
    const result = await Api('GET', '/coverage?status=1')
    if (result?.data) {
      setAllCoverages(result?.data)
    }
  }

  const onLoad = () => {
    getAllCoverage()
  }

  useEffect(onLoad, [])

  const deleteCompareData = (data: any) => {
    const tempData = ppCompareData.filter(each => each?.id !== data?.id)
    setPPCompareData(tempData)
  }

  const handleCompareData = (card: any) => {
    let check = false
    ppCompareData.forEach(item => {
      if (card?.id === item?.id) {
        deleteCompareData(card)
        check = true
      }
    })
    let tempData = ppCompareData
    if (check) return

    if (tempData.length < 3) {
      tempData = [...tempData, card]
    } else {
      alert('You can only compare three items')
    }

    // if (tempData.length > 3) tempData.splice(0, 1)

    setPPCompareData(tempData)
  }

  const emptyContainer = () => {
    let tempEmpty = []
    for (let i = ppCompareData?.length; i < 3; i += 1) tempEmpty.push({ name: 'Add to compare' })
    return tempEmpty.map((each, index) => (
      <>
        <div
          key={index}
          className={`w-25 d-flex align-items-center justify-content-center ${styles['compareCardContainer']} ${styles['cursorPointer']}`}
        >
          <p className="m-0">{each?.name}</p>
        </div>
      </>
    ))
  }

  // useEffect(() => {
  //   const tempCompareData = []
  //   if (router?.query?.ids) {
  //     const compareIds = router?.query?.ids?.split(',')
  //     compareIds?.map(id =>
  //       plans?.value?.data?.forEach(each => each?.id?.toString() === id && tempCompareData.push(each)),
  //     )
  //     setPPCompareData(tempCompareData)
  //   }
  // }, [])

  const isDesktopOrMobile = useMediaQuery({
    query: '(max-width: 760px)',
  })

  const routeToCompare = () => {
    // let id: string = ppCompareData?.reduce((acc: string, item: any) => `${acc + item.id},`, '')
    // id = id?.slice(0, -1)
    // let id: string = ppCompareData?.reduce((acc: string, item: any) => `${acc + item.id},`, '')
    router.push({
      pathname: '/productPlan/compare',
      // query: {
      //   ...router.query,
      //   ids: id,
      //   price:
      //     ppCompareData?.length < 3
      //       ? `${ppCompareData[0].annual_contribution + ppCompareData[0].addon_amount},${
      //           ppCompareData[1].annual_contribution + ppCompareData[1].addon_amount
      //         }`
      //       : `${ppCompareData[0].annual_contribution + ppCompareData[0].addon_amount},${
      //           ppCompareData[1].annual_contribution + ppCompareData[1].addon_amount
      //         },${ppCompareData[2].annual_contribution + ppCompareData[2].addon_amount}`,
      // },
    })
  }

  // useEffect(() => {
  //   if (renewPolicyData) {
  //     console.log('renewPolicyData', renewPolicyData)
  //     const values = {
  //       make_id: '',
  //       model_id: '',
  //       year: '',
  //       value: '',
  //       date_of_expiry: '',
  //       company_ids: [],
  //       policy_type_ids: [],
  //       addon_ids: [],
  //     }
  //     // dispatch(setInsuranceDetails({ ...values }))
  //     console.log('values', values)
  //   }
  // }, [])

  const onClickCompare = () => {
    router.push({
      pathname: "/travel-results/compare",
    });
  }

  return (
    <div
      className={` ${styles['wrapper']}`}
      // style={{ border: '10px solid black' }}
    >
      {/* {!user && !showGenModal && <ModalForm showModal={showModal} setShowModal={setShowModal} />} */}
      <Container>
        <Row>
          <Col
            xl={3}
            lg={3}
            md={3}
            sm={4}
            sx={4}
            className={`${styles['ProductPlanFiltersContainer']} ${styles[sticky]}`}
          >
            <p className={`${styles['mainHeading']}`}>Filters</p>
            <TravelPlanFilters
              // plans={plans}
              insurancePlansState={insurancePlansState}
              // filterData={filterData}
              // insuranceTypeData={insuranceTypeData}
              // addOnsData={addOnsData}
              ppCompareData={ppCompareData}
              // setPPCompareData={setPPCompareData}
              // validateForm={validateForm}
            />
          </Col>
          <Col xl={9} lg={9} md={9} sm={8} xs={12} style={{}}>
            <p>Showing 8 car takaful deals</p>
              <>
                <TravelPlanCard
                  // key={index}
                  // data={{ ...card, value: plans.value.value }}
                  // hasPromotion={card.promotion_coupon_id !== 0}
                  // index={index}
                  // showCompare={showCompare}
                  // setShowCompare={setShowCompare}
                  // insurancePlansForm={insurancePlansForm}
                  // handleCompareData={handleCompareData}
                  // ppCompareData={ppCompareData}
                  // allCoverages={allCoverages}
                />
                {/* <ProductPlanCardMobile
                  key={index}
                  data={{ ...card, value: plans.value.value }}
                  hasPromotion={card.promotion_coupon_id !== 0}
                  index={index}
                  showCompare={showCompare}
                  setShowCompare={setShowCompare}
                  insurancePlansForm={insurancePlansForm}
                  handleCompareData={handleCompareData}
                  ppCompareData={ppCompareData}
                  allCoverages={allCoverages}
                /> */}
              </>
            <div className={styles['prodPlanConAdvWrapper']}>
              <div className={styles['prodPlanConAdvContainer']}>
                <ContactAdvisor />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
        {/* //  <div style={{ bottom: 0 }} className="w-100 position-fixed"> */}
        <div style={{ bottom: 0 }} className={`position-sticky fixed-bottom w-100 ${styles['compare-cont']}`}>
          <Container className="w-100 px-0">
            <div className={`${styles['compareWrapper']} w-100 m-0 p-0 d-flex`}>
              <div className={`${styles['compareContainer']} d-flex align-items-center justify-content-between`}>
                {ppCompareData.map((each, index) => (
                  <>
                    <CompareCard
                      key={index}
                      data={each}
                      handleCompareData={handleCompareData}
                      deleteCompareData={deleteCompareData}
                      rightBorderBit={index !== 2}
                    />
                  </>
                ))}
                {emptyContainer()}
              </div>
              <div className={`${styles['btnContainer']}`}>
                {ppCompareData?.length !== 1 ? (
                  <SignInUpButton btnTxt="Compare" link="" onClick={() => routeToCompare()} />
                ) : (
                  <div className={` ${styles['compareButton']}`}>
                    <p className={` ${styles['compareBtnTxt']}`}>Compare</p>
                  </div>
                )}
                <div
                  onClick={() => setPPCompareData([])}
                  className={`mt-2 d-flex align-items-center justify-content-center ${styles['clearAllBtn']}`}
                >
                  <p className={styles['clearAllTxt']}>Clear All</p>
                </div>
              </div>
              <div className={styles['btnMobileContainer']}>
                <div
                  // onclick mobile compare
                  onClick={() => {
                    if (ppCompareData?.length !== 1) routeToCompare()
                  }}
                  className={styles['compareBtnMobile']}
                >
                  <p className={styles['compareBtnMobileTxt']}>Compare</p>
                </div>
                <div onClick={() => setPPCompareData([])} className={styles['clearAllBtnMobile']}>
                  <p className={styles['compareBtnMobileTxt']}>Clear All</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      {showMobileFilter && (
        <div
          className={` ${styles['wrapperMobileFilter']}`}
          onClick={() => {
            setShowMobileFilter(false)
          }}
        >
          <div className={` ${styles['containerMobileFilter']}`} onClick={event => event.stopPropagation()}>
            <ProductPlanFilters
              plans={plans}
              insurancePlansState={insurancePlansState}
              filterData={filterData}
              insuranceTypeData={insuranceTypeData}
              addOnsData={addOnsData}
              ppCompareData={ppCompareData}
              setPPCompareData={setPPCompareData}
              setShowMobileFilter={setShowMobileFilter}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.auth.data.user,
  showGenModal: state.auth.authPopUp,
  renewPolicyData: state.auth.renewPolicyData,
})

export default TravelPlanMainContainer
