import { Dispatch } from 'redux'
import { removeCookie, setCookie } from 'src/lib/utils'

import { AuthActionTypes } from './types'

export const setEditOrderInfo = (order_details: any) => {
  return {type: 'SET_EDIT_ORDER_DETAILS', payload: order_details  };
}
export const setCurrentUser =
  (item: any) =>
  (dispatch: Dispatch): any => {
    setCookie('uat_accessToken', item.accessToken)
    setCookie('uat_input', item.contact)
    try {
      return dispatch({
        type: AuthActionTypes.SET_CURRENT_USER,
        payload: { user: item },
      })
    } catch (e) {
      return null
    }
  }

export const logout =
  () =>
  (dispatch: Dispatch): any => {
    removeCookie('uat_accessToken')
    removeCookie('uat_input')
    try {
      return dispatch({
        type: AuthActionTypes.USER_LOGOUT,
      })
    } catch (e) {
      return null
    }
  }

export const leadGenRedux =
  () =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.LEAD_GENERATED,
      })
    } catch (e) {
      return null
    }
  }

export const setCompareDetails =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.ADD_ITEM_IN_COMPARE,
        payload: { compareDetails: data },
      })
    } catch (e) {
      return null
    }
  }

export const setPersonalDetails =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_PERSONAL_DETAILS,
        payload: { personalData: data },
      })
    } catch (e) {
      return null
    }
  }

export const updatePersonalDetails =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.UPDATE_PERSONAL_DETAILS,
        payload: { personalDetails: data },
      })
    } catch (e) {
      return null
    }
  }

export const setVehicleDetails =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_VEHICLE_DETAILS,
        payload: { vehicleData: data },
      })
    } catch (e) {
      return null
    }
  }

export const setDocumentDetails =
  (data: any, order_id, order_detail_id) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_DOCUMENT_DETAILS,
        payload: { 
          documentData: data, 
          order_id, 
          order_detail_id 
        },
      })
    } catch (e) {
      return null
    }
  }

export const clearPurchaseInfo =
  () =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.CLEAR_PURCHASE_INFO,
      })
    } catch (e) {
      return null
    }
  }

export const setAllowedTab =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_ALLOWED_TABS,
        payload: { tabIndex: data },
      })
    } catch (e) {
      return null
    }
  }

export const setLockedTab =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_LOCKED_TABS,
        payload: { tabIndex: data },
      })
    } catch (e) {
      return null
    }
  }

export const setInsuranceDetails =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_INSURANCE_DETAILS,
        payload: { insuranceDetails: data },
      })
    } catch (e) {
      return null
    }
  }

export const setBuyNowData =
  (data: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_BUY_NOW,
        payload: { buyNowData: data },
      })
    } catch (e) {
      return null
    }
  }

export const clearBuyNow =
  () =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.CLEAR_BUY_NOW,
      })
    } catch (e) {
      return null
    }
  }

export const clearFilters =
  () =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.CLEAR_FILTERS,
      })
    } catch (e) {
      return null
    }
  }

export const clearCompare =
  () =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.REMOVE_ITEM_COMPARE,
      })
    } catch (e) {
      return null
    }
  }

export const renewPolicy =
  (obj: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.RENEW_POLICY,
        payload: obj,
      })
    } catch (e) {
      return null
    }
  }

export const leadData =
  (obj: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.LEAD_DATA,
        payload: obj,
      })
    } catch (e) {
      return null
    }
  }

  export const paymentId =
  (val: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.PAYMENT_ID,
        payload: val,
      })
    } catch (e) {
      return null
    }
  }

  export const updateLoader =
  (val: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.SET_LOADER,
        payload: val,
      })
    } catch (e) {
      return null
    }
  }

  export const updateAuthPopUp =
  (val: any) =>
  (dispatch: Dispatch): any => {
    try {
      return dispatch({
        type: AuthActionTypes.UPDATE_AUTH_POPUP,
        payload: val,
      })
    } catch (e) {
      return null
    }
  }
