import { Reducer } from 'redux'
import { calculateAmountAfterPromotion } from 'src/lib/utils'
import moment from 'moment'
import { AuthActionTypes, AuthState } from './types'

export const initialState: AuthState = {
  data: {
    user: undefined,
  },
  errors: undefined,
  loading: false,
  authPopUp: false,
  compareDetails: [],
  allowedTabIndex: 0,
  lockedTabIndex: -1,
  planDetails: {
    make_id: '',
    model_id: '',
    year: '',
    value: 0,
    sortOrder: '',
    company_ids: [],
    policy_type_ids: [],
    addon_ids: [],
    buy_now: {
      policy_id: 0,
      policy_type_id: 0,
      annual_contribution: 0,
      insurance_rate: 0,
      company_logo_url: '',
      policy_name: '',
      policy_addons: [],
      promotion_coupon_id: 0,
      promotion_discount_type: '',
      promotion_discount_value: 0,
      total_discount_value: 0,
    },
  },
  purchaseDetails: {
    order_id: 0,
    payment_mode: '',
    payment_status: '',
    order_status: '',
    addons: null,
    promotion_coupon_id: 0,
    promotion_discount_type: '',
    promotion_discount_value: 0,
    total_discount_value: 0,
    details: {
      order_detail_id: 0,
      policy_id: 0,
      premium_rate: 0,
      total_price: 0,
      customer_name: '',
      permanent_address: '',
      current_address: '',
      contact: '+92',
      email: '',
      date_of_birth: null,
      place_of_birth: '',
      father_name: '',
      mother_name: '',
      nationality_id: 170,
      cnic_number: '',
      cnic_issue_date: null,
      cnic_expiry_date: null,
      occupation: '',
      source_of_income: '',
      previous_insurance_company_name: '',
      previous_date_of_expiry: null,
      benificiary_name: '',
      benificiary_contact: '+92',
      benificiary_cnic_number: '',
      benificiary_address: '',
      benificiary_relation: '',
      is_filer: true,
      is_government_employee: true,
      phone_code: '+92',
      benificiary_contact_phone_code: '+92',
      honorifics: '',
    },
    vehicleDetails: {
      make_id: 0,
      model_id: 0,
      year: 0,
      value: 0,
      is_brand_new: false,
      modification: false,
      color: '',
      engine_number: '',
      chassis_number: '',
      registration_number: '',
      survey_request_date: null,
      survey_request_time: null,
      city_id: 0,
      survey_address: '',
      survey_instructions: '',
      description: '',
      service_network_id: '',
      three_s_dealer_is_other: false,
      three_s_dealer_name: '',
      three_s_dealer_contact: '',
      three_s_dealer_city: '',
      three_s_dealer_address: ''
    },
    documentDetails: {
      cnic_front: {
        filename: '',
        filePath: '',
      },
      cnic_back: {
        filename: '',
        filePath: '',
      },
      ['income-proof']: {
        filename: '',
        filePath: '',
      },
      ['running-paper']: {
        filename: '',
        filePath: '',
      },
      invoice: {
        filename: '',
        filePath: '',
      },
      ['additional-documents']: null,
      passport: {
        filename: '',
        filePath: '',
      },
      isPassport: false,
    },
  },
  renewPolicyData: {
    customer_name: '',
    permanent_address: '',
    current_address: '',
    contact: '',
    email: '',
    date_of_birth: null,
    place_of_birth: '',
    father_name: '',
    mother_name: '',
    nationality_id: 170,
    cnic_number: '',
    cnic_issue_date: null,
    cnic_expiry_date: null,
    occupation: '',
    source_of_income: '',
    previous_insurance_company_name: '',
    previous_date_of_expiry: null,
    benificiary_name: '',
    benificiary_contact: '',
    benificiary_cnic_number: '',
    benificiary_address: '',
    benificiary_relation: '',
    is_filer: true,
    is_government_employee: true,
    phone_code: '',
    benificiary_contact_phone_code: '',
    honorifics: '',
    color: '',
    engine_number: '',
    chassis_number: '',
    registration_number: '',
    'additional-document': [{ filename: '', filePath: '' }],
    cnic_back: { filename: '', filePath: '' },
    cnic_front: { filename: '', filePath: '' },
    'income-proof': { filename: '', filePath: '' },
    invoice: { filename: '', filePath: '' },
    passport: { filename: '', filePath: '' },
    'running-paper': { filename: '', filePath: '' },
    isPassport: false,
    signature_path: '',
    previous_policy_id: 0,
  },
  leadData: {
    number: '',
    emailState: '',
    name: '',
    isExistingUser: false
  },
  paymentId: '',
}

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, user: action['payload'].user },
      }
    }
    case AuthActionTypes.USER_LOGOUT: {
      return {
        ...state,
        loading: false,
        ...initialState.data,
      }
    }
    case AuthActionTypes.LEAD_GENERATED: {
      return {
        ...state,
        loading: false,
        // authPopUp: true,
      }
    }
    // Compare reducer starts here
    case AuthActionTypes.ADD_ITEM_IN_COMPARE: {
      return {
        ...state,
        loading: false,
        compareDetails: action?.payload?.compareDetails,
      }
    }

    // Compare reducer end here

    case AuthActionTypes.SET_PERSONAL_DETAILS: {
      return {
        ...state,
        loading: false,
        purchaseDetails: { ...state.purchaseDetails, ...action['payload'].personalData },
      }
    }
    case AuthActionTypes.UPDATE_PERSONAL_DETAILS: {
      return {
        ...state,
        loading: false,
        purchaseDetails: { ...state.purchaseDetails, details: { ...action['payload'].personalDetails } },
      }
    }
    case AuthActionTypes.SET_VEHICLE_DETAILS: {
      return {
        ...state,
        loading: false,
        purchaseDetails: { ...state.purchaseDetails, vehicleDetails: { ...action['payload'].vehicleData } },
      }
    }
    case AuthActionTypes.SET_DOCUMENT_DETAILS: {
      const { order_id = 0, order_detail_id = 0 } = action.payload;
      return {
        ...state,
        loading: false,
        purchaseDetails: { 
          ...state.purchaseDetails,
          order_id,
          details: {
            ...state.purchaseDetails.details,
            order_detail_id,
          },
          documentDetails: { ...action['payload'].documentData } 
        },
      }
    }
    
    case "SET_EDIT_ORDER_DETAILS" : {
      const  fetchData  = {...action['payload'].data}
      const { OrderDetailAuto } = fetchData
      return {
        ...state,
        planDetails: {
          make_id: OrderDetailAuto?.Make?.id,
          model_id: OrderDetailAuto?.Model?.make_id,
          year: OrderDetailAuto?.year,
          value: OrderDetailAuto?.value,
          sortOrder: '', //
          company_ids: [], //
          policy_type_ids: OrderDetailAuto?.Policy?.policy_type_ids,
          addon_ids: fetchData?.OrderDetailAutoAddons, //
          buy_now: {
            policy_id: OrderDetailAuto?.Policy?.id,
            policy_type_id: OrderDetailAuto?.policy_type_id,
            annual_contribution: OrderDetailAuto?.total_price, //
            insurance_rate: OrderDetailAuto?.Policy?.insurance_rate,
            company_logo_url: OrderDetailAuto?.Policy?.CompanySetup?.logo,
            policy_name: OrderDetailAuto?.Policy?.name,
            policy_addons: [], //
            promotion_coupon_id: fetchData?.promotion_coupon_id ? fetchData?.promotion_coupon_id : 0,
            promotion_discount_type: fetchData?.promotion_discount_type,
            promotion_discount_value: fetchData?.promotion_discount_value,
            total_discount_value: fetchData?.total_discount_value,
          },
        },
        purchaseDetails: {
          order_id: OrderDetailAuto?.order_id,
          payment_mode: fetchData?.payment_mode,
          payment_status: fetchData?.payment_status,
          order_status: fetchData?.order_status,
          addons: null, //
          promotion_coupon_id: fetchData?.promotion_coupon_id,
          promotion_discount_type: fetchData?.promotion_discount_type,
          promotion_discount_value: fetchData?.promotion_discount_value,
          total_discount_value: fetchData?.total_discount_value,
          details: {
            order_detail_id: OrderDetailAuto?.id,
            policy_id: OrderDetailAuto?.Policy?.id,
            premium_rate: OrderDetailAuto?.premium_rate,
            total_price: OrderDetailAuto?.total_price,
            customer_name: OrderDetailAuto?.customer_name,
            permanent_address: OrderDetailAuto?.permanent_address,
            current_address: OrderDetailAuto?.current_address,
            contact: OrderDetailAuto?.contact,
            email: OrderDetailAuto?.email,
            date_of_birth: moment(OrderDetailAuto?.date_of_birth).format('MM/DD/YYYY'),
            place_of_birth: OrderDetailAuto?.place_of_birth,
            father_name: OrderDetailAuto?.father_name,
            mother_name: OrderDetailAuto?.mother_name,
            nationality_id: parseInt(OrderDetailAuto?.nationality_id),
            cnic_number: OrderDetailAuto?.cnic_number,
            cnic_issue_date: moment(OrderDetailAuto?.cnic_issue_date).format('MM/DD/YYYY'),
            cnic_expiry_date: moment(OrderDetailAuto?.cnic_expiry_date).format('MM/DD/YYYY'),
            occupation: OrderDetailAuto?.occupation,
            source_of_income: OrderDetailAuto?.source_of_income,
            previous_insurance_company_name: OrderDetailAuto?.previous_insurance_company_name === null ? '' : OrderDetailAuto?.previous_insurance_company_name,
            previous_date_of_expiry: OrderDetailAuto?.previous_date_of_expiry === null ? '' : OrderDetailAuto?.previous_date_of_expiry,
            benificiary_name: OrderDetailAuto?.benificiary_name,
            benificiary_contact: OrderDetailAuto?.benificiary_contact,
            benificiary_cnic_number: OrderDetailAuto?.benificiary_cnic_number,
            benificiary_address: OrderDetailAuto?.benificiary_address,
            benificiary_relation: OrderDetailAuto?.benificiary_relation,
            is_filer: OrderDetailAuto?.is_filer,
            is_government_employee: OrderDetailAuto?.is_government_employee,
            phone_code: '',//
            benificiary_contact_phone_code: '', //
            honorifics: "", //
          },
          vehicleDetails: {
            make_id: OrderDetailAuto?.Make?.id,
            model_id: OrderDetailAuto?.Model?.make_id,
            year: OrderDetailAuto?.year,
            value: OrderDetailAuto?.value,
            is_brand_new: OrderDetailAuto?.is_brand_new,
            modification: OrderDetailAuto?.modification,
            color: OrderDetailAuto?.color,
            engine_number: OrderDetailAuto?.engine_number,
            chassis_number: OrderDetailAuto?.chassis_number,
            registration_number: OrderDetailAuto?.registration_number,
            survey_request_date: OrderDetailAuto?.survey_request_date ? moment(OrderDetailAuto?.survey_request_date).format('MM/DD/YYYY') : '',
            survey_request_time: OrderDetailAuto?.survey_request_time ? OrderDetailAuto?.survey_request_time : '',
            city_id: OrderDetailAuto?.city_id ? parseInt(OrderDetailAuto?.city_id ): 0,
            survey_address: OrderDetailAuto?.survey_address ? OrderDetailAuto?.survey_address : '',
            survey_instructions: OrderDetailAuto?.survey_instructions ? OrderDetailAuto?.survey_instructions : '',
            description: OrderDetailAuto?.description ? OrderDetailAuto?.description : '',
            service_network_id: OrderDetailAuto?.service_network_id ? OrderDetailAuto?.service_network_id : 0,
            three_s_dealer_is_other: OrderDetailAuto?.three_s_dealer_is_other ? OrderDetailAuto?.three_s_dealer_is_other : false,
            three_s_dealer_name: OrderDetailAuto?.three_s_dealer_name ? OrderDetailAuto?.three_s_dealer_name: '',
            three_s_dealer_contact: OrderDetailAuto?.three_s_dealer_contact ? OrderDetailAuto?.three_s_dealer_contact : '',
            three_s_dealer_city: OrderDetailAuto?.three_s_dealer_city? OrderDetailAuto?.three_s_dealer_city: '',
            three_s_dealer_address: OrderDetailAuto?.three_s_dealer_address ? OrderDetailAuto?.three_s_dealer_address : ''
          },
          documentDetails: {
            cnic_front: {
              filename: OrderDetailAuto?.id_proof_front_path ? 'Cnic Front' : '',
              filePath: OrderDetailAuto?.id_proof_front_path ? OrderDetailAuto?.id_proof_front_path : '',
            },
            cnic_back: {
              filename: OrderDetailAuto?.id_proof_back_path ? 'Cnic Back' : '',
              filePath: OrderDetailAuto?.id_proof_back_path ? OrderDetailAuto?.id_proof_back_path : '',
            },
            ['income-proof']: {
              filename: OrderDetailAuto?.income_proof_path ? 'Income Proof' : '',
              filePath: OrderDetailAuto?.income_proof_path ? OrderDetailAuto?.income_proof_path : '',
            },
            ['running-paper']: {
              filename: OrderDetailAuto?.running_paper_path ? 'Running Paper' : '',
              filePath: OrderDetailAuto?.running_paper_path ? OrderDetailAuto?.running_paper_path : '',
            },
            invoice: {
              filename: OrderDetailAuto?.invoice_path ? 'Invoice' : '',
              filePath: OrderDetailAuto?.invoice_path ? OrderDetailAuto?.invoice_path : '',
            },
            ['additional-documents']: fetchData?.AdditionalDocuments ? fetchData?.AdditionalDocuments : '',
            passport: {
              filename: '',
              filePath: '',
            },
            isPassport: false,
          },
        },
      }
    }

    case AuthActionTypes.CLEAR_PURCHASE_INFO: {
      return {
        ...state,
        purchaseDetails: initialState.purchaseDetails,
        allowedTabIndex: 0,
        lockedTabIndex: -1,
      }
    }
    case AuthActionTypes.SET_ALLOWED_TABS: {
      return {
        ...state,
        allowedTabIndex: action['payload'].tabIndex,
      }
    }
    case AuthActionTypes.SET_LOCKED_TABS: {
      return {
        ...state,
        lockedTabIndex: action['payload'].tabIndex,
      }
    }
    case AuthActionTypes.SET_INSURANCE_DETAILS: {
      return {
        ...state,
        planDetails: { ...state.planDetails, ...action['payload'].insuranceDetails },
      }
    }
    case AuthActionTypes.SET_BUY_NOW: {
      return {
        ...state,
        planDetails: { ...state.planDetails, buy_now: { ...action['payload'].buyNowData } },
      }
    }
    case AuthActionTypes.CLEAR_BUY_NOW: {
      return {
        ...state,
        planDetails: { ...state.planDetails, buy_now: { ...initialState.planDetails.buy_now } },
      }
    }
    case AuthActionTypes.CLEAR_FILTERS: {
      return {
        ...state,
        planDetails: {
          make_id: initialState.planDetails.make_id,
          model_id: initialState.planDetails.model_id,
          year: initialState.planDetails.year,
          value: initialState.planDetails.value,
          company_ids: initialState.planDetails.company_ids,
          policy_type_ids: initialState.planDetails.policy_type_ids,
          addon_ids: initialState.planDetails.addon_ids,
          buy_now: { ...state.planDetails.buy_now },
        },
      }
    }
    case AuthActionTypes.REMOVE_ITEM_COMPARE: {
      return {
        ...state,
        compareDetails: [],
      }
    }

    case AuthActionTypes.RENEW_POLICY: {
      return { ...state, loading: false, renewPolicyData: { ...action['payload'] } }
    }

    case AuthActionTypes.LEAD_DATA: {
      return { ...state, leadData: { ...action['payload'] } }
    }
    case AuthActionTypes.PAYMENT_ID: {
      return { ...state, paymentId: action['payload']  }
    }

    case AuthActionTypes.SET_LOADER: {
      return { ...state, loading: action['payload']  }
    }
    case AuthActionTypes.UPDATE_AUTH_POPUP: {
      return { ...state, authPopUp: action['payload']  }
    }
    default: {
      return state
    }
  }
}

export const getCompareData = state => {
  const ids = state.auth.compareDetails.reduce((acc, item) => {
    acc.push(item.id)
    return acc
  }, [])

  const amount = state.auth.compareDetails.reduce((acc, item) => {
    if (item.promotion_coupon_id !== 0) {
      acc.push(
        calculateAmountAfterPromotion(
          item.annual_contribution + item.addon_amount,
          item.promotion_discount_value,
          item.promotion_discount_type,
        ),
      )
    } else {
      acc.push(item.annual_contribution + item.addon_amount)
    }
    return acc
  }, [])

  return { ids, amount }
}

export { reducer as authReducer }
