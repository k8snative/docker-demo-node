import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Api from 'src/lib/api'
import {
  renewPolicy as renewPolicyRedux,
  setCompareDetails,
  setInsuranceDetails as setInsuranceDetailsRedux,
  updateLoader,
} from 'src/lib/redux/auth/action'
import { getFileName } from 'src/lib/utils'
import * as Yup from 'yup'
import Footer from '~components/Footer/Footer'
import GetOurApp from '~components/GetOurApp/GetOurApp'
import Lottie from "react-lottie";
import Header from '../../components/Header'
import ProductPlanCategoryContainer from '../../components/ProductPlanCategoryContainer/ProductPlanCategoryContainer'
import ProductPlanCategoryContainerMobile from '../../components/ProductPlanCategoryContainerMobile/ProductPlanCategoryContainerMobile'
import ProductPlanMainContainer from '../../components/ProductPlanMainContainer/ProductPlanMainContainer'
import ProductPlanMobileFilters from '../../components/ProductPlanMobileFilters/ProductPlanMobileFilters'
import ProductPlanTopContainer from '../../components/ProductPlanTopContainer/ProductPlanTopContainer'
import SeoHead from '../../components/SeoHead'
import styles from '../../styles/Home.module.scss'
import style from './index.module.scss'
import loader from "../../../public/assets/loader.json";
import Modal from 'react-bootstrap/Modal';

