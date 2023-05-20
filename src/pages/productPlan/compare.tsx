import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import { setCompareDetails } from 'src/lib/redux/auth/action'
import { getCompareData } from 'src/lib/redux/auth/reducer'
import CompareDealsWeb from '~components/ComparedealsWeb/ComparedealsWeb'
import ContactOurAdvisorMob from '~components/ContactOurAdvisorMob'
import Footer from '~components/Footer/Footer'
import GetOurApp from '~components/GetOurApp/GetOurApp'

import PakQatar from '../../../public/assets/PakQatar.png'
import UBL from '../../../public/assets/ubl.png'
import CompareDeals from '../../components/CompareDeals/CompareDeals'
import Header from '../../components/Header'
import SeoHead from '../../components/SeoHead'
import styles from '../../styles/Home.module.scss'

const Compare = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 430px)',
  })

  const compareDataRedux = useSelector(state => state.auth.compareDetails)
  const [compareState, setCompareState] = useState([])
  const [serverData, setServerData] = useState([])
  const [serverCoverage, setServerCoverage] = useState([])
  const [serverAddOns, setServerAddOns] = useState([])

  const { ids, amount } = useSelector(getCompareData)

  const dispatch = useDispatch()
  const deleteFromCompareState = id => {
    const tempData = compareState.filter(each => each?.id !== id)
    setCompareState(tempData)
    const dataForRedux = compareDataRedux.filter(item => item.id !== id)
    dispatch(setCompareDetails(dataForRedux))
  }

  const onLoad = async () => {
    const res = await Api('POST', 'policy/multiple', { ids })
    const resCoverages = await Api('GET', 'coverage')
    const resAddOns = await Api('GET', 'addons')

    const orderDict = ids.reduce((acc: object, item: number, index: number) => {
      acc[item] = index
      return acc
    }, {})
    const tempServerData = res?.data?.sort((a: any, b: any) => orderDict[a.id] - orderDict[b.id])
    setServerData(tempServerData)
    setServerCoverage(resCoverages.data)
    setServerAddOns(resAddOns.data)
  }
  useEffect(() => {
    onLoad()
  }, [])

  const checkData = (APICompareData, tempCompareData, allCoverages) => {
    for (let i = 0; i < APICompareData.length; i += 1) {
      for (let j = 0; j < tempCompareData[i].details.length - 1; j += 1) {
        for (let k = 0; k < tempCompareData[i].details[j]?.subInfo.length; k += 1) {
          for (let l = 0; l < APICompareData[i]?.CompanySetup?.CompanyCoverages.length; l += 1) {
            if (
              tempCompareData[i].details[j].subInfo[k]?.name ===
              APICompareData[i]?.CompanySetup?.CompanyCoverages[l]?.Coverage?.name
            )
              tempCompareData[i].details[j].subInfo[k].bit =
                APICompareData[i]?.CompanySetup?.CompanyCoverages[l]?.Coverage?.status
          }
        }
      }
      for (let j = 0; j < tempCompareData[i]?.details[allCoverages?.length]?.subInfo.length; j += 1) {
        for (let k = 0; k < APICompareData[i]?.PolicyAddons.length; k += 1) {
          if (
            tempCompareData[i]?.details[allCoverages?.length]?.subInfo[j]?.name ===
            APICompareData[i]?.PolicyAddons[k]?.Addon?.name
          ) {
            tempCompareData[i].details[allCoverages?.length].subInfo[j].bit =
              APICompareData[i]?.PolicyAddons[k]?.Addon?.status
          }
        }
      }
    }
    setCompareState(tempCompareData)
  }

  const setDataForUI = (APICompareData, tempCompareData, allCoverages, allAddOns, amount, ids) => {
    for (let i = 0; i < APICompareData.length; i += 1) {
      tempCompareData[i] = {
        img: APICompareData[i]?.CompanySetup?.logo,
        heading: APICompareData[i]?.name,
        pin: i === 0 ? true : false,
        details: [],
        price: amount[i],
        id: ids[i],
        policyType: APICompareData[i]?.PolicyType?.name,
      }
      for (let j = 0; j < allCoverages.length; j += 1) {
        if (allCoverages[j]?.status) {
          tempCompareData[i].details[j] = {
            heading: allCoverages[j]?.name,
            subInfo: [],
          }
          for (let k = 0; k < allCoverages[j].child_coverages.length; k += 1) {
            tempCompareData[i].details[j].subInfo[k] = {
              name: allCoverages[j].child_coverages[k].name,
              bit: false,
            }
          }
        }
      }
      tempCompareData[i].details[allCoverages.length] = {
        heading: 'ADD-ONS',
        subInfo: [],
      }
      for (let j = 0; j < allAddOns.length; j += 1) {
        tempCompareData[i].details[allCoverages.length].subInfo[j] = {
          name: allAddOns[j].name,
          bit: false,
        }
      }
    }
    // setCompareState(tempCompareData)
    checkData(APICompareData, tempCompareData, allCoverages)
  }

  useEffect(() => {
    const APICompareData = serverData
    const allCoverages = serverCoverage
    const allAddOns = serverAddOns
    const tempCompareData = JSON.parse(JSON.stringify(compareState))

    // setData(APICompareData, tempCompareData)
    setDataForUI(APICompareData, tempCompareData, allCoverages, allAddOns, amount, ids)
  }, [serverData])

  return (
    <div className={styles['container']}>
      <SeoHead
        title="Takaful Bazaar"
        description="Leading online insurance"
        customLinkTags={[
          {
            rel: 'icon',
            href: '/favIcon.png',
          },
        ]}
      />
      <Header />
      <CompareDealsWeb data={compareState} deleteFromCompareState={deleteFromCompareState} />
      <CompareDeals data={compareState} />
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
      {!isDesktopOrLaptop && (
        <>
          {/* <ContactOurAdvisorMob /> */}
          <GetOurApp />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Compare
