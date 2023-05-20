/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect } from 'react-redux'

const AppWrapper = (props: any) => {
  const router = useRouter()
  useEffect(
    () => {
      if (!props.user) {
        if (router.pathname !== '/auth/auth') {
          router.replace({
            pathname: '/auth/auth',
            query: {
              redirect: router.query['redirect'] || router.asPath,
            },
          })
        }
      }
      if (props.user && router.pathname === '/auth/auth') {
        router.replace(router.query['redirect'] || '/products/health')
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route],
  )
  if (props.user) return props.children
}

const mapStateToProps = (state: any) => ({ user: state.auth.data.user })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(AppWrapper)
