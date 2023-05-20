export interface Auth {
  user?: { [key: string]: any } | undefined
}

export enum AuthActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  USER_LOGOUT = 'USER_LOGOUT',
  LEAD_GENERATED = 'LEAD_GENERATED',
  SET_PERSONAL_DETAILS = 'SET_PERSONAL_DETAILS',
  SET_VEHICLE_DETAILS = 'SET_VEHICLE_DETAILS',
  SET_ALLOWED_TABS = 'SET_ALLOWED_TABS',
  SET_DOCUMENT_DETAILS = 'SET_DOCUMENT_DETAILS',
  CLEAR_PURCHASE_INFO = 'CLEAR_PURCHASE_INFO',
  UPDATE_PERSONAL_DETAILS = 'UPDATE_PERSONAL_DETAILS',
  SET_LOCKED_TABS = 'SET_LOCKED_TABS',
  SET_INSURANCE_DETAILS = 'SET_INSURANCE_DETAILS',
  SET_FILTER_DETAILS = 'SET_FILTER_DETAILS',
  SET_BUY_NOW = 'SET_BUY_NOW',
  CLEAR_BUY_NOW = 'CLEAR_BUY_NOW',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  ADD_ITEM_IN_COMPARE = 'ADD_ITEM_IN_COMPARE',
  REMOVE_ITEM_COMPARE = 'REMOVE_ITEM_COMPARE',
  RENEW_POLICY = 'RENEW_POLICY',
  LEAD_DATA = 'LEAD_DATA',
  PAYMENT_ID = 'PAYMENT_ID',
  SET_LOADER = 'SET_LOADER',
  UPDATE_AUTH_POPUP = 'UPDATE_AUTH_POPUP'
}

export interface AuthState {
  loading: boolean
  data: Auth
  errors?: string | undefined
  authPopUp: boolean
  allowedTabIndex: number
  lockedTabIndex: number
  planDetails: PlanDetails
  purchaseDetails: PurchaseDetails
  compareDetails: {}[]
  renewPolicyData: RenewPolicyData
}

// interface CompareDetails {}

interface PlanDetails {
  make_id: string
  model_id: string
  year: string
  value: number
  sortOrder: string
  company_ids: Array<number> | []
  policy_type_ids: Array<number> | []
  addon_ids: Array<number> | []
  buy_now: {
    policy_id: number
    policy_type_id: number
    annual_contribution: number
    insurance_rate: number
    company_logo_url: string
    policy_name: string
    policy_addons: Array<{ id: number; amount: number }>
    promotion_coupon_id: number
    promotion_discount_type: string
    promotion_discount_value: number
    total_discount_value: number
  }
}

interface PurchaseDetails {
  order_id: number
  payment_mode: string
  payment_status: string
  order_status: string
  addons: Array<{
    addon_id: number
    type: string | null
    amount: number
  }> | null
  promotion_coupon_id: number
  promotion_discount_type: string
  promotion_discount_value: number
  total_discount_value: number
  details: {
    order_detail_id: number
    policy_id: number
    premium_rate: number
    total_price: number
    customer_name: string
    permanent_address: string
    current_address: string
    contact: string
    email: string
    date_of_birth: string | null
    place_of_birth: string
    father_name: string
    mother_name: string
    nationality_id: number
    cnic_number: string
    cnic_issue_date: string | null
    cnic_expiry_date: string | null
    occupation: string
    source_of_income: string
    previous_insurance_company_name: string
    previous_date_of_expiry: string | null
    benificiary_name: string
    benificiary_contact: string
    benificiary_cnic_number: string
    benificiary_address: string
    benificiary_relation: string
    is_filer: boolean
    is_government_employee: boolean
    phone_code: string
    benificiary_contact_phone_code: string
    honorifics: string
  }
  vehicleDetails: {
    make_id: number
    model_id: number
    year: number
    value: number
    is_brand_new: boolean
    modification: boolean
    color: string
    chassis_number: string
    engine_number: string
    registration_number: string
    survey_request_date: string | null
    survey_request_time: string | null
    city_id: number
    survey_address: string
    survey_instructions: string
    description: string
  }
  documentDetails: {
    cnic_front: {
      filename: string
      filePath: string
    } | null
    cnic_back: {
      filename: string
      filePath: string
    } | null
    ['income-proof']: {
      filename: string
      filePath: string
    }
    ['running-paper']: {
      filename: string
      filePath: string
    }
    invoice: {
      filename: string
      filePath: string
    }
    ['additional-documents']: Array<{
      filename: string
      filePath: string
    }> | null
    passport: {
      filename: string
      filePath: string
    } | null
    isPassport: boolean
  }
}

interface RenewPolicyData {
  customer_name: string
  permanent_address: string
  current_address: string
  contact: string
  email: string
  date_of_birth: string | null
  place_of_birth: string
  father_name: string
  mother_name: string
  nationality_id: number
  cnic_number: string
  cnic_issue_date: string | null
  cnic_expiry_date: string | null
  occupation: string
  source_of_income: string
  previous_insurance_company_name: string
  previous_date_of_expiry: string | null
  benificiary_name: string
  benificiary_contact: string
  benificiary_cnic_number: string
  benificiary_address: string
  benificiary_relation: string
  is_filer: boolean
  is_government_employee: boolean
  phone_code: string
  benificiary_contact_phone_code: string
  honorifics: string
  color: string
  engine_number: string
  chassis_number: string
  registration_number: string
  ['additional-document']: { filename: string; filePath: string }[]
  cnic_back: { filename: string; filePath: string }
  cnic_front: { filename: string; filePath: string }
  ['income-proof']: { filename: string; filePath: string }
  invoice: { filename: string; filePath: string }
  passport: { filename: string; filePath: string }
  ['running-paper']: { filename: string; filePath: string }
  isPassport: boolean
  signature_path: string
  previous_policy_id?: number
}
