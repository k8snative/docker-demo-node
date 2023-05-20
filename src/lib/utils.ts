const cookieDomain = process.env['NEXT_PUBLIC_COOKIE_DOMAIN'] || 'localhost'
export const getSSLCookieOptions = () => {
  const isSSL = window.location.protocol === 'https:'

  const ss = isSSL ? ';SameSite=None' : ';SameSite=Lax'
  const sec = isSSL ? ';secure' : ''

  return ss + sec
}
export const validateEmail = (email: string) => {
  // const re = /\S+@\S+\.\S+/
  const re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/
  return re.test(email)
}
export const validatePhoneNo = (phone: string) => {
  // const re = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm
  const re = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
  return re.test(phone)
}
export const validateName = (name: string) => {
  const re = /^[A-Za-z ,.'-]+$/
  return re.test(name)
}

/**
 * Set the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @param  {String} value  The value of the cookie
 */
export const setCookie = (name: string, value: string) => {
  const expDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 // 30 days Expired
  const dateCookie = new Date(expDate).toUTCString()
  document.cookie = `${name}=${value}; Domain=${cookieDomain}; path=/;expires=${dateCookie}${getSSLCookieOptions()}`
}

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts?.length === 2) return parts?.pop().split(';').shift()
  return ''
}

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Domain=${cookieDomain}; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT${getSSLCookieOptions()}`
}

/**
 * @param time
 * @return string format the given time to 12 hours
 */
export const formatTime = (time: string): string => {
  if (!time) return ''
  const [hourString, minute] = time.split(':')
  const hour = +hourString % 24
  return `${hour % 12 || 12}:${minute}${hour < 12 ? ' AM' : ' PM'}`
}

/**
 @param date - Any Date
 @param format - Format in string like "YYYY/MM/DD" or "DD/MM/YYYY"
*/

export const FormatDate = (date: any, format: 'YYYY/MM/DD' | 'DD/MM/YYYY') => {
  const d = new Date(date)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
  if (format === 'DD/MM/YYYY') return `${da}-${mo}-${ye}`
  else if (format === 'YYYY/MM/DD') return `${ye}-${mo}-${da}`
}

/**
 *
 * @param amount - Base Amount
 * @param couponAmount - Amount of promotion
 * @param couponAmountType - Amount type either 'percentage' or 'fixed'
 * @returns Amount after promotion is applied
 */
export const calculateAmountAfterPromotion = (amount: number, couponAmount: number, couponAmountType: string) => {
  if (couponAmountType === 'percentage') {
    const percentageAmount = couponAmount / 100
    const amountToSubstract = amount * percentageAmount
    return amount - amountToSubstract
  } else {
    return amount - couponAmount
  }
}

/**
 *
 * @param amount - Base Amount
 * @param couponAmount = Amount of promotion
 * @param couponAmountType - Amount type either 'percentage' or 'fixed
 * @returns Amount of discount
 */

export const calculateDiscountAmount = (amount: number, couponAmount: number, couponAmountType: string) => {
  if (couponAmountType === 'percentage') {
    const percentageAmount = couponAmount / 100
    const amountToSubstract = amount * percentageAmount
    return amountToSubstract
  } else {
    return couponAmount
  }
}

export const getFileName = (str: string) => {
  const length = str?.length
  const finalString = str
    ?.split('/')
    .slice(-1)[0]
    .split('-')
    .splice(1, length - 1)
    .join('-')
  return finalString
}

const returnNumber = (number: any) => (number < 10 ? `0${number}` : number)

export const getFormattedDateForInput = (e: any) => {
  const month = new Date(e)?.getMonth()
  const temp = `${returnNumber(new Date(e)?.getDate())}-${returnNumber(month + 1)}-${returnNumber(
    new Date(e)?.getFullYear(),
  )}`
  return e ? temp : ''
}

export default {}
