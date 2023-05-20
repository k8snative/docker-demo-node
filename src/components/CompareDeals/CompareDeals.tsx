import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'
import { clearBuyNow, clearPurchaseInfo, setBuyNowData } from 'src/lib/redux/auth/action'
import currencyFormat from 'src/utils/currencyFormat'
import ContactOurAdvisorMob from '~components/ContactOurAdvisorMob'

import GoBackRed from '../../../public/assets/arrowBackred.png'
import Cross from '../../../public/assets/cardcross.png'
import WHeadphones from '../../../public/assets/contactphone.png'
import downGrey from '../../../public/assets/downGrey.png'
import True from '../../../public/assets/tickDropDown.png'
import upGrey from '../../../public/assets/upGrey.png'
import styles from './CompareDeals.module.scss'

const ComparePageMobile = ({ data }: { data: any }) => {
  // const [compareData, setCompareData] = useState(JSON.parse(JSON.stringify(data)))
  const [compareData, setCompareData] = useState(JSON.parse(JSON.stringify(data)))
  const compareDetails = useSelector(state => state.auth.compareDetails)
  const [selectedTabObj, setSelectedTabObj] = useState<Set<String>>(new Set())
  const [selectedTab, setSelectedTab] = useState(compareData[0]?.details[0]?.heading)
  const [showDiv, setShowDiv] = useState(true)
  const addon_ids = useSelector(state => state.auth.planDetails.addon_ids)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.data.user)

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(data))
    setCompareData(tempData)
    // setSelectedTab(compareData[0]?.details[0]?.heading)
    setSelectedTabObj(new Set(selectedTabObj.add(tempData[0]?.details[0]?.heading)))
  }, [data])
  const handlePinChange = (index: any) => {
    const cardValue = JSON.parse(JSON.stringify(compareData))
    const cardIndex = cardValue?.findIndex((x: any) => x.pin === true)
    cardValue[cardIndex]!.pin = false
    cardValue[index]!.pin = true
    setCompareData(cardValue)
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
        policy_type_id: tempData?.policy_type_id,
        annual_contribution: tempData?.annual_contribution + (tempData?.addon_amount || 0),
        insurance_rate: tempData?.insurance_rate,
        company_logo_url: tempData?.company_logo_url,
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

  const router = useRouter()
  return (
    <div
      // style={{ border: '5px solid black' }}
      className={`m-0 w-100 d-flex flex-column position-relative ${styles['comparemainwrapper']}`}
    >
      {/* {showDiv && (
        <div>
          <div
            onClick={() => {
              setShowDiv(false)
            }}
            className={`m-0  w-100  ${styles['indicatordiv']}`}
          >
            <div className={`m-0  w-100  ${styles['indicatordiv2']}`}>
              <p className={`m-0  ${styles['indicatortxt']}`}>Scroll left to compare</p>
              <div className={` d-flex justify-content-center align-items-center ${styles['selectors']}`}>
                <div className={`d-flex align-items-center ${styles['rightarrow']} `}>
                  <Image src={RArrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <div className={`m-0 p-0 w-100 ${styles['upperdiv']}`}>
        <Container>
          {/* <Link href={{ pathname: '/productPlan' }}> */}
          <div
            onClick={() => {
              let id: string = data?.reduce((acc: string, item: any) => `${acc + item.id},`, '')
              id = id?.slice(0, -1)
              router.push({
                pathname: '/productPlan',
                query: {
                  ...router.query,
                  ids: id,
                },
              })
            }}
            className={styles['gobackdiv']}
          >
            <div className={styles['gobackarrow']}>
              <Image src={GoBackRed} alt="backarrow" />
            </div>
            <p className={`mt-3 ${styles['gobacktxt']}`}>Back To Search</p>
          </div>
          {/* </Link> */}
        </Container>
      </div>

      <div className={`mx-0 p-0 w-100 d-flex flex-column ${styles['comparisondivs']}`}>
        <Container>
          <div className="mx-0 mt-0 p-0 ">
            <p className={`mt-0 ${styles['comparisontxtmob']}`}>
              Comparison between{' '}
              {data?.map((each, index) => (
                <span key={index}>
                  <span className={`m-0 ${styles['redTxt']}`}>{`${each?.heading}`}</span>
                  <span className={`m-0`}>{`${
                    index === data?.length - 1 ? '' : index === data?.length - 2 ? ' & ' : ', '
                  }`}</span>
                </span>
              ))}
            </p>
          </div>
        </Container>
        <div className="mx-0 p-0 w-100 d-flex">
          <div className={` ${styles['mobiletabscontainer']}`}>
            <Container>
              {compareData[0]?.details.map((each: any, index: number) => (
                <>
                  <div
                    key={index}
                    className={`w-100 ${styles['mobtabheadingdiv']}`}
                    onClick={() => {
                      // if (selectedTab === each?.heading) setSelectedTab('')
                      // else setSelectedTab(each?.heading)
                      if (selectedTabObj.has(each.heading)) {
                        const tempOpenGroups = new Set(selectedTabObj)
                        tempOpenGroups.delete(each.heading)
                        setSelectedTabObj(tempOpenGroups)
                      } else {
                        setSelectedTabObj(new Set(selectedTabObj.add(each.heading)))
                      }
                    }}
                  >
                    <div className={`mx-2 d-flex align-items-center justify-content-center ${styles['mobtabarrow']}`}>
                      <Image priority={true} src={selectedTabObj.has(each?.heading) ? upGrey : downGrey} alt="" />
                    </div>
                    <p className={` ${styles['mobtabheading']}`}>{each?.heading}</p>
                  </div>
                  {/* {selectedTab === each?.heading && ( */}
                  {selectedTabObj.has(each?.heading) && (
                    <div>
                      {each?.subInfo.map((each2: any, index2: number) => (
                        <div key={index2} className={`mx-0 w-100 ${styles['mobtabsubheadingdiv']}`}>
                          <p className={`m-0 ${styles['mobtabsubheading']}`}>{each2?.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ))}
            </Container>
          </div>

          <div className={` ${styles['cardsContainer']}`}>
            <div className={` ${styles['staticCardContainer']}`}>
              {compareData.map(
                (card: any, index: number) =>
                  card?.pin && (
                    <div className={styles['cardMainContainer']} key={index}>
                      <div key={index} className={` ${styles['mobileCardDiv']}`}>
                        <div className={` ${styles['mobilecard']}`}>
                          <div className={` ${styles['mobimage']}`}>
                            {/* <img
                              alt=""
                              src={`https://api.tb-dev.ideabox.pk/${card?.img}`}
                              className={styles['apiImg']}
                            /> */}
                            <Image
                              alt=""
                              src={card?.img}
                              width={'100%'}
                              height={'100%'}
                              objectFit={'contain'}
                            />
                          </div>
                          <div className={'w-100 px-1'}>
                            <p className={` ${styles['mobcardtxt']}`}>{card.heading} </p>
                            <p className={styles['mobcardpricetxt']}>
                              Rs.{currencyFormat(Number(card?.price) || 0 || 0)}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            navigateToPaymentPage(card.id)
                          }}
                          className={`${styles['buynowbtnmob']}`}
                        >
                          <p className={`m-0 ${styles['buynowbtnmobtxt']}`}>Buy Now</p>
                        </div>
                      </div>
                      {card?.details.map((each: any, index2: number) => (
                        <div key={index2}>
                          <div key={index2} className={`w-100 ${styles['staticard']}`}></div>
                          {/* {selectedTab === each?.heading && ( */}
                          {selectedTabObj.has(each?.heading) && (
                            <div>
                              {each?.subInfo.map((each2: any, index3: number) => (
                                <div
                                  key={index3}
                                  className={`mx-0 p-0 w-100 d-flex align-items-center justify-content-center ${styles['staticardtab']}`}
                                >
                                  <div className={` ${styles['imagecont']}`}>
                                    <Image src={each2?.bit ? True : Cross} alt="" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ),
              )}
            </div>
            {/* <div className={` ${compareData?.length === 2 && styles['staticCardContainer']}`}> */}
            <div className={` ${styles['staticCardContainer']}`}>
              <div className={` ${styles['staticCardContainerScroll']}`}>
                {compareData.map(
                  (card: any, index: number) =>
                    !card?.pin && (
                      <div className={` ${styles['cardMainContainer']}  ${styles['marginRight']}`} key={index}>
                        <div key={index} className={` ${styles['mobileCardDiv']}`}>
                          <div className={` ${styles['mobilecard']}`}>
                            <div className={` ${styles['mobimage']}`}>
                              <Image
                                alt=""
                                src={card?.img}
                                width={'100%'}
                                height={'100%'}
                                objectFit={'contain'}
                              />
                            </div>
                            <div className={'w-100 px-1'}>
                              <p className={` ${styles['mobcardtxt']}`}>{card.heading} </p>
                              <p className={styles['mobcardpricetxt']}>
                                Rs.{currencyFormat(Number(card?.price) || 0 || 0)}
                              </p>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              navigateToPaymentPage(card.id)
                            }}
                            className={`${styles['buynowbtnmob']}`}
                          >
                            <p className={`m-0 ${styles['buynowbtnmobtxt']}`}>Buy Now</p>
                          </div>
                        </div>
                        {card?.details.map((each: any, index2: number) => (
                          <div key={index2}>
                            <div key={index2} className={`${styles['staticard']}`}>
                              {!card.pin && index2 === 0 && (
                                <div className={`${styles['pinbutton']}`} onClick={() => handlePinChange(index)}>
                                  <p className={`m-0 ${styles['pinbuttontxt']}`}>Pin</p>
                                </div>
                              )}
                            </div>
                            {/* {selectedTab === each?.heading && ( */}
                            {selectedTabObj.has(each?.heading) && (
                              <div>
                                {each?.subInfo.map((each2: any, index3: number) => (
                                  <div
                                    key={index3}
                                    className={`mx-0 p-0 w-100 d-flex align-items-center justify-content-center ${styles['staticardtab']}`}
                                  >
                                    <div className={` ${styles['imagecont']}`}>
                                      <Image src={each2?.bit ? True : Cross} alt="" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CompareDeals = ({ data }: { data: any }) => (
  <div style={{ position: 'relative' }}>
    <MediaQuery maxWidth={601}>
      <ComparePageMobile data={data} />
      <div style={{ bottom: 0 }} className="w-100 position-fixed">
        <ContactOurAdvisorMob />
      </div>
    </MediaQuery>
  </div>
)

export default CompareDeals
