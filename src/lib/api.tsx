import CryptoJS from 'crypto-js'

import { store } from './redux'
import { logout } from './redux/auth/action'
import Router from 'next/router';

const apiOrigin = process.env['NEXT_PUBLIC_API_ORIGIN']
export default async function Api(method: string, path: string, data?: any, isUrlEncoded = false, isFormData = false) {
  // var encrypted = CryptoJS.AES.encrypt('Message', 'Secret Passphrase');
  const state = store.getState()
  const { user } = state.auth.data
  let token = 'v5q2cP7JBYavNAz2'
  if (user) {
    token = `Bearer ${user['accessToken']}`
  }
  const contentType = isUrlEncoded
    ? {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    : {
        'Content-Type': 'application/json',
      }
  let formBody: any = []
  if (isUrlEncoded) {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const property in data) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(data[property])
      formBody.push(`${encodedKey}=${encodedValue}`)
    }
    formBody = formBody.join('&')
  }
  let body: any
  if (isUrlEncoded) {
    body = formBody
  } else if (isFormData) {
    body = data
  } else if (data && !isUrlEncoded && !isFormData) {
    const encrypted = await CryptoJS.AES.encrypt(JSON.stringify(data), process.env['NEXT_PUBLIC_ENCRYPTION_KEY'])

    body = { encrypted: true, data: encrypted.toString() }
  }
  try {
    if (user) {
      const response = await fetch(`${apiOrigin}customer/check_validation`, {
        method: 'GET',
        headers: {
          ...{ 'Content-Type': 'application/json' },
          Authorization: token,
        },
      })

      if (response.status === 503 || response.status === 401 || response.status === 400) {
        store.dispatch(logout())
        Router.push('/auth');
      }
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const response = await fetch(`${apiOrigin}${path}`, {
      method,
      headers: {
        ...(!isFormData && {
          'Content-Type': isUrlEncoded ? 'application/x-www-form-urlencoded' : 'application/json',
        }),
        Authorization: token,
      },
      body: isUrlEncoded || isFormData ? body : JSON.stringify(body),
      // body,
    })
    // const json = await response.json()
    if (response.status === 503 || response.status === 401 || response.status === 400) {
      const json = await response.json()
      store.dispatch(logout())
      Router.push('/auth');
      return json
    }

    const res = await response.json()
    if (res.encrypted) {
      const decrypted = CryptoJS.AES.decrypt(
        res?.invoice ?? res.data,
        process.env['NEXT_PUBLIC_ENCRYPTION_KEY'],
      ).toString(CryptoJS.enc.Utf8)
      return await new Promise(resolve => {
        resolve({
          ...res,
          ...(res?.data && { data: JSON.parse(decrypted) }),
          ...(res?.invoice && { invoice: JSON.parse(decrypted) }),
          ...(res?.model && { model: JSON.parse(decrypted) }),
        })
      })
    }
    return await new Promise(resolve => {
      resolve(res)
    })
  } catch (error) {
    return { error }
  }
}