const ProductPlan = ({ renewId, newValue }: { renewId: string | number; newValue: string | number }) => {
  const dispatch = useDispatch()
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false)
  const { make_id, model_id, year, value, sortOrder, addon_ids, company_ids, policy_type_ids } = useSelector(
    state => state?.auth?.planDetails,
  )

  const [plans, setPlans] = useState([])
  const initialCompareData = useSelector(state => state.auth.compareDetails)
  const [ppCompareData, setPPCompareData] = useState(initialCompareData)
  const renewPolicyData = useSelector(state => state?.auth?.renewPolicyData)
  const [formikValidateForm, setFormikValidateForm] = useState()
  const [orderDetailsState, setOrderDetailsState] = useState({})
  const isMobile = useMediaQuery({
    query: '(max-width: 580px)',
  })

  const validateForm = (formikHandleForm: any) => {
    setFormikValidateForm(formikHandleForm)
  }

  const { loading } = useSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useEffect(() => {
    const getPlans = async () => {

      const res = await Api('POST', `policy/filters?${sortOrder}`, {
        make_id,
        model_id,
        year: year?.toString(),
        value,
        addon_ids,
        company_ids,
        policy_type_ids,
      })
      if (res.data) {
        setPlans({ data: res.data, value })
      } else {
        setPlans([])
      }

    }
    getPlans()
    dispatch(renewPolicyRedux({}))
  }, [])

  const [insurancePlansForm, setInsurancePlansForm] = useState({
    make_id: make_id || '',
    model_id: model_id || '',
    sortOrder: 'sortby=value&orderby=desc',
    year: year || '',
    value: value || '',
    company_ids: [],
    policy_type_ids: [],
    addon_ids: [],
  })

  const getOrderDetails = async () => {

    const tempOrderDetails = await Api('GET', `order/${renewId}`)
    if (tempOrderDetails?.success) {
      setOrderDetailsState(tempOrderDetails?.data)
    }
  }



  useEffect(() => {
    if (!renewId || !newValue || renewPolicyData?.customer_name) return
    const orderDetails = orderDetailsState

    const { OrderDetailAuto } = orderDetails
    const values = {
      value: newValue,
      make_id: orderDetails?.OrderDetailAuto?.Make?.id,
      model_id: orderDetails?.OrderDetailAuto?.Model?.id,
      year: orderDetails?.OrderDetailAuto?.year,
      company_ids: [],
      policy_type_ids: [],
      addon_ids: [],
    }
    setInsurancePlansForm({ ...values })
    dispatch(setInsuranceDetailsRedux({ ...values }))
    const customerDetails = {
      previous_order_id: renewId,
      customer_name: OrderDetailAuto?.customer_name.split('.')[1].trim(),
      // customer_name: OrderDetailAuto?.customer_name,
      permanent_address: OrderDetailAuto?.permanent_address,
      current_address: OrderDetailAuto?.current_address,
      // contact: OrderDetailAuto?.contact?.slice(-10),
      contact: OrderDetailAuto?.contact,
      email: OrderDetailAuto?.email,
      date_of_birth: OrderDetailAuto?.date_of_birth,
      place_of_birth: OrderDetailAuto?.place_of_birth,
      father_name: OrderDetailAuto?.father_name || '',
      mother_name: OrderDetailAuto?.mother_name,
      nationality_id: OrderDetailAuto?.nationality_id,
      cnic_number: OrderDetailAuto?.cnic_number,
      cnic_issue_date: OrderDetailAuto?.cnic_issue_date,
      cnic_expiry_date: OrderDetailAuto?.cnic_expiry_date,
      occupation: OrderDetailAuto?.occupation,
      source_of_income: OrderDetailAuto?.source_of_income,
      previous_insurance_company_name: OrderDetailAuto?.Policy?.CompanySetup?.name,
      previous_date_of_expiry: orderDetails?.policy_expiry_date,
      benificiary_name: OrderDetailAuto?.benificiary_name,
      // benificiary_contact: OrderDetailAuto?.benificiary_contact?.slice(-10),
      benificiary_contact: OrderDetailAuto?.benificiary_contact,
      benificiary_cnic_number: OrderDetailAuto?.benificiary_cnic_number,
      benificiary_address: OrderDetailAuto?.benificiary_address,
      benificiary_relation: OrderDetailAuto?.benificiary_relation,
      is_filer: OrderDetailAuto?.is_filer,
      is_government_employee: OrderDetailAuto?.is_government_employee,
      phone_code: OrderDetailAuto?.phone_code,
      benificiary_contact_phone_code: OrderDetailAuto?.benificiary_contact_phone_code,
      honorifics: `${OrderDetailAuto?.customer_name.split('.')[0]}.`,
      color: OrderDetailAuto?.color,
      engine_number: OrderDetailAuto?.engine_number,
      chassis_number: OrderDetailAuto?.chassis_number,
      registration_number: OrderDetailAuto?.registration_number,
      'additional-document':
        orderDetails?.AdditionalDocuments?.length > 0
          ? [
            {
              filename: getFileName(orderDetails?.AdditionalDocuments[0]?.document),
              filePath: orderDetails?.AdditionalDocuments[0]?.document,
            },
          ]
          : [],
      cnic_back: {
        filename: getFileName(OrderDetailAuto?.id_proof_back_path),
        filePath: OrderDetailAuto?.id_proof_back_path,
      },
      cnic_front: {
        filename: getFileName(OrderDetailAuto?.id_proof_front_path),
        filePath: OrderDetailAuto?.id_proof_front_path,
      },
      'income-proof': {
        filename: getFileName(OrderDetailAuto?.income_proof_path),
        filePath: OrderDetailAuto?.income_proof_path,
      },
      invoice: {
        filename: getFileName(OrderDetailAuto?.invoice_path),
        filePath: OrderDetailAuto?.invoice_path,
      },
      passport: {
        filename: getFileName(OrderDetailAuto?.id_proof_front_path),
        filePath: OrderDetailAuto?.id_proof_front_path,
      },
      'running-paper': {
        filename: getFileName(OrderDetailAuto?.running_paper_path),
        filePath: OrderDetailAuto?.running_paper_path,
      },
      isPassport: !!OrderDetailAuto?.id_proof_back_path,
      signature_path: OrderDetailAuto?.signature_path,
      previous_policy_id: OrderDetailAuto?.Policy?.id
    }
    dispatch(renewPolicyRedux({ ...customerDetails }))
    const getPlans = async () => {
      const res = await Api('POST', `policy/filters?${sortOrder}`, {
        make_id,
        model_id,
        year: year?.toString(),
        value,
        addon_ids,
        company_ids,
        policy_type_ids,
      })
      if (res.data) {
        setPlans({ data: res.data, value })
      } else {
        setPlans([])
      }
    }
    getPlans()

    // }, [renewId, newValue, orderDetailsState, renewPolicyData])
  }, [orderDetailsState])

  useEffect(() => {
    dispatch(setCompareDetails(ppCompareData))
  }, [ppCompareData])

  useEffect(() => {
    if (renewId || newValue) getOrderDetails()
  }, [renewId, newValue])

  return (
    <div className={`position-relative ${styles['container']}`}>
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
      <Modal
        fullscreen={true}
        centered={true}
        show={loading || !plans.data}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{
          opacity: '.75',
          justifyContent: 'space-evenly'
        }}
        contentClassName={`justify-content-evenly`}
      >
        <Lottie
          height={"56vh"}
          width={isMobile ? 300 : 615}
          options={{
            loop: true,
            autoplay: true,
            animationData: loader,
          }}
        />
      </Modal>
      <div>
        <ProductPlanTopContainer />
        <ProductPlanCategoryContainer
          plans={{ value: plans, setValue: (data: any) => setPlans(data) }}
          insurancePlansState={{ insurancePlansForm, setInsurancePlansForm: (data: any) => setInsurancePlansForm(data) }}
          ppCompareData={ppCompareData}
          setPPCompareData={setPPCompareData}
          setValidateForm={validateForm}
        />
        {isMobile ? (
          <div className={`${style['sticky']}`}>
            <ProductPlanCategoryContainerMobile
              plans={{ value: plans, setValue: (data: any) => setPlans(data) }}
              insurancePlansState={{
                insurancePlansForm,
                setInsurancePlansForm: (data: any) => setInsurancePlansForm(data),
              }}
              ppCompareData={ppCompareData}
              setPPCompareData={setPPCompareData}
              showMobileFilter={showMobileFilter}
              setShowMobileFilter={setShowMobileFilter}
              // previousInsurancePlansForm={structuredClone(insurancePlansForm)}
            />
          </div>
        ) : (
          <></>
        )}
        <ProductPlanMainContainer
          plans={{ value: plans, setValue: setPlans }}
          insurancePlansState={{ insurancePlansForm, setInsurancePlansForm }}
          ppCompareData={ppCompareData}
          setPPCompareData={setPPCompareData}
          showMobileFilter={showMobileFilter}
          setShowMobileFilter={setShowMobileFilter}
          validateForm={formikValidateForm}
        />
        <GetOurApp />

      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: { renewId: context?.query?.id || '', newValue: context?.query?.value || '' }, // will be passed to the page component as props
  }
}

// export default ProductPlan

const mapStateToProps = () => { }

const mapDispatchProps = {
  setInsuranceDetails: setInsuranceDetailsRedux,
  renewPolicy: renewPolicyRedux,
}

export default connect(mapStateToProps, mapDispatchProps)(ProductPlan)
