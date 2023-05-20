import { Reducer } from 'redux'
import { calculateAmountAfterPromotion } from 'src/lib/utils'

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
      contact: '',
      email: '',
      date_of_birth: '',
      place_of_birth: '',
      father_name: '',
      mother_name: '',
      nationality_id: 0,
      cnic_number: '',
      cnic_issue_date: '',
      cnic_expiry_date: '',
      occupation: '',
      source_of_income: '',
      previous_insurance_company_name: '',
      previous_date_of_expiry: '',
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
      survey_request_date: '',
      survey_request_time: '',
      city_id: 0,
      survey_address: '',
      survey_instructions: '',
      description: '',
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
    date_of_birth: '',
    place_of_birth: '',
    father_name: '',
    mother_name: '',
    nationality_id: 0,
    cnic_number: '',
    cnic_issue_date: '',
    cnic_expiry_date: '',
    occupation: '',
    source_of_income: '',
    previous_insurance_company_name: '',
    previous_date_of_expiry: '',
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
  },
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
        authPopUp: true,
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
      return {
        ...state,
        loading: false,
        purchaseDetails: { ...state.purchaseDetails, documentDetails: { ...action['payload'].documentData } },
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

    default: {
      return state
    }
  }
}

export const getCompareData = state => {
  console.log('getCompareData', state)
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
